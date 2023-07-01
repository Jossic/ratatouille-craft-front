import { Dependencies } from '@ratatouille/modules/store/dependencies';
import { AppStore, createStore } from '@ratatouille/modules/store/store';
import { SystemIdProvider } from '@ratatouille/modules/core/system.id-provider';

export class App {
  public dependencies: Dependencies;
  public store: AppStore;

  constructor() {
    this.dependencies = this.setupDependencies();
    this.store = createStore({ dependencies: this.dependencies });
  }

  setupDependencies(): Dependencies {
    return {
      idProvider: new SystemIdProvider(),
    };
  }
}

export const app = new App();
