// tslint:disable:max-line-length
import Vue from 'vue';
import Router from 'vue-router';
import Home from './views/Home.vue';

Vue.use(Router);

const router = new Router({
  mode: 'history',
  base: process.env.BASE_URL,
  routes: [
    {
      path: '/',
      name: 'home',
      component: Home,
      meta: {
        title: 'izenak.eus - Euskal izenen bilatzailea',
        metaTags: [
          {
            name: 'description',
            content: 'Bilatu euskal izenak zure seme-alabentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun izenak aurkitzeko aukera izango duzu.',
          },
          {
            property: 'og:description',
            content: 'Bilatu euskal izenak zure seme-alabentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun izenak aurkitzeko aukera izango duzu.',
          },
        ],
      },
    },
    {
      path: '/neskak',
      name: 'neskak',
      component: () => import(/* webpackChunkName: "izenak" */ './views/Izenak.vue'),
      props: { page: 'female' },
      meta: {
        title: 'Euskal neska-izenen bilatzailea - izenak.eus',
        metaTags: [
          {
            name: 'description',
            content: 'Bilatu euskal neska-izenak zure alabentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun neska-izenak aurkitzeko aukera izango duzu.',
          },
          {
            property: 'og:description',
            content: 'Bilatu euskal neska-izenak zure alabentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun neska-izenak aurkitzeko aukera izango duzu.',
          },
        ],
      },
    },
    {
      path: '/mutilak',
      name: 'mutilak',
      component: () => import(/* webpackChunkName: "izenak" */ './views/Izenak.vue'),
      props: { page: 'male' },
      meta: {
        title: 'Euskal mutil-izenen bilatzailea - izenak.eus',
        metaTags: [
          {
            name: 'description',
            content: 'Bilatu euskal mutil-izenak zure semeentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun mutil-izenak aurkitzeko aukera izango duzu.',
          },
          {
            property: 'og:description',
            content: 'Bilatu euskal mutil-izenak zure semeentzat. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun mutil-izenak aurkitzeko aukera izango duzu.',
          },
        ],
      },
    },
    {
      path: '/guztiak',
      name: 'guztiak',
      component: () => import(/* webpackChunkName: "izenak" */ './views/Izenak.vue'),
      props: { page: 'all' },
      meta: {
        title: 'Euskal mutil eta neska izenen bilatzailea - izenak.eus',
        metaTags: [
          {
            name: 'description',
            content: 'Bilatu euskal izen guztiak. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun izenak aurkitzeko aukera izango duzu.',
          },
          {
            property: 'og:description',
            content: 'Bilatu euskal izen guztiak. Hemen Euskaltzaindiaren izen zerrenda iragazteko eta gustoko dituzun izenak aurkitzeko aukera izango duzu.',
          },
        ],
      },
    },
    {
      path: '/gogokoak',
      name: 'favourites',
      component: () => import(/* webpackChunkName: "favourites" */ './views/Izenak.vue'),
      props: { page: 'favourites' },
      meta: {
        title: 'Izen gogokoak - izenak.eus',
        metaTags: [
          {
            name: 'robots',
            content: 'noindex',
          },
        ],
      },
    },
    {
      path: '/honiburuz',
      name: 'about',
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue'),
      meta: {
        title: 'Honi buruz - izenak.eus',
        metaTags: [
          {
            name: 'robots',
            content: 'noindex',
          },
        ],
      },
    },
  ],
});

// https://alligator.io/vuejs/vue-router-modify-head/
router.beforeEach((to, from, next) => {
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
  const nearestWithMeta = to.matched.slice().reverse().find((r) => r.meta && r.meta.metaTags);

  if (nearestWithTitle) {
    document.title = nearestWithTitle.meta.title;
  }

  Array.from(document.querySelectorAll('[data-vue-router-controlled]'))
    .map((el) => el.parentNode!.removeChild(el));

  if (!nearestWithMeta) {
    return next();
  }

  nearestWithMeta.meta.metaTags
    .map((tagDef: { [s: string]: string; }) => {
      const tag = document.createElement('meta');

      Object.keys(tagDef).forEach((key) => {
        tag.setAttribute(key, tagDef[key]);
      });

      tag.setAttribute('data-vue-router-controlled', '');

      return tag;
    })
    .forEach((tag: HTMLMetaElement) => document.head.appendChild(tag));

  next();
});

router.afterEach((to, from) => {
  const nearestWithTitle = to.matched.slice().reverse().find((r) => r.meta && r.meta.title);
  if (nearestWithTitle) {
    gtag('config', 'UA-2004323-23', {
      page_title: nearestWithTitle.meta.title,
      page_path: nearestWithTitle.path,
      anonymize_ip: true,
      allow_ad_personalization_signals: false,
      storage: 'none',
      store_gac: false,
    });
  }
});

export default router;
