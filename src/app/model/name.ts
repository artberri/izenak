import { INameDto } from './types';
import { Gender } from './enums';

export class Name {
  public readonly text: string;
  public readonly gender: Gender;

  constructor(
    name: INameDto,
  ) {
    this.text = name.name;
    this.gender = name.gender === 'emakumezkoa' ? Gender.Female : Gender.Male;
  }
}
