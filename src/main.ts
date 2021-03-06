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
import izenak from './assets/data/izenak.json';
import { NameFilterPresenter, INameRepository, IzenakPresenter, NameCardPresenter, ShowMorePresenter } from './app';
import { store, NameLocalRepository, INameDto } from './infrastructure';

const allnames = izenak as INameDto[];

const dic = new Container({ skipBaseClassChecks: true });
dic.bind<NameFilterPresenter>(DI.NameFilterPresenter)
  .to(NameFilterPresenter);
dic.bind<NameCardPresenter>(DI.NameCardPresenter)
  .to(NameCardPresenter);
dic.bind<IzenakPresenter>(DI.IzenakPresenter)
  .to(IzenakPresenter);
dic.bind<ShowMorePresenter>(DI.ShowMorePresenter)
  .to(ShowMorePresenter);
dic.bind<INameRepository>(DI.INameRepository)
  .toConstantValue(new NameLocalRepository(allnames));

export const diContainer = dic;

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
