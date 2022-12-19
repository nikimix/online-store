import { remove } from '../../utils/common';
import { render } from '../../utils/render';
import CartModel from '../model/cart-model';
import CartView from '../view/cart-view';
import NavView from '../view/nav-view';

export default class CartController {
  private cartComponent: CartView | null = null;
  private container: NavView;
  private cartModel: CartModel;

  constructor(container: NavView, cartModel: CartModel) {
    this.container = container;
    this.cartModel = cartModel;
    this.cartModel.addObserver(this.init);
  }

  init = () => {
    const prevComponent = this.cartComponent;
    this.cartComponent = new CartView(this.cartModel.state);

    if (prevComponent) {
      remove(prevComponent);
    }
    render(this.cartComponent, this.container);
  };
}
