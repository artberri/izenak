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
      'font--slabo': true,
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
  font-size: 1.3em;
  color: var(--whiteColor);
  border-radius: 5px;
  box-shadow: 0px 2px 5px 0px rgba(214,214,214,1);
}

.gender--male {
  background: var(--boyColor);
}

.gender--female {
  background: var(--girlColor);
}
</style>
