/* eslint-disable consistent-return */
/* eslint-disable no-await-in-loop */
/* eslint-disable no-restricted-syntax */
/**
 * Get Projects
 */

import { deleteDoc } from '@firebase/firestore';
import {
  collection, fireStoreDb, getDocs, getDoc, doc,
} from '../firebase';
// eslint-disable-next-line import/no-cycle
import Authenticator from '../Auth/AuthenticateUser';

const Projects = {
  getAll: async () => {
    const query = collection(fireStoreDb, 'projects');

    const querySnapshot = await getDocs(query);

    return querySnapshot.docs.map((docu) => (
      {
        ...docu.data(),
        id: docu.id,
        organiser: docu.data().organiser,
        title: docu.data().title,
        description: docu.data().description,
        deadline: docu.data().deadline,
        routerPath: `/project/${docu.id}`,
        joined: docu.data().joined,
      }
    ));
  },

  getRelevantProjects: async () => {
    const projects = await Projects.getAll();
    const userId = Authenticator.getUid();
    const relevantProjects:any[] = [];

    projects.forEach((project) => {
      const foundJoined = project.joined.find((user:any) => user === userId);
      if (foundJoined || project.organiser === userId) {
        relevantProjects.push(project);
      }
    });

    return relevantProjects;
  },

  getById: async (id: string) => {
    const project = (await getDoc(doc(fireStoreDb, 'projects', id))).data();
    return project;
  },

  deleteProject: async (id: string) => {
    const project = await Projects.getById(id);
    await deleteDoc(doc(fireStoreDb, 'projects', id));
    return project;
  },

  createProjectData: async (id: string) => {
    const data = await Projects.getById(id);
    const projectData = {
      organiser: data?.organiser,
      title: data?.title,
      description: data?.description,
      deadline: data?.deadline,
    };
    return projectData;
  },

  getMembers: async (id: string) => {
    const projectInfo = await getDoc(doc(fireStoreDb, 'projects', id));
    if (!projectInfo.exists()) {
      throw new Error('Could not find project info');
    }
    const joinedUsersIds = projectInfo.data().joined;

    const users = [];
    for (const uid of joinedUsersIds) {
      const user = await getDoc(doc(fireStoreDb, 'users', uid));
      if (!user.exists()) return;
      users.push({ id: uid, ...user.data() });
    }
    return users;
  },
};

export default Projects;
