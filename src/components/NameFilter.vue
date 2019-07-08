<template>
  <section ref="filter" :class="filterClass">
    <div class="filter__box">
      <div v-if="minimize" @click="openFilters" class="iragazkiak"><Icon icon="icon-filter" class="filter-icon" /></div>
      <div v-if="!minimize">
        <div class="field search__field">
          <label class="label search__label" for="search">Bilaketa-terminoa</label>
          <div class="search__container">
            <Icon icon="icon-search" class="search-icon" />
            <input id="search" name="search" class="inputtext search" type="text" autocomplete="off"
              v-model="searchTerm"
              @change="onSearchInputChanged"
              @keyup="onKeyPressedOnInput" />
          </div>
        </div>
        <div class="field search__field flex">
          <div class="start-container">
            <label class="label search__label" for="start-words">Hasten da</label>
            <div class="">
              <input id="start-words" name="start-words" class="inputtext start-words" type="text" autocomplete="off"
                v-model="startsWith"
                @change="onStartsWithInputChanged"
                @keyup="onStartsWithInputChanged" />
            </div>
          </div>
          <div class="end-container">
            <label class="label search__label" for="end-words">Amaitzen da</label>
            <div class="">
              <input id="end-words" name="end-words" class="inputtext end-words" type="text" autocomplete="off"
                v-model="endsWith"
                @change="onEndsWithInputChanged"
                @keyup="onEndsWithInputChanged" />
            </div>
          </div>
        </div>
        <div class="field">
          <label class="label" for="slider">Letra kopurua</label>
          <vue-slider
            id="slider"
            class="slider"
            v-model="charLengthRange"
            @change="onCharLengthSliderChanged"
            :contained="true"
            :min="2"
            :max="22"
            :dotSize="20"
            tooltipPlacement="bottom"
            tooltip="always"></vue-slider>
        </div>
        <div class="field">
          <label for="onlybasque" class="label checkbox__label">
            <input id="onlybasque" name="onlybasque" type="checkbox" class="checkbox" v-model="onlyBasque" @change="onOnlyBasqueToggled" /><span class="checkmark"></span>
            Euskal jatorrizko izenak soilik
          </label>
        </div>
      </div>
    </div>
  </section>
</template>

<script lang="ts">
// tslint:disable:max-classes-per-file
import { Component, Prop, Vue, Emit, Ref, Watch } from 'vue-property-decorator';
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
  @Prop()
  public scrollPosition!: number;
  public filterStore: IFilterStore = filterStore;
  public searchTerm: string = filterStore.filter.searchTerm;
  public charLengthRange: [number, number] = [filterStore.filter.minChars, filterStore.filter.maxChars];
  public onlyBasque: boolean = filterStore.filter.onlyBasque;
  public startsWith: string = filterStore.filter.startsWith;
  public endsWith: string = filterStore.filter.endsWith;
  public forceOpenFilters: boolean = false;
  @Ref('filter')
  public filterElement!: HTMLDivElement;

  private presenter: NameFilterPresenter = diContainer.get<NameFilterPresenter>(DI.NameFilterPresenter);

  public get filterClass() {
    const classObj = {
      'flex': true,
      'flex--v': true,
      'filter': true,
      'minimize': this.minimize,
    };

    return classObj;
  }

  public get minimize(): boolean {
    return !this.forceOpenFilters && this.scrollPosition > 100;
  }

  @Watch('scrollPosition')
  public onScrolled(): void {
    const hasFocus: boolean = this.filterElement && this.filterElement.querySelectorAll(':focus').length > 0;
    if (!hasFocus) {
      this.forceOpenFilters = false;
    }
  }

  public openFilters(): void {
    this.forceOpenFilters = true;
  }

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

  public onStartsWithInputChanged(): void {
    this.presenter.onStartsWithInputChanged();
  }

  public onEndsWithInputChanged(): void {
    this.presenter.onEndsWithInputChanged();
  }
}
</script>

<style >
.filter {
  padding: 1.3em 1.3em 0em;
  position: fixed;
  width: 100%;
}

.minimize.filter {
  width: auto;
}

.filter__box {
  height: 260px;
  background: #fff;
  border-radius: 5px;
  padding: 1.3em 1.3em 0em;
  position: relative;
  text-align: left;
  box-shadow: 0px 2px 5px 0px rgba(214,214,214,1);
  transition: all .3s;
  overflow: hidden;
  width: 100%;
  overflow: hidden;
}

.minimize.filter .filter__box {
  height: 50px;
  width: 50px;
  border-radius: 25px;
  padding: 0;
}

.label {
  width: 100%;
  border-bottom: 1px solid #ddd;
  display: block;
  padding-bottom: 2px;
  margin-bottom: 5px;
  font-size: 0.8em;
}

.slider {
  margin-bottom: 40px;
}

.slider .vue-slider-dot-tooltip-inner {
  border-color: var(--allColor);
  background-color: var(--allColor);
}

.slider .vue-slider-process{
  background: var(--allColor);
}

.search__container {
  position: relative;
}

.filter-icon {
  display: block;
  height: 50px;
  width: 50px;
  line-height: 50px;
  text-align: center;
  color: var(--allColor);
  font-size: 1.5em;
}

.search-icon {
  position: absolute;
  top: 2px;
  color: #888;
  margin: 4px 10px 0;
  font-size: 1em;
}

.field {
  margin-bottom: 15px;
}

.inputtext {
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 1em;
  padding: 5px 5px 5px 5px;
  width: 100%;
}

.search {
  padding: 5px 5px 5px 35px;
}

.start-container {
  flex: 1;
  margin-right: 5px;
}

.end-container {
  flex: 1;
  margin-left: 5px;
}

.search__label {
  border: 0;
  padding-bottom: 0;
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
  background-color: var(--allColor);
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
