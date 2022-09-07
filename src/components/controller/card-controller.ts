import { ICard } from '../../types/viewTypes';
import { createElement, remove } from '../../utils/common';
import { render } from '../../utils/render';

import CardModel from '../model/card-model';
import CartModel from '../model/cart-model';

import CardView from '../view/card-view';
import CardListView from '../view/cards-list-view';

export default class CardController {
  private cardComponent: CardView | null = null;
  private cardsListContainer: CardListView | null;
  private cardModel: CardModel;
  private cartModel: CartModel;

  constructor(cardsListContainer: CardListView, cardModel: CardModel, cartModel: CartModel) {
    this.cardsListContainer = cardsListContainer;
    this.cardModel = cardModel;
    this.cartModel = cartModel;
  }

  init = (data: ICard) => {
    const prevComponent = this.cardComponent;
    this.cardComponent = new CardView(data);
    if (prevComponent) {
      remove(prevComponent);
    }
    render(this.cardComponent, this.cardsListContainer);
    this.setHandlers();
  };

  private setHandlers = () => {
    this.cardComponent?.setAddToCartHandler(this.handleAddToCart);
    this.cardComponent?.setRemoveFromCartHandler(this.handleRemoveFromCart);
  };

  private updateState = (id: string) => {
    this.cardModel.updateState(id);
  };

  private handleAddToCart = (evt: Event) => {
    const target = evt.target;
    const id = this.cardComponent?.element?.getAttribute('id');
    if (this.cardComponent?.element?.classList.contains('card--added')) return;
    if (!id) return;
    if (!(target instanceof HTMLElement && target.classList.contains('card__btn--add'))) return;
    if (this.cartModel.state === 20) {
      this.handleTypeMaxSlots();
      return;
    }
    this.cardComponent?.element?.classList.add('card--added');
    this.updateState(id);
    this.cartModel.add();
  };

  private handleRemoveFromCart = (evt: Event) => {
    const target = evt.target;
    const id = this.cardComponent?.element?.getAttribute('id');
    if (!this.cardComponent?.element?.classList.contains('card--added')) return;
    if (!id) return;
    if (!(target instanceof HTMLElement && target.classList.contains('card__btn--remove'))) return;
    this.cardComponent?.element?.classList.remove('card--added');
    this.updateState(id);
    this.cartModel.remove();
  };

  private handleTypeMaxSlots = () => {
    const element = createElement(`<div class='max-slots'>Maximum number of slots</div>`);
    this.cardsListContainer?.element?.insertAdjacentElement('afterbegin', element);
    setTimeout(() => this.cardsListContainer?.element?.firstElementChild?.remove(), 1000);
  };

  destroy() {
    remove(this.cardComponent);
  }
}
