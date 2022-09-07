export default class Observable {
  private observers: Set<() => void> = new Set();
  addObserver(observer: () => void) {
    this.observers.add(observer);
  }

  removeObserver(observer: () => void) {
    this.observers.delete(observer);
  }

  _notify() {
    this.observers.forEach((observer) => observer());
  }
}
