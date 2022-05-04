let CourseListeners = [];
let CourseState = [];

let menuListeners = [];
let menuState = false;

let userListeners = [];
let userState = null;

export const MenuStore = () => {
  const state = () => menuState;
  const setState = (isOpen) => {
    menuState = isOpen;
    menuListeners.forEach((item) => item());
  };
  const addListener = (listener) => menuListeners.push(listener);

  return { setState, addListener, state };
};

export const CourseStore = () => {
  const state = () => CourseState;
  const setState = (list) => {
    CourseState = list;
    CourseListeners.forEach((item) => item());
  };
  const addListener = (listener) => CourseListeners.push(listener);

  return { setState, addListener, state };
};

export const UserStore = () => {
  const state = () => userState;
  const setState = (user) => {
    userState = user;
    userListeners.forEach((item) => item());
  };
  const addListener = (listener) => userListeners.push(listener);

  return { setState, addListener, state };
};
