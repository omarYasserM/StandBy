// AuthState
auth.onAuthStateChanged((user) => {
  if (user) {
    if (window.location.pathname != "/views/categories.html")
      window.location = "categories.html";
  } else {
    if (window.location.pathname != "/views/signUp.html")
      window.location = "signUp.html";
  }
});

// Signup
const signupForm = document.querySelector("#signup-form");

if (signupForm) {
  signupForm.addEventListener("submit", (e) => {
    e.preventDefault();

    const email = signupForm["email"].value;
    const password = signupForm["password"].value;

    auth.createUserWithEmailAndPassword(email, password).then((cred) => {
      const user = cred.user;
      user
        .updateProfile({
          displayName: username,
        })
        .then(() => {
          console.log(`User:${username} created sucessfully`);
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

    auth.signInWithEmailAndPassword(email, password).then((cred) => {
      console.log(cred.user);
      loginForm.reset();
    });
  });
}

const logoutButton = document.querySelector(".logout");
if (logoutButton) {
  logoutButton.addEventListener("click", (e) => {
    e.preventDefault();
    firebase
      .auth()
      .signOut()
      .then(() => {
        console.log("signed out");
      })
      .catch((error) => {
        console.log(error);
      });
  });
}
