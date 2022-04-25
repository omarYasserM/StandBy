export let CourseState = () => {
  let listeners = [];
  let state = [];
  const setState = (list) => {
    state = list;
    listeners.forEach((item) => item());
  };
  const addListener = (listener) => listeners.push(listener);

  return { setState, addListener, state };
};

let listeners = [];
export let state = [];
export const setState = (list) => {
  state = list;
  listeners.forEach((item) => item());
};
export const addListener = (listener) => listeners.push(listener);
