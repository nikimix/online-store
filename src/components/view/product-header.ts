import { ISortType } from '../../types/filterTypes';
import { CallbackHandlerType } from '../../types/viewTypes';
import BaseView from './base-view';

function createProductHeaderTemplate(sortData: ISortType) {
  return `<div class="product-header">
      <hr class="product-header__break-line">
      <form class="product-header__sort sort">
        <label class="sort__label" for="sort">Sort by</label>
        <select class="sort__select" name="sort" id="sort">
          <option value="price-high"${sortData['price-high']}>price (highest)</option>
          <option value="price-low"${sortData['price-low']}>price (lowest)</option>
          <option value="year-new"${sortData['year-new']}>year (newest)</option>
          <option value="year-old"${sortData['year-old']}>year (oldest)</option>
          <option value="name-a-z"${sortData['name-a-z']}>name (a-z)</option>
          <option value="name-z-a"${sortData['name-z-a']}>name (z-a)</option>
        </select>
      </form>
    </div>`;
}

export default class ProductHeaderView extends BaseView {
  private sortData: ISortType;
  constructor(sortData: ISortType) {
    super();
    this.sortData = sortData;
  }
  getTemplate(): string {
    return createProductHeaderTemplate(this.sortData);
  }

  setHandleChangeSort = (callback: CallbackHandlerType) => {
    this.element?.addEventListener('change', callback);
  };
}
