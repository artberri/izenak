<template>
  <div class="section flex flex--v izenak">
    <div class="flex flex--v">
      <GoBack routeName="home">{{ title }}</GoBack>
    </div>
    <div ref="cloud" class="cloud__container">
      <NameFilter :scrollPosition="scrollPosition" />
      <div class="izenak__shadowtop"></div>
      <div class="flex cloud">
        <NameTag v-for="name in names" v-bind:key="name.key" :name="name" />
      </div>
      <div class="izenak__shadowbottom"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop, Ref } from 'vue-property-decorator';
import NameTag from '../components/NameTag.vue';
import NameFilter from '../components/NameFilter.vue';
import GoBack from '../components/GoBack.vue';
import { diContainer } from '../main';
import { Gender, IFilter, IzenakPresenter, Name, IIzenakView, GenderFilter, DI, IFilterStore } from '@/app';
import { filterStore } from '../infrastructure';

const namespace: string = 'filter';

@Component({
  components: {
    NameTag,
    NameFilter,
    GoBack,
  },
})
export default class Izenak extends Vue implements IIzenakView {
  public filterStore: IFilterStore = filterStore;
  public scrollPosition: number = 0;

  @Ref('cloud')
  public cloudContainer!: HTMLDivElement;

  @Prop()
  public gender!: string;

  private presenter: IzenakPresenter = diContainer.get<IzenakPresenter>(DI.IzenakPresenter);

  public get names(): Name[] {
    return this.presenter.names;
  }

  public get genderFilter(): GenderFilter {
    if (this.gender === 'male' || this.gender === 'female') {
      return this.gender;
    }

    return 'all';
  }

  public get title(): string {
    if (this.genderFilter === 'male') {
      return 'Mutilen izenak';
    }
    if (this.genderFilter === 'female') {
      return 'Nesken izenak';
    }

    return 'Izen guztiak';
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

.cloud {
  padding: 300px 2em 1em;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
