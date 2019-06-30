<template>
  <div class="section flex flex--v izenak">
    <div class="flex flex--v">
      <GoBack routeName="home">{{ title }}</GoBack>
      <NameFilter />
    </div>
    <div class="cloud__container">
      <div class="izenak__shadowtop"></div>
      <div class="flex cloud">
        <NameTag v-for="name in names" v-bind:key="name.key" :name="name" />
      </div>
      <div class="izenak__shadowbottom"></div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
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
  padding: 1em 2em;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
