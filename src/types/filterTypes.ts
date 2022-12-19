export interface IMaterial {
  [key: string]: string;
  velour: string;
  'eco-leather': string;
  suede: string;
  matting: string;
  'genuin-leather': string;
  cloth: string;
  chenille: string;
}
export interface IColor {
  [key: string]: string;

  brown: string;
  blue: string;
  sand: string;
  green: string;
  grey: string;
  yellow: string;
  black: string;
}
export interface IManufacturer {
  [key: string]: string;
  vegas: string;
  involux: string;
  letto: string;
  krones: string;
}

export interface IPopular {
  [key: string]: string;
  popular: string;
}

export interface IFilterValue {
  manufacturer: IManufacturer;
  material: IMaterial;
  color: IColor;
  popular: IPopular;
}

export interface IMinMax {
  name: string;
  min: number;
  max: number;
  start: number;
  end: number;
}
export interface IFilterRange {
  price: IMinMax;
  amount: IMinMax;
  year: IMinMax;
}

export interface ISortType {
  'price-high': string;
  'price-low': string;
  'year-new': string;
  'year-old': string;
  'name-a-z': string;
  'name-z-a': string;
}
