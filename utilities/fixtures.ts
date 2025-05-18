import { test as base, Page } from "@playwright/test";
import { Utils } from "./utility";
import { loginPage } from "../pageObjectModel/loginPage";
import { homePage } from "../pageObjectModel/homePage";
import { registerPage } from "../pageObjectModel/registerPage";
import { dashboardPage } from "../pageObjectModel/dashboardPage";
import { startMatchingPage } from "../pageObjectModel/startMatchingPage";
import { matchesPage } from "../pageObjectModel/matchesPage";
import { notificationPage } from "../pageObjectModel/notificationPage";
import { profilePage } from "../pageObjectModel/profilePage";

interface TestFixtures {
  runner: Utils;
  userLoginPage: loginPage;
  userLandingPage: homePage;
  userRegisterPage: registerPage;
  userDashboardPage: dashboardPage;
  userStartMatchingPage: startMatchingPage;
  userMatchesPage: matchesPage;
  userNotificationPage: notificationPage;
  userProfilePage: profilePage;
}

interface PageFixture {
  page: Page;
}

const test = base.extend<TestFixtures>({
  runner: async ({ page }: PageFixture, use) => {
    const utilsInstance = new Utils(page);
    await use(utilsInstance);
  },
  userLoginPage: async ({ page }: PageFixture, use) => {
    const userLoginPageInstance = new loginPage(page);
    await use(userLoginPageInstance);
  },

  userLandingPage: async ({ page }: PageFixture, use) => {
    const userHomePageInstance = new homePage(page);
    await use(userHomePageInstance);
  },

  userRegisterPage: async ({ page }: PageFixture, use) => {
    const userRegisterPageInstance = new registerPage(page);
    await use(userRegisterPageInstance);
  },

  userDashboardPage: async ({ page }: PageFixture, use) => {
    const userDashboardPageInstance = new dashboardPage(page);
    await use(userDashboardPageInstance);
  },

  userStartMatchingPage: async ({ page }: PageFixture, use) => {
    const userStartMatchingInstance = new startMatchingPage(page);
    await use(userStartMatchingInstance);
  },

  userMatchesPage: async ({ page }: PageFixture, use) => {
    const userMatchesInstance = new matchesPage(page);
    await use(userMatchesInstance);
  },

  userNotificationPage: async ({ page }: PageFixture, use) => {
    const userNotificationInstance = new notificationPage(page);
    await use(userNotificationInstance);
  },
  userProfilePage: async ({ page }: PageFixture, use) => {
    const userProfileInstance = new profilePage(page);
    await use(userProfileInstance);
  },
});

export { test };
