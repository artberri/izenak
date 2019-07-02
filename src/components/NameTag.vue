<template>
  <button :class="nameClass" @click="click">
    <span>{{ name.text }}</span>
  </button>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { diContainer } from '../main';
import { favouritesStore } from '../infrastructure';
import { Name, Gender, IFavouritesStore, NameTagPresenter, DI, INameTagView } from '@/app';

@Component
export default class NameTag extends Vue implements INameTagView {
  @Prop()
  public name!: Name;
  public favouritesStore: IFavouritesStore = favouritesStore;

  private presenter: NameTagPresenter = diContainer.get<NameTagPresenter>(DI.NameCardPresenter);

  public get isMale(): boolean {
    return this.name.gender === 'male';
  }

  public get isFavourite(): boolean {
    return this.presenter.isFavourite;
  }

  public get nameClass() {
    const classObject: any = {
      'name': true,
      'font--slabo': true,
    };
    classObject['gender--' + this.name.gender] = true;
    if (this.isFavourite) {
      classObject['active'] = true;
    }
    return classObject;
  }

  @Emit()
  public click(): void {}

  public created(): void {
    this.presenter.attach(this);
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
  background: transparent;
}

.gender--male {
  border: 1px solid var(--boyColor);
  color: var(--boyColor);
}

.gender--male.active {
  color: var(--whiteColor);
  background: var(--boyColor);
}

.gender--female {
  border: 1px solid var(--girlColor);
  color: var(--girlColor);
}

.gender--female.active {
  color: var(--whiteColor);
  background: var(--girlColor);
}
</style>
