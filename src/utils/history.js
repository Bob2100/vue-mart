const History = {
  _history: [],
  install(Vue) {
    Object.defineProperty(Vue.prototype, '$routerHistory', {
      get() {
        return History;
      }
    });
  },
  push(path) {
    this._history.push(path);
  },
  pop(path) {
    this._history.pop(path);
  },
  canBack() {
    return this._history.length > 1;
  }
}

export default History;