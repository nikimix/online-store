import BaseView from './base-view';

function createCardsBoardTemplate() {
  return `<div class="product__cards cards"></div>`;
}

export default class CardListView extends BaseView {
  getTemplate(): string {
    return createCardsBoardTemplate();
  }
}
