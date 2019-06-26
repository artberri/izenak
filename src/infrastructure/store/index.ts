import { Store } from 'vuex';
import { getModule } from 'vuex-module-decorators';

import FilterStore from './modules/filter.store';

let filterStore: FilterStore;

function initialiseStores(store: Store<any>): void {
  filterStore = getModule(FilterStore, store);
}

export {
  initialiseStores,
  filterStore,
  FilterStore,
};
