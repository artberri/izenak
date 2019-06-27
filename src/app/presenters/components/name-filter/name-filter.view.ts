import { IFilterStore } from '../../../services';

export interface INameFilterUserActions {
  onSearchInputChanged(): void;
  onKeyPressedOnInput(): void;
  onCharLengthSliderChanged(): void;
  onOnlyBasqueToggled(): void;
}

export interface INameFilterView extends INameFilterUserActions {
  filterStore: IFilterStore;
  searchTerm: string;
  charLengthRange: [number, number];
  onlyBasque: boolean;
}
