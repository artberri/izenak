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
