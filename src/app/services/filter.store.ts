import { IFilter, GenderFilter } from '../model';

export interface IFilterStore {
  filter: IFilter;
  initializeFilter(gender: GenderFilter): void;
  resetFilters(): void;
  filterByTerm(searchTerm: string): void;
}
