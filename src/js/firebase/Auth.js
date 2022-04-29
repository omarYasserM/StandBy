import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { auth } from "./index.js";

// AuthState
onAuthStateChanged(auth, (user) => {
  if (!user) {
    if (window.location.pathname != "/signup.html")
      window.location = "./signup.html";
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

    createUserWithEmailAndPassword(auth, email, password).then((cred) => {
      const user = cred.user;
      updateProfile(user, {
        displayName: username,
      })
        .then(() => {
          console.log(`User:${username} created sucessfully`);
          window.location = "/";
        })
        .catch((error) => {
          console.error(error);
        });

      signupForm.reset();
    });
  });
}

// Login
const loginForm = document.querySelector("#login-Form");

if (loginForm) {
  loginForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = loginForm["email"].value;
    const password = loginForm["password"].value;
    signInWithEmailAndPassword(auth, email, password).then((cred) => {
      console.log(cred.user);
      loginForm.reset();
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
