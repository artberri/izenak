import sinon from 'sinon';
import { INameFilterView, IFilterStore } from '@/app';

export class NameFilterViewMock implements INameFilterView {
    public filterStore!: IFilterStore;
    public searchTerm!: string;
    public charLengthRange!: [number, number];
    public hasTranslationsChecked!: boolean;
    public onSearchInputChanged: () => void = sinon.fake();
    public onKeyPressedOnInput: () => void = sinon.fake();
    public onCharLengthSliderChanged: () => void = sinon.fake();
    public onHasTranslationsToggled: () => void = sinon.fake();
}
