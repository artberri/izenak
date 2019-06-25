<template>
  <div class="izenak section flex flex--v">
    <div class="flex flex--v">
      <GoBack routeName="home">{{ title }}</GoBack>
      <NameFilter />
    </div>
    <div class="flex cloud">
      <NameTag v-for="name in names" v-bind:key="name.text" :name="name" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import izenak from '../assets/data/izenak.json';
import NameTag from '../components/NameTag.vue';
import NameFilter from '../components/NameFilter.vue';
import GoBack from '../components/GoBack.vue';
import { Gender, IFilter, IzenakPresenter, INameDto, Name, IIzenakView, GenderFilter } from '@/app';

const namespace: string = 'filter';

@Component({
  components: {
    NameTag,
    NameFilter,
    GoBack,
  },
})
export default class Izenak extends Vue implements IIzenakView {
  public names: Name[] = [];

  @Prop()
  public gender!: string;

  @State(namespace)
  public filter!: IFilter;

  @Mutation('initializeFilter', { namespace })
  public initializeFilter!: (gender: GenderFilter) => void;

  private presenter: IzenakPresenter = new IzenakPresenter(izenak as INameDto[]);

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

  public setNames(names: Name[]): void {
    this.names = names;
  }
}
</script>

<style scoped>
.cloud {
  padding: 1em 2em;
  justify-content: center;
  flex-wrap: wrap;
}
</style>
