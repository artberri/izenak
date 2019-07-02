import { injectable } from 'inversify';
import { BasePresenter } from '../../base.presenter';
import { INameTagView } from './name-tag.view';

@injectable()
export class NameTagPresenter extends BasePresenter<INameTagView> {
  public get isFavourite(): boolean {
    return this.view.favouritesStore.favourites.indexOf(this.view.name.key) >= 0;
  }

  protected init(): void {}
}
