import sinon from 'sinon';
import { INameFilterView, IFilterStore } from '@/app';

export class NameFilterViewMock implements INameFilterView {
    public filterStore!: IFilterStore;
    public searchTerm!: string;
    public charLengthRange!: [number, number];
    public onlyBasque!: boolean;
    public startsWith!: string;
    public endsWith!: string;
    public onSearchInputChanged: () => void = sinon.fake();
    public onKeyPressedOnInput: () => void = sinon.fake();
    public onCharLengthSliderChanged: () => void = sinon.fake();
    public onOnlyBasqueToggled: () => void = sinon.fake();
    public onStartsWithInputChanged: () => void = sinon.fake();
    public onEndsWithInputChanged: () => void = sinon.fake();
    public onResetFiltersClicked: () => void = sinon.fake();
}
