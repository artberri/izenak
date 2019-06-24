import { BasePresenter } from './base.presenter';
import { IIzenakView } from '../views';
import { Name, INameDto } from '../model';
import { getRandomElementsFromArray } from '../utils';

const MAX_NAMES = 10;

export class IzenakPresenter extends BasePresenter<IIzenakView> {
  private readonly names: Name[];

  constructor(allnames: INameDto[]) {
    super();
    this.names = allnames.map((n) => new Name(n));
  }

  protected init(): void {
    this.view.initializeFilter(this.view.genderFilter);
    this.setRandomNames();
  }

  private getFiltered(): Name[] {
    const filter = this.view.filter;

    return this.names.filter((n) => {
      if (filter.gender !== undefined && filter.gender !== n.gender) {
        return false;
      }

      return true;
    });
  }

  private setRandomNames(): void {
    const names = getRandomElementsFromArray(this.getFiltered(), MAX_NAMES);
    this.view.setNames(names);
  }
}
