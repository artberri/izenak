<template>
  <nav class="home section flex flex--v">
    <router-link
      class="link background--girl flex flex--center font--slabo"
      :to="{ name: 'neskak'}">Nesken izenak</router-link>
    <router-link
      class="link background--boy flex flex--center font--slabo"
      :to="{ name: 'mutilak'}">Mutilen izenak</router-link>
    <router-link
      class="link background--all flex flex--center font--slabo"
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
.link {
  flex-grow: 1;
  text-decoration: none;
  font-size: 1.6em;
  padding: 2em;
}
</style>
