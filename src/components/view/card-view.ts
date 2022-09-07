import { CallbackHandlerType, ICard } from '../../types/viewTypes';
import BaseView from './base-view';

function createCardTemplate(data: ICard) {
  const { year, color, manufacturer, name, price, material, src, isAdded, id, amount } = data;

  return `<article class="card ${isAdded ? 'card--added' : ''}" id="${id}">
  <div class="card-wrapper">
    <img class="card__img" src="${src}" alt="couch picture">
    <div class="card__features">
      <p class="card-feature card-feature--year">Year - <span>${year}</span></p>
      <p class="card-feature card-feature--color">Color - <span class="card__color card__color--${color}"></span></p>
      <p class="card-feature card-feature--manufacturer">Manufacturer - <span>${manufacturer}</span></p>
      <p class="card-feature card-feature--material">Material - <span>${material}</span></p>
      <p class="card-feature card-feature--material">Amount - <span>${amount}</span></p>
      <div class="card__buttons-wrapper">
        <button class="card__btn card__btn--add" type="button"></button>
        <button class="card__btn card__btn--remove" type="button"></button>
      </div>
    </div>
  </div>
  <p class="card__info">
    <span>${name}</span>
    <span class="card__info--price">BYN <span>${price}</span></span>
  </p>
</article>`;
}

export default class CardView extends BaseView {
  private data: ICard;
  constructor(data: ICard) {
    super();
    this.data = data;
  }

  getTemplate(): string {
    return createCardTemplate(this.data);
  }

  setAddToCartHandler(callback: CallbackHandlerType) {
    this.element?.addEventListener('click', callback);
  }

  setRemoveFromCartHandler(callback: CallbackHandlerType) {
    this.element?.addEventListener('click', callback);
  }
}
