import sinon from 'sinon';
import { IFilterStore, IIzenakView, GenderFilter, Name, IFavouritesStore } from '@/app';

export class IzenakViewMock implements IIzenakView {
    public names!: Name[];
    public genderFilter!: GenderFilter;
    public filterStore!: IFilterStore;
    public favouritesStore!: IFavouritesStore;
    public selectedName?: Name;
    public onNameClicked: (name: Name) => void = sinon.fake();
    public onNameClosed: () => void = sinon.fake();
}
