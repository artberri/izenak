import { IFilterStore } from '../../../services';

export interface INameFilterUserActions {
  onSearchInputChanged(): void;
}

export interface INameFilterView extends INameFilterUserActions {
  filterStore: IFilterStore;
  searchTerm: string;
}
