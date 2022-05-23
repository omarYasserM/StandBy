export const route = {
  Home: "",
  Admin: "admin.html",
  Profile: "profile.html",
  SignUp: "signup.html",
  Categories: "categories.html",
  Login: "login.html",
};

/**
 * A function to control navigation logic
 * @param {route} route where you want to navigate
 */
export const routeTo = (route) => {
  window.location.pathname = `StandBy/${route}`;
};
