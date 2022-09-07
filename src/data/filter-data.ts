import { IFilterRange, IFilterValue } from '../types/filterTypes';

export const filterRangeData: IFilterRange = {
  price: {
    name: 'price',
    min: 0,
    max: 10000,
    start: 0,
    end: 10000,
  },
  amount: {
    name: 'amount',
    min: 0,
    max: 15,
    start: 0,
    end: 15,
  },
  year: {
    name: 'year',
    min: 2000,
    max: 2022,
    start: 2000,
    end: 2022,
  },
};

export const filterValueData: IFilterValue = {
  manufacturer: {
    vegas: '',
    involux: '',
    letto: '',
    krones: '',
  },
  material: {
    velour: '',
    'eco-leather': '',
    suede: '',
    matting: '',
    'genuin-leather': '',
    cloth: '',
    chenille: '',
  },
  color: {
    brown: '',
    blue: '',
    sand: '',
    green: '',
    grey: '',
    yellow: '',
    black: '',
  },
  popular: {
    popular: '',
  },
};

export const sortData = {
  'price-high': 'selected',
  'price-low': '',
  'year-new': '',
  'year-old': '',
  'name-a-z': '',
  'name-z-a': '',
};
