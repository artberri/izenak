import sinon from 'sinon';
import { INameCardView, IFavouritesStore, Name } from '@/app';

export class NameCardViewMock implements INameCardView {
    public favouritesStore!: IFavouritesStore;
    public name!: Name;
    public onToggleFavourite: () => void = sinon.fake();
}
