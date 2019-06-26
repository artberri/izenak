import { Gender } from './enums';

export interface INameOptions {
  name: string;
  gender: Gender;
}

export class Name {
  public readonly text: string;
  public readonly gender: Gender;

  constructor(
    options: INameOptions,
  ) {
    this.text = options.name;
    this.gender = options.gender;
  }
}
