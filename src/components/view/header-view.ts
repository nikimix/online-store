import BaseView from '../view/base-view';

function createHeaderTemplate() {
  return `<header></header>`;
}

export default class HeaderView extends BaseView {
  getTemplate(): string {
    return createHeaderTemplate();
  }
}
