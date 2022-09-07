import { remove } from '../../utils/common';
import { SortType } from '../../utils/const';
import { render, RenderPosition } from '../../utils/render';
import { ICard } from '../../types/viewTypes';

import HeaderView from '../view/header-view';
import MainView from '../view/main-view';
import ProductHeaderView from '../view/product-header';
import CardListView from '../view/cards-list-view';
import NoCardsView from '../view/no-cards-view';

import CardModel from '../model/card-model';
import CartModel from '../model/cart-model';
import FilterModel from '../model/filter-model';

import CardController from './card-controller';
import CartController from './cart-controller';
import FilterController from './filter-controller';

import NavView from '../view/nav-view';
import ProductView from '../view/product-view';
import MainContnetView from '../view/content-view';
import BtnResetSettingsView from '../view/btn-reset-settings';
import FooterView from '../view/footer-view';

export default class Store {
  private cardModel: CardModel;
  private cartModel: CartModel;
  private filterModel: FilterModel;

  private headerComponent = new HeaderView();
  private navComponent = new NavView();
  private mainComponent = new MainView();
  private mainContentComponent = new MainContnetView();
  private productComponent = new ProductView();
  private productHeaderComponent: ProductHeaderView | null = null;
  private cardsListComponent = new CardListView();
  private footerComponent = new FooterView();
  private btnResetSettings = new BtnResetSettingsView();
  private noCardsComponent: NoCardsView | null = null;

  private cardController: Map<string, CardController> = new Map();
  private cartController: CartController | null = null;
  private filterController: FilterController | null = null;

  constructor(cardModel: CardModel, filterModel: FilterModel, cartModel: CartModel) {
    this.cardModel = cardModel;
    this.filterModel = filterModel;
    this.cartModel = cartModel;
    this.productHeaderComponent = new ProductHeaderView(this.cardModel.sortData);

    this.filterModel.addObserver(this.renderCards);
    this.cardModel.addObserver(this.renderCards);
  }

  init = () => {
    this.renderStore();
    this.productHeaderComponent?.setHandleChangeSort(this.handleSortTypeChange);
    this.btnResetSettings.setFilterTypeResetSettingsHandler(this.handleTypeResetSettings);
  };

  private renderStore = () => {
    render(this.headerComponent, document.body);
    render(this.navComponent, this.headerComponent);
    this.cartController = new CartController(this.navComponent, this.cartModel);
    this.cartController?.init();
    render(this.mainComponent, document.body);
    render(this.mainContentComponent, this.mainComponent);
    this.filterController = new FilterController(this.mainContentComponent, this.filterModel);
    this.filterController.init();
    render(this.btnResetSettings, this.productHeaderComponent, RenderPosition.AFTERBEGIN);
    render(this.productComponent, this.mainContentComponent);
    render(this.productHeaderComponent, this.productComponent);
    render(this.cardsListComponent, this.productComponent);
    this.renderCards();
    render(this.footerComponent, document.body);
  };

  private getFilteredCards = () => {
    const cards = this.filterController?.getFilteredData(this.cardModel.cardsData);
    if (!cards) throw new Error();
    return cards;
  };

  private clearCardsList = () => {
    this.cardController.forEach((controller) => controller.destroy());
    this.cardController.clear();
    if (this.noCardsComponent) {
      remove(this.noCardsComponent);
    }
  };

  private renderCard = (data: ICard) => {
    const cardController = new CardController(this.cardsListComponent, this.cardModel, this.cartModel);
    cardController.init(data);
    this.cardController.set(data.id, cardController);
  };

  private renderCards = () => {
    const cardsData = this.getFilteredCards();
    this.sortCards(this.cardModel.getSortType(), cardsData);
    if (!cardsData?.length) {
      this.clearCardsList();
      this.renderNoCards();
      return;
    }
    this.clearCardsList();
    cardsData.forEach((card) => this.renderCard(card));
  };

  private sortCards = (type: string, data: ICard[]) => {
    switch (type) {
      case SortType.PRICE_HIGH:
        data.sort((a, b) => b.price - a.price);
        break;
      case SortType.PRICE_LOW:
        data.sort((a, b) => a.price - b.price);
        break;
      case SortType.YEAR_NEW:
        data.sort((a, b) => b.year - a.year);
        break;
      case SortType.YEAR_OLD:
        data.sort((a, b) => a.year - b.year);
        break;
      case SortType.NAME_A_Z:
        data.sort((a, b) => (b.name > a.name ? -1 : 1));
        break;
      case SortType.NAME_Z_A:
        data.sort((a, b) => (b.name > a.name ? 1 : -1));
        break;
    }
  };

  private handleSortTypeChange = (evt: Event) => {
    const target = evt.target;
    if (target instanceof HTMLSelectElement && target.value) {
      this.sortCards(target.value, this.cardModel.cardsData);
      this.cardModel.updateSortData(target.value);
    }
  };

  private renderNoCards = () => {
    this.noCardsComponent = new NoCardsView();
    render(this.noCardsComponent, this.cardsListComponent);
  };

  private resetProductHeader = () => {
    remove(this.productHeaderComponent);
    this.productHeaderComponent = new ProductHeaderView(this.cardModel.sortData);
    render(this.productHeaderComponent, this.productComponent, RenderPosition.AFTERBEGIN);
    render(this.btnResetSettings, this.productHeaderComponent, RenderPosition.AFTERBEGIN);
    this.productHeaderComponent?.setHandleChangeSort(this.handleSortTypeChange);
  };

  private handleTypeResetSettings = (evt: Event) => {
    const target = evt.target;
    if (target instanceof HTMLElement && target.classList.contains('btn-reset--settings')) {
      localStorage.clear();
      this.clearCardsList();
      this.filterModel.reset();
      this.cartModel.reset();
      this.cardModel.reset();
      this.resetProductHeader();
      this.filterController?.init();
    }
  };
}
