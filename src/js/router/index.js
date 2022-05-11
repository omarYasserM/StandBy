export const route = {
  Home: "",
  Admin: "admin.html",
  Profile: "profile.html",
  SignUp: "signup.html",
  Categories: "categories.html",
  Login: "login.html",
};

export const routeTo = (route) => {
  window.location.pathname = route;
};
