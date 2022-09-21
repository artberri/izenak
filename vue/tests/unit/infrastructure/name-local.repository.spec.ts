import 'reflect-metadata';
import { expect } from 'chai';

import { NameLocalRepository, INameDto } from '@/infrastructure';
import { Gender } from '@/app';

describe('NameLocalRepository', () => {
  let nameLocalRepository: NameLocalRepository;

  describe('On getting all names', () => {
    describe('when no names passed to the constructor', () => {
      beforeEach(() => {
        nameLocalRepository = new NameLocalRepository([]);
      });

      it('gets no names', () => {
        const names = nameLocalRepository.getAllNames();

        expect(names.length).to.equal(0);
      });
    });

    describe('when names passed to the constructor', () => {
      const nameInput: INameDto[] = [
        {
          name: 'Tomas',
          translations: 'Tomás (gaztelania), Thomas (frantsesa)',
          gender: 'gizonezkoa',
          hipocoristic: 'ez',
          meaning: 'meaning Tomas',
        },
        {
          name: 'Todor',
          translations: 'Todor (gaztelania), Todor (frantsesa), Todor (ingelesa), Toдор (bertakoa)',
          gender: 'gizonezkoa',
          hipocoristic: 'bai',
          meaning:  'meaning Todor',
        },
        {
          name: 'Haizea',
          translations: '',
          gender: 'emakumezkoa',
          hipocoristic: 'ez',
          meaning:  'meaning Haizea',
        },
      ];

      beforeEach(() => {
        nameLocalRepository = new NameLocalRepository(nameInput);
      });

      it('gets as many names as passed ', () => {
        const names = nameLocalRepository.getAllNames();

        expect(names.length).to.equal(nameInput.length);
      });

      it('gets properly translated genders ', () => {
        const names = nameLocalRepository.getAllNames();

        expect(names[0].gender).to.equal(Gender.Male);
        expect(names[1].gender).to.equal(Gender.Male);
        expect(names[2].gender).to.equal(Gender.Female);
      });

      it('gets properly setted names ', () => {
        const names = nameLocalRepository.getAllNames();

        expect(names[0].text).to.equal(nameInput[0].name);
        expect(names[1].text).to.equal(nameInput[1].name);
        expect(names[2].text).to.equal(nameInput[2].name);
      });

      it('gets properly setted translations ', () => {
        const names = nameLocalRepository.getAllNames();

        expect(names[0].translations).to.equal(nameInput[0].translations);
        expect(names[1].translations).to.equal(nameInput[1].translations);
        expect(names[2].translations).to.equal(nameInput[2].translations);
      });

      it('gets properly setted meaning ', () => {
        const names = nameLocalRepository.getAllNames();

        expect(names[0].meaning).to.equal(nameInput[0].meaning);
        expect(names[1].meaning).to.equal(nameInput[1].meaning);
        expect(names[2].meaning).to.equal(nameInput[2].meaning);
      });
    });
  });
});
