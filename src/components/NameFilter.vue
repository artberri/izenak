<template>
  <section class="flex flex--v filter">
    <div class="field search__field">
      <label class="label search__label" for="search">Iragazi</label>
      <div class="search__container">
        <Icon icon="icon-search" class="icon" />
        <input id="search" name="search" class="search" type="text" autocomplete="off"
          v-model="searchTerm"
          @change="onSearchInputChanged"
          @keyup="onKeyPressedOnInput" />
      </div>
    </div>
    <div class="field">
      <label class="label" for="slider">Letra kopurua</label>
      <vue-slider
        id="slider"
        class="slider"
        v-model="charLengthRange"
        @change="onCharLengthSliderChanged"
        :min="2"
        :max="22"></vue-slider>
    </div>
    <div class="field">
      <label for="onlybasque" class="label checkbox__label"> 
        <input id="onlybasque" name="onlybasque" type="checkbox" class="checkbox" v-model="onlyBasque" @change="onOnlyBasqueToggled" /><span class="checkmark"></span> 
        Soilik euskal jatorrizko izenak 
      </label>
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
  public charLengthRange: [number, number] = [2, 22];
  public onlyBasque: boolean = false;
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
    this.presenter.onCharLengthSliderChanged();
  }

  public onOnlyBasqueToggled(): void {
    this.presenter.onOnlyBasqueToggled();
  }
}
</script>

<style scoped>
.filter {
  margin: 1em;
  background: #fff;
  border-radius: 5px;
  padding: 1.3em 1.3em 0em;
  position: relative;
  text-align: left;
  box-shadow: 0px 2px 5px 0px rgba(214,214,214,1);
}

.label {
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: block;
  padding-bottom: 2px;
  margin-bottom: 5px;
  font-size: 0.8em;
}

.search__container {
  position: relative;
}

.icon {
  position: absolute;
  top: 2px;
  color: #888;
  margin: 4px 10px 0;
  font-size: 1em;
}

.field {
  margin-bottom: 15px;
}

.search {
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  padding: 5px 5px 5px 35px;
  width: 100%;
}

.search__label {
  border: 0;
  padding-bottom: 0;
}

.slider {
  margin: 0 .5em;
}

.checkbox__label {
  position: relative;
}
.checkbox {
  position: absolute;
  opacity: 0;
  cursor: pointer;
  height: 0;
  width: 0;
}
.checkmark {
  display: inline-block;
  height: 10px;
  width: 10px;
  background-color: #eee;
}
.checkbox:checked ~ .checkmark {
  background-color: #2196F3;
}
.checkmark:after {
  content: "";
  position: absolute;
  display: none;
}
.checkbox:checked ~ .checkmark:after {
  display: block;
}
.checkmark:after {
  left: 3px;
  top: 0px;
  width: 3px;
  height: 7px;
  border: solid white;
  border-width: 0 1px 1px 0;
  transform: rotate(45deg);
}
</style>
