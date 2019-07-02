import { GenderFilter, IFilter, Name } from '../../../model';
import { IFilterStore } from '../../../services';

export interface IIzenakUserActions {
  onNameClicked(name: Name): void;
  onNameClosed(): void;
}

export interface IIzenakView extends IIzenakUserActions {
  names: Name[];
  genderFilter: GenderFilter;
  filterStore: IFilterStore;
  selectedName?: Name;
}
