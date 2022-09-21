<template>
  <div id="app" class="app flex flex--v">
    <header role="banner" class="header nav flex">
      <h1 class="title font--title">
        <img
          src="/img/icons/favicon-16x16.png"
          alt="izenak.eus logotipoa"
          style="padding-right: 5px"
        />
        <router-link :to="{ name: 'home' }">
          <!--
          --><span class="color--girl">i</span
          ><!--
          --><span class="color--boy">z</span
          ><!--
          --><span class="color--all">e</span
          ><!--
          --><span>n</span
          ><!--
          --><span>a</span
          ><!--
          --><span>k</span
          ><!--
          --><span>.</span
          ><!--
          --><span class="font--small">e</span
          ><!--
          --><span class="font--small">u</span
          ><!--
          --><span class="font--small">s</span>
        </router-link>
      </h1>
      <Menu />
    </header>
    <div class="app__container">
      <transition name="navigation">
        <router-view />
      </transition>
    </div>
    <footer role="contentinfo" class="footer flex">
      <div class="font--smaller">
        <span class="footer__dev"
          ><a class="footer__link" href="http://www.berriart.com">berriart</a
          ><span>ek garatua</span></span
        >
      </div>
      <div>
        <router-link class="footer__info" :to="{ name: 'about' }"
          ><Icon icon="icon-info" /><span class="pseudohidden"
            >Honi buruz</span
          ></router-link
        >
      </div>
    </footer>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator"
import Icon from "./components/Icon.vue"
import Menu from "./components/Menu.vue"

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
  padding: 1em 1.5em;
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
