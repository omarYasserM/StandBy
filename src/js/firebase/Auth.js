import {
  createUserWithEmailAndPassword,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  updateProfile,
} from "firebase/auth";
import { makeAlert } from "../../views/templates.js";
import { route, routeTo } from "../router/index.js";
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

/**
 * High level function used to sign up
 * @param  {String} email Email have to be unique and will be used as a Key.
 * @param  {String} password password have to be atleast 8 alphanumeric characters.
 * @param  {String} username Username of the user can be changed later.
 * @return {String} returns Error message if it fails, if it's success it redirect the page to home
 */
export const signUp = async (email, password, username) => {
  let err;
  await createUserWithEmailAndPassword(auth, email, password)
    .then(async (cred) => {
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
      routeTo(route.Home);
    })
    .catch((error) => {
      err = error;
    });
  return err;
};

/**
 * High level function used to Log in
 * @param  {String} email Email have to be unique and will be used as a Key.
 * @param  {String} password password have to be atleast 8 alphanumeric characters.
 * @return {<Promise>String} returns Error message if it fails, if it's success it redirect the page to home
 */
export const login = async (email, password) => {
  let err = "";
  await signInWithEmailAndPassword(auth, email, password)
    .then(() => routeTo(route.Home))
    .catch((error) => {
      err = error;
    });
  return err;
};

/**
 * High level function used to Log out
 * @return {<Promise>String} returns Error message if it fails, if it's success it redirect the page to SignUp
 */
export const logOut = async () => {
  let err;
  await signOut(auth)
    .then(() => {
      routeTo(route.SignUp);
    })
    .catch((error) => {
      err = error;
    });
  return err;
};
