import "../../views/profile/profile.css";
import "../../views/templates.js";

const sections = document.getElementsByTagName("section");
let secNumber = sections.length;

document.getElementById("overview").addEventListener("click", () => {
  var i = 0;
  while (i < secNumber) {
    sections[i].style.display = "none";
    i++;
  }
  sections[0].style.display = "flex";
});
document.getElementById("favorites").addEventListener("click", () => {
  var i = 0;
  while (i < secNumber) {
    sections[i].style.display = "none";
    i++;
  }
  sections[1].style.display = "flex";
});

const test = () => {};
