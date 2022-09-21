import { injectable } from 'inversify';
import { BasePresenter } from '../../base.presenter';
import { INameCardView } from './name-card.view';

@injectable()
export class NameCardPresenter extends BasePresenter<INameCardView> {
  public get isFavourite(): boolean {
    return this.view.favouritesStore.favourites.indexOf(this.view.name.key) >= 0;
  }

  public onToggleFavourite(): void {
    this.view.favouritesStore.toggleFavourite(this.view.name.key);
  }

  protected init(): void {}
}
