export interface IFavouritesStore {
  favourites: string[];
  toggleFavourite(favourite: string): void;
}
