import { Module, VuexModule, Mutation } from 'vuex-module-decorators';
import { GenderFilter, IFilter, IFilterStore } from '../../../app';

@Module({
  name: 'filter',
  namespaced: true,
})
export default class FilterStore extends VuexModule implements IFilterStore {
  public gender: GenderFilter = 'all';
  public searchTerm: string = '';

  public get filter(): IFilter {
    return {
      gender: this.gender,
      searchTerm: this.searchTerm,
    };
  }

  @Mutation
  public initializeFilter(gender: GenderFilter) {
    this.gender = gender;
    this.searchTerm = '';
  }

  @Mutation
  public resetFilters() {
    this.searchTerm = '';
  }

  @Mutation
  public filterByTerm(searchTerm: string) {
    this.searchTerm = searchTerm;
  }
}
