import { BasePresenter } from '../../base.presenter';
import { DI } from '../../../di';
import { IIzenakView } from './index';
import { Name, Gender, IFilter } from '../../../model';
import { INameRepository } from '../../../services';
import { getRandomElementsFromArray } from '../../../utils';
import { injectable, inject } from 'inversify';

const MAX_NAMES = 10;

@injectable()
export class IzenakPresenter extends BasePresenter<IIzenakView> {
  private readonly allnames: Name[];

  constructor(
    @inject(DI.INameRepository) nameRepository: INameRepository,
  ) {
    super();
    this.allnames = nameRepository.getAllNames();
  }

  public get names(): Name[] {
    const filter = this.view.filterStore.filter;
    return this.getFiltered(filter);
  }

  protected init(): void {
    this.view.filterStore.initializeFilter(this.view.genderFilter);
  }

  private getFiltered(filter: IFilter): Name[] {
    const names = this.allnames.filter((n) => {
      if (filter.gender === 'male' && n.gender === Gender.Female) {
        return false;
      }

      if (filter.gender === 'female' && n.gender === Gender.Male) {
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
