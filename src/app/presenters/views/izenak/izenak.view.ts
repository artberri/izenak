import { PageFilter, Name } from '../../../model';
import { IFilterStore, IFavouritesStore } from '../../../services';

export interface IIzenakUserActions {
  onNameClicked(name: Name): void;
  onNameClosed(): void;
  onPageChanged(): void;
}

export interface IIzenakView extends IIzenakUserActions {
  names: Name[];
  pageFilter: PageFilter;
  filterStore: IFilterStore;
  favouritesStore: IFavouritesStore;
  selectedName?: Name;
}
