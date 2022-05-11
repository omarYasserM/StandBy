import "/src/views/signup/signUp.css";
import "/src/views/templates.js";
import "../firebase/Auth.js";
import { signUp } from "../firebase/Auth.js";

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
      signUp(email, password, username).then((s) => alert(s));
    }
  });
}
