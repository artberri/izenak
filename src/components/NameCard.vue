<template>
  <section class="namecard">
    <div class="flex flex--v card">
      <div @click="closed"><Icon icon="icon-cross" class="close" /></div>
      <h3 class="font--slabo title"><span :class="genderClass">{{ name.text }}</span></h3>
      <div class="flex flex--around controls">
        <div class="flex flex--v flex--around">
          <button class="navigation" @click="previous"><Icon icon="icon-backward" /></button>
        </div>
        <div class="flex flex--v flex--around">
          <button class="favourite" @click="onToggleFavourite"><Icon icon="icon-heart" :class="favouriteClass" /></button>
        </div>
        <div class="flex flex--v flex--around">
          <button class="navigation" @click="next"><Icon icon="icon-forward2" /></button>
        </div>
      </div>
      <div class="section_container">
        <div>
          <h4 class="section__title">Beste hizkuntzetan</h4>
          <p class="section__content">{{ name.translations || 'Izen hau ez dauka itzulpenik Euskaltzaindiaren corpusean' }}</p>
        </div>
        <div>
          <h4 class="section__title">Esanahia</h4>
          <p class="section__content">{{ name.meaning || 'Izen hau ez dauka definiziorik Euskaltzaindiaren corpusean' }}</p>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
import { Component, Prop, Vue, Emit } from 'vue-property-decorator';
import { diContainer } from '../main';
import { favouritesStore } from '../infrastructure';
import { Name, Gender, INameCardView, IFavouritesStore, NameCardPresenter, DI } from '@/app';
import Icon from './Icon.vue';

@Component({
  components: {
    Icon,
  },
})
export default class NameCard extends Vue implements INameCardView {
  @Prop()
  public name!: Name;
  public favouritesStore: IFavouritesStore = favouritesStore;

  private presenter: NameCardPresenter = diContainer.get<NameCardPresenter>(DI.NameCardPresenter);

  @Emit()
  public closed(): void {}

  @Emit()
  public previous(): void {}

  @Emit()
  public next(): void {}

  public get isMale(): boolean {
    return this.name && this.name.gender === Gender.Male;
  }

  public get genderClass(): string {
    return this.isMale ? 'color--boy' : 'color--girl';
  }

  public get favouriteClass(): { [s: string]: boolean; } {
    const favouriteClassObject: { [s: string]: boolean; } = {
      favourite__icon: true,
    };
    if (this.isFavourite) {
      favouriteClassObject['favourite__icon--selected'] = true,
      favouriteClassObject[this.genderClass] = true;
    }
    return favouriteClassObject;
  }

  public get isFavourite(): boolean {
    return this.presenter.isFavourite;
  }

  public created(): void {
    this.presenter.attach(this);
  }

  public onToggleFavourite(): void {
    this.presenter.onToggleFavourite();
  }
}
</script>

<style scoped>
.namecard {
  position: absolute;
  z-index: 10;
  width: 100%;
  height: 100%;
  background: transparent;
  padding: 1em;
}

.card {
  width: 100%;
  height: 100%;
  box-shadow: 0px 2px 5px 0px rgba(214,214,214,1);
  background: #fff;
  border-radius: 5px;
  overflow: auto;
}

.controls {
  height: 130px;
  min-height: 130px;
}

.navigation {
  font-size: 1.5em;
  color: var(--mainColor);
}

.favourite {
  font-size: 4em;
  color: var(--mainColor);
  width: 130px;
}

.favourite__icon {
  transition: all .3s;
}

.favourite__icon--selected {
  font-size: 1.2em;
}

.title {
  font-size: 2em;
  padding: .5em 0 .5em;
}

.close {
  position: absolute;
  top: 10px;
  right: 10px;
  box-shadow: 0px 2px 5px 0px rgba(214,214,214,1);
  background: #fff;
  width: 30px;
  height: 30px;
  line-height: 30px;
  border-radius: 15px;
}

.section_container {
  background: var(--mainColor);
  color: var(--whiteColor);
  padding: 30px 20px 10px;
  flex-grow: 1;
}

.section__title {
  font-weight: bold;
  padding-bottom: 10px;
}

.section__content {
  padding-bottom: 20px;
}

</style>
