import { OnlineJudgeCliPage } from './app.po';

describe('online-judge-cli App', function() {
  let page: OnlineJudgeCliPage;

  beforeEach(() => {
    page = new OnlineJudgeCliPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
