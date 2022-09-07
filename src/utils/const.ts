enum FilterType {
  MANUFACTURER = 'manufacturer',
  MATERIAL = 'material',
  COLOR = 'color',
  PRICE = 'price',
  AMOUNT = 'amount',
  YEAR = 'year',
  POPUALR = 'popular',
  SEARCH = 'search',
}

enum SortType {
  PRICE_HIGH = 'price-high',
  PRICE_LOW = 'price-low',
  YEAR_NEW = 'year-new',
  YEAR_OLD = 'year-old',
  NAME_A_Z = 'name-a-z',
  NAME_Z_A = 'name-z-a',
}

enum KeysLocalStorage {
  VALUE_DATA = 'value-data',
  RANGE_DATA = 'range-data',
  SEARCH_DATA = 'search-data',
  CARD_DATA = 'card-data',
  SORT_DATA = 'sort-data',
  ALL_CARDS = 'all-cards',
}

export { FilterType, SortType, KeysLocalStorage };
