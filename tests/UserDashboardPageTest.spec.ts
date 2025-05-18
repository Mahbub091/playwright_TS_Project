import { test } from "../utilities/fixtures";
import { ExpectedTextProvider } from "../utilities/valueProvider";
import { ENV } from "../utilities/env";
import fundFitData from "../testData/fundFit.json";
import dashboardPageData from "../testData/dashboardPageData.json";
import loginPageData from "../testData/loginPageData.json";

class UserDashboardPageTest extends ExpectedTextProvider {
  constructor() {
    super();
  }

  runTests() {
    test.describe("Validating Dashboard Page Test", () => {
      test.beforeEach(
        async ({
          runner,
          userLandingPage,
          userLoginPage,
          userDashboardPage,
        }) => {
          await runner.navigateTo(ENV.FUND_FIT_TEST_ENV_URL);
          await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
          await runner.verifyPageTitle(fundFitData.fundFitTitle);
          await runner.waitForMilliseconds(2000);
          await runner.validateAttribute(
            userLandingPage.headerImage,
            "src",
            fundFitData.logoImageSource,
          );

          await runner.verifyElementIsVisible(userLandingPage.loginButton);
          await runner.validateTextAndClickOnElement(
            userLandingPage.loginButton,
            loginPageData.loginButtonText,
          );

          await runner.verifyElementIsVisible(userLoginPage.email);
          await runner.enterText(userLoginPage.email, ENV.FUND_FIT_USER_EMAIL);

          await runner.verifyElementIsVisible(userLoginPage.password);
          await runner.enterText(
            userLoginPage.password,
            ENV.FUND_FIT_USER_PASSWORD,
          );
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
            loginPageData.SuccessfulLoginToastText,
          );

          await runner.verifyElementIsVisible(userLoginPage.toastMessage);
          await runner.verifyElementText(
            userLoginPage.toastMessage,
            loginPageData.SuccessfulLoginToastText,
          );
          await runner.verifyContainsUrl(ENV.FUND_FIT_DASHBOARD_PAGE_URL);
          await runner.verifyElementIsVisible(
            userDashboardPage.dashboardButton,
          );
          await runner.verifyElementText(
            userDashboardPage.dashboardButton,
            dashboardPageData.dashboardNavButtonText,
          );
          await runner.verifyElementToHaveCSSProperty(
            userDashboardPage.dashboardButton,
            fundFitData.textDecorationColorCss,
            fundFitData.orangeColorCode,
          );
        },
      );

      test("Validating Dashboard Navigation Bar", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(userDashboardPage.dashboardButton);
        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardButton,
          fundFitData.textDecorationColorCss,
          fundFitData.orangeColorCode,
        );
        await runner.validateAttribute(
          userDashboardPage.dashboardButton,
          "href",
          dashboardPageData.dashboardHrefValue,
        );
        await runner.validateAttribute(
          userDashboardPage.dashboardNavbarStartMatchingButton,
          "href",
          dashboardPageData.dashboardStartMatchingHrefValue,
        );
        await runner.validateAttribute(
          userDashboardPage.dashboardNavbarMatchesButton,
          "href",
          dashboardPageData.dashboardMatchesHrefValue,
        );
        await runner.validateAttribute(
          userDashboardPage.dashboardNavbarNotificationsButton,
          "href",
          dashboardPageData.dashboardNotificationsHrefValue,
        );

        await runner.verifyLinksTexts(
          userDashboardPage.dashboardNavbarText,
          dashboardPageData.navbarTexts,
        );

        await runner.verifyElementText(
          userDashboardPage.dashboardNavbarAccountButton,
          dashboardPageData.dashboardNavAccountText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardNavbarAccountButton,
        );
        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardNavbarAccountButton,
          fundFitData.textDecorationColorCss,
          fundFitData.secondBlackColorCode,
        );
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardNavbarAccountButton,
          dashboardPageData.dashboardNavAccountText,
        );
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardNavbarAccountProfileText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardNavbarAccountProfileText,
          dashboardPageData.dashboardNavAccountProfileText,
        );
        await runner.validateAttribute(
          userDashboardPage.dashboardNavbarAccountProfileText,
          "href",
          dashboardPageData.dashboardAccountProfileHrefValue,
        );
      });

      test("Validating Page Navigation From Dashboard", async ({
        runner,
        userDashboardPage,
        userStartMatchingPage,
        userMatchesPage,
        userNotificationPage,
      }) => {
        await runner.verifyElementIsVisible(userDashboardPage.dashboardButton);
        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardButton,
          fundFitData.textDecorationColorCss,
          fundFitData.orangeColorCode,
        );

        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardNavbarMatchesButton,
          fundFitData.textDecorationColorCss,
          fundFitData.blackColorCode,
        );

        // Navigate Start Matching
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardNavbarStartMatchingButton,
          dashboardPageData.dashboardNavStartMatchingText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_START_MATCHING_PAGE_URL);
        await runner.verifyElementIsVisible(
          userStartMatchingPage.startMatchingHeroText,
        );

        // Navigation Bar css validation problem
        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardNavbarStartMatchingButton,
          fundFitData.textColorCss,
          "rgb(116, 123, 255)",
        );

        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardButton,
          fundFitData.textDecorationColorCss,
          fundFitData.blackColorCode,
        );

        // Navigate Matches
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardNavbarMatchesButton,
          dashboardPageData.dashboardNavMatchesText,
        );

        await runner.verifyContainsUrl(ENV.FUND_FIT_MATCHES_PAGE_URL);
        await runner.verifyElementIsVisible(userMatchesPage.matchesHeroText);

        // Navigate Notifications
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardNavbarNotificationsButton,
          dashboardPageData.dashboardNavNotificationsText,
        );

        await runner.verifyContainsUrl(ENV.FUND_FIT_NOTIFICATIONS_PAGE_URL);
        await runner.verifyElementIsVisible(
          userNotificationPage.notificationHeroText,
        );

        // Account Menu Options
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardNavbarAccountButton,
          dashboardPageData.dashboardNavAccountText,
        );

        await runner.verifyLinksTexts(
          userDashboardPage.dashboardNavbarAccountTexts,
          dashboardPageData.dashboardNavAccountTexts,
        );

        await runner.verifyElementText(
          userDashboardPage.dashboardNavbarAccountSubmitFeedbackText,
          "Submit Feedback",
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardNavbarAccountLogoutText,
        );
        await runner.clickOnElement(
          userDashboardPage.dashboardNavbarAccountLogoutText,
        );
      });

      test("Validating Dashboard All Card Headers", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllOpportunitiesCard,
        );
        await runner.verifyLinksTexts(
          userDashboardPage.dashboardAllCardHeaderText,
          dashboardPageData.dashboardAllCardHeaderTexts,
        );
      });

      test("Validating Dashboard All Opportunities Card", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllOpportunitiesCardText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardAllOpportunitiesCardText,
          dashboardPageData.dashboardAllOpportunitiesCardText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllOpportunitiesIcon,
        );

        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllOpportunitiesValue,
        );
        await runner.validateNumericValueFromElement(
          userDashboardPage.dashboardAllOpportunitiesValue,
        );
      });

      test("Validating Dashboard Researchers Opportunities Card", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardNewResearchersOpportunitiesCardText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardNewResearchersOpportunitiesCardText,
          dashboardPageData.dashboardNewResearchersOpportunitiesCardText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardExpireResearchersOpportunitiesCardText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardExpireResearchersOpportunitiesCardText,
          dashboardPageData.dashboardExpireResearchersOpportunitiesCardText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardResearchersOpportunitiesIcon,
        );

        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardNewResearchersOpportunitiesValue,
        );
        await runner.validateNumericValueFromElement(
          userDashboardPage.dashboardNewResearchersOpportunitiesValue,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardExpireResearchersOpportunitiesValue,
        );
        await runner.validateNumericValueFromElement(
          userDashboardPage.dashboardExpireResearchersOpportunitiesValue,
        );
      });

      test("Validating Dashboard Founding Available Card", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingAvailableCardText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardFoundingAvailableCardText,
          dashboardPageData.dashboardFoundingAvailableCardText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingAvailableIcon,
        );

        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingAvailablePotentialValue,
        );

        await runner.validateNumericValueFromElement(
          userDashboardPage.dashboardFoundingAvailablePotentialValue,
        );

        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingAvailableTotalValue,
        );
        await runner.validateNumericValueFromElement(
          userDashboardPage.dashboardFoundingAvailableTotalValue,
        );
      });

      test("Validating Dashboard All Researchers Card", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllResearchersCardText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardAllResearchersCardText,
          dashboardPageData.dashboardAllResearchersCardText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllResearchersIcon,
        );

        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardAllResearchersValue,
        );
        await runner.validateNumericValueFromElement(
          userDashboardPage.dashboardAllResearchersValue,
        );
      });

      test("Validating Dashboard Founding Scenario Card", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingScenarioButton,
        );
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardFoundingScenarioButton,
          dashboardPageData.dashboardFoundingScenarioButton,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_MATCHES_PAGE_URL);
        await runner.navigateBack();

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingScenarioIcon,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingScenarioText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardFoundingScenarioText,
          dashboardPageData.dashboardFoundingScenarioText,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardFoundingScenarioRechart,
        );
      });

      test("Validating No Notification in Recent Notification Section", async ({
        runner,
        userDashboardPage,
      }) => {
        // View All Notifications Button
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardRecentMatchNotificationsButton,
        );
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardRecentMatchNotificationsButton,
        );
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardRecentMatchNotificationsButton,
          dashboardPageData.dashboardRecentMatchNotificationsButton,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_NOTIFICATIONS_PAGE_URL);
        await runner.navigateBack();

        // Validate No Notification Or Have Notifications
        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );
        await runner.validateNoDataFound(
          userDashboardPage.dashboardNoNotificationText,
          userDashboardPage.dashboardNotificationLists,
          dashboardPageData.noNotificationText,
        );
      });

      // No notification here, so some issue here
      test("Validating Dashboard Recent Match Notifications Card", async ({
        runner,
        userDashboardPage,
      }) => {
        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardRecentMatchNotificationsButton,
        );
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardRecentMatchNotificationsButton,
          dashboardPageData.dashboardRecentMatchNotificationsButton,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_NOTIFICATIONS_PAGE_URL);
        await runner.navigateBack();

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardRecentMatchNotificationsIcon,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardRecentMatchNotificationsText,
        );
        await runner.verifyElementText(
          userDashboardPage.dashboardRecentMatchNotificationsText,
          dashboardPageData.dashboardRecentMatchNotificationsText,
        );

        // Single Notification Validation
        await runner.validateTitleByRegex(
          userDashboardPage.dashboardNotificationTitle,
        );
        await runner.validateNotificationTexts(
          userDashboardPage.dashboardNotificationText,
          dashboardPageData.dashboardNotificationMatchTexts,
          dashboardPageData.dashboardNotificationTexts,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.dashboardNotificationViewButton,
        );
        await runner.verifyElementToHaveCSSProperty(
          userDashboardPage.dashboardNotificationViewButton,
          fundFitData.backgroundColorCss,
          fundFitData.blueColorCode,
        );
        await runner.validateTextAndClickOnElement(
          userDashboardPage.dashboardNotificationViewButton,
          dashboardPageData.dashboardNotificationViewButton,
        );

        await runner.waitUntilElementIsInvisible(
          userDashboardPage.dashboardCardLoader,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.notificationModalHeader,
        );
        await runner.verifyElementText(
          userDashboardPage.notificationModalHeader,
          [
            dashboardPageData.notificationModalHeader,
            dashboardPageData.notificationModalHeader2,
          ],
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.notificationModalNameLabel,
        );
        await runner.verifyElementText(
          userDashboardPage.notificationModalNameLabel,
          dashboardPageData.notificationModalNameLabel,
        );
        await runner.verifyElementIsVisible(
          userDashboardPage.notificationModalName,
        );
        await runner.verifyInputIsDisable(
          userDashboardPage.notificationModalName,
        );

        await runner.verifyElementIsVisible(
          userDashboardPage.notificationModalNotificationTypeSelectLabel,
        );
        await runner.verifyElementText(
          userDashboardPage.notificationModalNotificationTypeSelectLabel,
          dashboardPageData.notificationModalNotificationTypeSelectLabel,
        );
      });
    }); // End of describe block
  } // End of runTests method
} // End of HomePageTest class
const testSuite = new UserDashboardPageTest();
testSuite.runTests();
