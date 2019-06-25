import { IFilter, GenderFilter } from '../model';

export const initializeFilter = (state: IFilter, gender: GenderFilter) => {
    state.gender = gender;
    state.searchTerm = '';
};

export const resetFilters = (state: IFilter) => {
    state.searchTerm = '';
};

export const filterByTerm = (state: IFilter, searchTerm: string) => {
    state.searchTerm = searchTerm;
};
