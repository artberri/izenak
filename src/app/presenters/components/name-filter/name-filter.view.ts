import { IFilterStore } from '../../../services';

export interface INameFilterUserActions {
  onSearchInputChanged(): void;
  onKeyPressedOnInput(): void;
  onCharLengthSliderChanged(): void;
  onOnlyBasqueToggled(): void;
  onStartsWithInputChanged(): void;
  onEndsWithInputChanged(): void;
}

export interface INameFilterView extends INameFilterUserActions {
  filterStore: IFilterStore;
  searchTerm: string;
  charLengthRange: [number, number];
  onlyBasque: boolean;
  startsWith: string;
  endsWith: string;
}
