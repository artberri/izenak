import Vue from 'vue';
import Vuex, { StoreOptions } from 'vuex';
import { IRootState, filter } from './state';

Vue.use(Vuex);

const store: StoreOptions<IRootState> = {
  state: {
      version: '1.0.0',
  },
  modules: {
    filter,
  },
};

export default new Vuex.Store<IRootState>(store);
