import { RouterClientModule } from './router-client.module';

describe('RouterClientModule', () => {
  let routerClientModule: RouterClientModule;

  beforeEach(() => {
    routerClientModule = new RouterClientModule();
  });

  it('should create an instance', () => {
    expect(routerClientModule).toBeTruthy();
  });
});
