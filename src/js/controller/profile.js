import "../../views/profile/profile.css";
import "../../views/templates.js";
import "../firebase/Auth.js";
import { makeAlert } from "../../views/templates.js";

const sectionNames = ["overview", "favorites", "notifications"];
const sections = document.getElementsByTagName("section");
let secNumber = sections.length;

sections[0].style.display = "flex";
sections[0].style.position = "static";

sectionNames.forEach((sectionName) => {
  document.getElementById(sectionName).addEventListener("click", () => {
    var i = 0;
    while (i < secNumber) {
      sections[i].style.display = "none";
      sections[i].style.position = "absolute";
      i++;
    }
    sections[sectionNames.indexOf(sectionName)].style.display = "flex";
    sections[sectionNames.indexOf(sectionName)].style.position = "static";
  });
});

document.getElementById("badgeEarnInfo").addEventListener("click", () => {
  makeAlert(
    "<p>You earn badges by reaching milestones in different categories.<br>milestones includes watching time, watching specific courses, or taking category quiz (coming soon)</p>"
  );
});
document.getElementById("badgeMeanInfo").addEventListener("click", () => {
  makeAlert(`<p>Badges have different types and levels:<br></p>

  the number of stars describes the level of the milestone
  <div class="badge"><span>HTML</span>
    <ul>
      <li><i class="fa-solid fa-star"></i></li>
      <li><i class="fa-solid fa-star"></i></li>
    </ul>
  </div>
  The golden badge is acquired by unlocking related smaller milestones,<br> and leveling up with them
  <div class="badge golden"><span>WebDev</span>
    <ul>
      <li><i class="fa-solid fa-star"></i></li>
    </ul>
  </div>
<br>`);
});
