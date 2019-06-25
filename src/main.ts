import 'reflect-metadata';
import './app/di';
import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './registerServiceWorker';

import 'reset-css';
import './assets/css/main.css';
import './assets/css/icomoon/style.css';

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
