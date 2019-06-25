import { diContainer, DI } from '../../../di';
import { Type } from '../../../model';
import { INameFilterUserActions } from './name-filter.view';
import { NameFilterPresenter } from './name-filter.presenter';

export function NameFilterMixin<TBase extends Type>(base: TBase) {
  return class extends base implements INameFilterUserActions {
    public onSearchInputChanged(): void {
      const presenter: NameFilterPresenter = diContainer.get<NameFilterPresenter>(DI.NameFilterPresenter);
      presenter.search();
    }
  };
}
