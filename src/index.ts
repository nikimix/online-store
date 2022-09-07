import './index.scss';
import '../node_modules/nouislider/dist/nouislider.css';

import cardsData from './data/cards-data';
import { filterValueData, filterRangeData } from './data/filter-data';

import CardsModel from './components/model/card-model';
import FilterModel from './components/model/filter-model';
import CartModel from './components/model/cart-model';

import Store from './components/controller/store-controller';

const storeComponent = new Store(
  new CardsModel(cardsData),
  new FilterModel(filterValueData, filterRangeData, ''),
  new CartModel(0)
);
storeComponent.init();
