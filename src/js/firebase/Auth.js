import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { makeAlert } from "../../views/templates.js";
import { auth } from "./index.js";

// AuthState
onAuthStateChanged(auth, (user) => {
  if (!user) {
    if (
      window.location.pathname !== "/signup.html" &&
      window.location.pathname !== "/login.html" &&
      window.location.search.slice(0, 4) != "?id="
    )
      window.location = "./signup.html";
  } else if (
    window.location.pathname === "/signup.html" ||
    window.location.pathname === "/login.html"
  ) {
    window.location = "/";
  }
});

// Signup
const signupForm = document.querySelector("#signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const username = signupForm["username"].value;
    const email = signupForm["email"].value;
    const password = signupForm["password"].value;
    const repassword = signupForm["repassword"].value;

    if (repassword != password) {
      makeAlert("Password doesn't match");
    } else {
      createUserWithEmailAndPassword(auth, email, password).then((cred) => {
        const user = cred.user;
        updateProfile(user, {
          displayName: username,
        })
          .then(() => {
            console.log(`User:${username} created sucessfully`);
          })
          .catch((error) => {
            console.error(error);
          });
      });
    }
  });
}

// Login
const loginForm = document.querySelector("#login-form");
if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();
    const email = loginForm["email"].value;
    const password = loginForm["password"].value;
    signInWithEmailAndPassword(auth, email, password)
      .then((cred) => {})
      .catch((error) => {
        console.error(error);
      });
  });
}

const logoutButton = document.querySelector(".logout");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
