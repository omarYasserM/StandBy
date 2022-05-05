import "../../views/profile/profile.css";
import "../../views/templates.js";
import "../firebase/Auth.js";
import { makeAlert } from "../../views/templates.js";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";
import { editDoc, getUserData } from "../firebase/Firestore";
import { UserStore } from "./state";

let wantedUser = window.location.search.slice(4, window.location.search.length);

onAuthStateChanged(auth, (user) => {
  if (user) {
    if (wantedUser != "" && wantedUser != user.uid) {
      preventControl();
    }
    if (wantedUser == "") wantedUser = user.uid;
  } else {
    document.getElementById("auth-btn").innerText = "Log in";
    document.getElementById("auth-btn").addEventListener("click", () => {
      window.location.href = "/login.html";
    });
    preventControl();
  }

  document.getElementById("share-btn").addEventListener("click", () => {
    navigator.clipboard.writeText(
      `${window.location.host}/profile.html?id=${wantedUser}`
    );
    makeAlert("Copied Profile URL");
  });
  getUserData(wantedUser).then((userData) => {
    console.log(userData);
    UserStore().setState({
      ...userData,
      uid: wantedUser,
    });
    selectSection("overview");
  });
});

let selectedAll = false;
const sectionNames = ["overview", "favorites", "notifications", "loader"];
const sections = document.getElementsByTagName("section");
let secNumber = sections.length;

const selectSection = (sectionName) => {
  var i = 0;
  while (i < secNumber) {
    sections[i].style.display = "none";
    sections[i].style.position = "absolute";
    i++;
  }
  sections[sectionNames.indexOf(sectionName)].style.display = "flex";
  sections[sectionNames.indexOf(sectionName)].style.position = "static";
};
selectSection("loader");

sectionNames.forEach((sectionName) => {
  if (document.getElementById(sectionName) != null)
    document
      .getElementById(sectionName)
      .addEventListener("click", () => selectSection(sectionName));
});

const badges = document.getElementById("badges");
const infoForm = document.getElementById("info_form");
const mapBadges = () => {
  UserStore()
    .state()
    .badges.forEach((item) => {
      let badge = document.createElement("div");
      badge.className = `badge ${item.golden ? "golden" : ""}`;
      badge.innerHTML = `
      <span>${item.title}</span>
        <ul>
          ${'<li><i class="fa-solid fa-star"></i></li>'.repeat(item.stars)}
        </ul>    
      `;
      badges.appendChild(badge);
    });
};
const mapInfo = () => {
  infoForm["UserName"].value = UserStore().state().info.username;
  infoForm["Interests"].value = UserStore().state().info.interests;
  infoForm["Location"].value = UserStore().state().info.location;
  document.getElementById("formEmail").innerHTML =
    UserStore().state().info.email;
};
const mapNotifications = () => {
  const list = document.getElementById("notificationsList");
  var i = 0;
  list.innerHTML = "";
  UserStore()
    .state()
    .notifications.forEach((item) => {
      let notification = document.createElement("li");
      notification.innerHTML = `
        <div class="notification">
          <input type="checkbox" name="selected" id="n${i++}" value="${item}">
          <span>${item}</span>
        </div>`;
      list.appendChild(notification);
    });
};
UserStore().addListener(mapBadges);
UserStore().addListener(mapInfo);
UserStore().addListener(mapNotifications);

const selectAll = () => {
  const tmp = UserStore().state().notifications.length;
  for (let i = 0; i < tmp; i++) {
    if (selectedAll) {
      document.getElementById("n" + i).checked = false;
    } else {
      document.getElementById("n" + i).checked = true;
    }
  }
  selectedAll = !selectedAll;
};

const deleteAll = () => {
  let newList = [];
  const tmp = UserStore().state().notifications.length;
  for (let i = 0; i < tmp; i++) {
    if (!document.getElementById("n" + i).checked) {
      newList.push(document.getElementById("n" + i).value);
    }
  }
  editDoc("users", UserStore().state().uid, {
    badges: UserStore().state().badges,
    info: {
      interests: UserStore().state().info.interests,
      location: UserStore().state().info.location,
    },
    notifications: newList,
  }).then(() => {
    makeAlert(`Deleted ${tmp - newList.length} Notifications`);
    UserStore().setState({ ...UserStore().state(), notifications: newList });
  });
};
document.getElementById("selectall-btn").addEventListener("click", selectAll);
document.getElementById("delete-btn").addEventListener("click", deleteAll);
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

infoForm.addEventListener("submit", (e) => {
  e.preventDefault();
  editInfo();
});

const editInfo = () => {
  editDoc("users", UserStore().state().uid, {
    notifications: UserStore().state().notifications,
    badges: UserStore().state().badges,
    info: {
      interests: infoForm["Interests"].value,
      location: infoForm["Location"].value,
      username: infoForm["UserName"].value,
      email: UserStore().state().info.email,
    },
  })
    .then(() => {
      makeAlert("Profile updated");
    })
    .catch(() => {
      makeAlert("Error accured");
      mapInfo();
    });
};

const preventControl = () => {
  document.getElementById("notifications").style.display = "none";
  infoForm["Interests"].disabled = true;
  infoForm["Location"].disabled = true;
  infoForm["UserName"].disabled = true;
  infoForm["btn"].style.display = "none";
};
