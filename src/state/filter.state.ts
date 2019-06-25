import { Module } from 'vuex';
import { IFilter, initializeFilter, resetFilters, filterByTerm } from '@/app';
import { IRootState } from './types';

const namespaced: boolean = true;

export const state: IFilter = {
  gender: 'all',
  searchTerm: '',
};

export const filter: Module<IFilter, IRootState> = {
  namespaced,
  state,
  mutations: {
    initializeFilter,
    resetFilters,
    filterByTerm,
  },
};
