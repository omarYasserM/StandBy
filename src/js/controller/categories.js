import "/src/views/categories/categories.css";
import "/src/views/templates.js";
import "../firebase/Auth.js";
import { state, setState, addListener } from "./state.js";
import { getCollectionData } from "../firebase/Firestore.js";

let page = window.location.search;
if (page == "") page = "?Categories";
document.getElementById("categoryTitle").innerHTML = page
  .slice(1, page.length)
  .replace("%20", " ");
const searchbtn = document.getElementById("inner_search");
const resetbtn = document.getElementById("reset_search");

searchbtn.innerHTML =
  "Search in " + page.slice(1, page.length).replace("%20", " ");

const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};
const updateCourses = () => {
  document.getElementById("level-0").style.display = "none";
  document.getElementById("level-1").style.display = "none";
  const unwanted = document.querySelectorAll(".courses > div");
  unwanted.forEach((item) => {
    item.parentElement.removeChild(item);
  });
  addCourses();
};

const addCourses = () => {
  let i = 0;
  state.map((item) => {
    const course = document.createElement("div");
    course.className = "course" + i++;
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
};

/*
[
  {
    title:
    level:
    thumbnail:
    link:
  },
]
*/

const filterSearch = () => {
  const searchInput = document.getElementById("search_box").value;
  console.log("test");
  setState(state.filter((item) => item.title.includes(searchInput)));
};
addListener(updateCourses);

searchbtn.addEventListener("click", () => {
  filterSearch();
});

resetbtn.addEventListener("click", () => {
  getCollectionData(page, setState);
});
getCollectionData(page, setState);
