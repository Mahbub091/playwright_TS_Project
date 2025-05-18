import { test } from "../utilities/fixtures";
import { ExpectedTextProvider } from "../utilities/valueProvider";
import { ENV } from "../utilities/env";
import fundFitData from "../testData/fundFit.json";
import loginPageData from "../testData/loginPageData.json";
import dashboardPageData from "../testData/dashboardPageData.json";
import profilePageData from "../testData/profilePageData.json";
import { FakerDataProvider } from "../utilities/fakerDataProvider";

class UserProfileTest extends ExpectedTextProvider {
  private fakerData: FakerDataProvider;
  constructor() {
    super();
    this.fakerData = new FakerDataProvider();
  }

  runTests() {
    const {
      firstName,
      lastName,
      phoneNumber,
      password,
      bio,
      randomCharValue30Digits,
      randomCharValuesForInputValueValidation,
      numericValueOf20Digits,

      backgroundType,
      role,
      department,
      organization,
      organizationAddress,
      startDate,
      endDate,

      workType,
      journalTitle,
      title,
      publicationYear,
      publicationMonth,
      publicationDay,

      projectTypes,
      projectTitle,
      organizationType,
      amount,
    } = this.fakerData;

    test.describe("Validating Profile Page Scenarios", () => {
      test.beforeEach(
        async ({
          runner,
          userLandingPage,
          userLoginPage,
          userDashboardPage,
          userProfilePage,
        }) => {
          await runner.navigateTo(ENV.FUND_FIT_TEST_ENV_URL);
          await runner.verifyContainsUrl(ENV.FUND_FIT_TEST_ENV_URL);
          await runner.verifyPageTitle(fundFitData.fundFitTitle);
          // await runner.waitForMilliseconds(10000);
          // await runner.validateAttribute(
          //   userLandingPage.headerImage,
          //   "src",
          //   fundFitData.logoImageSource,
          // );

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

          await runner.waitForMilliseconds(5);
          await runner.hoverOnElement(userLoginPage.toastMessage);
          await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
          await runner.clickOnElement(userProfilePage.toastCloseButton);

          await runner.verifyElementIsVisible(
            userDashboardPage.dashboardNavbarAccountButton,
          );
          await runner.validateTextAndClickOnElement(
            userDashboardPage.dashboardNavbarAccountButton,
            "Account",
          );

          await runner.verifyElementIsVisible(
            userDashboardPage.dashboardNavbarAccountProfileText,
          );
          await runner.validateAttribute(
            userDashboardPage.dashboardNavbarAccountProfileText,
            "href",
            dashboardPageData.dashboardAccountProfileHrefValue,
          );
          await runner.validateTextAndClickOnElement(
            userDashboardPage.dashboardNavbarAccountProfileText,
            dashboardPageData.dashboardNavAccountProfileText,
          );

          await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PAGE_URL);
          await runner.verifyElementTextContains(
            userProfilePage.profileHeaderText,
            profilePageData.profileHeaderText,
          );
        },
      );

      // 🔹 Profile Page - Test Case Scenarios
      test("Validating Profile Page Side Bar Profile Information", async ({
        runner,
        userProfilePage,
      }) => {
        await runner.verifyElementIsVisible(userProfilePage.sidebarPhoto);

        await runner.verifyElementIsVisible(
          userProfilePage.sidebarFullNameText,
        );
        await runner.validateNameByRegex(
          userProfilePage.sidebarFullNameText,
          "FULL_NAME",
        );

        await runner.verifyElementIsVisible(userProfilePage.sidebarTitleText);
        await runner.verifyElementText(
          userProfilePage.sidebarTitleText,
          profilePageData.profileTitle,
        );
      });

      test("Validating Profile Page Side Bar Navigation", async ({
        runner,
        userProfilePage,
      }) => {
        // 🔸 Sidebar Navigation Scenarios
        // 1. Verify that clicking on each tab (General, Background, Works, Projects, Attachments) switches the active view.
        await runner.clickOnElement(userProfilePage.sidebarBackgroundButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.verifyElementText(
          "xpath=//h1[normalize-space()='Background']",
          "Background",
        );

        await runner.clickOnElement(userProfilePage.sidebarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementText(
          "xpath=//h1[normalize-space()='Research Works']",
          "Research Works",
        );

        await runner.clickOnElement(userProfilePage.sidebarProjectsButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PROJECT_PAGE_URL);
        await runner.verifyElementText(
          "xpath=//h1[normalize-space()='Research Projects']",
          "Research Projects",
        );

        await runner.clickOnElement(userProfilePage.sidebarAttachmentsButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_ATTACHMENT_PAGE_URL,
        );
        await runner.verifyElementText(
          "xpath=//h1[normalize-space()='Attachments']",
          "Attachments",
        );

        await runner.clickOnElement(userProfilePage.sidebarGeneralInfoButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PAGE_URL);

        // 2. Verify that each section shows corresponding data or a "0" count if no entries are present.

        // Side Bar Button Visibility Check
        await runner.verifyElementIsVisible([
          userProfilePage.sidebarGeneralInfoText,
          userProfilePage.sidebarBackgroundText,
          userProfilePage.sidebarWorksText,
          userProfilePage.sidebarProjectsText,
          userProfilePage.sidebarAttachmentsText,
        ]);
        await runner.verifyElementIsVisible([
          userProfilePage.sidebarGeneralInfoIcon,
          userProfilePage.sidebarBackgroundIcon,
          userProfilePage.sidebarWorksIcon,
          userProfilePage.sidebarProjectsIcon,
          userProfilePage.sidebarAttachmentsIcon,
        ]);
        await runner.verifyElementIsVisible([
          userProfilePage.sidebarBackgroundValue,
          userProfilePage.sidebarWorksValue,
          userProfilePage.sidebarProjectsValue,
          userProfilePage.sidebarAttachmentsValue,
        ]);

        // Side Bar Button Text Validity Check
        await runner.verifyElementText(
          userProfilePage.sidebarGeneralInfoText,
          profilePageData.sidebarGeneralInfoButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.sidebarBackgroundText,
          profilePageData.sidebarBackgroundButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.sidebarWorksText,
          profilePageData.sidebarWorksButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.sidebarProjectsText,
          profilePageData.sidebarProjectsButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.sidebarAttachmentsText,
          profilePageData.sidebarAttachmentsButtonText,
        );

        // 3. Verify that inactive tabs are not highlighted and have no visible content shown by default.
        // Side Bar
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.sidebarGeneralInfoText,
          fundFitData.textColorCss,
          fundFitData.orangeColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          [
            userProfilePage.sidebarBackgroundText,
            userProfilePage.sidebarWorksText,
            userProfilePage.sidebarProjectsText,
            userProfilePage.sidebarAttachmentsText,
          ],
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        // Top Bar
        await runner.validateAttribute(
          userProfilePage.topBarGeneralButton,
          "data-state",
          "active",
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.topBarGeneralButton,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );

        await runner.validateAttribute(
          [
            userProfilePage.topBarBackgroundButton,
            userProfilePage.topBarWorksButton,
            userProfilePage.topBarProjectsButton,
            userProfilePage.topBarAttachmentsButton,
          ],
          "data-state",
          "inactive",
        );
        await runner.verifyElementToHaveCSSProperty(
          [
            userProfilePage.topBarBackgroundButton,
            userProfilePage.topBarWorksButton,
            userProfilePage.topBarProjectsButton,
            userProfilePage.topBarAttachmentsButton,
          ],
          fundFitData.textColorCss,
          fundFitData.grayColorCode,
        );
      });

      // ORCID Email & Password Not Found
      test.skip("Validating Profile Page Side Bar ORCID Connection", async ({
        runner,
        userProfilePage,
      }) => {
        // 🔸 ORCID Integration Scenario
        // 1. Verify that clicking the “Disconnect from ORCID” button prompts the user for confirmation.
        // 2. Verify that upon confirming disconnection, the ORCID link is removed and a success message is displayed.

        await runner.verifyElementIsVisible(userProfilePage.sidebarORCIDButton);
      });

      // ORCID Email & Password Not Found
      test.skip("Validating Profile Page Side Bar ORCID Disconnection", async ({
        runner,
        userProfilePage,
      }) => {
        await runner.verifyElementIsVisible(userProfilePage.sidebarORCIDButton);
      });

      test("Validating Profile Page Generale Information Section", async ({
        runner,
        userProfilePage,
      }) => {
        // 🔸 General Tab Scenarios
        // 1. Verify that all user profile fields (First Name, Last Name, Email, Institution) are displayed correctly.
        await runner.verifyElementIsVisible([
          userProfilePage.firstNameHeader,
          userProfilePage.lastNameHeader,
          userProfilePage.emailHeader,
          userProfilePage.institutionHeader,
          userProfilePage.phoneNumberHeader,
          userProfilePage.biographyHeader,
        ]);

        await runner.verifyElementTextContains(
          [
            userProfilePage.firstNameHeader,
            userProfilePage.lastNameHeader,
            userProfilePage.emailHeader,
            userProfilePage.institutionHeader,
            userProfilePage.phoneNumberHeader,
            userProfilePage.biographyHeader,
          ],
          [
            profilePageData.firstNameHeaderText,
            profilePageData.lastNameHeaderText,
            profilePageData.emailHeaderText,
            profilePageData.institutionHeaderText,
            profilePageData.phoneNumberHeaderText,
            profilePageData.biographyHeaderText,
          ],
        );

        await runner.validateNameByRegex(
          userProfilePage.firstName,
          "FIRST_NAME",
        );
        await runner.validateNameByRegex(userProfilePage.lastName, "LAST_NAME");
        await runner.verifyElementText(
          userProfilePage.email,
          ENV.FUND_FIT_USER_EMAIL,
        );

        // 2. Verify that optional fields (Phone Number, Biography) show a placeholder or “Not provided” if left empty.
        await runner.validatePhoneNumberByRegex(userProfilePage.phoneNumber);
        await runner.validateUserBiographyByRegex(userProfilePage.biography);

        // 3. Verify that clicking the "Edit Profile" button enables profile field editing or opens an editable form/modal.
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementTextContains(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.backAndCancelButton,
          profilePageData.cancelButtonText,
        );

        // 4. Verify that the "Password Settings" button navigates to or opens the password update section.
        await runner.validateTextAndClickOnElement(
          userProfilePage.passwordSettings,
          profilePageData.passwordSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_PASSWORD_SETTING_PAGE_URL,
        );
        await runner.verifyElementTextContains(
          userProfilePage.passwordSettingsHeaderText,
          profilePageData.passwordSettingsHeaderText,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.backAndCancelButton,
          profilePageData.cancelButtonText,
        );

        // Website er profile "Email Settings" Button ta akhon hide kore dise.
        // 5 Verify that the "Email Settings" button navigates to or opens the email update section.
        // await runner.validateTextAndClickOnElement(
        //   userProfilePage.emailSettings,
        //   profilePageData.emailSettingsButtonText,
        // );
        // await runner.verifyContainsUrl(
        //   ENV.FUND_FIT_PROFILE_EMAIL_SETTING_PAGE_URL,
        // );
        // await runner.verifyElementTextContains(
        //   userProfilePage.emailSettingsHeaderText,
        //   profilePageData.emailSettingsHeaderText,
        // );
        // await runner.validateTextAndClickOnElement(
        //   userProfilePage.cancelButton,
        //   profilePageData.cancelButtonText,
        // );
      });

      // 🔹 Update Profile Page – Test Case Scenarios
      test("Validating Update User Profile Information", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user edit profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        await runner.enterText(userProfilePage.editProfileFirstName, firstName);
        await runner.enterText(userProfilePage.editProfileLastName, lastName);
        await runner.enterText(
          userProfilePage.editProfilePhoneNumber,
          phoneNumber,
        );
        await runner.enterText(userProfilePage.editProfileBiography, bio);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyProfileUpdateToast,
        );
        await runner.waitForMilliseconds(5);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      test("Validating User Update Profile Page Fields Are Pre-Populated With the User's Existing Information", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click On Edit Profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        // 1. Verify that the All fields are pre-populated with the user's existing information.
        await runner.enterText(
          userProfilePage.editProfileFirstName,
          profilePageData.userFirstName,
        );
        await runner.enterText(
          userProfilePage.editProfileLastName,
          profilePageData.userLastName,
        );
        await runner.enterText(
          userProfilePage.editProfilePhoneNumber,
          phoneNumber,
        );
        await runner.enterText(userProfilePage.editProfileBiography, bio);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyProfileUpdateToast,
        );
        await runner.waitForMilliseconds(1000);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);

        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.profileHeaderText);
        await runner.verifyElementText(
          userProfilePage.profileHeaderText,
          profilePageData.profileHeaderText,
        );

        // Click On Edit Profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        await runner.waitForMilliseconds(1000);

        await runner.verifyInputValue(
          userProfilePage.editProfileFirstName,
          profilePageData.userFirstName,
        );
        await runner.verifyInputValue(
          userProfilePage.editProfileLastName,
          profilePageData.userLastName,
        );
        await runner.verifyInputValue(
          userProfilePage.editProfilePhoneNumber,
          phoneNumber,
        );
        await runner.verifyInputValue(
          userProfilePage.editProfileBiography,
          bio,
        );
      });

      test("Verify that the Biography field accepts text input and supports multiline entries", async ({
        runner,
        userProfilePage,
      }) => {
        // Click On Edit Profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        // 3. Verify that the "Biography" field accepts text input and supports multiline entries.
        await runner.clearInputField(userProfilePage.editProfileBiography);
        await runner.enterText(userProfilePage.editProfileBiography, bio);
        await runner.clickOnElement(userProfilePage.submitButton);

        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.biography);
        await runner.waitForMilliseconds(1000);
        await runner.verifyElementText(userProfilePage.biography, bio);
      });

      // Flaky Test
      test("User Interaction with First Name", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user edit profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        // 4. Verify that required fields (e.g., First Name, Last Name) show validation messages if left empty.
        // Empty Check
        await runner.clearInputField(userProfilePage.editProfileFirstName);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileFirstNameErrorText,
          profilePageData.editProfileFirstNameErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileFirstNameErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileFirstNameHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        // Alphanumeric Check
        await runner.enterText(
          userProfilePage.editProfileFirstName,
          randomCharValue30Digits,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileFirstNameErrorText,
          profilePageData.editProfileFirstNameErrorText2, // Error Appears First Name
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileFirstNameErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileFirstNameHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
        // Max Length Check
        await runner.enterText(
          userProfilePage.editProfileFirstName,
          randomCharValuesForInputValueValidation,
        );

        // await runner.validateTextAndClickOnElement(
        //   userProfilePage.submitButton,
        //   profilePageData.submitButtonText,
        // );

        await runner.verifyElementIsVisible(
          userProfilePage.editProfileFirstNameErrorText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileFirstNameErrorText,
          profilePageData.editProfileFirstNameLastNameErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileFirstNameErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileFirstNameHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        // Valid First Name Check
        await runner.enterText(userProfilePage.editProfileFirstName, firstName);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        // await runner.verifyElementText(
        //   userLoginPage.toastMessage,
        //   profilePageData.,
        // );
        await runner.waitForMilliseconds(500);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      // Flaky Test
      test("User Interaction With Last Name", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user edit profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );
        // Empty Check
        await runner.clickOnElement(userProfilePage.editProfileLastName);
        await runner.clearInputField(userProfilePage.editProfileLastName);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileLastNameErrorText,
          profilePageData.editProfileLastNameErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileLastNameErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileLastNameHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        // Alphanumeric Check
        await runner.enterText(
          userProfilePage.editProfileLastName,
          randomCharValue30Digits,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileLastNameErrorText,
          profilePageData.editProfileLastNameErrorText2, // Error Appears Last Name
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileLastNameErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileLastNameHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
        // Max Length Check
        await runner.enterText(
          userProfilePage.editProfileLastName,
          randomCharValuesForInputValueValidation,
        );
        // await runner.validateTextAndClickOnElement(
        //   userProfilePage.submitButton,
        //   profilePageData.submitButtonText,
        // );

        await runner.verifyElementIsVisible(
          userProfilePage.editProfileLastNameErrorText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileLastNameErrorText,
          profilePageData.editProfileFirstNameLastNameErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileLastNameErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfileLastNameHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        // Valid Last Name Check
        await runner.enterText(userProfilePage.editProfileLastName, lastName);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        // await runner.verifyElementText(
        //   userLoginPage.toastMessage,
        //   profilePageData.successfullyProfileUpdateToast,
        // );
        await runner.waitForMilliseconds(1000);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      // Flaky Test
      test("User Interaction With Phone Number", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user edit profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementIsVisible(
          userProfilePage.editProfileHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        // Alphanumeric Check
        await runner.enterText(
          userProfilePage.editProfilePhoneNumber,
          randomCharValuesForInputValueValidation,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.editProfilePhoneNumberErrorText,
          profilePageData.editProfilePhoneNumberErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfilePhoneNumberErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfilePhoneNumberHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        // Max Length Check
        await runner.enterText(
          userProfilePage.editProfilePhoneNumber,
          numericValueOf20Digits,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );

        await runner.verifyElementIsVisible(
          userProfilePage.editProfilePhoneNumberErrorText2,
        );
        await runner.verifyElementText(
          userProfilePage.editProfilePhoneNumberErrorText2,
          profilePageData.editProfilePhoneNumberErrorText2, // Error Appears Phone Number
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfilePhoneNumberErrorText2,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.editProfilePhoneNumberHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
        // Valid Phone Number Check
        await runner.enterText(
          userProfilePage.editProfilePhoneNumber,
          phoneNumber,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.waitForMilliseconds(1000);
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyProfileUpdateToast,
        );
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      test("Validating User Update To Click On Cancel Button & Navigates Back To The Profile", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user edit profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        // 7. Verify that clicking the "Cancel" button discards any changes and navigates back to the profile view page.
        await runner.enterText(userProfilePage.editProfileFirstName, firstName);
        await runner.validateTextAndClickOnElement(
          userProfilePage.backAndCancelButton,
          profilePageData.cancelButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PAGE_URL);
      });

      test("Validating User Update Profile Input Placeholders", async ({
        runner,
        userProfilePage,
      }) => {
        // On click user edit profile
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        // Edit Profile Input Fields
        await runner.clearInputField(userProfilePage.editProfilePhoneNumber);
        await runner.clearInputField(userProfilePage.editProfileBiography);
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );

        // After Click On Submit
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PAGE_URL);
        await runner.wait(1);
        await runner.verifyElementText(
          userProfilePage.profileHeaderText,
          profilePageData.profileHeaderText,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.editProfile,
          profilePageData.EditProfileButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_EDIT_PAGE_URL);
        await runner.verifyElementText(
          userProfilePage.editProfileHeaderText,
          profilePageData.editProfileHeaderText,
        );

        await runner.waitForMilliseconds(1000);

        // Edit Profile Input Fields Placeholder
        await runner.verifyElementPlaceholder(
          userProfilePage.editProfilePhoneNumber,
          profilePageData.editProfilePhoneNumberPlaceholderText,
        );
        await runner.verifyElementPlaceholder(
          userProfilePage.editProfileBiography,
          profilePageData.editProfileBiographyPlaceholderText,
        );
      });

      // 🔹 Password Settings Page – Test Case Scenarios
      test("Validating User Password Settings Header & Placeholder Texts", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on password settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.passwordSettings,
          profilePageData.passwordSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_PASSWORD_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsHeaderText,
          profilePageData.passwordSettingsHeaderText,
        );
        // Header Text
        await runner.verifyElementIsVisible(
          userProfilePage.passwordSettingsNewPasswordHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsNewPasswordHeaderText,
          profilePageData.passwordSettingsNewPasswordHeaderText,
        );
        // New Password
        await runner.verifyElementIsVisible(
          userProfilePage.passwordSettingsNewPasswordHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsNewPasswordHeaderText,
          profilePageData.passwordSettingsNewPasswordHeaderText,
        );
        await runner.verifyElementPlaceholder(
          userProfilePage.passwordSettingsNewPasswordInput,
          profilePageData.passwordSettingsNewPasswordPlaceholderText,
        );
        // Confirm Password
        await runner.verifyElementIsVisible(
          userProfilePage.passwordSettingsConfirmNewPasswordHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsConfirmNewPasswordHeaderText,
          profilePageData.passwordSettingsConfirmNewPasswordHeaderText,
        );
        await runner.verifyElementPlaceholder(
          userProfilePage.passwordSettingsConfirmNewPasswordInput,
          profilePageData.passwordSettingsConfirmNewPasswordPlaceholderText,
        );
      });

      // Don't run this test. otherwise, it will change the password
      test.skip("Validating User Password Successfully Changed", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on password settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.passwordSettings,
          profilePageData.passwordSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_PASSWORD_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsHeaderText,
          profilePageData.passwordSettingsHeaderText,
        );

        await runner.enterText(
          userProfilePage.passwordSettingsNewPasswordInput,
          ENV.FUND_FIT_TEST_PASSWORD,
        );
        await runner.enterText(
          userProfilePage.passwordSettingsConfirmNewPasswordInput,
          ENV.FUND_FIT_TEST_PASSWORD,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyProfileUpdateToast,
        );
        await runner.waitForMilliseconds(5);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      test("User Tries To Change Password With Both Don't Match Password", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on password settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.passwordSettings,
          profilePageData.passwordSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_PASSWORD_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsHeaderText,
          profilePageData.passwordSettingsHeaderText,
        );
        // New Password
        await runner.enterText(
          userProfilePage.passwordSettingsNewPasswordInput,
          password,
        );
        // Confirm New Password
        await runner.enterText(
          userProfilePage.passwordSettingsConfirmNewPasswordInput,
          randomCharValue30Digits,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsConfirmNewPasswordErrorText,
          profilePageData.passwordSettingsConfirmNewPasswordErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.passwordSettingsConfirmNewPasswordErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.passwordSettingsConfirmNewPasswordHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      test("User Tries To Change Password With Previous Password Value", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on password settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.passwordSettings,
          profilePageData.passwordSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_PASSWORD_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsHeaderText,
          profilePageData.passwordSettingsHeaderText,
        );

        // New Password
        await runner.enterText(
          userProfilePage.passwordSettingsNewPasswordInput,
          ENV.FUND_FIT_USER_PREVIOUS_PASSWORD,
        );
        // Confirm New Password
        await runner.enterText(
          userProfilePage.passwordSettingsConfirmNewPasswordInput,
          ENV.FUND_FIT_USER_PREVIOUS_PASSWORD,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsConfirmNewPasswordErrorText2,
          profilePageData.passwordSettingsConfirmNewPasswordErrorText2,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.passwordSettingsConfirmNewPasswordErrorText2,
          fundFitData.textColorCss,
          fundFitData.red500ColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.passwordSettingsConfirmNewPasswordHeaderText,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );
      });

      test("User Tries To Change Password With Current Password Value", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on password settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.passwordSettings,
          profilePageData.passwordSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_PASSWORD_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsHeaderText,
          profilePageData.passwordSettingsHeaderText,
        );

        // New Password
        await runner.enterText(
          userProfilePage.passwordSettingsNewPasswordInput,
          ENV.FUND_FIT_USER_PASSWORD,
        );
        // Confirm New Password
        await runner.enterText(
          userProfilePage.passwordSettingsConfirmNewPasswordInput,
          ENV.FUND_FIT_USER_PASSWORD,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.passwordSettingsConfirmNewPasswordErrorText2,
          profilePageData.passwordSettingsConfirmNewPasswordErrorText2,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.passwordSettingsConfirmNewPasswordErrorText2,
          fundFitData.textColorCss,
          fundFitData.red500ColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.passwordSettingsConfirmNewPasswordHeaderText,
          fundFitData.textColorCss,
          fundFitData.secondBlackColorCode,
        );
      });

      // 🔹 Email Settings Page – Test Case Scenarios
      // Don't run this test. otherwise, it will change the email
      test.skip("Validating User Email Successfully Update", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on email settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettings,
          profilePageData.emailSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_EMAIL_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsHeaderText,
          profilePageData.emailSettingsHeaderText,
        );

        // Existing Email section
        await runner.verifyElementText(
          userProfilePage.emailSettingsCurrentEmailHeaderText,
          profilePageData.emailSettingsCurrentEmailHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsCurrentEmailText,
          ENV.FUND_FIT_USER_EMAIL,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettingsEditEmailButton,
          profilePageData.emailSettingsEditEmailButtonText,
        );

        // New Email setup section
        await runner.verifyElementText(
          userProfilePage.emailSettingsNewEmailFrom,
          profilePageData.emailSettingsNewEmailHeaderText,
          "label",
        );
        await runner.verifyInputValue(
          userProfilePage.emailSettingsNewEmailFrom,
          ENV.FUND_FIT_USER_EMAIL,
          "input",
        );
        await runner.enterText(
          userProfilePage.emailSettingsNewEmailFrom,
          ENV.FUND_FIT_USER_NEW_EMAIL, // need to change new email (FUND_FIT_USER_NEW_EMAIL) in .env file
          "input",
        );

        // Submit button
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyProfileUpdateToast,
        );
        await runner.waitForMilliseconds(2000);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementIsVisible(userProfilePage.toastCloseButton);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      test.skip("Validating User Email Change With Existing Email", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on email settings
        await runner.verifyElementIsVisible(userProfilePage.emailSettings);
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettings,
          profilePageData.emailSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_EMAIL_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsHeaderText,
          profilePageData.emailSettingsHeaderText,
        );

        // Existing Email section
        await runner.verifyElementText(
          userProfilePage.emailSettingsCurrentEmailHeaderText,
          profilePageData.emailSettingsCurrentEmailHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsCurrentEmailText,
          ENV.FUND_FIT_USER_EMAIL,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettingsEditEmailButton,
          profilePageData.emailSettingsEditEmailButtonText,
        );

        // New Email section
        await runner.verifyElementText(
          userProfilePage.emailSettingsNewEmailFrom,
          profilePageData.emailSettingsNewEmailHeaderText,
          "label",
        );
        await runner.enterText(
          userProfilePage.emailSettingsNewEmailFrom,
          ENV.FUND_FIT_USER_EMAIL,
          "input",
        );

        // Submit button
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsAlreadyVerifiedErrorText,
          profilePageData.emailSettingsAlreadyVerifiedErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.emailSettingsAlreadyVerifiedErrorText,
          fundFitData.textColorCss,
          fundFitData.red500ColorCode,
        );
      });

      test.skip("Validating User Email Invalid Email Format", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on email settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettings,
          profilePageData.emailSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_EMAIL_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsHeaderText,
          profilePageData.emailSettingsHeaderText,
        );

        // New Email section
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettingsEditEmailButton,
          profilePageData.emailSettingsEditEmailButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsEditEmailHeaderText,
          profilePageData.emailSettingsEditEmailHeaderText,
        );

        // without @ value
        await runner.enterText(
          userProfilePage.emailSettingsNewEmailFrom,
          `${randomCharValue30Digits}.com`,
          "input",
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsInvalidErrorText,
          profilePageData.emailSettingsInvalidErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.emailSettingsInvalidErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          `${userProfilePage.emailSettingsNewEmailFrom} label`,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        // without .com value
        await runner.enterText(
          userProfilePage.emailSettingsNewEmailFrom,
          `${firstName}@${lastName}`,
          "input",
        );
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.verifyElementText(
          userProfilePage.emailSettingsInvalidErrorText,
          profilePageData.emailSettingsInvalidErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.emailSettingsInvalidErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          `${userProfilePage.emailSettingsNewEmailFrom} label`,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        // without domain value
        await runner.enterText(
          userProfilePage.emailSettingsNewEmailFrom,
          `${firstName}@.com`,
          "input",
        );
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.verifyElementText(
          userProfilePage.emailSettingsInvalidErrorText,
          profilePageData.emailSettingsInvalidErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.emailSettingsInvalidErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          `${userProfilePage.emailSettingsNewEmailFrom} label`,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );

        // without domain and .com value
        await runner.enterText(
          userProfilePage.emailSettingsNewEmailFrom,
          `${firstName}`,
          "input",
        );
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.verifyElementText(
          userProfilePage.emailSettingsInvalidErrorText,
          profilePageData.emailSettingsInvalidErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.emailSettingsInvalidErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          `${userProfilePage.emailSettingsNewEmailFrom} label`,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      test.skip("Validating Blank Email On User Email Field", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on email settings
        await runner.validateTextAndClickOnElement(
          userProfilePage.emailSettings,
          profilePageData.emailSettingsButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_EMAIL_SETTING_PAGE_URL,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsHeaderText,
          profilePageData.emailSettingsHeaderText,
        );

        // New Email section
        await runner.clickOnElement(
          userProfilePage.emailSettingsEditEmailButton,
        );
        await runner.verifyElementText(
          userProfilePage.emailSettingsEditEmailHeaderText,
          profilePageData.emailSettingsEditEmailHeaderText,
        );

        // Clear Email input field
        await runner.clearInputField(
          `${userProfilePage.emailSettingsNewEmailFrom} input`,
        );
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.verifyElementText(
          userProfilePage.emailSettingsInvalidErrorText,
          profilePageData.emailSettingsRequiredErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.emailSettingsInvalidErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          `${userProfilePage.emailSettingsNewEmailFrom} label`,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      // 🔹 Background Tab – Test Case Scenarios
      test("Validating Navigation & Background Tab Activation Test", async ({
        runner,
        userProfilePage,
      }) => {
        // 1. Verify that clicking the "Background" tab activates it and loads the correct content.
        // Click on user background tab
        await runner.clickOnElement(userProfilePage.topBarBackgroundButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.backgroundHeaderText,
          profilePageData.backgroundHeaderText,
        );

        // 2. Verify that other tabs (General, Works, Projects, Attachments) are not active when "Background" is selected.
        await runner.validateAttribute(
          [
            userProfilePage.topBarGeneralButton,
            userProfilePage.topBarWorksButton,
            userProfilePage.topBarProjectsButton,
            userProfilePage.topBarAttachmentsButton,
          ],
          "data-state",
          "inactive",
        );
      });

      test("Validating No Background Data Exists", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user background tab
        await runner.clickOnElement(userProfilePage.topBarBackgroundButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.backgroundHeaderText,
          profilePageData.backgroundHeaderText,
        );

        // Verify that the "No Background" message is displayed when there are no background entries.
        await runner.verifyElementIsVisible([
          userProfilePage.noBackgroundIcon,
          userProfilePage.noBackgroundHeaderText,
          userProfilePage.noBackgroundText,
          userProfilePage.noBackgroundAddButton,
        ]);
        await runner.verifyElementTextContains(
          [
            userProfilePage.noBackgroundHeaderText,
            userProfilePage.noBackgroundText,
            userProfilePage.noBackgroundAddButton,
          ],
          [
            profilePageData.noBackgroundHeaderText,
            profilePageData.noBackgroundText,
            profilePageData.noBackgroundAddButtonText,
          ],
        );
      });

      test("Validating Add Background Successfully & Remove Successfully", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user background tab
        await runner.clickOnElement(userProfilePage.topBarBackgroundButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.backgroundHeaderText,
          profilePageData.backgroundHeaderText,
        );

        // Click on Add Background
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.backgroundPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createBackgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createBackgroundHeaderText,
          profilePageData.createBackgroundHeaderText,
        );

        // Select Background Type
        await runner.selectDropdownOptionByText(
          userProfilePage.createBackgroundTypeButtonText,
          backgroundType,
        );

        // Add Role
        await runner.enterText(userProfilePage.createBackgroundRoleInput, role);
        // Add Department
        await runner.enterText(
          userProfilePage.createBackgroundDepartmentInput,
          department,
        );
        // Add Organization
        await runner.enterText(
          userProfilePage.createBackgroundOrganizationInput,
          organization,
        );
        // Add Organization Address
        await runner.enterText(
          userProfilePage.createBackgroundOrganizationAddressInput,
          organizationAddress,
        );
        // Add Start Year
        await runner.enterText(
          userProfilePage.createBackgroundStartYearInput,
          startDate.year.toString(),
        );
        // Add Start Month
        await runner.enterText(
          userProfilePage.createBackgroundStartMonthInput,
          startDate.month.toString(),
        );
        // Add Start Day
        await runner.enterText(
          userProfilePage.createBackgroundStartDayInput,
          startDate.day.toString(),
        );
        // Add End Year
        await runner.enterText(
          userProfilePage.createBackgroundEndYearInput,
          endDate.year.toString(),
        );
        // Add End Month
        await runner.enterText(
          userProfilePage.createBackgroundEndMonthInput,
          endDate.month.toString(),
        );
        // Add End Day
        await runner.enterText(
          userProfilePage.createBackgroundEndDayInput,
          endDate.day.toString(),
        );

        // Click on Submit Button
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );

        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.waitForMilliseconds(1000);
        await runner.verifyElementIsVisible(userProfilePage.table);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyBackgroundCreateToast,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.clickOnElement(userProfilePage.toastCloseButton);

        await runner.verifyElementIsVisible(
          userProfilePage.sidebarBackgroundValue,
        );
        await runner.verifyElementText(
          userProfilePage.sidebarBackgroundValue,
          "1",
        );

        // Remove Background
        await runner.clickOnElement(userProfilePage.tableDeleteButton);

        // Open Background Delete Modal
        await runner.verifyElementIsVisible(
          userProfilePage.deleteModalHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.deleteModalHeaderText,
          profilePageData.deleteModalHeaderText,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.deleteModalButton,
          profilePageData.deleteModalDeleteButtonText,
        );
        await runner.waitForMilliseconds(1000);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyBackgroundDeleteToast,
        );
      });

      test("Validating Background Data Update Successfully & Remove Successfully", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user background tab
        await runner.clickOnElement(userProfilePage.topBarBackgroundButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.backgroundHeaderText,
          profilePageData.backgroundHeaderText,
        );

        // Click on Add Background
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.backgroundPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createBackgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createBackgroundHeaderText,
          profilePageData.createBackgroundHeaderText,
        );

        // Select Background Type
        await runner.selectDropdownOptionByText(
          userProfilePage.createBackgroundTypeButtonText,
          backgroundType,
        );

        // Click on Submit Button
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.waitForMilliseconds(1000);
        await runner.verifyElementIsVisible(userProfilePage.table);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyBackgroundCreateToast,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.clickOnElement(userProfilePage.toastCloseButton);

        // Click on Update Background
        await runner.clickOnElement(userProfilePage.tableUpdateButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_UPDATE_PAGE_URL,
          true,
        );
        await runner.waitUntilElementIsInvisible(
          userProfilePage.loadingRecordsText,
        );
        await runner.verifyElementIsVisible(
          "xpath=//h1[normalize-space()='Update Background']",
        );
        await runner.verifyElementText(
          "xpath=//h1[normalize-space()='Update Background']",
          "Update Background",
        );

        // Add Role
        await runner.enterText(userProfilePage.createBackgroundRoleInput, role);
        // Add Department
        await runner.enterText(
          userProfilePage.createBackgroundDepartmentInput,
          department,
        );
        // Add Organization
        await runner.enterText(
          userProfilePage.createBackgroundOrganizationInput,
          organization,
        );
        // Add Organization Address
        await runner.enterText(
          userProfilePage.createBackgroundOrganizationAddressInput,
          organizationAddress,
        );
        // Add Start Year
        await runner.enterText(
          userProfilePage.createBackgroundStartYearInput,
          startDate.year.toString(),
        );
        // Add Start Month
        await runner.enterText(
          userProfilePage.createBackgroundStartMonthInput,
          startDate.month.toString(),
        );
        // Add Start Day
        await runner.enterText(
          userProfilePage.createBackgroundStartDayInput,
          startDate.day.toString(),
        );
        // Add End Year
        await runner.enterText(
          userProfilePage.createBackgroundEndYearInput,
          endDate.year.toString(),
        );
        // Add End Month
        await runner.enterText(
          userProfilePage.createBackgroundEndMonthInput,
          endDate.month.toString(),
        );
        // Add End Day
        await runner.enterText(
          userProfilePage.createBackgroundEndDayInput,
          endDate.day.toString(),
        );

        // Click on Submit Button
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.waitForMilliseconds(1000);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
          true,
        );
        await runner.verifyElementIsVisible(userProfilePage.table);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyBackgroundUpdateToast,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.clickOnElement(userProfilePage.toastCloseButton);

        // Remove Background
        await runner.clickOnElement(userProfilePage.tableDeleteButton);

        // Open Background Delete Modal
        await runner.verifyElementIsVisible(
          userProfilePage.deleteModalHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.deleteModalHeaderText,
          profilePageData.deleteModalHeaderText,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.deleteModalButton,
          profilePageData.deleteModalDeleteButtonText,
        );
        await runner.waitForMilliseconds(1000);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyBackgroundDeleteToast,
        );
      });

      test("Should Display Validation Error For Create Background Required Fields", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user background tab
        await runner.clickOnElement(userProfilePage.topBarBackgroundButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.backgroundHeaderText,
          profilePageData.backgroundHeaderText,
        );

        // Click on Add Background
        await runner.verifyElementIsVisible(
          userProfilePage.backgroundPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.backgroundPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_BACKGROUND_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createBackgroundHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createBackgroundHeaderText,
          profilePageData.createBackgroundHeaderText,
        );

        // Click on submit
        await runner.clickOnElement(userProfilePage.submitButton);

        await runner.verifyElementIsVisible(
          userProfilePage.createBackgroundTypeHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createBackgroundTypeErrorText,
          profilePageData.createBackgroundTypeErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createBackgroundTypeErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createBackgroundTypeHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      // 🔹 Works Tab – Test Case Scenarios
      test("Validating The 'Works' Tab activated & No Research Work Data Exists", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementText(
          userProfilePage.worksHeaderText,
          profilePageData.worksHeaderText,
        );

        // Other Tabs are not active when "Works" is selected.
        await runner.validateAttribute(
          [
            userProfilePage.topBarGeneralButton,
            userProfilePage.topBarBackgroundButton,
            userProfilePage.topBarProjectsButton,
            userProfilePage.topBarAttachmentsButton,
          ],
          "data-state",
          "inactive",
        );

        // Verify that the "No research works" message is displayed when there are no research work entries.
        await runner.validateNoDataFound(
          userProfilePage.noDataFoundTexts,
          userProfilePage.table,
          profilePageData.noWorksText,
        );
      });

      test("Validating Successfully Navigate To Research Work Creation Page", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementText(
          userProfilePage.worksHeaderText,
          profilePageData.worksHeaderText,
        );

        // Click on Add Research Work
        await runner.verifyElementIsVisible(
          userProfilePage.worksPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.worksPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_CREATE_PAGE_URL,
        );

        await runner.verifyElementIsVisible([
          userProfilePage.createWorkHeaderText,
          userProfilePage.backAndCancelButton,
          userProfilePage.createWorkTypeHeaderText,
          userProfilePage.createWorkJournalTitleHeaderText,
          userProfilePage.createWorkTitleHeaderText,
          userProfilePage.createWorkPublicationYearHeaderText,
          userProfilePage.createWorkPublicationMonthHeaderText,
          userProfilePage.createWorkPublicationDayHeaderText,
        ]);

        await runner.verifyElementText(
          userProfilePage.createWorkHeaderText,
          profilePageData.createWorkHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkTypeHeaderText,
          profilePageData.createWorkTypeHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkJournalTitleHeaderText,
          profilePageData.createWorkJournalTitleHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkTitleHeaderText,
          profilePageData.createWorkTitleHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkPublicationYearHeaderText,
          profilePageData.createWorkPublicationYearHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkPublicationMonthHeaderText,
          profilePageData.createWorkPublicationMonthHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkPublicationDayHeaderText,
          profilePageData.createWorkPublicationDayHeaderText,
        );

        // Verify that the "Back" button is displayed and clickable.
        await runner.validateTextAndClickOnElement(
          userProfilePage.backAndCancelButton,
          profilePageData.backButtonText,
        );
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
      });

      test("Validating Add Research Works Successfully & Remove Successfully", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementText(
          userProfilePage.worksHeaderText,
          profilePageData.worksHeaderText,
        );

        // Click on Add Research Work
        await runner.verifyElementIsVisible(
          userProfilePage.worksPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.worksPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createWorkHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkHeaderText,
          profilePageData.createWorkHeaderText,
        );

        // Select Work Type
        await runner.selectDropdownOptionByText(
          userProfilePage.createWorkTypeButtonText,
          workType,
        );

        // Add Journal Title
        await runner.enterText(
          userProfilePage.createWorkJournalTitleInput,
          journalTitle,
        );
        // Add Title
        await runner.enterText(userProfilePage.createWorkTitleInput, title);
        // Add Publication Year
        await runner.enterText(
          userProfilePage.createWorkPublicationYearInput,
          publicationYear.toString(),
        );
        // Add Publication Month
        await runner.enterText(
          userProfilePage.createWorkPublicationMonthInput,
          publicationMonth.toString(),
        );
        // Add Publication Day
        await runner.enterText(
          userProfilePage.createWorkPublicationDayInput,
          publicationDay.toString(),
        );

        // Click on Submit Button
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );

        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_PAGE_URL,
          true,
        );
        await runner.waitForMilliseconds(1000);
        await runner.verifyElementIsVisible(userProfilePage.table);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyWorkCreateToast,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.clickOnElement(userProfilePage.toastCloseButton);

        await runner.verifyElementIsVisible(userProfilePage.sidebarWorksValue);

        // Remove Work
        await runner.clickOnElement(userProfilePage.tableDeleteButton);

        // Open Work Delete Modal
        await runner.verifyElementIsVisible(
          userProfilePage.deleteModalHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.deleteModalHeaderText,
          profilePageData.deleteModalHeaderText,
        );
        await runner.validateTextAndClickOnElement(
          userProfilePage.deleteModalButton,
          profilePageData.deleteModalDeleteButtonText,
        );
        await runner.waitForMilliseconds(1000);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyWorkDeleteToast,
        );
      });

      test("Validation Research Works Data Update Successfully & Remove Successfully", async ({
        runner,
        userProfilePage,
        userLoginPage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementText(
          userProfilePage.worksHeaderText,
          profilePageData.worksHeaderText,
        );

        // Click on Add Research Work
        await runner.verifyElementIsVisible(
          userProfilePage.worksPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.worksPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createWorkHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkHeaderText,
          profilePageData.createWorkHeaderText,
        );

        // Select Work Type
        await runner.selectDropdownOptionByText(
          userProfilePage.createWorkTypeButtonText,
          workType,
        );

        // Add Journal Title
        await runner.enterText(
          userProfilePage.createWorkJournalTitleInput,
          journalTitle,
        );
        // Add Title
        await runner.enterText(userProfilePage.createWorkTitleInput, title);

        // Click on Submit Button
        await runner.validateTextAndClickOnElement(
          userProfilePage.submitButton,
          profilePageData.submitButtonText,
        );
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_PAGE_URL,
          true,
        );
        await runner.validateElementInvisibility(userProfilePage.submitButton);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementIsVisible(userProfilePage.table);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyWorkCreateToast,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.clickOnElement(userProfilePage.toastCloseButton);

        // Click on Update Work
        await runner.clickOnElement(userProfilePage.tableUpdateButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_UPDATE_PAGE_URL,
          true,
        );
        await runner.waitUntilElementIsInvisible(
          userProfilePage.loadingRecordsText,
        );
        await runner.verifyElementIsVisible(
          "xpath=//h1[normalize-space()='Update Research Work']",
        );
        await runner.verifyElementText(
          "xpath=//h1[normalize-space()='Update Research Work']",
          "Update Research Work",
        );

        await runner.enterText(
          userProfilePage.createWorkJournalTitleInput,
          journalTitle,
        );

        // Add Publication Year
        await runner.enterText(
          userProfilePage.createWorkPublicationMonthInput,
          publicationYear.toString(),
        );
        // Add Publication Month
        await runner.enterText(
          userProfilePage.createWorkPublicationMonthInput,
          publicationMonth.toString(),
        );
        // Add Publication Day
        await runner.enterText(
          userProfilePage.createWorkPublicationDayInput,
          publicationDay.toString(),
        );

        // Click on Submit Button
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.waitForMilliseconds(1000);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_PAGE_URL,
          true,
        );
        await runner.verifyElementIsVisible(userProfilePage.table);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.verifyElementText(
          userLoginPage.toastMessage,
          profilePageData.successfullyWorkUpdateToast,
        );
        await runner.verifyElementIsVisible(userLoginPage.toastMessage);
        await runner.hoverOnElement(userLoginPage.toastMessage);
        await runner.clickOnElement(userProfilePage.toastCloseButton);
      });

      test("Validating The Select Works Type Combobox Values", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementText(
          userProfilePage.worksHeaderText,
          profilePageData.worksHeaderText,
        );

        // Click on Add Research Work
        await runner.verifyElementIsVisible(
          userProfilePage.worksPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.worksPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createWorkHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkHeaderText,
          profilePageData.createWorkHeaderText,
        );

        // validating Work Type combobox values
        await runner.selectAllMatchingDropdownOptions(
          userProfilePage.createWorkTypeButtonText,
          profilePageData.createWorkTypeDropdownTexts,
          false,
        );
      });

      test("Validating Work Type Combobox Search Functionality", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.clickOnElement(userProfilePage.worksPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createWorkHeaderText,
        );

        // Click to open the Work Type dropdown
        await runner.clickOnElement(userProfilePage.createWorkTypeButtonText);
        await runner.verifyElementIsVisible(
          userProfilePage.createTypeSearchInput,
        );
        await runner.validateAttribute(
          userProfilePage.createTypeSearchInput,
          "placeholder",
          profilePageData.createWorkTypeSearchPlaceholderText,
        );

        // Scenario 1: Search with matching results
        await runner.enterText(
          userProfilePage.createTypeSearchInput,
          workType?.replace(/[\s/-]/g, ""), // Remove spaces, slashes, and dashes
        );
        await runner.verifyExpectedOptionInDropdown(
          userProfilePage.createTypeSearchInput,
        );

        // Scenario 2: Search with no matching results
        await runner.clearInputField(userProfilePage.createTypeSearchInput);
        await runner.enterText(
          userProfilePage.createTypeSearchInput,
          randomCharValue30Digits,
        );

        // Verify that "No Results Found" message is displayed
        await runner.verifyElementIsVisible(
          userProfilePage.noResultsFoundMessage,
        );
        await runner.verifyElementText(
          userProfilePage.noResultsFoundMessage,
          profilePageData.noResultsFoundMessage,
        );

        // Optionally, click outside or press escape to close the dropdown
        await runner.pressKeyWithDelay("Escape");
      });

      test("Should Display Validation Errors For Research Works Required Fields", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Works tab
        await runner.clickOnElement(userProfilePage.topBarWorksButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_WORK_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.worksHeaderText);
        await runner.verifyElementText(
          userProfilePage.worksHeaderText,
          profilePageData.worksHeaderText,
        );

        // Click on Add Research Work
        await runner.verifyElementIsVisible(
          userProfilePage.worksPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.worksPlusIconButton);
        await runner.verifyContainsUrl(
          ENV.FUND_FIT_PROFILE_WORK_CREATE_PAGE_URL,
        );
        await runner.verifyElementIsVisible(
          userProfilePage.createWorkHeaderText,
        );
        await runner.verifyElementText(
          userProfilePage.createWorkHeaderText,
          profilePageData.createWorkHeaderText,
        );

        // Click on Submit Button
        await runner.clickOnElement(userProfilePage.submitButton);
        await runner.verifyElementIsVisible([
          userProfilePage.createWorkTypeErrorText,
          userProfilePage.createWorkJournalTitleErrorText,
          userProfilePage.createWorkTitleErrorText,
        ]);

        // Work Type Required
        await runner.verifyElementText(
          userProfilePage.createWorkTypeErrorText,
          profilePageData.createWorkTypeErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createWorkTypeErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createWorkTypeHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        // Journal Title Required
        await runner.verifyElementText(
          userProfilePage.createWorkJournalTitleErrorText,
          profilePageData.createWorkJournalTitleErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createWorkJournalTitleErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createWorkJournalTitleHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        // Title Required
        await runner.verifyElementText(
          userProfilePage.createWorkTitleErrorText,
          profilePageData.createWorkTitleErrorText,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createWorkTitleErrorText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
        await runner.verifyElementToHaveCSSProperty(
          userProfilePage.createWorkTitleHeaderText,
          fundFitData.textColorCss,
          fundFitData.redColorCode,
        );
      });

      // 🔹 Projects Tab – Test Case Scenarios
      test("Validating The 'Projects' Tab activated & No Research Work Data Exists", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Projects tab
        await runner.clickOnElement(userProfilePage.topBarProjectsButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PROJECT_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.projectsHeaderText);
        await runner.verifyElementText(
          userProfilePage.projectsHeaderText,
          profilePageData.projectHeaderText,
        );

        // Other Tabs are not active when "Projects" is selected.
        await runner.validateAttribute(
          [
            userProfilePage.topBarGeneralButton,
            userProfilePage.topBarBackgroundButton,
            userProfilePage.topBarWorksButton,
            userProfilePage.topBarAttachmentsButton,
          ],
          "data-state",
          "inactive",
        );

        // Verify that the "No research projects" message is displayed when there are no research work entries.
        await runner.validateNoDataFound(
          userProfilePage.noDataFoundTexts,
          userProfilePage.table,
          profilePageData.noProjectsText,
        );
      });

      test("Validating Successfully Navigate To Project Creation Page", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Projects tab
        await runner.clickOnElement(userProfilePage.topBarProjectsButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PROJECT_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.projectsHeaderText);
        await runner.verifyElementText(
          userProfilePage.projectsHeaderText,
          profilePageData.projectHeaderText,
        );

        // Click on Add
        await runner.verifyElementIsVisible(
          userProfilePage.projectsPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.projectsPlusIconButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_CREATE_PROJECT_PAGE_URL);

        await runner.waitUntilElementIsInvisible(
          userProfilePage.projectsPlusIconButton,
        );

        await runner.verifyElementIsVisible(
          userProfilePage.createProjectsHeaderTextSection,
        );

        await runner.verifyElementText(
          userProfilePage.createProjectsHeaderTextSection,
          profilePageData.createProjectFormHeaderText,
          "h1",
        );

        await runner.verifyElementText(
          userProfilePage.createProjectsHeaderTextSection,
          profilePageData.backButtonText,
          "a",
        );

        await runner.verifyElementIsVisible(
          userProfilePage.selectProjectTypeComboBoxInput,
        );

        await runner.validateAttribute(
          userProfilePage.selectProjectTypeComboBoxInput,
          "data-state",
          "closed",
        );

        await runner.clickOnElement(
          userProfilePage.selectProjectTypeComboBoxInput,
        );

        await runner.validateAttribute(
          userProfilePage.selectProjectTypeComboBoxInput,
          "data-state",
          "open",
        );

        await runner.selectDropdownOptionByText(
          userProfilePage.selectProjectTypeComboBoxInput,
          "contract",
        );

        await runner.validateAttribute(
          userProfilePage.selectProjectTypeComboBoxInput,
          "data-state",
          "closed",
        );
      });

      test("Validating The Select Project Type Combobox Values", async ({
        runner,
        userProfilePage,
      }) => {
        // Click on user Projects tab
        await runner.clickOnElement(userProfilePage.topBarProjectsButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_PROFILE_PROJECT_PAGE_URL);
        await runner.verifyElementIsVisible(userProfilePage.projectsHeaderText);
        await runner.verifyElementText(
          userProfilePage.projectsHeaderText,
          profilePageData.projectHeaderText,
        );

        // Click on Add
        await runner.verifyElementIsVisible(
          userProfilePage.projectsPlusIconButton,
        );
        await runner.clickOnElement(userProfilePage.projectsPlusIconButton);
        await runner.verifyContainsUrl(ENV.FUND_FIT_CREATE_PROJECT_PAGE_URL);

        await runner.waitUntilElementIsInvisible(
          userProfilePage.projectsPlusIconButton,
        );

        await runner.verifyElementIsVisible(
          userProfilePage.createProjectsHeaderTextSection,
        );

        await runner.verifyElementText(
          userProfilePage.createProjectsHeaderTextSection,
          profilePageData.createProjectFormHeaderText,
          "h1",
        );

        await runner.verifyElementText(
          userProfilePage.createProjectsHeaderTextSection,
          profilePageData.backButtonText,
          "a",
        );

        await runner.verifyElementIsVisible(
          userProfilePage.selectProjectTypeComboBoxInput,
        );

        await runner.clickOnElement(
          userProfilePage.selectProjectTypeComboBoxInput,
        );

        await runner.validateAttribute(
          userProfilePage.selectProjectTypeComboBoxInput,
          "data-state",
          "open",
        );

        await runner.verifyLinksTexts(
          userProfilePage.selectProjectTypeComboBoxTextValues,
          profilePageData.comboBoxPlaceholderText,
        );

        await runner.selectDropdownOptionByText(
          userProfilePage.selectProjectTypeComboBoxInput,
          "contract",
        );

        await runner.validateAttribute(
          userProfilePage.selectProjectTypeComboBoxInput,
          "data-state",
          "closed",
        );

        await runner.selectDropdownOptionByText(
          userProfilePage.selectProjectTypeComboBoxInput,
          "salary award",
        );

        await runner.selectDropdownOptionByText(
          userProfilePage.selectProjectTypeComboBoxInput,
          "grant",
        );

        await runner.selectDropdownOptionByText(
          userProfilePage.selectProjectTypeComboBoxInput,
          "award",
        );

        await runner.validateAttribute(
          userProfilePage.selectProjectTypeComboBoxInput,
          "data-state",
          "closed",
        );
      });
    }); // End of describe block
  } // End of runTests method
} // End of UserProfileTest class
const testSuite = new UserProfileTest();
testSuite.runTests();
