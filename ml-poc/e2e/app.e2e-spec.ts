import { MlPocPage } from './app.po';

describe('ml-poc App', () => {
  let page: MlPocPage;

  beforeEach(() => {
    page = new MlPocPage();
  });

  it('should display welcome message', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('Welcome to app!!');
  });
});
