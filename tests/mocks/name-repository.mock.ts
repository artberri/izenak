import sinon from 'sinon';
import { INameRepository, Name } from '@/app';

export class NameRepositoryMock implements INameRepository {
    private getAllNamesMock: () => Name[] = sinon.fake.returns([]);

    public willReturnWhenGetAllNamesIsCalled(names: Name[]) {
        this.getAllNamesMock = sinon.fake.returns(names);
    }

    public getAllNames(): Name[] {
        return this.getAllNamesMock();
    }
}
