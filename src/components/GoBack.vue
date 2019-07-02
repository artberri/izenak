<template>
  <div class="flex back">
    <div class="link">
      <router-link :to="{ name: routeName }"><Icon class="icon" icon="icon-arrow-left2" /> Atzera</router-link>
    </div>
    <div class="font-montserrat text"><slot></slot></div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Name, GenderFilter } from '@/app';
import Icon from './Icon.vue';

@Component({
  components: {
    Icon,
  },
})
export default class GoBack extends Vue {
  @Prop()
  public routeName!: string;
}
</script>

<style scoped>
.back {
  text-align: left;
  padding: 1em 2em 1em 0;
}

.link {
  padding: .1em 1em;
  font-size: .9em;
  text-decoration: none;
}

.link .icon {
  font-size: .7em;
}

.link a {
  color: #888;
  text-decoration: none;
  border-radius: .5em;
  padding: .3em .6em;
  background: transparent;
  border: 1px solid #888;
}

.text {
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 800;
}
</style>
