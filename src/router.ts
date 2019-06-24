import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';
import { Gender } from './app';

Vue.use(Router);

export default new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
    },
    {
      path: '/neskak',
      name: 'neskak',
      component: () => import(/* webpackChunkName: "izenak" */ './views/Izenak.vue'),
      props: { genderFilter: Gender.Female },
    },
    {
      path: '/mutilak',
      name: 'mutilak',
      component: () => import(/* webpackChunkName: "izenak" */ './views/Izenak.vue'),
      props: { genderFilter: Gender.Male },
    },
    {
      path: '/guztiak',
      name: 'guztiak',
      component: () => import(/* webpackChunkName: "izenak" */ './views/Izenak.vue'),
      props: { genderFilter: undefined },
    },
  ],
});
