<template>
  <span :class="iconClass"></span>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

type IconType =
  'icon-search' | 'icon-arrow-left2' | 'icon-info' | 'icon-filter' |
  'icon-heart' | 'icon-forward2' | 'icon-backward' | 'icon-cross' | 'icon-menu';

@Component
export default class Icon extends Vue {
  @Prop()
  public icon!: IconType;

  public get iconClass() {
    const classObject: any = {};
    classObject[this.icon] = true;
    return classObject;
  }
}
</script>

<style scoped>

</style>
