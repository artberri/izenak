import { injectable } from 'inversify';

@injectable()
export abstract class BasePresenter<V> {
  protected View!: V;

  public attach(view: V): void {
    this.View = view;
    this.init();
  }

  protected abstract init(): void;

  protected get view(): V {
    return this.View;
  }
}
