import { IFilterValue, IFilterRange } from '../../types/filterTypes';
import { getValueLocalStorage } from '../../utils/common';
import { KeysLocalStorage } from '../../utils/const';
import Observable from '../framework/observable';

export default class FilterModel extends Observable {
  private originalValue: string;
  private originalRange: string;
  private originalInput: string;
  private _valueData: IFilterValue;
  private _rangeData: IFilterRange;
  private _searchData: string;

  constructor(valueData: IFilterValue, rangeData: IFilterRange, searchData: string) {
    super();
    this.originalValue = JSON.stringify(valueData);
    this.originalRange = JSON.stringify(rangeData);
    this.originalInput = JSON.stringify(searchData);
    this._valueData = JSON.parse(this.originalValue);
    this._rangeData = JSON.parse(this.originalRange);
    this._searchData = JSON.parse(this.originalInput);
  }

  get valueData() {
    const storage = getValueLocalStorage(KeysLocalStorage.VALUE_DATA);
    if (storage) {
      this._valueData = storage;
    }
    return this._valueData;
  }
  get rangeData() {
    const storage = getValueLocalStorage(KeysLocalStorage.RANGE_DATA);
    if (storage) {
      this._rangeData = storage;
    }
    return this._rangeData;
  }
  get searchData() {
    const storage = getValueLocalStorage(KeysLocalStorage.SEARCH_DATA);
    if (storage) {
      this._searchData = storage;
    }
    return this._searchData;
  }

  writeToLocalStorage = (key: string, value: string) => {
    localStorage.setItem(key, value);
  };

  setValue = (type: keyof typeof this._valueData, value: string, state: string) => {
    this._valueData[type][value] = state;
    this.writeToLocalStorage(KeysLocalStorage.VALUE_DATA, JSON.stringify(this._valueData));
    this._notify();
  };

  setRange = (start: number, end: number, name: keyof typeof this._rangeData) => {
    this._rangeData[name].start = start;
    this._rangeData[name].end = end;
    this.writeToLocalStorage(KeysLocalStorage.RANGE_DATA, JSON.stringify(this._rangeData));
    this._notify();
  };

  setSearch = (value: string) => {
    this._searchData = value;
    this.writeToLocalStorage(KeysLocalStorage.SEARCH_DATA, JSON.stringify(this._searchData));
    this._notify();
  };

  private resetFilteLocalStorage = () => {
    this.writeToLocalStorage(KeysLocalStorage.SEARCH_DATA, '');
    this.writeToLocalStorage(KeysLocalStorage.RANGE_DATA, '');
    this.writeToLocalStorage(KeysLocalStorage.VALUE_DATA, '');
  };

  reset = () => {
    this.resetFilteLocalStorage();
    this._valueData = JSON.parse(this.originalValue);
    this._rangeData = JSON.parse(this.originalRange);
    this._searchData = JSON.parse(this.originalInput);
    this._notify();
  };
}
