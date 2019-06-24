<template>
  <div class="izenak section flex flex--v">
    Hola {{ filter.gender }} df
    <div v-for="name in names" v-bind:key="name.text">
      {{ name.text }}
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Prop } from 'vue-property-decorator';
import { Mutation, State } from 'vuex-class';
import izenak from '../assets/data/izenak.json';
import { Gender, IFilter, IzenakPresenter, INameDto, Name, IIzenakView } from '@/app';

const namespace: string = 'filter';

@Component
export default class Izenak extends Vue implements IIzenakView {
  public names: Name[] = [];

  @Prop()
  public genderFilter: Gender | undefined;

  @State(namespace)
  public filter!: IFilter;

  @Mutation('initializeFilter', { namespace })
  public initializeFilter!: (gender?: Gender) => void;

  private presenter: IzenakPresenter = new IzenakPresenter(izenak as INameDto[]);

  public created(): void {
    this.presenter.attach(this);
    this.initializeFilter(this.genderFilter);
  }

  public setNames(names: Name[]): void {
    this.names = names;
  }
}
</script>

<style>
.home__link {
  display: block;
  flex-grow: 1;
  text-decoration: none;
  font-size: 2em;
  padding: 2em;
}
</style>
