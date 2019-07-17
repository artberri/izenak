import { INameRepository, Name, Gender } from '@/app';
import { INameDto } from './name.dto.js';

import { injectable } from 'inversify';

@injectable()
export class NameLocalRepository implements INameRepository {
  private readonly names: Name[];

  constructor(allnames: INameDto[]) {
    this.names = allnames.map((n) => new Name({
      name: n.name,
      gender: n.gender === 'emakumezkoa' ? Gender.Female : Gender.Male,
      meaning: n.meaning,
      translations: n.translations,
    }));
  }

  public getAllNames(): Name[] {
    return this.names;
  }
}
