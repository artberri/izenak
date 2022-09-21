import Vue from 'vue';
import Vuex from 'vuex';
import VuexPersistence from 'vuex-persist';
import { getModule } from 'vuex-module-decorators';

import FilterStore from './modules/filter.store';
import FavouritesStore from './modules/favourites.store';

let filterStore: FilterStore;
let favouritesStore: FavouritesStore;

Vue.use(Vuex);

const vuexLocal = new VuexPersistence({
  key: 'izenak',
  storage: window.localStorage,
  reducer: (state: any) => ({ favourites: state.favourites }),
});

const store = new Vuex.Store({
  strict: true,
  modules: {
    filter: FilterStore,
    favourites: FavouritesStore,
  },
  plugins: [vuexLocal.plugin],
});

filterStore = getModule(FilterStore, store);
favouritesStore = getModule(FavouritesStore, store);

export {
  filterStore,
  favouritesStore,
  FilterStore,
  FavouritesStore,
  store,
};
