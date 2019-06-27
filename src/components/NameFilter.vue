<template>
  <section class="flex flex--v filter">
    <div class="flex">
      <Icon icon="icon-search" class="icon" />
      <label for="search">Iragazi</label>
      <input id="search" name="search" type="text" v-model="searchTerm" @change="onSearchInputChanged" />
    </div>
    <div>
      <label for="slider">Letra kopurua</label>
      <vue-slider
        id="slider"
        v-model="range"
        :min-range="20"></vue-slider>
    </div>
  </section>
</template>

<script lang="ts">
// tslint:disable:max-classes-per-file
import { Component, Prop, Vue } from 'vue-property-decorator';
import Icon from './Icon.vue';
import { IFilter, INameFilterView, NameFilterPresenter, DI, IFilterStore } from '@/app';
import { diContainer } from '../main';
import { filterStore } from '../infrastructure';
import VueSlider from 'vue-slider-component';
import 'vue-slider-component/theme/default.css';

const namespace: string = 'filter';

@Component({
  components: {
    Icon,
    VueSlider,
  },
})
export default class NameFilter extends Vue implements INameFilterView {
  public searchTerm: string = '';
  public charLengthRange: [number, number] = [0, 99];
  public hasTranslationsChecked: boolean = true;
  public filterStore: IFilterStore = filterStore;

  private presenter: NameFilterPresenter = diContainer.get<NameFilterPresenter>(DI.NameFilterPresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public onSearchInputChanged(): void {
    this.presenter.onSearchInputChanged();
  }

  public onKeyPressedOnInput(): void {
    this.presenter.onKeyPressedOnInput();
  }

  public onCharLengthSliderChanged(): void {
    this.presenter.onKeyPressedOnInput();
  }

  public onHasTranslationsToggled(): void {
    this.presenter.onKeyPressedOnInput();
  }
}
</script>

<style scoped>
.filter {
  margin: 1em;
  background: #fff;
  border-radius: .5em;
  padding: .5em;
  position: relative;
  color: #888;
}

.filter label[for=search] {
  position: absolute;
  font-size: 1.3em;
  left: 50px;
  top: 12px;
}

.filter input.search {
  border: 0;
  font-size: 1.3em;
  width: 100%;
}

.icon {
  margin: 4px 10px 0;
  font-size: 1.3em;
}

</style>
