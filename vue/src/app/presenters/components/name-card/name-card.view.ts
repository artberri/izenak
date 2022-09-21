import { IFavouritesStore } from '../../../services';
import { Name } from '../../../model';

export interface INameCardUserActions {
  onToggleFavourite(): void;
}

export interface INameCardView extends INameCardUserActions {
  favouritesStore: IFavouritesStore;
  name: Name;
}
