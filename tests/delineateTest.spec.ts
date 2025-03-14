import { test } from "../utilities/fixtures";
import deliData from "../testData/Delineate.json";
import { ExpectedTextProvider } from "../utilities/valueProvider";

class DelineateTest extends ExpectedTextProvider {
  constructor() {
    super();
  }

  runTests() {
    test.describe("Validating User Login Scenarios", () => {
      test.beforeEach(async ({ runner }) => {
        await runner.navigateTo(deliData.canaryHomePage);
        // await runner.verifyContainsUrl(deliData.canaryUrl);
        // await runner.verifyTitle(deliData.deliTitle);
      });

      test("", async ({ runner, delineatePage }) => {
        await runner.verifyElementIsVisible(delineatePage.email);
        await runner.clearInputField(delineatePage.email);
        await runner.typeInputBox(delineatePage.email, "test@gmail.com");
        await runner.verifyElementIsVisible(delineatePage.password);
        await runner.clearInputField(delineatePage.password);
        await runner.typeInputBox(delineatePage.password, "12345678");
        await runner.clickOnElement(delineatePage.loginButton);
        await runner.verifyElementIsVisible(
          "span[class='flex items-center gap-2']",
        );
      });
    });
  }
}
const testSuite = new DelineateTest();
testSuite.runTests();
