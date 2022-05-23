import "/src/views/categories/categories.css";
import "/src/views/templates.js";
import { Store } from "./state.js";
import { getCollectionData } from "../firebase/Firestore.js";
import { makeAlert } from "../../views/templates.js";
import { CheckUser } from "../firebase/Auth.js";

CheckUser();
const CourseStore = new Store([]);

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

const updateCourses = () => {
  document.getElementById("level-0").style.display = "none";
  document.getElementById("level-1").style.display = "none";
  document.getElementById("level-2").style.display = "none";

  const unwanted = document.querySelectorAll(".course-line > div");
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
  const line0 = document.getElementById("line-0");
  const line1 = document.getElementById("line-1");
  const line2 = document.getElementById("line-2");
  CourseStore.state.map((item) => {
    const course = document.createElement("div");
    course.className = "video";
    course.innerHTML = `<a ${item.level != 10 ? `target="_blank"` : ""} href=${
      item.link
    } ><img src="${item.thumbnail}" alt="${item.title}"><span>${
      item.title
    }</span></a>`;

    if (item.level == 0) {
      level0.style.display = "inline";
      line0.appendChild(course);
    } else if (item.level == 1) {
      level1.style.display = "inline";
      line1.appendChild(course);
    } else if (item.level == 2) {
      level2.style.display = "inline";
      line2.appendChild(course);
    } else {
      line0.appendChild(course);
    }
  });
};

const filterSearch = () => {
  const searchInput = document.getElementById("search_box").value;
  const filteredList = CourseStore.state.filter((item) =>
    item.title.toLowerCase().includes(searchInput.toLowerCase())
  );
  const myAlert = document.querySelector(".alert");
  if (searchInput == "") getCollectionData(page, CourseStore.setState);
  else if (filteredList.length != 0) {
    myAlert != undefined ??
      document.body.removeChild(document.querySelector(".alert"));
    document.querySelector(
      ".result-counter"
    ).innerHTML = `found ${filteredList.length} out of ${CourseStore.state.length}`;
    CourseStore.setState(filteredList);
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
CourseStore.addListener(updateCourses);

searchbtn.addEventListener("click", () => {
  filterSearch();
});

resetbtn.addEventListener("click", () => {
  document.getElementById("search_box").value = "";
  document.querySelector(".result-counter").innerHTML = "";
  const myAlert = document.querySelector(".alert");
  myAlert != undefined ?? document.body.removeChild(myAlert);
  getCollectionData(page, CourseStore.setState);
});
requestbtn.addEventListener("click", () => {
  const requestmsg = document.getElementById("request-input");
  if (requestmsg.value != "") {
    makeAlert("Thanks for your feedback, we will add it soon");
    requestmsg.value = "";
  }
});
getCollectionData(page, CourseStore.setState);
