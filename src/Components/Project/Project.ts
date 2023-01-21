/* eslint-disable @typescript-eslint/no-unused-vars */
/**
 * A Project Object
 */

import {
  addDoc, fireStoreDb, collection, setDoc, doc, getDoc,
} from '../firebase';
// eslint-disable-next-line import/no-cycle
class Project {
  organiser: any;

  title: any;

  description: any;

  deadline: any;

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
    deadline,
  }:any) {
    this.organiser = organiser;
    this.title = title;
    this.deadline = deadline;
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
      deadline: this.deadline,
      invited: this.invited,
      joined: this.joined,
      rejected: this.rejected,
      editedOn: `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
      createdOn: `${date.getDate()}/${date.getUTCMonth() + 1}/${date.getFullYear()} at ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`,
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
}

export default Project;
