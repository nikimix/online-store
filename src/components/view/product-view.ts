import BaseView from './base-view';

function createProductTemplate() {
  return `<section class="product"></section>`;
}

export default class ProductView extends BaseView {
  getTemplate(): string {
    return createProductTemplate();
  }
}
