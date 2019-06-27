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

  public onCharLengthSliderChanged(): void {
    this.view.filterStore.filterByCharRange(this.view.charLengthRange);
  }

  public onHasTranslationsToggled(): void {
    this.view.filterStore.filterByTranslations(this.view.hasTranslationsChecked);
  }

  protected init(): void {
    this.view.filterStore.resetFilters();
  }

  private filterByTerm(): void {
    this.view.filterStore.filterByTerm(this.view.searchTerm);
  }
}
