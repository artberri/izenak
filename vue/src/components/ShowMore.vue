<template>
  <button class="showmore" @click="onShowMoreButtonClicked">
    <span>Gehiago ikusi</span>
  </button>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { diContainer } from '../main';
import { filterStore } from '../infrastructure';
import { IFilterStore, ShowMorePresenter, DI, IShowMoreView } from '@/app';

@Component
export default class ShowMore extends Vue implements IShowMoreView {
  public filterStore: IFilterStore = filterStore;

  private presenter: ShowMorePresenter = diContainer.get<ShowMorePresenter>(DI.ShowMorePresenter);

  public created(): void {
    this.presenter.attach(this);
  }

  public onShowMoreButtonClicked(): void {
    this.presenter.onShowMoreButtonClicked();
  }
}
</script>

<style scoped>
.showmore {
  border: 0;
  color: #888;
  background: transparent;
  text-decoration: underline;
  margin-bottom: 2em;
  font-size: 1.2em;
}
</style>
