// we will create mixin to change behaviour of a class so we will create it
//mixins can be injected to class to change their behaviour
export const observerMixin = {
  observers: new Set(),
  addObserver(obs) {
    this.observers.push(obs);
  } ,
  removeObsever(obs) {
    this.observers.delete(obs);
  }
  ,
  notify() {
    this.observers.forEach(obs => obs());
  }
}
