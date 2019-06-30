import { IFilter, GenderFilter } from '../model';

export interface IFilterStore {
  filter: IFilter;
  filterByGender(gender: GenderFilter): void;
  resetFilters(): void;
  filterByTerm(searchTerm: string): void;
  filterByCharRange(charRange: [number, number]): void;
  filterByOnlyBasque(onlyBasque: boolean): void;
  filterByStartingChars(chars: string): void;
  filterByEndingChars(chars: string): void;
}
