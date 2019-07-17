import 'reflect-metadata';
import { expect } from 'chai';
import { ShowMorePresenter, IShowMoreView } from '@/app';
import { ShowMoreViewMock } from '../../mocks/show-more-view.mock';
import { FilterStore } from '@/infrastructure';

describe('ShowMorePresenter', () => {
  let showMorePresenter: ShowMorePresenter;
  let showMoreViewMock: IShowMoreView;
  let filterStore: FilterStore;

  beforeEach(() => {
    filterStore = new FilterStore({});
    showMorePresenter = new ShowMorePresenter();
    showMoreViewMock = new ShowMoreViewMock();
    showMoreViewMock.filterStore = filterStore;
  });

  describe('On show more button clicked', () => {
    beforeEach(() => {
      showMorePresenter.attach(showMoreViewMock);
    });

    it('increments the max shown on 100', () => {
      showMorePresenter.onShowMoreButtonClicked();

      expect(filterStore.filter.maxShown).to.equal(200);

      showMorePresenter.onShowMoreButtonClicked();
      showMorePresenter.onShowMoreButtonClicked();

      expect(filterStore.filter.maxShown).to.equal(400);
    });
  });
});
