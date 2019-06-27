import 'reflect-metadata';
import { expect } from 'chai';
import { NameFilterPresenter, INameFilterView } from '@/app';
import { NameFilterViewMock } from '../mocks/name-filter-view.mock';
import { FilterStore } from '@/infrastructure';

describe('NameFilterPresenter', () => {
  let nameFilterPresenter: NameFilterPresenter;
  let nameFilterViewMock: INameFilterView;
  let filterStore: FilterStore;

  beforeEach(() => {
    filterStore = new FilterStore({});
    nameFilterPresenter = new NameFilterPresenter();
    nameFilterViewMock = new NameFilterViewMock();
    nameFilterViewMock.filterStore = filterStore;
  });

  describe('As soon as the view is attached', () => {
    it('resets the filter except gender', () => {
      filterStore.gender = 'female';
      filterStore.searchTerm = 'thisshouldbedeleted';
      filterStore.minChars = 2;
      filterStore.maxChars = 5;
      filterStore.onlyBasque = true;

      nameFilterPresenter.attach(nameFilterViewMock);

      expect(filterStore.filter.gender).to.equal('female');
      expect(filterStore.filter.searchTerm).to.equal('');
      expect(filterStore.filter.minChars).to.equal(0);
      expect(filterStore.filter.maxChars).to.equal(0);
      expect(filterStore.filter.onlyBasque).to.equal(false);
    });
  });

  describe('On search input changed', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the serch term in the filter', () => {
      nameFilterViewMock.searchTerm = 'bilaketa';
      nameFilterPresenter.onSearchInputChanged();

      expect(filterStore.filter.searchTerm).to.equal('bilaketa');
    });
  });

  describe('On keypressed on search input', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the serch term in the filter', () => {
      nameFilterViewMock.searchTerm = 'bilaketa2';
      nameFilterPresenter.onKeyPressedOnInput();

      expect(filterStore.filter.searchTerm).to.equal('bilaketa2');
    });
  });

  describe('On char length slider changed', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets min chars and the max chars in the filter', () => {
      nameFilterViewMock.charLengthRange = [4, 8];
      nameFilterPresenter.onCharLengthSliderChanged();

      expect(filterStore.filter.minChars).to.equal(4);
      expect(filterStore.filter.maxChars).to.equal(8);
    });
  });

  describe('On only basque checkbox toggled', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the only basque filter', () => {
      nameFilterViewMock.onlyBasque = true;
      nameFilterPresenter.onOnlyBasqueToggled();
      expect(filterStore.filter.onlyBasque).to.equal(true);

      nameFilterViewMock.onlyBasque = false;
      nameFilterPresenter.onOnlyBasqueToggled();
      expect(filterStore.filter.onlyBasque).to.equal(false);
    });
  });
});
