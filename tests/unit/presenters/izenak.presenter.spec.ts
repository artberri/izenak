import 'reflect-metadata';
import { expect } from 'chai';
import { IzenakPresenter, IIzenakView, Name, Gender, PageFilter } from '@/app';
import { IzenakViewMock } from '../../mocks/izenak-view.mock';
import { NameRepositoryMock } from '../../mocks/name-repository.mock';
import { FilterStore, FavouritesStore } from '@/infrastructure';

describe('IzenakPresenter', () => {
  let izenakPresenter: IzenakPresenter;
  let izenakViewMock: IIzenakView;
  let filterStore: FilterStore;
  let favouritesStore: FavouritesStore;
  let nameRepositoryMock: NameRepositoryMock;

  beforeEach(() => {
    nameRepositoryMock = new NameRepositoryMock();
    filterStore = new FilterStore({});
    favouritesStore = new FavouritesStore({});
    izenakPresenter = new IzenakPresenter(nameRepositoryMock);
    izenakViewMock = new IzenakViewMock();
    izenakViewMock.filterStore = filterStore;
    izenakViewMock.favouritesStore = favouritesStore;
  });

  describe('As soon as the view is attached', () => {
    it('has not a selected name', () => {
      izenakPresenter.attach(izenakViewMock);

      expect(izenakViewMock.selectedName).to.eql(undefined);
    });

    it('sets the page filter', () => {
      filterStore.page = 'female';
      filterStore.searchTerm = 'keep';
      filterStore.minChars = 2;
      filterStore.maxChars = 5;
      filterStore.onlyBasque = true;

      izenakViewMock.pageFilter = 'male';
      izenakPresenter.attach(izenakViewMock);

      expect(filterStore.filter.page).to.equal('male');
      expect(filterStore.filter.searchTerm).to.equal('keep');
      expect(filterStore.filter.minChars).to.equal(2);
      expect(filterStore.filter.maxChars).to.equal(5);
      expect(filterStore.filter.onlyBasque).to.equal(true);
      expect(filterStore.filter.maxShown).to.equal(100);
    });
  });

  describe('On page filter changed', () => {
    beforeEach(() => {
      filterStore.page = 'female';
      filterStore.searchTerm = 'keep';
      filterStore.minChars = 2;
      filterStore.maxChars = 5;
      filterStore.onlyBasque = true;
      filterStore.maxShown = 200;

      nameRepositoryMock.willReturnWhenGetAllNamesIsCalled(nameSamples());
      izenakPresenter.attach(izenakViewMock);
    });

    it('sets the page filter', () => {
      izenakViewMock.pageFilter = 'male';
      izenakPresenter.onPageFilterChanged();

      expect(filterStore.filter.page).to.equal('male');
    });

    it('resets the page maximum items shown', () => {
      izenakViewMock.pageFilter = 'male';
      izenakPresenter.onPageFilterChanged();

      expect(filterStore.filter.maxShown).to.equal(100);
    });
  });

  describe('Given a repository with a name sample that contains 3 male and 4 female names', () => {
    beforeEach(() => {
      nameRepositoryMock.willReturnWhenGetAllNamesIsCalled(nameSamples());
      izenakPresenter.attach(izenakViewMock);
    });

    const theories: Array<[PageFilter, string, number, number, boolean, string, string, string[]]> = [
      ['all', '', 0, 0, false, '', '', ['Albertta', 'Amets', 'Onintza', 'Itxaso', 'Albertto', 'Markel', 'Adur']],
      ['female', '', 0, 0, false, '', '', ['Albertta', 'Amets', 'Onintza', 'Itxaso']],
      ['male', '', 0, 0, false, '', '', ['Albertto', 'Markel', 'Adur']],
      ['all', 'tt', 0, 0, false, '', '', ['Albertta', 'Albertto']],
      ['female', 'tt', 0, 0, false, '', '', ['Albertta']],
      ['male', 'tt', 0, 0, false, '', '', ['Albertto']],
      ['all', 'o', 0, 0, false, '', '', ['Onintza', 'Itxaso', 'Albertto']],
      ['female', 'o', 0, 0, false, '', '', ['Onintza', 'Itxaso']],
      ['male', 'o', 0, 0, false, '', '', ['Albertto']],
      ['all', 'x', 0, 0, false, '', '', ['Itxaso']],
      ['female', 'x', 0, 0, false, '', '', ['Itxaso']],
      ['male', 'x', 0, 0, false, '', '', []],

      ['all', '', 0, 0, true, '', '', ['Albertta', 'Itxaso', 'Markel']],
      ['female', '', 0, 0, true, '', '', ['Albertta', 'Itxaso']],
      ['male', '', 0, 0, true, '', '', ['Markel']],
      ['all', 'tt', 0, 0, true, '', '', ['Albertta']],
      ['female', 'tt', 0, 0, true, '', '', ['Albertta']],
      ['male', 'tt', 0, 0, true, '', '', []],
      ['all', 'o', 0, 0, true, '', '', ['Itxaso']],
      ['female', 'o', 0, 0, true, '', '', ['Itxaso']],
      ['male', 'o', 0, 0, true, '', '', []],
      ['all', 'x', 0, 0, true, '', '', ['Itxaso']],
      ['female', 'x', 0, 0, true, '', '', ['Itxaso']],

      ['all', '', 5, 7, false, '', '', ['Amets', 'Onintza', 'Itxaso', 'Markel']],
      ['female', '', 5, 7, false, '', '', ['Amets', 'Onintza', 'Itxaso']],
      ['male', '', 7, 0, false, '', '', ['Albertto']],
      ['all', 'tt', 9, 0, false, '', '', []],
      ['female', 'tt', 3, 9, false, '', '', ['Albertta']],
      ['male', 'tt', 3, 9, true, '', '', []],
      ['all', 'o', 0, 7, true, '', '', ['Itxaso']],
      ['female', 'o', 0, 6, false, '', '', ['Itxaso']],

      ['all', '', 0, 0, false, 'al', 'a', ['Albertta']],
      ['female', '', 0, 0, false, 'a', '', ['Albertta', 'Amets']],
      ['male', '', 0, 0, false, '', 'ur', ['Adur']],
      ['all', '', 0, 0, false, '', 'o', ['Itxaso', 'Albertto']],
      ['all', '', 0, 0, false, '', 'so', ['Itxaso']],
      ['all', '', 5, 7, false, 'f', '', []],
      ['female', '', 5, 7, false, '', 'g', []],

      ['favourites', '', 0, 0, false, '', '', ['Albertta', 'Albertto']],
      ['favourites', 'tt', 0, 0, false, '', '', ['Albertta', 'Albertto']],
      ['favourites', 'o', 3, 9, false, '', '', ['Albertto']],
    ];

    const favourites: { [s: string]: boolean; } = {
      Alberttomale: true,
      Alberttafemale: true,
      Itxasomale: true,
      Adurfemale: true,
    };

    theories.forEach(
      ([pageFilter, searchTerm, minChars, maxChars, onlyBasque, startsWith, endsWith, expectedNames]) => {

      it(`returns ${expectedNames.length ? expectedNames.join(', ') : 'no'} names
          when page filter is '${pageFilter}'
          and the search term is '${searchTerm}'
          and ${onlyBasque ? 'has' : 'does not have' } only basque names
          and name length greater or equal to ${minChars} ${maxChars > 0
            ? 'and smaller or equal to ' + maxChars
            : '' }
          and starts with '${startsWith}'
          and ends with '${endsWith}'
          and favourites are '${Object.keys(favourites).join(', ')}'`,
        () => {

        filterStore.page = pageFilter;
        filterStore.searchTerm = searchTerm;
        filterStore.minChars = minChars;
        filterStore.maxChars = maxChars;
        filterStore.onlyBasque = onlyBasque;
        filterStore.startsWith = startsWith;
        filterStore.endsWith = endsWith;

        favouritesStore.favouritesObject = favourites;

        expect(izenakPresenter.names.map((n) => n.text).sort()).to.eql(expectedNames.sort());
      });
    });
  });

  describe('On name clicked', () => {
    let names: Name[];
    beforeEach(() => {
      names = nameSamples();
      nameRepositoryMock.willReturnWhenGetAllNamesIsCalled(names);
      izenakPresenter.attach(izenakViewMock);
    });

    it('sets the clicked name as the selected one', () => {
      izenakPresenter.onNameClicked(names[1]);

      expect(izenakViewMock.selectedName).to.eql(names[1]);
    });
  });

  describe('On name closed', () => {
    let names: Name[];
    beforeEach(() => {
      names = nameSamples();
      nameRepositoryMock.willReturnWhenGetAllNamesIsCalled(names);
      izenakPresenter.attach(izenakViewMock);
    });

    it('sets the selected name to undefined', () => {
      izenakViewMock.selectedName = names[0];
      izenakPresenter.onNameClosed();

      expect(izenakViewMock.selectedName).to.eql(undefined);
    });
  });

  describe('On next name clicked', () => {
    let names: Name[];
    beforeEach(() => {
      names = nameSamples();
      nameRepositoryMock.willReturnWhenGetAllNamesIsCalled(names);
      izenakPresenter.attach(izenakViewMock);
    });

    it('keeps the selection to undefined if no name is currently selected', () => {
      izenakViewMock.selectedName = undefined;
      izenakPresenter.onNextClicked();

      expect(izenakViewMock.selectedName).to.eql(undefined);
    });

    it('sets the selected name to the next one in the list', () => {
      izenakViewMock.selectedName = names[0];
      izenakPresenter.onNextClicked();

      expect(izenakViewMock.selectedName).to.eql(names[1]);
    });

    it('sets the selected name to undefined if the last name is the current selection', () => {
      izenakViewMock.selectedName = names[6];
      izenakPresenter.onNextClicked();

      expect(izenakViewMock.selectedName).to.eql(undefined);
    });
  });

  describe('On previous name clicked', () => {
    let names: Name[];
    beforeEach(() => {
      names = nameSamples();
      nameRepositoryMock.willReturnWhenGetAllNamesIsCalled(names);
      izenakPresenter.attach(izenakViewMock);
    });

    it('keeps the selection to undefined if no name is currently selected', () => {
      izenakViewMock.selectedName = undefined;
      izenakPresenter.onPreviousClicked();

      expect(izenakViewMock.selectedName).to.eql(undefined);
    });

    it('sets the selected name to the previous one in the list', () => {
      izenakViewMock.selectedName = names[1];
      izenakPresenter.onPreviousClicked();

      expect(izenakViewMock.selectedName).to.eql(names[0]);
    });

    it('sets the selected name to undefined if the first name is the current selection', () => {
      izenakViewMock.selectedName = names[0];
      izenakPresenter.onPreviousClicked();

      expect(izenakViewMock.selectedName).to.eql(undefined);
    });
  });
});

function nameSamples(): Name[] {
  return [
    new Name({
      gender: Gender.Male,
      name: 'Albertto',
      meaning: '',
      translations: 'ithas',
    }),
    new Name({
      gender: Gender.Female,
      name: 'Albertta',
      meaning: '',
      translations: '',
    }),
    new Name({
      gender: Gender.Male,
      name: 'Markel',
      meaning: '',
      translations: '',
    }),
    new Name({
      gender: Gender.Male,
      name: 'Adur',
      meaning: '',
      translations: 'ithas',
    }),
    new Name({
      gender: Gender.Female,
      name: 'Amets',
      meaning: '',
      translations: 'ithas',
    }),
    new Name({
      gender: Gender.Female,
      name: 'Onintza',
      meaning: '',
      translations: 'ithas',
    }),
    new Name({
      gender: Gender.Female,
      name: 'Itxaso',
      meaning: '',
      translations: '',
    }),
  ];
}
