<template>
  <div class="flex back">
    <div class="link">
      <a @click="$router.go(-1)"><Icon class="icon" icon="icon-arrow-left2" /> Atzera</a>
    </div>
    <h2 class="font-montserrat text"><slot></slot></h2>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Icon from './Icon.vue';

@Component({
  components: {
    Icon,
  },
})
export default class GoBack extends Vue {}
</script>

<style scoped>
.back {
  text-align: left;
  padding: 1em 2em 1em 0;
}

.link {
  padding: .3em 0 .3em 1.3em;
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
  padding: .4em 1em;
  background: transparent;
  border: 1px solid #888;
}

.text {
  font-size: 1.2em;
  text-transform: uppercase;
  font-weight: 800;
}
</style>
