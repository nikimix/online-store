import BaseView from './base-view';

function createNoCardsTemplate() {
  return `<p class="no-cards">Sorry, there are no products with these characteristics :(</p>`;
}

export default class NoCardsView extends BaseView {
  getTemplate() {
    return createNoCardsTemplate();
  }
}
