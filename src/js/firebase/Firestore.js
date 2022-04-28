import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";

export const getCollectionData = (collName, Adder) => {
  let data_list = [];

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
      console.error(err.message);
    });
};

const test = [
  {
    link: "https://google.com",
    level: 1,
    thumbnail: "testimg.com",
    title: "name of image",
  },
  {
    link: "https://google.com",
    level: 1,
    thumbnail: "testimg.com",
    title: "name of image",
  },
  {
    link: "https://google.com",
    level: 1,
    thumbnail: "testimg.com",
    title: "name of image",
  },
  {
    link: "https://google.com",
    level: 1,
    thumbnail: "testimg.com",
    title: "name of image",
  },
];
