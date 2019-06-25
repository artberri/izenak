import { GenderFilter, IFilter, Name } from '../../../model';

export interface IIzenakView {
  genderFilter: GenderFilter;
  filter: IFilter;
  initializeFilter: (gender: GenderFilter) => void;
  setNames: (names: Name[]) => void;
}
