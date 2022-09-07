import BaseView from './base-view';

function createMainContentTemplate() {
  return `<div class="content-wrapper wrapper"></div>`;
}

export default class MainContnetView extends BaseView {
  getTemplate(): string {
    return createMainContentTemplate();
  }
}
