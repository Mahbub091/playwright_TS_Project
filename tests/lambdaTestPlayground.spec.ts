import { test } from "../utilities/fixtures"; // Import the fixture
import lambdaData from "../testData/lambda.json";
import * as fs from "fs";
import * as path from "path";

// Function to load expected texts from JSON
const loadExpectedTexts = (): string[] => {
  const jsonFilePath = path.resolve(__dirname, "../testData/lambda.json"); // Adjust the path to your JSON file
  const data = fs.readFileSync(jsonFilePath, "utf-8");
  return JSON.parse(data).expectedTexts;
};

test.describe("Validating Menu Click", () => {
  test.beforeEach(async ({ runner }) => {
    await runner.navigateTo(lambdaData.lambdaTestUrl);
  });

  test("Validating Navigation with URL & Title", async ({ runner }) => {
    await runner.verifyContainsUrl(lambdaData.lambdaTestUrl);
    await runner.verifyTitle(lambdaData.pageTitle);
  });

  test("Validating and Entering value to text input field", async ({
    runner,
    lambdaPage,
  }) => {
    await runner.typeInputBox(lambdaPage.textInputField, "cameras");
    await runner.clickOnElement(lambdaPage.searchButton);
    await runner.mouseHover(lambdaPage.accountButton);
    await runner.clickOnElement(lambdaPage.loginButton);
    await runner.clickOnElement(lambdaPage.accountButton);
  });

  test("Validating Login Form & Successful Login Attempt", async ({
    runner,
    lambdaPage,
  }) => {
    await runner.mouseHover(lambdaPage.accountButton);
    await runner.clickOnElement(lambdaPage.loginButton);
    await runner.clickOnElement(lambdaPage.accountButton);

    // Load expected texts from the JSON file
    const expectedTexts = loadExpectedTexts();

    // Validate the text of the links in the right column
    await runner.verifyLinksText(lambdaPage.rightColumnList, expectedTexts);

    // Uncomment if needed for login testing
    // await runner.focusOnElement(lambdaPage.emailField);
    // await runner.typeInputBox(lambdaPage.emailField, 'mahbubasr091@gmail.com');
    // await runner.fillInputBox(lambdaPage.passwordField, '123456789000000');
    // await runner.clickOnElement(lambdaPage.accountLoginButton);
  });
});
