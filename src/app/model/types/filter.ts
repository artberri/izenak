import { GenderFilter } from '../types';

export interface IFilter {
    maxShown: number;
    gender: GenderFilter;
    searchTerm: string;
    minChars: number;
    maxChars: number;
    onlyBasque: boolean;
    startsWith: string;
    endsWith: string;
}
