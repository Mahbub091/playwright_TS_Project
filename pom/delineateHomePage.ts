import { Page } from "playwright";

export class delineateHomePage {
  readonly email: string;
  readonly password: string;
  loginButton: string;

  constructor(page: Page) {
    this.email = `#email`;
    this.password = `input#password`;
    this.loginButton = `button[type="submit"]`;
  }
}
