import { GenderFilter } from '../types';

export interface IFilter {
    gender: GenderFilter;
    searchTerm: string;
    minChars: number;
    maxChars: number;
    onlyBasque: boolean;
}
