import { Page } from "playwright";

export class LoginPage {
  readonly textInputField: string;
  readonly emailInputField: string;
  readonly passwordInputField: string;
  readonly loginButton: string;
  readonly accountMenus: string;
  readonly myAccountMenuTexts: string;

  constructor(page: Page) {
    this.textInputField = `#entry_217820 [type='text']`;
    this.emailInputField = `#input-email`;
    this.passwordInputField = `#input-password`;
    this.loginButton = `[action] .btn-primary`;
    this.accountMenus = `.dropdown-menu.mz-sub-menu-96 > li`;
    this.myAccountMenuTexts = `/html//div[@id='content']/div[1]/div[@class='card-body text-center']/div[@class='row']/div`;
  }
}
