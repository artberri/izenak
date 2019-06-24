<template>
  <nav class="home section flex flex--v">
    <router-link
      class="home__link background--girl flex flex--center font--slabo"
      :to="{ name: 'neskak'}">Nesken izenak</router-link>
    <router-link
      class="home__link background--boy flex flex--center font--slabo"
      :to="{ name: 'mutilak'}">Mutilen izenak</router-link>
    <router-link
      class="home__link background--all flex flex--center font--slabo"
      :to="{ name: 'guztiak'}">Izen guztiak</router-link>
  </nav>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import HelloWorld from '@/components/HelloWorld.vue'; // @ is an alias to /src
import izenak from '../assets/data/izenak.json';

@Component({
  components: {
    HelloWorld,
  },
})
export default class Home extends Vue {}
</script>

<style>
.home__link {
  display: block;
  flex-grow: 1;
  text-decoration: none;
  font-size: 2em;
  padding: 2em;
}
</style>
