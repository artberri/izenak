import { BasePresenter } from '../../base.presenter';
import { DI } from '../../../di';
import { IIzenakView } from './index';
import { Name, Gender, IFilter } from '../../../model';
import { INameRepository } from '../../../services';
import { shuffle } from '../../../utils';
import { injectable, inject } from 'inversify';

@injectable()
export class IzenakPresenter extends BasePresenter<IIzenakView> {
  private allnames!: Name[];

  constructor(
    @inject(DI.INameRepository) private readonly nameRepository: INameRepository,
  ) {
    super();
  }

  public get names(): Name[] {
    const filter = this.view.filterStore.filter;
    return this.filteredNames.slice(0, filter.maxShown);
  }

  public get showMoreButton(): boolean {
    return this.filteredNames.length > this.names.length;
  }

  private get filteredNames(): Name[] {
    const filter = this.view.filterStore.filter;
    return this.getFiltered(filter);
  }

  public onNameClicked(name: Name): void {
    this.view.selectedName = name;
  }

  public onNameClosed(): void {
    this.view.selectedName = undefined;
  }

  public onNextClicked(): void {
    if (!this.view.selectedName) {
      return;
    }
    const indexOfSelectedName = this.getIndexOfSelectedName();
    if (indexOfSelectedName >= this.names.length - 1) {
      this.view.selectedName = undefined;
      return;
    }

    this.view.selectedName = this.names[indexOfSelectedName + 1];
  }

  public onPreviousClicked(): void {
    if (!this.view.selectedName) {
      return;
    }
    const indexOfSelectedName = this.getIndexOfSelectedName();
    if (indexOfSelectedName <= 0) {
      this.view.selectedName = undefined;
      return;
    }

    this.view.selectedName = this.names[indexOfSelectedName - 1];
  }

  public onPageFilterChanged(): void {
    this.view.filterStore.filterByPage(this.view.pageFilter);
  }

  protected init(): void {
    this.allnames = shuffle(this.nameRepository.getAllNames());
    this.view.filterStore.filterByPage(this.view.pageFilter);
  }

  private getIndexOfSelectedName(): number {
    return this.view.selectedName ? this.names.indexOf(this.view.selectedName) : -1;
  }

  private getFiltered(filter: IFilter): Name[] {
    const favourites = this.view.favouritesStore.favourites;
    return this.allnames.filter((n) => {
      if (filter.page === 'male' && n.gender === Gender.Female) {
        return false;
      }

      if (filter.page === 'female' && n.gender === Gender.Male) {
        return false;
      }

      if (filter.page === 'favourites' && favourites.indexOf(n.key) < 0) {
        return false;
      }

      if (filter.onlyBasque && n.translations !== '') {
        return false;
      }

      const nameLength = n.text.length;
      if (filter.minChars > 0 && nameLength < filter.minChars) {
        return false;
      }
      if (filter.maxChars > 0 && nameLength > filter.maxChars) {
        return false;
      }

      const name = n.text.toLowerCase();
      const searchTerm = filter.searchTerm.toLowerCase();
      if (searchTerm !== '' && name.indexOf(searchTerm) === -1) {
        return false;
      }
      const startsWith = filter.startsWith.toLowerCase();
      if (startsWith !== '' && name.indexOf(startsWith) !== 0) {
        return false;
      }
      const endsWith = filter.endsWith.toLowerCase();
      if (endsWith !== '' && (name.lastIndexOf(endsWith) + endsWith.length) !== name.length) {
        return false;
      }

      return true;
    });
  }
}
