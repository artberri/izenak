import { IFavouritesStore } from '../../../services';
import { Name } from '../../../model';

export interface INameTagView {
  favouritesStore: IFavouritesStore;
  name: Name;
}
