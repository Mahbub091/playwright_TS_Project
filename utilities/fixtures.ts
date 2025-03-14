import { test as base, Page } from "@playwright/test";
import { LambdaHomePage } from "../pom/lambdaHomePage";
import { Utils } from "./utils";
import { LoginPage } from "../pom/LoginPage";
import { AccountPage } from "../pom/accountPage";
import { delineateHomePage } from "../pom/delineateHomePage";

interface TestFixtures {
  runner: Utils;
  lambdaPage: LambdaHomePage;
  loginPage: LoginPage;
  accountPage: AccountPage;
  delineatePage: delineateHomePage;
}

interface PageFixture {
  page: Page;
}

const test = base.extend<TestFixtures>({
  runner: async ({ page }: PageFixture, use) => {
    const utilsInstance = new Utils(page);
    await use(utilsInstance);
  },
  lambdaPage: async ({ page }: PageFixture, use) => {
    const lambdaPageInstance = new LambdaHomePage(page);
    await use(lambdaPageInstance);
  },
  loginPage: async ({ page }: PageFixture, use) => {
    const loginPageInstance = new LoginPage(page);
    await use(loginPageInstance);
  },
  accountPage: async ({ page }: PageFixture, use) => {
    const accountPageInstance = new AccountPage(page);
    await use(accountPageInstance);
  },
  delineatePage: async ({ page }: PageFixture, use) => {
    const delineatePageInstance = new delineateHomePage(page);
    await use(delineatePageInstance);
  },
});

export { test };
