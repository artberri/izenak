export type Type<T = {}> = new(...args: any[]) => T;
export type GenderFilter = 'male' | 'female' | 'all' | 'favourites';
