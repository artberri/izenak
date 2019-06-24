import { Gender, IFilter, Name } from '../model';

export interface IIzenakView {
  genderFilter: Gender | undefined;
  filter: IFilter;
  initializeFilter: (gender?: Gender) => void;
  setNames: (names: Name[]) => void;
}
