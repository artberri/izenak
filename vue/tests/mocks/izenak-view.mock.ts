import sinon from 'sinon';
import { IFilterStore, IIzenakView, PageFilter, Name, IFavouritesStore } from '@/app';

export class IzenakViewMock implements IIzenakView {
    public names!: Name[];
    public showMoreButton!: boolean;
    public pageFilter!: PageFilter;
    public filterStore!: IFilterStore;
    public favouritesStore!: IFavouritesStore;
    public selectedName?: Name;
    public onNameClicked: (name: Name) => void = sinon.fake();
    public onNameClosed: () => void = sinon.fake();
    public onPageChanged: () => void = sinon.fake();
}
