import { PageFilter } from '../types';

export interface IFilter {
    maxShown: number;
    page: PageFilter;
    searchTerm: string;
    minChars: number;
    maxChars: number;
    onlyBasque: boolean;
    startsWith: string;
    endsWith: string;
}
