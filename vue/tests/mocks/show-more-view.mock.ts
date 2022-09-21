import sinon from 'sinon';
import { IShowMoreView, IFilterStore } from '@/app';

export class ShowMoreViewMock implements IShowMoreView {
    public filterStore!: IFilterStore;
    public onShowMoreButtonClicked: () => void = sinon.fake();
}
