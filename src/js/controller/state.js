let CourseListeners = [];
let CourseState = [];

export const CourseStore = () => {
  const state = () => CourseState;
  const setState = (list) => {
    CourseState = list;
    CourseListeners.forEach((item) => item());
  };
  const addListener = (listener) => CourseListeners.push(listener);

  return { setState, addListener, state };
};
