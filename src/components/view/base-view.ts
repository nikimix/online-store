import { createElement } from '../../utils/common';

export default abstract class BaseView {
  protected _element: Element | null = null;

  abstract getTemplate(): string;

  get element(): Element | null {
    if (!this._element) {
      this._element = createElement(this.getTemplate());
    }
    return this._element;
  }

  remove() {
    this._element = null;
  }
}
