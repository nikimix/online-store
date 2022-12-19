import { CallbackHandlerType } from '../../types/viewTypes';
import { IFilterRange, IFilterValue } from '../../types/filterTypes';
import BaseView from './base-view';

function createFilterTemplate(valueData: IFilterValue, rangeData: IFilterRange, inputData: string) {
  return `<form class="filter">
    <input class="input-search" type="search" placeholder="Search" autofocus value="${inputData}">

    <fieldset class="manufacturer fieldset">
    <legend class="legend">Manufacturer</legend>
    <input class="input" type="checkbox" id="involux" name="involux" ${valueData.manufacturer.involux}>
    <label class="label manufacturer__label" for="involux">Involux</label>
    <input class="input" type="checkbox" id="letto" name="letto" ${valueData.manufacturer.letto}>
    <label class="label manufacturer__label" for="letto">Letto</label>
    <input class="input" type="checkbox" id="vegas" name="vegas" ${valueData.manufacturer.vegas}>
    <label class="label manufacturer__label" for="vegas">Vegas</label>
    <input class="input" type="checkbox" id="krones" name="krones" ${valueData.manufacturer.krones}>
    <label class="label manufacturer__label" for="krones">Krones</label>
  </fieldset>

    <fieldset class="material fieldset">
      <legend class="legend">Material</legend>
      <input class="input" type="checkbox" id="velour" name="velour" data-ref="material" ${valueData.material.velour}>
      <label class="label material__label" for="velour">Velour</label>
      <input class="input" type="checkbox" id="eco-leather" name="eco-leather" ${valueData.material['eco-leather']}>
      <label class="label material__label" for="eco-leather">Eco-leather</label>
      <input class="input" type="checkbox" id="suede" name="suede" ${valueData.material.suede}>
      <label class="label material__label" for="suede">Suede</label>
      <input class="input" type="checkbox" id="matting" name="matting" ${valueData.material.matting}>
      <label class="label material__label" for="matting">Matting</label>
      <input class="input" type="checkbox" id="genuin-leather" name="genuin-leather" ${valueData.material['genuin-leather']}>
      <label class="label material__label" for="genuin-leather">Genuin-leather</label>
      <input class="input" type="checkbox" id="cloth" name="cloth" ${valueData.material.cloth}>
      <label class="label material__label" for="cloth">Cloth</label>
      <input class="input" type="checkbox" id="chenille" name="chenille" ${valueData.material.chenille}>
      <label class="label material__label" for="chenille">Chenille</label>
    </fieldset>
  
    <fieldset class="color fieldset">
      <legend class="legend">Color</legend>
      <div class="color__filters-wrapper">
        <input class="input" type="checkbox" id="brown" name="brown" ${valueData.color.brown}>
        <label class="label color__label color__label--brown" for="brown"></label>
  
        <input class="input" type="checkbox" id="blue" name="blue" ${valueData.color.blue}>
        <label class="label color__label color__label--blue" for="blue"></label>
  
        <input class="input" type="checkbox" id="sand" name="sand" ${valueData.color.sand}>
        <label class="label color__label color__label--sand" for="sand"></label>
  
        <input class="input" type="checkbox" id="green" name="green" ${valueData.color.green}>
        <label class="label color__label color__label--green" for="green"></label>
  
        <input class="input" type="checkbox" id="grey" name="grey" ${valueData.color.grey}>
        <label class="label color__label color__label--grey" for="grey"></label>
  
        <input class="input" type="checkbox" id="yellow" name="yellow" ${valueData.color.yellow}>
        <label class="label color__label color__label--yellow" for="yellow"></label>
  
        <input class="input" type="checkbox" id="black" name="black" ${valueData.color.black}>
        <label class="label color__label color__label--black" for="black"></label>
      </div>
    </fieldset>

    <fieldset class="filter__range price fieldset">
      <legend class="legend">Price</legend>
      <div class="price__range-wrapper"> 
        <div class="value-wrapper">
          <p class="price__value price__value--min value">${rangeData.price.start} Br</p>
          <p class="price__value price__value--max value">${rangeData.price.end} Br</p>
        </div>
        <div class="range-slider range-slider--price"></div>
      </div>
    </fieldset>

    <fieldset class="filter__range amount fieldset">
      <legend class="legend">Amount</legend>
      <div class="amount__range-wrapper"> 
        <div class="value-wrapper">
          <p class="amount__value amount__value--min value">${rangeData.amount.start}</p>
          <p class="amount__value amount__value--max value">${rangeData.amount.end}</p>
        </div>
        <div class="range-slider range-slider--amount"></div>
      </div>  
    </fieldset>

    <fieldset class="filter__range year fieldset">
      <legend class="legend">Year</legend>
      <div class="year__range-wrapper"> 
        <div class="value-wrapper">
          <p class="year__value year__value--min value">${rangeData.year.start}</p>
          <p class="year__value year__value--max value">${rangeData.year.end}</p>
        </div>
        <div class="range-slider range-slider--year"></div>
      </div>
    </fieldset>

    <fieldset class="popular fieldset">
      <label class="popular__label" for="popular">Popular</label>
      <input class="popular__input" id="popular" type="checkbox" name="popular" ${valueData.popular.popular}>
    </fieldset>
  
    <button class="btn-reset" type="reset">Reset filters</button>
  </form>`;
}

export default class FilterView extends BaseView {
  private valueData: IFilterValue;
  private rangeData: IFilterRange;
  private inputData: string;

  constructor(valueData: IFilterValue, rangeData: IFilterRange, inputData: string) {
    super();
    this.valueData = valueData;
    this.rangeData = rangeData;
    this.inputData = inputData;
  }

  getTemplate = () => {
    return createFilterTemplate(this.valueData, this.rangeData, this.inputData);
  };
  setFilterTypeInputHandler = (callback: CallbackHandlerType) => {
    this.element?.addEventListener('input', callback);
  };
  setFilterTypeChangeHandler = (callback: CallbackHandlerType) => {
    this.element?.addEventListener('change', callback);
  };
  setFilterTypeUpdateHandler = (callback: CallbackHandlerType) => {
    this.element?.addEventListener('update', callback);
  };
  setFilterTypeResetHandler = (callback: CallbackHandlerType) => {
    this.element?.addEventListener('reset', callback);
  };
}
