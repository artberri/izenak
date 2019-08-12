import { injectable } from 'inversify';
import { BasePresenter } from '../../base.presenter';
import { INameFilterView } from './name-filter.view';

@injectable()
export class NameFilterPresenter extends BasePresenter<INameFilterView> {
  public onKeyPressedOnInput(): void {
    this.filterByTerm();
  }

  public onSearchInputChanged(): void {
    this.filterByTerm();
  }

  public onKeyPressedOnStartsWithInput(): void {
    this.filterByStartingChars();
  }

  public onStartsWithInputChanged(): void {
    this.filterByStartingChars();
  }

  public onKeyPressedOnEndsWithInput(): void {
    this.filterByEndingChars();
  }

  public onEndsWithInputChanged(): void {
    this.filterByEndingChars();
  }

  public onCharLengthSliderChanged(): void {
    this.view.filterStore.filterByCharRange(this.view.charLengthRange);
  }

  public onOnlyBasqueToggled(): void {
    this.view.filterStore.filterByOnlyBasque(this.view.onlyBasque);
  }

  public onOrderByAlphabeticalToggled(): void {
    this.view.filterStore.orderAlphabetically(this.view.alphabetical);
  }

  public onResetFiltersClicked(): void {
    this.view.filterStore.resetFilters();
    this.view.onlyBasque = this.view.filterStore.filter.onlyBasque;
    this.view.searchTerm = this.view.filterStore.filter.searchTerm;
    this.view.startsWith = this.view.filterStore.filter.startsWith;
    this.view.endsWith = this.view.filterStore.filter.endsWith;
    this.view.charLengthRange = [this.view.filterStore.filter.minChars, this.view.filterStore.filter.maxChars];
    this.view.alphabetical = this.view.filterStore.filter.alphabetical;
  }

  protected init(): void {}

  private filterByTerm(): void {
    this.view.filterStore.filterByTerm(this.view.searchTerm);
  }

  private filterByStartingChars(): void {
    this.view.filterStore.filterByStartingChars(this.view.startsWith);
  }

  private filterByEndingChars(): void {
    this.view.filterStore.filterByEndingChars(this.view.endsWith);
  }
}
