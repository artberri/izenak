<template>
  <nav class="home section flex flex--v">
    <router-link
      class="link link__1 background--girl flex flex--center font--slabo"
      :to="{ name: 'neskak'}">Nesken izenak</router-link>
    <router-link
      class="link link__2 background--boy flex flex--center font--slabo"
      :to="{ name: 'mutilak'}">Mutilen izenak</router-link>
    <router-link
      class="link link__3 background--all flex flex--center font--slabo"
      :to="{ name: 'guztiak'}">Izen guztiak</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import izenak from '../assets/data/izenak.json';

@Component
export default class Home extends Vue {}
</script>

<style scoped>
.home {
  z-index: 20;
  background: transparent;
}

.link {
  flex-grow: 1;
  text-decoration: none;
  font-size: 1.6em;
  padding: 2em;
  transform: translateX(0);
  opacity: 1;
}

.fade-enter-active.home,
.fade-leave-active.home {
  transition-property: opacity;
}

.fade-enter.home,
.fade-leave-to.home {
  opacity: 1;
}

.fade-enter-active .link,
.fade-leave-active .link {
  transition: transform 0.3s;
}
.fade-enter .link,
.fade-leave-to .link {
  transform: translateX(-100%);
}

.fade-enter-active .link__2,
.fade-leave-active .link__2 {
  transition-delay: 0.07s;
}

.fade-enter-active .link__3,
.fade-leave-active .link__3 {
  transition-delay: 0.14s;
}
</style>
