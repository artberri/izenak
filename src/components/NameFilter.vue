<template>
  <section class="flex flex--v filter">
    <div class="flex">
      <Icon icon="icon-search" class="icon" />
      <label for="search">Iragazi</label>
      <input id="search" name="search" type="text" v-model="searchTerm" @change="onSearchInputChanged" />
    </div>
  </section>
</template>

<script lang="ts">
// tslint:disable:max-classes-per-file
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Mutation } from 'vuex-class';
import Icon from './Icon.vue';
import { IFilter, INameFilterView, NameFilterPresenter, NameFilterMixin, diContainer, DI } from '@/app';

const namespace: string = 'filter';

@Component
export class VueNameFilterMixin extends NameFilterMixin(Vue) {}

@Component({
  mixins: [VueNameFilterMixin],
  components: {
    Icon,
  },
})
export default class NameFilter extends VueNameFilterMixin implements INameFilterView {
  public searchTerm: string = '';

  @Mutation('filterByTerm', { namespace })
  public applyFilterByTermMutation!: (searchTerm: string) => void;

  @Mutation('resetFilters', { namespace })
  public applyResetFiltersMutation!: () => void;

  private presenter: NameFilterPresenter = diContainer.get<NameFilterPresenter>(DI.NameFilterPresenter);

  public created(): void {
    this.presenter.attach(this);
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

  & label {
    position: absolute;
    font-size: 1.3em;
    left: 50px;
    top: 12px;
  }

  & input {
    border: 0;
    font-size: 1.3em;
    width: 100%;
  }
}

.icon {
  margin: 4px 10px 0;
  font-size: 1.3em;
}
</style>
