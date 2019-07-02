<template>
  <button :class="nameClass" @click="click">
    <span>{{ name.text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { Name, Gender } from '@/app';

@Component
export default class NameTag extends Vue {
  @Prop()
  public name!: Name;

  public get isMale(): boolean {
    return this.name.gender === 'male';
  }

  public get nameClass() {
    const classObject: any = {
      'name': true,
      'font--slabo': true,
    };
    classObject['gender--' + this.name.gender] = true;
    return classObject;
  }

  @Emit()
  public click(): void {}
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
  background: transparent;
}

.gender--male {
  border: 1px solid var(--boyColor);
  color: var(--boyColor);
}

.gender--female {
  border: 1px solid var(--girlColor);
  color: var(--girlColor);
}
</style>
