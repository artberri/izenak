import { injectable } from 'inversify';
import { BasePresenter } from '../../base.presenter';
import { IShowMoreView } from './show-more.view';

@injectable()
export class ShowMorePresenter extends BasePresenter<IShowMoreView> {
  public onShowMoreButtonClicked(): void {
    this.view.filterStore.showMore();
  }

  protected init(): void {}
}
