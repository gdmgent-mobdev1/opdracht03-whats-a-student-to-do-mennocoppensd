/**
 * A Project Object
 */

import {
  addDoc, fireStoreDb, collection, setDoc, doc, getDoc,
} from '../firebase';
// eslint-disable-next-line import/no-cycle
import Authenticator from '../Auth/AuthenticateUser';

class Project {
  organiser: any;

  title: any;

  description: any;

  createdOn: any;

  invited: any[];

  joined: any[];

  rejected: any[];

  projectId: any;

  routerPath: string;

  constructor({
    organiser,
    title,
    description,
  }:any) {
    this.organiser = organiser;
    this.title = title;
    this.projectId = null;
    this.description = description;
    this.createdOn = null;
    this.invited = [];
    this.joined = [];
    this.rejected = [];
    this.routerPath = `/project/${this.projectId}`;
  }

  createProjectData() {
    const date = new Date();

    const projectData = {
      organiser: this.organiser,
      title: this.title,
      description: this.description,
      invited: this.invited,
      joined: this.joined,
      rejected: this.rejected,
      editedOn: `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()} om ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      createdOn: `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()} om ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      routerPath: `/project/${this.projectId}`,
    };

    return projectData;
  }

  // when editing, these will stay the same
  async preserveSpecificData(projectId:any) {
    const project = (await getDoc(doc(fireStoreDb, 'projects', projectId))).data();
    this.invited = project?.invited;
    this.joined = project?.joined;
    this.rejected = project?.rejected;
    this.createdOn = project?.createdOn;
    this.routerPath = project?.routerPath;
  }

  async createNewProject() {
    const projectData = this.createProjectData();

    const docRef = await addDoc(collection(fireStoreDb, 'projects'), projectData);
    this.projectId = docRef.id;

    const date = new Date();
    this.createdOn = `${date.getDate()}/${date.getUTCMonth()
      + 1}/${date.getFullYear()} om 
      ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    return {
      ...projectData, id: docRef.id, projectId: docRef.id,
    };
  }

  async editProject(projectId:any) {
    await this.preserveSpecificData(projectId);

    const projectData = this.createProjectData();

    await setDoc(doc(fireStoreDb, 'projects', projectId), projectData);
  }

  async inviteUsers(users:any, projectId:any) {
    await this.preserveSpecificData(projectId);
    users.forEach((user:any) => {
      this.invited.push(user);
    });
    //  Makes sure there are no double invites
    this.invited = [...new Set(this.invited)];
    const projectData = this.createProjectData();

    await setDoc(doc(fireStoreDb, 'projects', projectId), projectData);
  }

  async joinProject(projectId:any) {
    await this.preserveSpecificData(projectId);
    const userId = Authenticator.getUid();
    this.joined.push(userId);

    //  If the user joins then it has to be deleted from invited
    const found = this.invited.find((invite:any) => invite === userId);
    if (found) this.invited.splice(this.invited.indexOf(found), 1);

    const projectData = this.createProjectData();
    await setDoc(doc(fireStoreDb, 'projects', projectId), projectData);
  }

  //  Reject a project or leave a project
  async rejectProject(projectId:any) {
    await this.preserveSpecificData(projectId);
    const userId = Authenticator.getUid();
    this.rejected.push(userId);

    //  If the user was invited, delete him from invited
    const foundInvite = this.invited.find((invite) => invite === userId);
    if (foundInvite) this.invited.splice(this.invited.indexOf(foundInvite), 1);
    //  If the user joined, delete him from joined
    const foundJoin = this.joined.find((join) => join === userId);
    if (foundJoin) this.joined.splice(this.joined.indexOf(foundJoin), 1);

    const projectData = this.createProjectData();
    await setDoc(doc(fireStoreDb, 'projects', projectId), projectData);
  }

  async deleteUsers(users:any, projectId:any) {
    await this.preserveSpecificData(projectId);
    const foundIndexInvited:any[] = [];
    const foundIndexJoined:any[] = [];
    const foundIndexRejected:any[] = [];

    //  if the user was invited, delete it from invited
    users.forEach((user:any) => {
      const found = this.invited.find((invite:any) => invite === user);
      if (found) {
        foundIndexInvited.push(this.invited.indexOf(found));
      }
    });

    //  if the user joined, delete it from joined
    users.forEach((user:any) => {
      const found = this.joined.find((join:any) => join === user);
      if (found) {
        foundIndexJoined.push(this.joined.indexOf(found));
      }
    });

    //  if the user rejected, delete it from rejected
    users.forEach((user:any) => {
      const found = this.rejected.find((reject:any) => reject === user);
      if (found) {
        foundIndexRejected.push(this.joined.indexOf(found));
      }
    });

    //  Sorts all the found indices from big to small
    //  This is easier for deleting them from the array
    foundIndexInvited.sort((a, b) => b - a);
    foundIndexJoined.sort((a, b) => b - a);
    foundIndexRejected.sort((a, b) => b - a);

    foundIndexInvited.forEach((index) => {
      this.invited.splice(index, 1);
    });
    foundIndexJoined.forEach((index) => {
      this.joined.splice(index, 1);
    });
    foundIndexRejected.forEach((index) => {
      this.rejected.splice(index, 1);
    });

    const projectData = this.createProjectData();
    await setDoc(doc(fireStoreDb, 'projects', projectId), projectData);
  }
}

export default Project;
