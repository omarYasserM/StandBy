import "/src/views/home/home.css";
import "/src/views/templates.js";
import AOS from "/node_modules/aos/dist/aos.js";
import "/node_modules/aos/dist/aos.css";
import { route, routeTo } from "../router";
import { CheckUser } from "../firebase/Auth";
import { getCollectionData } from "../firebase/Firestore";
AOS.init({ duration: 1400 });

CheckUser();

const mapCategories = (list) => {
  const categories = document.getElementById("cat");
  let html = "";
  list.forEach((item) => {
    html += `<img src=${item.thumbnail} data-aos="fade-up" />`;
  });
  categories.innerHTML = html;
};
const mapNewCourses = (list) => {
  const categories = document.getElementById("newCourses");
  let html = "";
  list.forEach((item) => {
    html += `<div class="video"> 
    <a target="_blank" href=${item.link} >
      <img src=${item.thumbnail} alt=${item.title}>
      <span>${item.title}</span>
    </a>
  </div>`;
  });
  categories.innerHTML = html;
};
getCollectionData("?Programming", mapNewCourses);
getCollectionData("?Categories", mapCategories);

document.getElementById("categories-btn").addEventListener("click", () => {
  routeTo(route.Categories);
});
