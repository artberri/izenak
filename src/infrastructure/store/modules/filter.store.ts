import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { GenderFilter, IFilter, IFilterStore } from '../../../app';

@Module({
  name: 'filter',
  namespaced: true,
})
export default class FilterStore extends VuexModule implements IFilterStore {
  public gender: GenderFilter = 'all';
  public searchTerm: string = '';
  public minChars: number = 0;
  public maxChars: number = 0;
  public onlyBasque: boolean = false;
  public startsWith: string = '';
  public endsWith: string = '';

  public get filter(): IFilter {
    return {
      gender: this.gender,
      searchTerm: this.searchTerm,
      minChars: this.minChars,
      maxChars: this.maxChars,
      onlyBasque: this.onlyBasque,
      startsWith: this.startsWith,
      endsWith: this.endsWith,
    };
  }

  @Mutation
  public filterByGender(gender: GenderFilter) {
    this.gender = gender;
  }

  @Mutation
  public resetFilters() {
    this.searchTerm = '';
    this.minChars = 0;
    this.maxChars = 0;
    this.onlyBasque = false;
    this.startsWith = '';
    this.endsWith = '';
  }

  @Mutation
  public filterByTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }

  @Mutation
  public filterByCharRange(charRange: [number, number]) {
    this.minChars = charRange[0];
    this.maxChars = charRange[1];
  }

  @Mutation
  public filterByOnlyBasque(onlyBasque: boolean) {
    this.onlyBasque = onlyBasque;
  }

  @Mutation
  public filterByStartingChars(chars: string): void {
    this.startsWith = chars;
  }

  @Mutation
  public filterByEndingChars(chars: string): void {
    this.endsWith = chars;
  }
}
