import { ICard } from '../../types/viewTypes';
import { createRangeSlider, remove } from '../../utils/common';
import { FilterType } from '../../utils/const';
import { render, RenderPosition } from '../../utils/render';
import FilterModel from '../model/filter-model';
import FilterView from '../view/filter-view';
import MainView from '../view/main-view';

export default class FilterController {
  private filterComponent: FilterView | null = null;
  private filterModel: FilterModel;
  private container: MainView;
  private priceFields: NodeListOf<Element> | null = null;
  private amountFields: NodeListOf<Element> | null = null;
  private yearFields: NodeListOf<Element> | null = null;

  constructor(container: MainView, filterModel: FilterModel) {
    this.container = container;
    this.filterModel = filterModel;
    this.filterModel.addObserver(this.updateRangeFields);
  }

  init = () => {
    const prevComponent = this.filterComponent;
    this.filterComponent = new FilterView(
      this.filterModel.valueData,
      this.filterModel.rangeData,
      this.filterModel.searchData
    );
    if (prevComponent) {
      remove(prevComponent);
    }
    this.renderFilter();
    this.setHandlers();
  };

  private renderFilter = () => {
    const data = this.filterModel.rangeData;
    if (this.container) {
      render(this.filterComponent, this.container, RenderPosition.AFTERBEGIN);
    }
    createRangeSlider(data.price, document.querySelector('.range-slider--price'), this.handleTypeUpdate);
    createRangeSlider(data.amount, document.querySelector('.range-slider--amount'), this.handleTypeUpdate);
    createRangeSlider(data.year, document.querySelector('.range-slider--year'), this.handleTypeUpdate);
    this.priceFields = document.querySelectorAll('.price__value');
    this.amountFields = document.querySelectorAll('.amount__value');
    this.yearFields = document.querySelectorAll('.year__value');
  };

  private updateRangeFields = () => {
    if (this.priceFields?.length) {
      this.priceFields[0].textContent = `${this.filterModel.rangeData.price.start} Br`;
      this.priceFields[1].textContent = `${this.filterModel.rangeData.price.end} Br`;
    }
    if (this.amountFields?.length) {
      this.amountFields[0].textContent = `${this.filterModel.rangeData.amount.start}`;
      this.amountFields[1].textContent = `${this.filterModel.rangeData.amount.end}`;
    }
    if (this.yearFields?.length) {
      this.yearFields[0].textContent = `${this.filterModel.rangeData.year.start}`;
      this.yearFields[1].textContent = `${this.filterModel.rangeData.year.end}`;
    }
  };

  private setHandlers = () => {
    this.filterComponent?.setFilterTypeChangeHandler(this.handleTypeChange);
    this.filterComponent?.setFilterTypeInputHandler(this.handleTypeInput);
    this.filterComponent?.setFilterTypeResetHandler(this.handleFilterTypeReset);
  };

  getFilteredData = (cards: ICard[]) => {
    cards = this.filtrateByInput(cards);
    cards = this.filtrateByRange(cards);
    cards = this.filtrateByValue(cards);
    return cards;
  };

  private filtrateByInput = (cards: ICard[]) => {
    const value = this.filterModel.searchData;
    if (value.length > 0) {
      return cards.filter((card) => card.name.includes(value));
    }
    return cards;
  };

  private filtrateByValue = (cards: ICard[]) => {
    const type = this.filterModel.valueData;
    if (JSON.stringify(type.manufacturer).includes('checked')) {
      cards = cards.filter((card) => type.manufacturer[card.manufacturer] === 'checked');
    }
    if (JSON.stringify(type.material).includes('checked')) {
      cards = cards.filter((card) => type.material[card.material] === 'checked');
    }
    if (JSON.stringify(type.color).includes('checked')) {
      cards = cards.filter((card) => type.color[card.color] === 'checked');
    }
    if (JSON.stringify(type.popular).includes('checked')) {
      cards = cards.filter((card) => type.popular.popular === 'checked' && card.popular === true);
    }
    return cards;
  };

  private filtrateByRange = (cards: ICard[]) => {
    const range = this.filterModel.rangeData;
    cards = cards.filter((card) => card.price >= range.price.start && card.price <= range.price.end);
    cards = cards.filter((card) => card.amount >= range.amount.start && card.amount <= range.amount.end);
    cards = cards.filter((card) => card.year >= range.year.start && card.year <= range.year.end);
    return cards;
  };

  private handleTypeChange = (evt: Event) => {
    const target = evt.target;
    const data = this.filterModel.valueData;
    if (target instanceof HTMLInputElement) {
      const state: boolean = target.checked;
      const value: string = target.name;
      switch (true) {
        case value in data.material:
          this.filterModel.setValue(FilterType.MATERIAL, value, `${state ? 'checked' : ''}`);
          break;
        case value in data.manufacturer:
          this.filterModel.setValue(FilterType.MANUFACTURER, value, `${state ? 'checked' : ''}`);
          break;
        case value in data.color:
          this.filterModel.setValue(FilterType.COLOR, value, `${state ? 'checked' : ''}`);
          break;
        case value in data.popular:
          this.filterModel.setValue(FilterType.POPUALR, value, `${state ? 'checked' : ''}`);
          break;
      }
    }
  };

  private handleTypeUpdate = (unencoded: number[], type: string) => {
    const start = +unencoded[0].toFixed();
    const end = +unencoded[1].toFixed();
    switch (type) {
      case FilterType.PRICE:
        this.filterModel.setRange(start, end, type);
        break;
      case FilterType.AMOUNT:
        this.filterModel.setRange(start, end, type);
        break;
      case FilterType.YEAR:
        this.filterModel.setRange(start, end, type);
        break;
    }
  };

  private handleTypeInput = (evt: Event) => {
    const target = evt.target;
    if (target instanceof HTMLInputElement && target.type === 'search') {
      this.filterModel.setSearch(target.value);
    }
  };

  private handleFilterTypeReset = () => {
    this.filterModel.reset();
    this.init();
  };
}
