import { ICard } from '../../types/viewTypes';
import Observable from '../framework/observable';
import { KeysLocalStorage } from '../../utils/const';
import { getValueLocalStorage } from '../../utils/common';
import { ISortType } from '../../types/filterTypes';
import { sortData } from '../../data/filter-data';

export default class CardModel extends Observable {
  private original: string;
  private originalSortData: string = JSON.stringify(sortData);
  private _cardsData: ICard[];
  private _sortData: ISortType;
  constructor(data: ICard[]) {
    super();
    this.original = JSON.stringify(data);
    this._cardsData = JSON.parse(this.original);
    this._sortData = JSON.parse(this.originalSortData);
  }

  set cardsData(value: ICard[]) {
    localStorage.setItem(KeysLocalStorage.CARD_DATA, JSON.stringify(value));
    this._cardsData = value;
    this._notify();
  }

  get cardsData() {
    const storage = localStorage.getItem(KeysLocalStorage.CARD_DATA);
    if (storage) {
      return JSON.parse(storage);
    }
    const copy = JSON.stringify(this._cardsData);
    return JSON.parse(copy);
  }

  updateState = (id: string) => {
    const storage = localStorage.getItem(KeysLocalStorage.CARD_DATA);
    if (storage) {
      this._cardsData = JSON.parse(storage);
    }
    this._cardsData.forEach((card) => {
      if (card.id == id) {
        card.isAdded = card.isAdded ? false : true;
      }
    });
    localStorage.setItem(KeysLocalStorage.CARD_DATA, JSON.stringify(this._cardsData));
  };

  updateSortData = (type: string) => {
    Object.keys(this._sortData).forEach((key) => {
      if (key in this._sortData) {
        this._sortData[key as keyof typeof this._sortData] = key === type ? 'selected' : '';
      }
    });
    localStorage.setItem('sort-data', JSON.stringify(this._sortData));
    this._notify();
  };

  getSortType = () => {
    let sortType = '';
    Object.entries(this._sortData).forEach(([key, value]) => {
      if (value === 'selected') {
        sortType = key;
      }
    });
    return sortType;
  };

  get sortData() {
    const storage = localStorage.getItem(KeysLocalStorage.SORT_DATA);
    if (storage) {
      this._sortData = getValueLocalStorage(KeysLocalStorage.SORT_DATA);
    }
    return this._sortData;
  }

  reset = () => {
    localStorage.clear();
    this._cardsData = JSON.parse(this.original);
    this._sortData = JSON.parse(this.originalSortData);
    this._notify();
  };
}
