export class ScrollObserver {
  constructor() {
    this.listeners = [];
  }

  subscribe(listener) {
    this.listeners.push(listener);
  }

  unsubscribe(listener) {
    this.listeners = this.listeners.filter((l) => l !== listener);
  }

  notify(isScrolled) {
    this.listeners.forEach((listener) => {
      listener(isScrolled);
    });
  }
}
