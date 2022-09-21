
import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { IFavouritesStore } from '../../../app';

@Module({
  name: 'favourites',
  namespaced: true,
})
export default class FavouritesStore extends VuexModule implements IFavouritesStore {
  public favouritesObject: { [s: string]: boolean; } = {};

  public get favourites(): string[] {
    return Object.keys(this.favouritesObject);
  }

  @Mutation
  public toggleFavourite(favourite: string) {
    if (this.favouritesObject[favourite]) {
      const { [favourite]: value, ...withoutFavourite } = this.favouritesObject;
      this.favouritesObject = withoutFavourite;
      return;
    }

    const newFavouriteObject: { [s: string]: boolean; } = {};
    newFavouriteObject[favourite] = true;

    this.favouritesObject = Object.assign({}, this.favouritesObject, newFavouriteObject);
  }
}
