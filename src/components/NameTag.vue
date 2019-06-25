<template>
  <div :class="nameClass">{{ name.text }}</div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Name, Gender } from '@/app';

@Component
export default class NameTag extends Vue {
  @Prop()
  public name!: Name;

  public get nameClass() {
    const classObject: any = {
      'name': true,
      'font--yanone': true,
    };
    classObject['gender--' + this.name.gender] = true;
    return classObject;
  }
}
</script>

<style scoped>
.name {
  display: block;
  margin: .2em;
  padding: .5em .8em .3em;
  font-size: 1.2em;
  color: var(--whiteColor);
}

.gender--male {
  background: var(--boyColor);
}

.gender--female {
  background: var(--girlColor);
}
</style>
