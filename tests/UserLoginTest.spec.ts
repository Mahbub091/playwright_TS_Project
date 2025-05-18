import { test } from "../utilities/fixtures";
import { ExpectedTextProvider } from "../utilities/valueProvider";
import { ENV } from "../utilities/env";
import { FakerDataProvider } from "../utilities/fakerDataProvider";
import fundFitData from "../testData/fundFit.json";
import registerPageData from "../testData/registerPageData.json";
import loginPageData from "../testData/loginPageData.json";
import homePageData from "../testData/homePageData.json";
import dashboardPageData from "../testData/dashboardPageData.json";

class UserLoginTest extends ExpectedTextProvider {
  private fakerData: FakerDataProvider;
  constructor() {
    super();
    this.fakerData = new FakerDataProvider();
  }

  runTests() {
    const { email, password } = this.fakerData;

    test.describe("Validating User Login Scenarios", () => {
      test.beforeEach(async ({ runner, userLandingPage }) => {
        await runner.navigateTo(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyPageTitle(fundFitData.fundFitTitle);

        await runner.verifyElementToHaveCSSProperty(
          userLandingPage.loginButton,
          fundFitData.textDecorationColorCss,
          fundFitData.blackColorCode,
        );
        await runner.validateAttribute(
          userLandingPage.loginButton,
          "href",
          homePageData.loginButtonHrefValue,
        );
        await runner.validateTextAndClickOnElement(
          userLandingPage.loginButton,
          homePageData.loginButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_LOGIN_PAGE_URL);
      });

      test("User Inputs Valid User Details To Login", async ({
        runner,
        userLoginPage,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(userLoginPage.email);
        await runner.enterText(userLoginPage.email, ENV.FUND_FIT_USER_EMAIL);

        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.enterText(
          userLoginPage.password,
          ENV.FUND_FIT_USER_PASSWORD,
        );
        await runner.verifyElementIsVisible(userLoginPage.eyeIcon);
        await runner.clickOnElement(userLoginPage.eyeIcon);
        await runner.validateAttribute(userLoginPage.password, "type", "text");
        await runner.verifyInputValue(
          userLoginPage.password,
          ENV.FUND_FIT_USER_PASSWORD,
        );

        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.loginButtonText,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          loginPageData.SuccessfulLoginToastText,
        );

        await runner.verifyContainsUrl(ENV.FUND_FIT_DASHBOARD_PAGE_URL);
        await runner.verifyElementIsVisible(userDashboardPage.dashboardButton);
        await runner.verifyElementText(
          userDashboardPage.dashboardButton,
          dashboardPageData.dashboardNavButtonText,
        );
      });

      test("User tries to login with random email", async ({
        runner,
        userLoginPage,
      }) => {
        await runner.verifyElementIsVisible(userLoginPage.email);
        await runner.enterText(userLoginPage.email, email);
        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.enterText(userLoginPage.password, password);
        await runner.verifyElementIsVisible(userLoginPage.eyeIcon);
        await runner.clickOnElement(userLoginPage.eyeIcon);
        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.loginButtonText,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          loginPageData.invalidEmailOrPasswordErrorMessage,
        );
      });

      test("User Tries To Login With Both Invalid Data  ", async ({
        runner,
        userLoginPage,
      }) => {
        //

        await runner.verifyElementIsVisible(userLoginPage.email);
        await runner.verifyElementPlaceholder(
          userLoginPage.email,
          loginPageData.loginPageEmailPlaceholderText,
        );
        await runner.enterText(userLoginPage.email, email);
        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.verifyElementPlaceholder(
          userLoginPage.password,
          loginPageData.loginPagePasswordPlaceholderText,
        );
        await runner.enterText(userLoginPage.password, password);
        await runner.verifyElementIsVisible(userLoginPage.eyeIcon);
        await runner.clickOnElement(userLoginPage.eyeIcon);
        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.loginButtonText,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          loginPageData.invalidEmailOrPasswordErrorMessage,
        );
      });

      test("User Tries Login With Empty Email & Password", async ({
        runner,
        userLoginPage,
      }) => {
        //

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementText(
          userLoginPage.emailInputBoxHeader,
          loginPageData.loginPageEmailInputBoxHeader,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );
        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxHeader,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxHeader,
          loginPageData.loginPagePasswordInputBoxHeader,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );
        await runner.verifyElementIsVisible(userLoginPage.email);
        await runner.clickOnElement(userLoginPage.email);
        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.clickOnElement(userLoginPage.password);
        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.loginButtonText,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementText(
          userLoginPage.emailInputBoxErrorMessage,
          loginPageData.loginPageEmailErrorMessage,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxErrorMessage,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementText(
          userLoginPage.passwordInputBoxErrorMessage,
          loginPageData.loginPagePasswordErrorMessage,
        );
      });

      //User tries login with empty email and valid password
      test("User Tries To Login With Empty Email & Valid Password", async ({
        runner,
        userLoginPage,
      }) => {
        //

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementText(
          userLoginPage.emailInputBoxHeader,
          loginPageData.loginPageEmailInputBoxHeader,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxHeader,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxHeader,
          loginPageData.loginPagePasswordInputBoxHeader,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.enterText(
          userLoginPage.password,
          ENV.FUND_FIT_USER_PASSWORD,
        );

        await runner.verifyElementIsVisible(userLoginPage.eyeIcon);
        await runner.clickOnElement(userLoginPage.eyeIcon);

        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.loginButton,
          fundFitData.backgroundColorCss,
          fundFitData.orangeColorCode,
        );
        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.loginButtonText,
        );

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      //User tries login with empty email and invalid password
      test("User Tries To Login With Empty Email & Invalid Password", async ({
        runner,
        userLoginPage,
      }) => {
        //

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementText(
          userLoginPage.emailInputBoxHeader,
          loginPageData.loginPageEmailInputBoxHeader,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxHeader,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxHeader,
          loginPageData.loginPagePasswordInputBoxHeader,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.email);

        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.enterText(userLoginPage.password, password);

        await runner.verifyElementIsVisible(userLoginPage.eyeIcon);
        await runner.clickOnElement(userLoginPage.eyeIcon);

        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.loginButtonText,
        );

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      test("User Tries Login With Valid Email & Empty Password", async ({
        runner,
        userLoginPage,
      }) => {
        //

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementText(
          userLoginPage.emailInputBoxHeader,
          loginPageData.loginPageEmailInputBoxHeader,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxHeader,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxHeader,
          loginPageData.loginPagePasswordInputBoxHeader,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.email);
        await runner.verifyElementPlaceholder(
          userLoginPage.email,
          loginPageData.loginPageEmailPlaceholderText,
        );
        await runner.enterText(userLoginPage.email, ENV.FUND_FIT_USER_EMAIL);

        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.verifyElementPlaceholder(
          userLoginPage.password,
          loginPageData.loginPagePasswordPlaceholderText,
        );

        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.clickOnElement(userLoginPage.loginButton);

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxErrorMessage,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxErrorMessage,
          loginPageData.loginPagePasswordErrorMessage,
        );
      });

      //User tries login with invalid email and empty password
      test("User Tries Login With Invalid Email & Empty Password", async ({
        runner,
        userLoginPage,
      }) => {
        //

        await runner.verifyElementIsVisible(userLoginPage.emailInputBoxHeader);
        await runner.verifyElementText(
          userLoginPage.emailInputBoxHeader,
          loginPageData.loginPageEmailInputBoxHeader,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.emailInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxHeader,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxHeader,
          loginPageData.loginPagePasswordInputBoxHeader,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.email);
        await runner.verifyElementPlaceholder(
          userLoginPage.email,
          loginPageData.loginPageEmailPlaceholderText,
        );
        await runner.enterText(userLoginPage.email, email);

        await runner.verifyElementIsVisible(userLoginPage.password);
        await runner.verifyElementPlaceholder(
          userLoginPage.password,
          loginPageData.loginPagePasswordPlaceholderText,
        );

        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.clickOnElement(userLoginPage.loginButton);

        await runner.verifyElementIsVisible(
          userLoginPage.passwordInputBoxErrorMessage,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.passwordInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementText(
          userLoginPage.passwordInputBoxErrorMessage,
          loginPageData.loginPagePasswordErrorMessage,
        );
      });

      test("User Successfully Navigate To The Register Page ", async ({
        runner,
        userLoginPage,
        userRegisterPage,
      }) => {
        await runner.verifyElementIsVisible(
          userLoginPage.loginPageRegisterButton,
        );

        await runner.validateTextAndClickOnElement(
          userLoginPage.loginPageRegisterButton,
          "Register",
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_REGISTER_PAGE_URL);
        await runner.verifyElementIsVisible(userRegisterPage.heroText);
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );
      });

      // Flaky Test
      test("User Navigates to the Forget Password page", async ({
        runner,
        userLoginPage,
      }) => {
        await runner.verifyElementToHaveCSSProperty(
          userLoginPage.loginButton,
          fundFitData.textDecorationColorCss,
          fundFitData.secondOrangeColor,
        );

        await runner.verifyElementIsVisible(userLoginPage.loginPageHeaderText);
        await runner.verifyElementText(
          userLoginPage.loginPageHeaderText,
          "To access your account, log in below.",
        );

        await runner.verifyElementIsVisible(userLoginPage.forgetPasswordButton);
        await runner.validateAttribute(
          userLoginPage.forgetPasswordButton,
          fundFitData.hrefCss,
          loginPageData.forgetPasswordHrefValue,
        );

        await runner.validateTextAndClickOnElement(
          userLoginPage.forgetPasswordButton,
          loginPageData.forgetPasswordButtonText,
        );

        await runner.verifyContainsUrl(ENV.FUND_FIT_FORGET_PASSWORD_PAGE_URL);

        await runner.verifyElementIsVisible(
          userLoginPage.forgetPasswordFormHeaderText,
        );

        await runner.verifyElementText(
          userLoginPage.forgetPasswordFormSubHeaderText,
          "No FundFit account? Request a Demo",
        );

        await runner.validateAttribute(
          userLoginPage.forgetPasswordFormSubHeaderText,
          fundFitData.hrefCss,
          ENV.FUND_FIT_LANDING_PAGE_URL,
          "a",
        );

        await runner.verifyElementText(
          userLoginPage.ForgetPasswordEmailHeader,
          loginPageData.loginPageEmailInputBoxHeader,
        );

        await runner.verifyElementPlaceholder(
          userLoginPage.ForgetPasswordEmailInputBox,
          loginPageData.loginPageEmailPlaceholderText,
        );

        await runner.enterText(
          userLoginPage.ForgetPasswordEmailInputBox,
          email,
        );

        await runner.validateTextAndClickOnElement(
          userLoginPage.loginButton,
          loginPageData.submitButtonText,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);

        await runner.verifyElementText(
          userLoginPage.toastMessage,
          loginPageData.forgetPasswordSuccessfulRequestText,
        );
      });
    }); //Describe block
  } //End of runTests method
} //End of UserLoginTest class
const testSuite = new UserLoginTest();
testSuite.runTests();
