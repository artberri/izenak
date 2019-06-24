import { IFilter, Gender } from '../model';

export const initializeFilter = (state: IFilter, gender?: Gender) => {
    state.gender = gender;
};
