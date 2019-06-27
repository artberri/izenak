import { BasePresenter } from '../../base.presenter';
import { DI } from '../../../di';
import { IIzenakView } from './index';
import { Name, Gender, IFilter } from '../../../model';
import { INameRepository } from '../../../services';
import { getRandomElementsFromArray } from '../../../utils';
import { injectable, inject } from 'inversify';

const MAX_NAMES = 100;

@injectable()
export class IzenakPresenter extends BasePresenter<IIzenakView> {
  private allnames!: Name[];

  constructor(
    @inject(DI.INameRepository) private readonly nameRepository: INameRepository,
  ) {
    super();
  }

  public get names(): Name[] {
    if (this.allnames === undefined) {
      this.allnames = this.nameRepository.getAllNames();
    }
    const filter = this.view.filterStore.filter;
    return this.getFiltered(filter);
  }

  protected init(): void {
    this.view.filterStore.filterByGender(this.view.genderFilter);
  }

  private getFiltered(filter: IFilter): Name[] {
    const names = this.allnames.filter((n) => {
      if (filter.gender === 'male' && n.gender === Gender.Female) {
        return false;
      }

      if (filter.gender === 'female' && n.gender === Gender.Male) {
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

      return true;
    });

    return getRandomElementsFromArray(names, MAX_NAMES);
  }
}
