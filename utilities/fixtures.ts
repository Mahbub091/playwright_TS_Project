import { test as base, Page } from "@playwright/test";
import { LambdaHomePage } from "../pom/lambdaHomePage";
import { Utils } from "./utils";

const test = base.extend<{
  runner: Utils;
  lambdaPage: LambdaHomePage;
}>({
  runner: async ({ page }: { page: Page }, use) => {
    const utilsInstance = new Utils(page);
    await use(utilsInstance);
  },
  lambdaPage: async ({ page }: { page: Page }, use) => {
    const lambdaPageInstance = new LambdaHomePage(page); // Create an instance of LambdaHomePage
    await use(lambdaPageInstance); // Pass the instance to the fixture
  },
});

export { test };
