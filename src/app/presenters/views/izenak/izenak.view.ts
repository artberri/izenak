import { GenderFilter, Name } from '../../../model';
import { IFilterStore, IFavouritesStore } from '../../../services';

export interface IIzenakUserActions {
  onNameClicked(name: Name): void;
  onNameClosed(): void;
}

export interface IIzenakView extends IIzenakUserActions {
  names: Name[];
  genderFilter: GenderFilter;
  filterStore: IFilterStore;
  favouritesStore: IFavouritesStore;
  selectedName?: Name;
}
