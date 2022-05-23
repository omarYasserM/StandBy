import { db } from "../firebase";
import { collection, getDocs, getDoc, doc, setDoc } from "@firebase/firestore";

/**
 *
 * @param {String} collName the name of the collection you want to retrieve
 * @param {Function} Adder a callback function that takes a list as a parameter
 */
export const getCollectionData = (collName, Adder) => {
  let data_list = [];
  let error;
  const collref = collection(
    db,
    collName.slice(1, collName.length).replace("%20", " ")
  );

  getDocs(collref)
    .then((snapshot) => {
      snapshot.docs.forEach((doc) => {
        data_list.push({ ...doc.data(), id: doc.id });
      });
      Adder(data_list);
    })
    .catch((err) => {
      console.error(err);
    });
};

/**
 *
 * @param {String} collName
 * @param {String} docName
 * @param {String} newDoc
 */
export const editDoc = async (collName, docName, newDoc) => {
  await setDoc(doc(db, collName, docName), newDoc).catch((err) =>
    console.error(err)
  );
};

/**
 *
 * @param {String} UID
 * @returns User data if it's available, otherwise returns false
 */
export const getUserData = async (UID) => {
  const userSnap = await getDoc(doc(db, "users", UID));
  if (userSnap) return userSnap.data();
  else return false;
};
