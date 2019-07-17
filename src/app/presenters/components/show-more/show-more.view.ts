import { IFilterStore } from '../../../services';

export interface IShowMoreUserActions {
  onShowMoreButtonClicked(): void;
}

export interface IShowMoreView extends IShowMoreUserActions {
  filterStore: IFilterStore;
}
