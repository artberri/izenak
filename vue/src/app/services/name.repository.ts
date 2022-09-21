import { Name } from '../model';

export interface INameRepository {
    getAllNames(): Name[];
}
