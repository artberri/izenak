import 'reflect-metadata';
import { expect } from 'chai';
import { NameCardPresenter, INameCardView, Name, Gender } from '@/app';
import { NameCardViewMock } from '../../mocks/name-card-view.mock';
import { FavouritesStore } from '@/infrastructure';

describe('NameFilterPresenter', () => {
  let nameCardPresenter: NameCardPresenter;
  let nameCardViewMock: INameCardView;
  let favouritesStore: FavouritesStore;

  beforeEach(() => {
    favouritesStore = new FavouritesStore({});
    nameCardPresenter = new NameCardPresenter();
    nameCardViewMock = new NameCardViewMock();
    nameCardViewMock.favouritesStore = favouritesStore;
  });

  describe('On toggle favourite', () => {
    beforeEach(() => {
      nameCardPresenter.attach(nameCardViewMock);
    });

    it('toggles the favourite status', () => {
      nameCardViewMock.name = new Name({
        gender: Gender.Male,
        meaning: 'meaning',
        name: 'Test',
        translations: 'translations',
      });

      expect(nameCardPresenter.isFavourite).to.equal(false);

      nameCardPresenter.onToggleFavourite();
      expect(nameCardPresenter.isFavourite).to.equal(true);

      nameCardPresenter.onToggleFavourite();
      expect(nameCardPresenter.isFavourite).to.equal(false);
    });
  });
});
