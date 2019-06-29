import 'reflect-metadata';
import { Container } from 'inversify';
import { DI } from './app/di';
import Vue from 'vue';
import Vuex from 'vuex';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';
import { initialiseStores, FilterStore } from './infrastructure';

import 'reset-css';
import './assets/css/main.css';
import './assets/css/icomoon/style.css';
import './assets/css/fonts.css';
import './assets/css/transitions.css';
import { NameFilterPresenter, INameRepository, IzenakPresenter } from './app';
import { NameLocalRepository } from './infrastructure';

const dic = new Container({ skipBaseClassChecks: true });
dic.bind<NameFilterPresenter>(DI.NameFilterPresenter).to(NameFilterPresenter);
dic.bind<IzenakPresenter>(DI.IzenakPresenter).to(IzenakPresenter);
dic.bind<INameRepository>(DI.INameRepository).to(NameLocalRepository).inSingletonScope();

export const diContainer = dic;

Vue.config.productionTip = false;

Vue.use(Vuex);
const store = new Vuex.Store({
  strict: true,
  modules: {
    filter: FilterStore,
  },
});

initialiseStores(store);

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
