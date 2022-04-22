import "/src/views/categories/categories.css";
import "/src/views/templates.js";
import { db } from "../firebase";
import { collection, getDocs } from "@firebase/firestore";

let page = window.location.search;
if (page == "") page = "sCategories";
document.getElementById("categoryTitle").innerHTML = page
  .slice(1, page.length)
  .replace("%20", " ");
const collref = collection(db, page.slice(1, page.length).replace("%20", " "));
let course_list = [];
getDocs(collref)
  .then((snapshot) => {
    snapshot.docs.forEach((doc) => {
      course_list.push({ ...doc.data(), id: doc.id });
    });
    AddCourses(course_list);
  })
  .catch((err) => {
    console.error(err.message);
  });

const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};

const AddCourses = (course_list) =>
  course_list.map((item) => {
    const course = document.createElement("div");
    course.innerHTML = `<a href=${item.link} target="blank"><img src="${item.thumbnail}" alt="${item.title}"><span>${item.title}</span></a>`;
    const level0 = document.getElementById("level-0");
    const level1 = document.getElementById("level-1");

    if (item.level == 0) {
      level0.style.display = "inline";
      insertAfter(level0, course);
    } else if (item.level == 1) {
      level1.style.display = "inline";
      insertAfter(level1, course);
    } else {
      insertAfter(level0, course);
    }
  });
