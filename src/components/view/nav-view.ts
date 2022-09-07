import BaseView from './base-view';

function createNavTemplate() {
  return `<nav class="nav wrapper">
  <a href="#">
    <img src="assets/images/logo.svg" alt="logo Comfy Sloth" width="175">
  </a>
  <ul class="nav__list">
    <li class="nav__item">
      <a class="nav__link" href="#">Home</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">About</a>
    </li>
    <li class="nav__item">
      <a class="nav__link" href="#">Products</a>
    </li>
  </ul>
  </nav>`;
}

export default class NavView extends BaseView {
  getTemplate(): string {
    return createNavTemplate();
  }
}
