import { Gender } from './enums';

export interface INameOptions {
  name: string;
  gender: Gender;
  translations: string;
  meaning: string;
}

export class Name {
  public readonly key: string;
  public readonly text: string;
  public readonly gender: Gender;
  public readonly translations: string;
  public readonly meaning: string;

  constructor(
    options: INameOptions,
  ) {
    this.key = options.name + options.gender.toString();
    this.text = options.name;
    this.gender = options.gender;
    this.translations = options.translations;
    this.meaning = options.meaning;
  }
}
