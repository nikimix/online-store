import Observable from '../framework/observable';

export default class CartModel extends Observable {
  private _state: number;
  constructor(data: number) {
    super();
    this._state = data;
  }

  add = () => {
    if (this._state < 20) {
      this._state++;
      localStorage.setItem('cart-data', `${this._state}`);
      this._notify();
    }
  };

  remove = () => {
    if (this._state > 0) {
      this._state--;
      localStorage.setItem('cart-data', `${this._state}`);
      this._notify();
    }
  };

  get state() {
    const storage = localStorage.getItem('cart-data');
    if (storage) {
      this._state = +storage;
    }
    return this._state;
  }

  reset = () => {
    localStorage.clear();
    this._state = 0;
    this._notify();
  };
}
