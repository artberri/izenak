import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { PageFilter, IFilter, IFilterStore } from '../../../app';

const maxShown: number = 100;
const minChars: number = 2;
const maxChars: number = 22;

@Module({
  name: 'filter',
  namespaced: true,
})
export default class FilterStore extends VuexModule implements IFilterStore {
  public maxShown: number = maxShown;
  public page: PageFilter = 'all';
  public searchTerm: string = '';
  public minChars: number = minChars;
  public maxChars: number = maxChars;
  public onlyBasque: boolean = false;
  public startsWith: string = '';
  public endsWith: string = '';
  public alphabetical: boolean = false;

  public get filter(): IFilter {
    return {
      maxShown: this.maxShown,
      page: this.page,
      searchTerm: this.searchTerm,
      minChars: this.minChars,
      maxChars: this.maxChars,
      onlyBasque: this.onlyBasque,
      startsWith: this.startsWith,
      endsWith: this.endsWith,
      alphabetical: this.alphabetical,
    };
  }

  @Mutation
  public filterByPage(page: PageFilter) {
    this.page = page;
    this.maxShown = maxShown;
  }

  @Mutation
  public resetFilters() {
    this.maxShown = maxShown;
    this.searchTerm = '';
    this.minChars = minChars;
    this.maxChars = maxChars;
    this.onlyBasque = false;
    this.startsWith = '';
    this.endsWith = '';
    this.alphabetical = false;
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

  @Mutation
  public showMore(): void {
    this.maxShown = this.maxShown + maxShown;
  }

  @Mutation
  public orderAlphabetically(alphabeticalOrder: boolean): void {
    this.alphabetical = alphabeticalOrder;
  }
}
