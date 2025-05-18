import { test } from "../utilities/fixtures";
import { ExpectedTextProvider } from "../utilities/valueProvider";
import { ENV } from "../utilities/env";
import { FakerDataProvider } from "../utilities/fakerDataProvider";
import fundFitData from "../testData/fundFit.json";
import registerPageData from "../testData/registerPageData.json";
import homePageData from "../testData/homePageData.json";
import loginPageData from "../testData/loginPageData.json";

class HomePageTest extends ExpectedTextProvider {
  private fakerData: FakerDataProvider;
  constructor() {
    super();
    this.fakerData = new FakerDataProvider();
  }

  runTests() {
    const { firstName, lastName, email, phoneNumber, password } =
      this.fakerData;

    test.describe("Validating User Landing Page Scenarios", () => {
      test.beforeEach(async ({ runner, userLandingPage }) => {
        await runner.navigateTo(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyPageTitle(fundFitData.fundFitTitle);
        await runner.waitForMilliseconds(2000)
        await runner.validateAttribute(
          userLandingPage.headerImage,
          "src",
          fundFitData.logoImageSource,
        );
      });

      test("Validating Successful Navigation To Login Page", async ({
        runner,
        userLandingPage,
        userLoginPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.loginButton);
        await runner.verifyElementToHaveCSSProperty(
          userLandingPage.loginButton,
          fundFitData.textColorCss,
          fundFitData.blackColorCode,
        );
        await runner.verifyElementText(
          userLandingPage.loginButton,
          loginPageData.loginButtonText,
        );
        await runner.validateTextAndClickOnElement(
          userLandingPage.loginButton,
          homePageData.loginButtonText,
        );
        await runner.waitUntilElementIsInvisible(
          userLandingPage.startTrialButton,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_LOGIN_PAGE_URL);
        await runner.verifyElementIsVisible(userLoginPage.email);

        await runner.verifyElementPlaceholder(
          userLoginPage.email,
          homePageData.emailInputBoxPlaceholderText,
        );
        await runner.clickOnElement(userLandingPage.headerImage);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyElementText(
          userLandingPage.homePageHeroText,
          homePageData.homePageHeroText,
        );
      });

      test("Validating Successful Navigation To Register Page", async ({
        runner,
        userLandingPage,
        userRegisterPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.registerButton);
        await runner.validateTextAndClickOnElement(
          userLandingPage.registerButton,
          homePageData.registerButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_REGISTER_PAGE_URL);
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );
        await runner.verifyElementIsVisible(userRegisterPage.heroText);

        await runner.verifyElementPlaceholder(
          userRegisterPage.firstName,
          registerPageData.registerPageFirstNamePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.firstName);
        await runner.enterText(userRegisterPage.firstName, firstName);
        await runner.verifyInputValue(userRegisterPage.firstName, firstName);

        await runner.verifyElementPlaceholder(
          userRegisterPage.lastName,
          registerPageData.registerPageLastNamePlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.lastName);
        await runner.enterText(userRegisterPage.lastName, lastName);
        await runner.verifyInputValue(userRegisterPage.lastName, lastName);

        await runner.verifyElementPlaceholder(
          userRegisterPage.email,
          registerPageData.registerPageEmailPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.email);
        await runner.enterText(userRegisterPage.email, email);
        await runner.verifyInputValue(userRegisterPage.email, email);

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

        await runner.verifyElementPlaceholder(
          userRegisterPage.password,
          registerPageData.registerPagePasswordPlaceholderText,
        );
        await runner.clickOnElement(userRegisterPage.password);
        await runner.enterText(userRegisterPage.password, password);
        await runner.verifyInputValue(userRegisterPage.password, password);

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
        await runner.verifyElementText(userRegisterPage.submitButton, "Submit");
        await runner.verifyElementIsVisible(userRegisterPage.submitButton);

        await runner.clickOnElement(userLandingPage.headerImage);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyElementText(
          userLandingPage.homePageHeroText,
          homePageData.homePageHeroText,
        );
      });

      test("Validating The Set Free Trial Button & Navigation", async ({
        runner,
        userLandingPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.startTrialButton);
        await runner.validateTextAndClickOnElement(
          userLandingPage.startTrialButton,
          homePageData.homePageStartTrialButtonText,
        );
        await runner.waitUntilElementIsInvisible(
          userLandingPage.startTrialButton,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_REGISTER_PAGE_URL);
        await runner.verifyElementIsVisible(userLandingPage.headerImage);
        await runner.clickOnElement(userLandingPage.headerImage);
        await runner.verifyElementIsVisible(userLandingPage.homePageHeroText);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
      });

      test('Validating The "View Pricing Button & Navigation"', async ({
        runner,
        userLandingPage,
      }) => {
        await runner.clickOnElement(userLandingPage.viewPricingButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
        await runner.verifyElementIsScrolledIntoView(
          userLandingPage.pricingSectionHeroText,
        );
        await runner.verifyElementIsVisible(
          userLandingPage.pricingSectionHeroText,
        );
      });

      test("Validating Pricing Button and Scrolling", async ({
        runner,
        userLandingPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.viewPricingButton);
        await runner.validateTextAndClickOnElement(
          userLandingPage.viewPricingButton,
          homePageData.homePageViewPricingButtonText,
        );
        await runner.verifyElementIsVisible(
          userLandingPage.researcherPriceText,
        );
        await runner.verifyElementText(
          userLandingPage.pricingSectionHeroText,
          "Simple, transparent pricing",
        );

        await runner.verifyElementIsVisible(
          userLandingPage.researcherPriceText,
        );
        await runner.verifyElementIsVisible(
          userLandingPage.researcherPriceText,
        );
      });

      // Flaky Test
      test("Validating Footer Block of The Landing Page", async ({
        runner,
        userLandingPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.headerImage);
        await runner.scrollToElement(userLandingPage.footerBlock);
        await runner.verifyElementIsVisible(userLandingPage.footerBlock);
        await runner.verifyElementIsScrolledIntoView(
          userLandingPage.footerBlock,
        );
        await runner.verifyElementTextContains(
          userLandingPage.footerBlock,
          homePageData.homePageFooterText,
        );
      });

      test("Validating Platform User Tier Details", async ({
        runner,
        userLandingPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.homePageHeroText);
        await runner.verifyElementText(
          userLandingPage.homePageHeroText,
          homePageData.homePageHeroText,
        );

        await runner.verifyElementIsVisible(userLandingPage.homePageHeroText);
        await runner.verifyElementText(
          userLandingPage.homePageHeroText,
          homePageData.homePageHeroText,
        );
        await runner.verifyElementText(
          userLandingPage.homePageSubHeroText,
          homePageData.homePageHeroText2,
        );

        await runner.verifyElementIsVisible(userLandingPage.startTrialButton);
        await runner.verifyElementText(
          userLandingPage.startTrialButton,
          homePageData.homePageStartTrialButtonText,
        );

        await runner.verifyElementIsVisible(userLandingPage.viewPricingButton);
        await runner.verifyElementText(
          userLandingPage.viewPricingButton,
          homePageData.homePageViewPricingButtonText,
        );

        await runner.scrollToElement(userLandingPage.pricingSectionHeroText);
        await runner.verifyElementIsVisible(
          userLandingPage.pricingSectionHeroText,
        );
        await runner.verifyElementText(
          userLandingPage.pricingSectionHeroText,
          homePageData.userTierHeroText,
        );

        await runner.verifyElementIsVisible(
          userLandingPage.pricingSectionSubHeroText,
        );

        await runner.verifyElementText(
          userLandingPage.pricingSectionSubHeroText,
          homePageData.userTierSubHeroText,
        );
      });

      test("Validating the pricing section", async ({
        runner,
        userLandingPage,
        userRegisterPage,
      }) => {
        await runner.verifyElementIsVisible(userLandingPage.homePageHeroText);
        await runner.scrollToElement(userLandingPage.pricingSectionSubHeroText);
        await runner.verifyElementIsVisible(
          userLandingPage.researcherBlockHeader,
        );
        await runner.verifyElementText(
          userLandingPage.researcherBlockHeader,
          homePageData.researcherSectionHeaderText,
        );

        await runner.verifyElementIsVisible(
          userLandingPage.administratorBlockHeader,
        );
        await runner.verifyElementText(
          userLandingPage.administratorBlockHeader,
          homePageData.administratorSectionHeaderText,
        );

        await runner.verifyLinksTexts(
          userLandingPage.pricingSectionLinkTexts,
          this.expectedTexts,
        );

        await runner.verifyElementIsVisible(userLandingPage.getStartedButton);
        await runner.validateTextAndClickOnElement(
          userLandingPage.getStartedButton,
          "Get Started",
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_REGISTER_PAGE_URL);
        await runner.verifyElementIsVisible(userRegisterPage.heroText);
        await runner.verifyElementText(
          userRegisterPage.heroText,
          registerPageData.registerPageHeroText,
        );

        await runner.verifyElementIsVisible(userRegisterPage.confirmPassword);

        await runner.verifyElementIsVisible(userLandingPage.headerImage);
        await runner.clickOnElement(userLandingPage.headerImage);

        await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);

        await runner.verifyElementIsVisible(userLandingPage.contactSalesButton);
        await runner.validateAttribute(
          userLandingPage.contactSalesButton,
          "href",
          ENV.FUND_FIT_LANDING_PAGE_URL,
        );
        await runner.verifyElementToHaveCSSProperty(
          userLandingPage.contactSalesButton,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.scrollToElement(userLandingPage.footerBlock);
        await runner.verifyElementIsVisible(userLandingPage.footerBlock);
        await runner.verifyElementIsScrolledIntoView(
          userLandingPage.footerBlock,
        );

        await runner.verifyElementToHaveCSSProperty(
          userLandingPage.footerBlock,
          "width",
          "auto",
        );
        await runner.verifyElementToHaveCSSProperty(
          userLandingPage.footerBlock,
          "height",
          "auto",
        );

        await runner.verifyElementToHaveCSSProperty(
          userLandingPage.footerBlock,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );
      });
    }); // Describe block
  } // End of runTests method
} // End of HomePageTest class
const testSuite = new HomePageTest();
testSuite.runTests();
