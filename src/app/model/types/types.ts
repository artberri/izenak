export type Type<T = {}> = new(...args: any[]) => T;
export type PageFilter = 'male' | 'female' | 'all' | 'favourites';
