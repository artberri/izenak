<template>
  <main role="main" class="section flex flex--v izenak">
    <div class="flex flex--v">
      <GoBack>{{ title }}</GoBack>
    </div>
    <div ref="cloud" :class="cloudClass">
      <transition :name="transitionName">
        <NameCard
          v-if="isNameSelected"
          :key="nameKey"
          :name="selectedName"
          :style="{top: scrollPosition + 'px'}"
          @closed="onNameClosed"
          @next="onNextClicked"
          @previous="onPreviousClicked" />
      </transition>
      <div class="izenak__shadowtop"></div>
      <div class="flex cloud">
        <NameFilter :scrollPosition="scrollPosition" />
        <div v-if="names.length === 0">
          Bilaketak ez du emaitzarik. Aldatu iragazkiak izenak ikusteko.
        </div>
        <NameTag v-for="name in names" :key="name.key" :name="name" @click="onNameClicked(name)" />
      </div>
      <div><ShowMore v-if="showMoreButton" /></div>
      <div class="izenak__shadowbottom"></div>
    </div>
  </main>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref, Watch } from 'vue-property-decorator';
import NameTag from '../components/NameTag.vue';
import NameFilter from '../components/NameFilter.vue';
import NameCard from '../components/NameCard.vue';
import GoBack from '../components/GoBack.vue';
import ShowMore from '../components/ShowMore.vue';
import { diContainer } from '../main';
import {
  Gender, IFilter, IzenakPresenter, Name, IIzenakView, PageFilter, DI, IFilterStore, IFavouritesStore,
} from '@/app';
import { filterStore, favouritesStore } from '../infrastructure';

const namespace: string = 'filter';

@Component({
  components: {
    NameTag,
    NameCard,
    NameFilter,
    GoBack,
    ShowMore,
  },
})
export default class Izenak extends Vue implements IIzenakView {
  public filterStore: IFilterStore = filterStore;
  public favouritesStore: IFavouritesStore = favouritesStore;
  public scrollPosition: number = 0;
  public selectedName?: Name = undefined;
  public isNameSelected: boolean = false;
  public nameKey: string = '';
  public transitionName: 'slide-left' | 'slide-right' = 'slide-left';

  @Ref('cloud')
  public cloudContainer!: HTMLDivElement;

  @Prop()
  public page!: string;

  private presenter: IzenakPresenter = diContainer.get<IzenakPresenter>(DI.IzenakPresenter);

  public get cloudClass() {
    return {
      'cloud__container': true,
      'cloud__container--fixed': this.isNameSelected,
    };
  }

  public get names(): Name[] {
    return this.presenter.names;
  }

  public get showMoreButton(): boolean {
    return this.presenter.showMoreButton;
  }

  public get pageFilter(): PageFilter {
    if (this.page === 'male' || this.page === 'female' || this.page === 'favourites') {
      return this.page;
    }

    return 'all';
  }

  public get title(): string {
    if (this.pageFilter === 'male') {
      return 'Mutilen izenak';
    }
    if (this.pageFilter === 'female') {
      return 'Nesken izenak';
    }
    if (this.pageFilter === 'favourites') {
      return 'Gogokoak';
    }

    return 'Izen guztiak';
  }

  @Watch('gender')
  public onPageChanged() {
    this.presenter.onPageFilterChanged();
  }

  public onNameClicked(name: Name): void {
    this.presenter.onNameClicked(name);
    this.setNameKey();
  }

  public onNameClosed(): void {
    this.presenter.onNameClosed();
    this.setNameKey();
  }

  public onNextClicked(): void {
    this.transitionName = 'slide-left';
    this.presenter.onNextClicked();
    this.setNameKey();
  }

  public onPreviousClicked(): void {
    this.transitionName = 'slide-right';
    this.presenter.onPreviousClicked();
    this.setNameKey();
  }

  public created(): void {
    this.presenter.attach(this);
  }

  public mounted(): void {
    this.cloudContainer.addEventListener('scroll', this.handleScroll);
  }

  public beforeDestroy(): void {
    this.cloudContainer.removeEventListener('scroll', this.handleScroll);
  }

  private handleScroll() {
    this.scrollPosition = this.cloudContainer.scrollTop;
  }

  private setNameKey(): void {
    this.nameKey = this.selectedName ? this.selectedName.key : 'undefined';
    this.isNameSelected = !!this.selectedName;
  }
}
</script>

<style scoped>
.izenak {
  height: 100%;
}

.izenak__shadowtop {
  position: fixed;
  left: 0;
  width: 100%;
  height: 30px;
  background: transparent;
  background: linear-gradient(0deg, rgba(255,255,255,0) 0%, rgba(255,255,255,1) 100%);
  z-index: 1;
}

.izenak__shadowbottom {
  position: fixed;
  width: 100%;
  height: 30px;
  bottom: 50px;
  left: 0;
  background: transparent;
  background: linear-gradient(0deg, rgba(255,255,255,1) 0%, rgba(255,255,255,0) 100%);
  z-index: 1;
}

.cloud__container {
  position: relative;
  height: 100%;
  overflow: auto;
}

.cloud__container--fixed {
  overflow: hidden;
}

.cloud {
  padding: 330px 2em 1em;
  justify-content: center;
  flex-wrap: wrap;
}

.slide-left-enter-active,
.slide-left-leave-active,
.slide-right-enter-active,
.slide-right-leave-active {
  transition-duration: 0.5s;
  transition-property: transform;
  transition-timing-function: cubic-bezier(0.55, 0, 0.1, 1);
  overflow: hidden;
}

.slide-left-enter,
.slide-right-leave-active {
  transform: translate(100vh, 0);
}

.slide-left-leave-active,
.slide-right-enter {
  transform: translate(-100vh, 0);
}
</style>
