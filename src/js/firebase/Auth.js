import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { makeAlert } from "../../views/templates.js";
import router, { route, routeTo } from "../router/index.js";
import { editDoc } from "./Firestore.js";
import { auth } from "./index.js";

// AuthState
// onAuthStateChanged(auth, (user) => {
//   if (!user) {
//     if (
//       window.location.pathname !== "/signup.html" &&
//       window.location.pathname !== "/login.html" &&
//       window.location.search.slice(0, 4) != "?id="
//     )
//       window.location = "./signup.html";
//   } else if (
//     window.location.pathname === "/signup.html" ||
//     window.location.pathname === "/login.html"
//   ) {
//     window.location = "/";
//   }
// });

// Signup

export const signUp = async (email, password, username) => {
  await createUserWithEmailAndPassword(auth, email, password).then(
    async (cred) => {
      const user = cred.user;
      const data = {
        badges: [],
        info: {
          interests: "Add interests",
          location: "add location",
          username: username,
          email: cred.user.email,
        },
        notifications: ["Welcome to StandBy!"],
      };
      await editDoc("users", cred.user.uid, data);
      router(route.Home);
    }
  );
};

export const login = async (email, password) => {
  await signInWithEmailAndPassword(auth, email, password).catch((error) => {
    console.error(error);
  });
  routeTo(route.Home);
};

const logoutButton = document.querySelector("#logout-btn");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    signOut(auth)
      .then(() => {
        routeTo(route.SignUp);
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
