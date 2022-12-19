import BaseView from '../components/view/base-view';

export enum RenderPosition {
  AFTERBEGIN = 'afterbegin',
  BEFOREEND = 'beforeend',
}

export const render = (
  component: BaseView | Element | null,
  container: BaseView | Element | undefined | null,
  position: RenderPosition = RenderPosition.BEFOREEND
) => {
  if (container instanceof BaseView) {
    container = container.element;
  }
  if (component instanceof BaseView) {
    component = component.element;
  }
  switch (position) {
    case RenderPosition.AFTERBEGIN:
      if (container && component) container.prepend(component);
      break;
    case RenderPosition.BEFOREEND:
      if (container && component) container.append(component);
      break;
  }
};
