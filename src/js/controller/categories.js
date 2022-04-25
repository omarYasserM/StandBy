import "/src/views/categories/categories.css";
import "/src/views/templates.js";
import "../firebase/Auth.js";
import { CourseStore } from "./state.js";
import { getCollectionData } from "../firebase/Firestore.js";

const cState = CourseStore();

let page = window.location.search;
if (page == "") page = "?Categories";
document.getElementById("categoryTitle").innerHTML = page
  .slice(1, page.length)
  .replace("%20", " ");

const searchbtn = document.getElementById("inner_search");
const resetbtn = document.getElementById("reset_search");
const requestbtn = document.getElementById("inner_request");

searchbtn.innerHTML =
  "Search in " + page.slice(1, page.length).replace("%20", " ");

const insertAfter = (referenceNode, newNode) => {
  referenceNode.parentNode.insertBefore(newNode, referenceNode.nextSibling);
};
const updateCourses = () => {
  document.getElementById("level-0").style.display = "none";
  document.getElementById("level-1").style.display = "none";
  document.getElementById("level-2").style.display = "none";

  const unwanted = document.querySelectorAll(".courses > div");
  unwanted.forEach((item) => {
    item.parentElement.removeChild(item);
  });
  addCourses();
};

const addCourses = () => {
  let i = 0;
  const level0 = document.getElementById("level-0");
  const level1 = document.getElementById("level-1");
  const level2 = document.getElementById("level-2");
  cState.state().map((item) => {
    const course = document.createElement("div");
    course.className = "course" + i++;
    course.innerHTML = `<a href=${item.link} target="blank"><img src="${item.thumbnail}" alt="${item.title}"><span>${item.title}</span></a>`;

    if (item.level == 0) {
      level0.style.display = "inline";
      insertAfter(level0, course);
    } else if (item.level == 1) {
      level1.style.display = "inline";
      insertAfter(level1, course);
    } else if (item.level == 2) {
      level2.style.display = "inline";
      insertAfter(level2, course);
    } else {
      insertAfter(level0, course);
    }
  });
};

const filterSearch = () => {
  const searchInput = document.getElementById("search_box").value;
  const filteredList = cState
    .state()
    .filter((item) =>
      item.title.toLowerCase().includes(searchInput.toLowerCase())
    );
  const myAlert = document.querySelector(".alert");
  if (searchInput == "") getCollectionData(page, cState.setState);
  else if (filteredList.length != 0) {
    myAlert != undefined ??
      document.body.removeChild(document.querySelector(".alert"));
    document.querySelector(".result-counter").innerHTML = `found ${
      filteredList.length
    } out of ${cState.state().length}`;
    cState.setState(filteredList);
  } else {
    if (!myAlert) {
      const alert = document.createElement("div");
      alert.className = "alert";
      alert.innerHTML = `
    <div class="alertbox">
    <h1>No Results Found</h1>
    <button>OK</button>
    </div>`;
      document.body.appendChild(alert);
      document
        .querySelector(".alertbox > button")
        .addEventListener("click", () => {
          document.body.removeChild(alert);
        });
    }
  }
};
cState.addListener(updateCourses);

searchbtn.addEventListener("click", () => {
  filterSearch();
});

resetbtn.addEventListener("click", () => {
  document.getElementById("search_box").value = "";
  const myAlert = document.querySelector(".alert");
  myAlert != undefined ?? document.body.removeChild(myAlert);
  getCollectionData(page, cState.setState);
});
requestbtn.addEventListener("click", () => {
  const alert = document.createElement("div");
  const requestmsg = document.getElementById("request-input");
  if (requestmsg.value != "") {
    alert.className = "alert";
    alert.innerHTML = `
    <div class="alertbox">
    <h1>Thank you for the feedback, will be added soon</h1>
    <button>OK</button>
    </div>`;
    document.body.appendChild(alert);
    document
      .querySelector(".alertbox > button")
      .addEventListener("click", () => {
        document.body.removeChild(alert);
      });
    requestmsg.value = "";
  }
});
getCollectionData(page, cState.setState);
