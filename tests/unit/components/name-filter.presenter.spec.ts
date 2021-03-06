import 'reflect-metadata';
import { expect } from 'chai';
import { NameFilterPresenter, INameFilterView } from '@/app';
import { NameFilterViewMock } from '../../mocks/name-filter-view.mock';
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
    it('keeps the filter', () => {
      filterStore.page = 'female';
      filterStore.searchTerm = 'term';
      filterStore.minChars = 2;
      filterStore.maxChars = 5;
      filterStore.onlyBasque = true;
      filterStore.startsWith = 'starts';
      filterStore.endsWith = 'ends';
      filterStore.alphabetical = true;

      nameFilterPresenter.attach(nameFilterViewMock);

      expect(filterStore.filter.page).to.equal('female');
      expect(filterStore.filter.searchTerm).to.equal('term');
      expect(filterStore.filter.minChars).to.equal(2);
      expect(filterStore.filter.maxChars).to.equal(5);
      expect(filterStore.filter.onlyBasque).to.equal(true);
      expect(filterStore.filter.startsWith).to.equal('starts');
      expect(filterStore.filter.endsWith).to.equal('ends');
      expect(filterStore.filter.alphabetical).to.equal(true);
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

  describe('On starts with input changed', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the starts with term in the filter', () => {
      nameFilterViewMock.startsWith = 'starts';
      nameFilterPresenter.onStartsWithInputChanged();

      expect(filterStore.filter.startsWith).to.equal('starts');
    });
  });

  describe('On keypressed on starts with input', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the starts with term in the filter', () => {
      nameFilterViewMock.startsWith = 'starts2';
      nameFilterPresenter.onKeyPressedOnStartsWithInput();

      expect(filterStore.filter.startsWith).to.equal('starts2');
    });
  });

  describe('On ends with input changed', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the ends with term in the filter', () => {
      nameFilterViewMock.endsWith = 'ends';
      nameFilterPresenter.onEndsWithInputChanged();

      expect(filterStore.filter.endsWith).to.equal('ends');
    });
  });

  describe('On keypressed on ends with input', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the ends with term in the filter', () => {
      nameFilterViewMock.endsWith = 'ends2';
      nameFilterPresenter.onKeyPressedOnEndsWithInput();

      expect(filterStore.filter.endsWith).to.equal('ends2');
    });
  });

  describe('On order alphabetically checkbox toggled', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('sets the alphabetical filter', () => {
      nameFilterViewMock.alphabetical = true;
      nameFilterPresenter.onOrderByAlphabeticalToggled();
      expect(filterStore.filter.alphabetical).to.equal(true);

      nameFilterViewMock.alphabetical = false;
      nameFilterPresenter.onOrderByAlphabeticalToggled();
      expect(filterStore.filter.alphabetical).to.equal(false);
    });
  });

  describe('On reset filters clicked', () => {
    beforeEach(() => {
      nameFilterPresenter.attach(nameFilterViewMock);
    });

    it('resets all filters', () => {
      nameFilterViewMock.searchTerm = 'search';
      nameFilterViewMock.onlyBasque = true;
      nameFilterViewMock.startsWith = 'startsWith';
      nameFilterViewMock.endsWith = 'endsWith';
      nameFilterViewMock.charLengthRange = [4, 8];
      nameFilterViewMock.alphabetical = true;
      nameFilterPresenter.onResetFiltersClicked();

      expect(filterStore.filter.searchTerm).to.equal('');
      expect(nameFilterViewMock.searchTerm).to.equal('');
      expect(filterStore.filter.onlyBasque).to.equal(false);
      expect(nameFilterViewMock.onlyBasque).to.equal(false);
      expect(filterStore.filter.startsWith).to.equal('');
      expect(nameFilterViewMock.startsWith).to.equal('');
      expect(filterStore.filter.endsWith).to.equal('');
      expect(nameFilterViewMock.endsWith).to.equal('');
      expect(filterStore.filter.minChars).to.equal(2);
      expect(filterStore.filter.maxChars).to.equal(22);
      expect(nameFilterViewMock.charLengthRange).to.eql([2, 22]);
      expect(filterStore.filter.alphabetical).to.equal(false);
      expect(nameFilterViewMock.alphabetical).to.equal(false);
    });
  });
});
