import "/src/views/login/login.css";
import "/src/views/templates.js";
import "/src/js/firebase/Auth.js";
import { login } from "../firebase/Auth";

const loginForm = document.querySelector("#login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = loginForm["email"].value;
  const password = loginForm["password"].value;
  login(email, password);
});
