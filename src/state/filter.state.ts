import { Module } from 'vuex';
import { IFilter, initializeFilter } from '@/app';
import { IRootState } from './types';

const namespaced: boolean = true;

export const state: IFilter = {
  gender: undefined,
};

export const filter: Module<IFilter, IRootState> = {
  namespaced,
  state,
  mutations: {
    initializeFilter,
  },
};
