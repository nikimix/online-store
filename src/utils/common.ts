import BaseView from '../components/view/base-view';
import { IMinMax } from '../types/filterTypes';
import noUiSlider from '../../node_modules/nouislider/dist/nouislider';

const createElement = (template: string): Element => {
  const element = document.createElement('template');
  element.innerHTML = template.trim();
  if (!(element.content.firstElementChild instanceof HTMLElement)) {
    throw new Error('Not a HTMLElement');
  }
  return element.content.firstElementChild;
};

const remove = (component: BaseView | null) => {
  if (component === null) {
    throw new Error('Component is null');
  }
  component?.element?.remove();
  component?.remove();
};

const createRangeSlider = (
  data: IMinMax,
  container: Element | null,
  callback: (unencoded: number[], name: string) => void
) => {
  if (container && container instanceof HTMLElement) {
    noUiSlider
      .create(container, {
        start: [data.start, data.end],
        connect: true,
        range: {
          min: data.min,
          max: data.max,
        },
        step: 1,
      })
      .on('slide', (_, handle, unencoded) => callback(unencoded, data.name));
  }
};

const getValueLocalStorage = (key: string) => {
  const value = localStorage.getItem(key);
  if (value) {
    return JSON.parse(value);
  }
  return null;
};
export { createElement, remove, createRangeSlider, getValueLocalStorage };
