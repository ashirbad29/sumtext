import { doc, setDoc } from 'firebase/firestore';

import { db } from '../firebase';

const saveText = async (id: string, data: any) => {
  console.log(id, data);
  if (!id) return;
  await setDoc(doc(db, 'texts', id), data);
};

export default saveText;
