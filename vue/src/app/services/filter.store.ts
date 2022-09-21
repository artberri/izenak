import { IFilter, PageFilter } from '../model';

export interface IFilterStore {
  filter: IFilter;
  filterByPage(gender: PageFilter): void;
  resetFilters(): void;
  filterByTerm(searchTerm: string): void;
  filterByCharRange(charRange: [number, number]): void;
  filterByOnlyBasque(onlyBasque: boolean): void;
  filterByStartingChars(chars: string): void;
  filterByEndingChars(chars: string): void;
  orderAlphabetically(alphabeticalOrder: boolean): void;
  showMore(): void;
}
