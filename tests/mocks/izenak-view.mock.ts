import { IFilterStore, IIzenakView, GenderFilter, Name } from '@/app';

export class IzenakViewMock implements IIzenakView {
    public names!: Name[];
    public genderFilter!: GenderFilter;
    public filterStore!: IFilterStore;
}
