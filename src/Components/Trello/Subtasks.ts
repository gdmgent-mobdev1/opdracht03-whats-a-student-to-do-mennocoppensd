import { collection, getDocs } from '@firebase/firestore';
import { fireStoreDb } from '../firebase';

const SubTasks = {
  getAll: async (listId: string): Promise<any[]> => {
    const query = collection(fireStoreDb, `lists/${listId}/cards`);
    const querySnapshot = await getDocs(query);
    return querySnapshot.docs.map((doc) => ({ ...doc.data(), id: doc.id }));
  },
};

export default SubTasks;
