let CourseListeners = [];
let CourseState = [];

let menuListeners = [];
let menuState = false;

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
