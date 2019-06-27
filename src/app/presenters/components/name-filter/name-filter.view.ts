import { IFilterStore } from '../../../services';

export interface INameFilterUserActions {
  onSearchInputChanged(): void;
  onKeyPressedOnInput(): void;
  onCharLengthSliderChanged(): void;
  onHasTranslationsToggled(): void;
}

export interface INameFilterView extends INameFilterUserActions {
  filterStore: IFilterStore;
  searchTerm: string;
  charLengthRange: [number, number];
  hasTranslationsChecked: boolean;
}
