import { Container } from 'inversify';
import { NameFilterPresenter } from './presenters';

export const DI = {
  NameFilterPresenter : Symbol.for('NameFilterPresenter'),
};

const dic = new Container({ skipBaseClassChecks: true });
dic.bind<NameFilterPresenter>(DI.NameFilterPresenter).to(NameFilterPresenter);

export const diContainer = dic;
