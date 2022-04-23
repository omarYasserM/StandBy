import "/src/views/categories/categories.css";
import "/src/views/templates.js";
import "../firebase/Auth.js";
import { getCollectionData } from "../firebase/Firestore.js";

let page = window.location.search;
if (page == "") page = "?Categories";
document.getElementById("categoryTitle").innerHTML = page
  .slice(1, page.length)
  .replace("%20", " ");

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

getCollectionData(page, AddCourses);
