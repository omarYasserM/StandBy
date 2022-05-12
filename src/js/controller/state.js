export class Store {
  state;
  listeners = [];
  constructor(initialState) {
    this.state = initialState;
    this.listeners = [];
  }

  setState = (state) => {
    this.state = state;
    this.listeners.forEach((listener) => listener());
  };

  addListener = (listener) => this.listeners.push(listener);
}
