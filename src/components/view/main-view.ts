import BaseView from './base-view';

function createMainTemplate() {
  return `<main>
      <h1 class="main-title">Couch of your dream</h1>
    </main>`;
}

export default class MainView extends BaseView {
  getTemplate(): string {
    return createMainTemplate();
  }
}
