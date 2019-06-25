import { injectable } from 'inversify';
import { BasePresenter } from '../../base.presenter';
import { INameFilterView } from './name-filter.view';

@injectable()
export class NameFilterPresenter extends BasePresenter<INameFilterView> {
  public search(): void {
    this.view.applyFilterByTermMutation(this.view.searchTerm);
  }

  protected init(): void {
    this.view.applyResetFiltersMutation();
  }
}
