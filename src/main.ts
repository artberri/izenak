import 'reflect-metadata';
import { Container } from 'inversify';
import { DI } from './app/di';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import './registerServiceWorker';

import 'reset-css';
import './assets/css/main.css';
import './assets/css/icomoon/style.css';
import './assets/css/fonts.css';
import './assets/css/transitions.css';
import { NameFilterPresenter, INameRepository, IzenakPresenter, NameCardPresenter } from './app';
import { store, NameLocalRepository } from './infrastructure';

const dic = new Container({ skipBaseClassChecks: true });
dic.bind<NameFilterPresenter>(DI.NameFilterPresenter).to(NameFilterPresenter);
dic.bind<NameCardPresenter>(DI.NameCardPresenter).to(NameCardPresenter);
dic.bind<IzenakPresenter>(DI.IzenakPresenter).to(IzenakPresenter);
dic.bind<INameRepository>(DI.INameRepository).to(NameLocalRepository).inSingletonScope();

export const diContainer = dic;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
