import { doc, getDoc } from 'firebase/firestore';

import { db } from '../firebase';

const getText = async (id: string) => {
  const docRef = doc(db, 'texts', id);
  const docSnap = await getDoc(docRef);
  if (!docSnap.exists()) return null;
  return {
    id: docSnap.id,
    ...docSnap.data(),
  };
};

export default getText;
