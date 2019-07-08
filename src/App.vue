<template>
  <div class="app flex flex--v">
    <header class="header nav flex">
      <div class="title font--title">
        <router-link :to="{ name: 'home'}">
          izenak.<span class="color--girl font--smaller">e</span><span class="color--boy font--smaller">u</span><span class="color--all font--smaller">s</span>
        </router-link>
      </div>
      <Menu />
    </header>
    <div class="app__container">
      <transition name="navigation">
        <router-view />
      </transition>
    </div>
    <footer class="footer flex">
      <div class="font--smaller"><span class="footer__dev"><a class="footer__link" href="http://www.berriart.com">berriart</a><span>ek garatua</span></span></div>
      <div>
        <router-link
          class="footer__info"
          :to="{ name: 'about'}"><Icon icon="icon-info" /></router-link>
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from './components/Icon.vue';
import Menu from './components/Menu.vue';

@Component({
  components: {
    Icon,
    Menu,
  },
})
export default class App extends Vue {}
</script>

<style scoped>
.app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  height: 100%;
}

.app__container {
  flex: 1;
  position: relative;
}

.title {
  font-size: 2em;
}

.title a {
  text-decoration: none;
  color: var(--mainColor);
}

.header {
  padding: 1em 2em;
  text-align: center;
}

.footer {
  padding: 1em 2em;
}

.footer__link {
  text-decoration: none;
  color: var(--mainColor);
  font-weight: bold;
}

.footer__dev {
  vertical-align: sub;
}

.footer__info {
  color: var(--mainColor);
  display: inline-block;
  font-weight: normal;
  text-decoration: none;
}
</style>
