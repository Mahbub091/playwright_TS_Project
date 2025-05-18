import { test } from "../utilities/fixtures";
import { ExpectedTextProvider } from "../utilities/valueProvider";
import { ENV } from "../utilities/env";
import { FakerDataProvider } from "../utilities/fakerDataProvider";
import fundFitData from "../testData/fundFit.json";
import homePageData from "../testData/homePageData.json";
import registerPageData from "../testData/registerPageData.json";

class UserRegisterTest extends ExpectedTextProvider {
  private fakerData: FakerDataProvider;
  constructor() {
    super();
    this.fakerData = new FakerDataProvider();
  }

  runTests() {
    const { firstName, lastName, phoneNumber, email, password } =
      this.fakerData;

    test.describe("Validating User Login Scenarios", () => {
      test.beforeEach(async ({ runner, userLandingPage, userRegisterPage }) => {
        await runner.navigateTo(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyPageTitle(fundFitData.fundFitTitle);
        await runner.verifyElementIsVisible(userLandingPage.homePageHeroText);
        await runner.verifyElementIsVisible(userLandingPage.registerButton);

        await runner.validateTextAndClickOnElement(
          userLandingPage.registerButton,
          homePageData.registerButtonText,
        );

        await runner.waitUntilElementIsInvisible(
          userLandingPage.homePageHeroText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_REGISTER_PAGE_URL);
        await runner.verifyElementIsVisible(userRegisterPage.firstName);
      });

      test("Validating Register Form Contents", async ({
        runner,
        userRegisterPage,
      }) => {
        await runner.verifyElementIsVisible(userRegisterPage.heroText);
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );

        await runner.validateAttribute(
          userRegisterPage.heroText2,
          "href",
          ENV.FUND_FIT_LANDING_PAGE_URL,
          "a",
        );

        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);
        await runner.verifyElementText(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );
      });

      //Skipping this test case to avoid unwanted user creation
      test.skip("User Completes & Submits A Registration", async ({
        runner,
        userRegisterPage,
        userLoginPage,
      }) => {
        await runner.verifyElementIsVisible(userRegisterPage.heroText);
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );

        await runner.validateAttribute(
          userRegisterPage.heroText2,
          "href",
          ENV.FUND_FIT_LANDING_PAGE_URL,
          "a",
        );

        await runner.verifyElementText(
          userRegisterPage.firstNameHeader,
          "First Name",
        );

        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );

        await runner.waitUntilElementIsInvisible(
          userRegisterPage.firstNameErrorMessage,
        );

        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );

        await runner.clickOnElement(userRegisterPage.firstName);
        await runner.enterText(userRegisterPage.firstName, firstName);
        await runner.verifyInputValue(userRegisterPage.firstName, firstName);

        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.lastName);
        await runner.enterText(userRegisterPage.lastName, lastName);
        await runner.verifyInputValue(userRegisterPage.lastName, lastName);

        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.email);
        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.phoneNumber);
        await runner.enterText(userRegisterPage.phoneNumber, phoneNumber);
        await runner.verifyInputValue(
          userRegisterPage.phoneNumber,
          phoneNumber,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.password);
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.confirmPassword);
        await runner.enterText(userRegisterPage.confirmPassword, password);
        await runner.verifyInputValue(
          userRegisterPage.confirmPassword,
          password,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.privacyPolicyCheckbox,
        );
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "unchecked",
        );

        await runner.clickOnElement(userRegisterPage.privacyPolicyCheckbox);
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "checked",
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);
        await runner.verifyElementText(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.clickOnElement(userRegisterPage.submitButton);

        await runner.verifyElementIsVisible(userLoginPage.loginButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_LOGIN_PAGE_URL);
      });

      test("User Register Form Should Not Be Submit-able Without First Name", async ({
        runner,
        userRegisterPage,
      }) => {
        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.lastName, lastName);
        await runner.verifyInputValue(userRegisterPage.lastName, lastName);

        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );
        await runner.enterText(userRegisterPage.phoneNumber, phoneNumber);
        await runner.verifyInputValue(
          userRegisterPage.phoneNumber,
          phoneNumber,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );
        await runner.enterText(userRegisterPage.confirmPassword, password);
        await runner.verifyInputValue(
          userRegisterPage.confirmPassword,
          password,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.privacyPolicyCheckbox,
        );
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "unchecked",
        );
        await runner.clickOnElement(userRegisterPage.privacyPolicyCheckbox);
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "checked",
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);

        await runner.validateTextAndClickOnElement(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.firstNameErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.firstNameErrorMessage,
          registerPageData.registerPageFirstNameErrorText,
        );

        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      test("User Register Form Should Not Be Submit-able Without Last Name", async ({
        runner,
        userRegisterPage,
      }) => {
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );

        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.firstName, firstName);
        await runner.verifyInputValue(userRegisterPage.firstName, firstName);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementText(
          userRegisterPage.lastNameHeader,
          registerPageData.lastNameHeaderText,
        );
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.email,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.phoneNumber);
        await runner.enterText(userRegisterPage.phoneNumber, phoneNumber);
        await runner.verifyInputValue(
          userRegisterPage.phoneNumber,
          phoneNumber,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.phoneNumber,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.password);
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.password,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.confirmPassword);
        await runner.enterText(userRegisterPage.confirmPassword, password);
        await runner.verifyInputValue(
          userRegisterPage.confirmPassword,
          password,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.privacyPolicyCheckbox,
        );
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "unchecked",
        );
        await runner.clickOnElement(userRegisterPage.privacyPolicyCheckbox);
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "checked",
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);
        await runner.verifyElementText(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );
        await runner.clickOnElement(userRegisterPage.submitButton);
        await runner.verifyElementIsVisible(
          userRegisterPage.lastNameErrorMessage,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.lastNameErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.lastNameErrorMessage,
          registerPageData.registerPageLastNameErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.lastNameErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      //Skipping this test case to avoid unwanted user creation
      test.skip("User Register Form Should Not Be Submit-able Without Proper Email Format", async ({
        runner,
        userRegisterPage,
        userLoginPage,
      }) => {
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );

        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.firstName, firstName);
        await runner.verifyInputValue(userRegisterPage.firstName, firstName);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementText(
          userRegisterPage.lastNameHeader,
          registerPageData.lastNameHeaderText,
        );
        await runner.enterText(userRegisterPage.lastName, lastName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.phoneNumber);
        await runner.enterText(userRegisterPage.phoneNumber, phoneNumber);
        await runner.verifyInputValue(
          userRegisterPage.phoneNumber,
          phoneNumber,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.phoneNumber,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.password);
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.password,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.confirmPassword);
        await runner.enterText(userRegisterPage.confirmPassword, password);
        await runner.verifyInputValue(
          userRegisterPage.confirmPassword,
          password,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.confirmPassword,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.privacyPolicyCheckbox,
        );
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "unchecked",
        );
        await runner.clickOnElement(userRegisterPage.privacyPolicyCheckbox);
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "checked",
        );

        //Email Block
        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.enterText(userRegisterPage.email, "");
        await runner.verifyInputValue(userRegisterPage.email, "");
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.email,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);
        await runner.verifyElementText(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );
        await runner.validateTextAndClickOnElement(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.emailInputBoxErrorMessage,
          registerPageData.registerPageEmailErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.emailInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.enterText(userRegisterPage.email, "test");
        await runner.verifyInputValue(userRegisterPage.email, "test");

        await runner.validateTextAndClickOnElement(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.emailInputBoxErrorMessage,
          registerPageData.registerPageInvalidEmailErrorText,
        );

        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.emailInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.enterText(userRegisterPage.email, "test@");
        await runner.verifyInputValue(userRegisterPage.email, "test@");

        await runner.validateTextAndClickOnElement(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.emailInputBoxErrorMessage,
          registerPageData.registerPageInvalidEmailErrorText,
        );

        await runner.enterText(userRegisterPage.email, "test@gmail");
        await runner.verifyInputValue(userRegisterPage.email, "test@gmail");

        await runner.validateTextAndClickOnElement(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.verifyElementIsVisible(
          userRegisterPage.emailInputBoxErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.emailInputBoxErrorMessage,
          registerPageData.registerPageInvalidEmailErrorText,
        );

        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.emailInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);

        await runner.validateTextAndClickOnElement(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );

        await runner.waitUntilElementIsInvisible(
          userRegisterPage.emailInputBoxErrorMessage,
        );

        await runner.verifyElementIsVisible(userLoginPage.loginButton);

        await runner.verifyContainsUrl(ENV.FUND_FIT_LOGIN_PAGE_URL);
        await runner.verifyElementIsVisible(userLoginPage.email);

        await runner.verifyElementIsVisible(userRegisterPage.toastMessage);
        await runner.verifyElementText(
          userRegisterPage.toastMessage,
          "Registration SuccessfulPlease check your email for verification.",
        );
      });

      test("User Tries To Register User With Blank Phone Number", async ({
        runner,
        userRegisterPage,
      }) => {
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );

        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.firstName, firstName);
        await runner.verifyInputValue(userRegisterPage.firstName, firstName);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementText(
          userRegisterPage.lastNameHeader,
          registerPageData.lastNameHeaderText,
        );
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.lastName, lastName);
        await runner.verifyInputValue(userRegisterPage.lastName, lastName);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.lastNameHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.email,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.phoneNumber);
        await runner.enterText(userRegisterPage.phoneNumber, "");
        await runner.verifyInputValue(userRegisterPage.phoneNumber, "");
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.phoneNumber,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.password);
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.password,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.confirmPassword);
        await runner.enterText(userRegisterPage.confirmPassword, password);
        await runner.verifyInputValue(
          userRegisterPage.confirmPassword,
          password,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.confirmPassword,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );
        await runner.verifyElementIsVisible(
          userRegisterPage.privacyPolicyCheckbox,
        );
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "unchecked",
        );
        await runner.clickOnElement(userRegisterPage.privacyPolicyCheckbox);
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "checked",
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);
        await runner.verifyElementText(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );
        await runner.clickOnElement(userRegisterPage.submitButton);

        await runner.waitUntilElementIsInvisible(
          userRegisterPage.phoneNumberInputBoxErrorMessage,
        );

        await runner.verifyContainsUrl(ENV.FUND_FIT_LOGIN_PAGE_URL);
        await runner.verifyElementIsVisible(userRegisterPage.toastMessage);
        await runner.verifyElementText(
          userRegisterPage.toastMessage,
          "Registration SuccessfulPlease check your email for verification.",
        );
      });

      test("User Tries To Register With Alphabetic Value In Phone Number", async ({
        runner,
        userRegisterPage,
      }) => {
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementText(
          userRegisterPage.heroText2,
          registerPageData.registerPageHeroText2,
        );

        await runner.verifyElementIsVisible(userRegisterPage.firstName);
        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.firstName, firstName);
        await runner.verifyInputValue(userRegisterPage.firstName, firstName);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.firstNameHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.lastName);
        await runner.verifyElementText(
          userRegisterPage.lastNameHeader,
          registerPageData.lastNameHeaderText,
        );
        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );
        await runner.enterText(userRegisterPage.lastName, lastName);
        await runner.verifyInputValue(userRegisterPage.lastName, lastName);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.lastNameHeader,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.email);
        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.email,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.phoneNumber);
        await runner.verifyElementPlaceholder(
          userRegisterPage.phoneNumber,
          registerPageData.registerPagePhonePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.phoneNumber);
        await runner.enterText(userRegisterPage.phoneNumber, "test");
        await runner.verifyInputValue(userRegisterPage.phoneNumber, "test");
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.phoneNumber,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.password);
        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.password);
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.password,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);
        await runner.verifyElementPlaceholder(
          userRegisterPage.confirmPassword,
          registerPageData.registerPageConfirmPasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.confirmPassword);
        await runner.enterText(userRegisterPage.confirmPassword, password);
        await runner.verifyInputValue(
          userRegisterPage.confirmPassword,
          password,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.confirmPassword,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.verifyElementIsVisible(userRegisterPage.privacyPolicyText);
        await runner.verifyElementText(
          userRegisterPage.privacyPolicyText,
          registerPageData.registerPagePrivacyPolicyText,
        );
        await runner.verifyElementIsVisible(
          userRegisterPage.privacyPolicyCheckbox,
        );
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "unchecked",
        );
        await runner.clickOnElement(userRegisterPage.privacyPolicyCheckbox);
        await runner.verifyCheckboxDataState(
          userRegisterPage.privacyPolicyCheckbox,
          "checked",
        );

        await runner.verifyElementIsVisible(userRegisterPage.submitButton);
        await runner.verifyElementText(
          userRegisterPage.submitButton,
          fundFitData.submitButtonText,
        );
        await runner.clickOnElement(userRegisterPage.submitButton);

        await runner.verifyElementIsVisible(
          userRegisterPage.phoneNumberInputBoxErrorMessage,
        );
        await runner.verifyElementText(
          userRegisterPage.phoneNumberInputBoxErrorMessage,
          registerPageData.registerPageInvalidPhoneNumberErrorText,
        );

        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.phoneNumberHeader,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userRegisterPage.phoneNumberInputBoxErrorMessage,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      test("User Tries To Register With Wrong Password Combination", async ({
        runner,
        userRegisterPage,
      }) => {});
    }); //Describe block
  } //End of runTests method
} //End of UserRegisterTest class
const testSuite = new UserRegisterTest();
testSuite.runTests();
