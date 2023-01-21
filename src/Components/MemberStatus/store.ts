import {
  collection, getDocs, where, query, arrayUnion, updateDoc, doc, getDoc,
} from '@firebase/firestore';
import { fireStoreDb } from '../firebase';

export const listAllUsers = async (projectId: string) => {
  const projectInfo = await getDoc(doc(fireStoreDb, 'projects', projectId));
  if (!projectInfo.exists()) {
    throw new Error('Could not find project info');
  }
  const joinedUsersIds = projectInfo.data().joined;
  const projOrganiserId = projectInfo.data().organiser;

  const querySnapshot = await getDocs(query(collection(fireStoreDb, 'users'), where('username', '!=', null)));
  return querySnapshot.docs
    .map((d) => ({ ...d.data(), id: d.id }))
    .filter(
      (u: { id: string; username?: string }) => !joinedUsersIds.includes(u.id) && u.id !== projOrganiserId && u.username !== '',
    ) as { id: string; username: string }[];
};

export const addUsersToProject = async (projectId: string, newIds: string[]) => {
  await updateDoc(doc(fireStoreDb, 'projects', projectId), {
    joined: arrayUnion(...newIds),
  });
};
