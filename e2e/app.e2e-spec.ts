import { OptroutePage } from './app.po';

describe('optroute App', () => {
  let page: OptroutePage;

  beforeEach(() => {
    page = new OptroutePage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
