import sinon from 'sinon';
import { INameRepository, Name } from '@/app';

export class NameRepositoryMock implements INameRepository {
    public getAllNames: sinon.SinonSpy<undefined[], Name[]> = sinon.fake.returns([]);

    public willReturnWhenGetAllNamesIsCalled(names: Name[]) {
        this.getAllNames = sinon.fake.returns(names);
    }
}
