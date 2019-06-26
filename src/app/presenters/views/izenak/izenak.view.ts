import { GenderFilter, IFilter, Name } from '../../../model';
import { IFilterStore } from '../../../services';

export interface IIzenakView {
  names: Name[];
  genderFilter: GenderFilter;
  filterStore: IFilterStore;
}
