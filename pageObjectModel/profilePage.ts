import { Page } from "playwright";

export class profilePage {
  readonly sidebarPhoto: string;
  readonly sidebarFullNameText: string;
  readonly sidebarTitleText: string;

  readonly sidebarGeneralInfoButton: string;
  readonly sidebarBackgroundButton: string;
  readonly sidebarWorksButton: string;
  readonly sidebarProjectsButton: string;
  readonly sidebarAttachmentsButton: string;
  readonly sidebarORCIDButton: string;

  readonly sidebarGeneralInfoIcon: string;
  readonly sidebarBackgroundIcon: string;
  readonly sidebarWorksIcon: string;
  readonly sidebarProjectsIcon: string;
  readonly sidebarAttachmentsIcon: string;
  readonly sidebarORCIDIcon: string;

  readonly sidebarGeneralInfoText: string;
  readonly sidebarBackgroundText: string;
  readonly sidebarWorksText: string;
  readonly sidebarProjectsText: string;
  readonly sidebarAttachmentsText: string;
  readonly sidebarORCIDText: string;

  readonly sidebarBackgroundValue: string;
  readonly sidebarWorksValue: string;
  readonly sidebarProjectsValue: string;
  readonly sidebarAttachmentsValue: string;

  readonly topBarGeneralButton: string;
  readonly topBarBackgroundButton: string;
  readonly topBarWorksButton: string;
  readonly topBarProjectsButton: string;
  readonly topBarAttachmentsButton: string;

  readonly profileHeaderText: string;
  readonly editProfileIcon: string;
  readonly editProfile: string;
  readonly passwordSettingsIcon: string;
  readonly passwordSettings: string;
  readonly emailSettingsIcon: string;
  readonly emailSettings: string;

  readonly firstName: string;
  readonly lastName: string;
  readonly email: string;
  readonly institution: string;
  readonly phoneNumber: string;
  readonly biography: string;

  readonly firstNameHeader: string;
  readonly lastNameHeader: string;
  readonly emailHeader: string;
  readonly institutionHeader: string;
  readonly phoneNumberHeader: string;
  readonly biographyHeader: string;

  readonly editProfileHeaderText: string;
  readonly editProfileFirstName: string;
  readonly editProfileLastName: string;
  readonly editProfilePhoneNumber: string;
  readonly editProfileBiography: string;
  readonly editProfileFirstNameHeaderText: string;
  readonly editProfileFirstNamePlaceHolderText: string;
  readonly editProfileFirstNameErrorText: string;
  readonly editProfileLastNameHeaderText: string;
  readonly editProfileLastNameErrorText: string;
  readonly editProfilePhoneNumberHeaderText: string;
  readonly editProfilePhoneNumberErrorText: string;
  readonly editProfilePhoneNumberErrorText2: string;
  readonly editProfileBiographyHeaderText: string;

  readonly passwordSettingsHeaderText: string;
  readonly passwordSettingsNewPasswordHeaderText: string;
  readonly passwordSettingsNewPasswordInput: string;
  readonly passwordSettingsNewPasswordEyeIconButton: string;
  readonly passwordSettingsConfirmNewPasswordHeaderText: string;
  readonly passwordSettingsConfirmNewPasswordInput: string;
  readonly passwordSettingsConfirmNewPasswordErrorText: string;
  readonly passwordSettingsConfirmNewPasswordErrorText2: string;

  readonly emailSettingsHeaderText: string;
  readonly emailSettingsCurrentEmailHeaderText: string;
  readonly emailSettingsCurrentEmailText: string;
  readonly emailSettingsEditEmailButton: string;
  readonly emailSettingsEditEmailHeaderText: string;
  readonly emailSettingsNewEmailFrom: string;
  readonly emailSettingsAlreadyVerifiedErrorText: string;
  readonly emailSettingsInvalidErrorText: string;

  readonly backgroundHeaderText: string;
  readonly backgroundPlusIconButton: string;
  readonly noBackgroundIcon: string;
  readonly noBackgroundHeaderText: string;
  readonly noBackgroundText: string;
  readonly noBackgroundAddButton: string;

  readonly createBackgroundHeaderText: string;
  readonly createBackgroundTypeHeaderText: string;
  readonly createBackgroundTypeButtonText: string;
  readonly createBackgroundTypeErrorText: string;
  readonly createBackgroundTypeTexts: string;
  readonly createBackgroundRoleInput: string;
  readonly createBackgroundDepartmentInput: string;
  readonly createBackgroundOrganizationInput: string;
  readonly createBackgroundOrganizationAddressInput: string;
  readonly createBackgroundStartYearInput: string;
  readonly createBackgroundStartMonthInput: string;
  readonly createBackgroundStartDayInput: string;
  readonly createBackgroundEndYearInput: string;
  readonly createBackgroundEndMonthInput: string;
  readonly createBackgroundEndDayInput: string;

  readonly worksHeaderText: string;
  readonly worksPlusIconButton: string;
  readonly noWorksIcon: string;
  readonly noWorksHeaderText: string;
  readonly noWorksText: string;
  readonly noWorksAddButton: string;

  readonly createWorkHeaderText: string;
  readonly createWorkTypeHeaderText: string;
  readonly createWorkTypeButtonText: string;
  readonly createWorkTypeErrorText: string;
  readonly createWorkJournalTitleHeaderText: string;
  readonly createWorkJournalTitleInput: string;
  readonly createWorkJournalTitleErrorText: string;
  readonly createWorkTitleHeaderText: string;
  readonly createWorkTitleInput: string;
  readonly createWorkTitleErrorText: string;
  readonly createWorkPublicationYearHeaderText: string;
  readonly createWorkPublicationYearInput: string;
  readonly createWorkPublicationMonthHeaderText: string;
  readonly createWorkPublicationMonthInput: string;
  readonly createWorkPublicationDayHeaderText: string;
  readonly createWorkPublicationDayInput: string;

  readonly projectsHeaderText: string;
  readonly projectsPlusIconButton: string;
  readonly noProjectsIcon: string;
  readonly noProjectsHeaderText: string;
  readonly noProjectsText: string;
  readonly noProjectsAddButton: string;

  readonly createProjectsHeaderTextSection: string;
  readonly createProjectsTypeHeaderText: string;
  readonly createProjectsTypeButtonText: string;
  readonly createProjectsTitleHeaderText: string;
  readonly createProjectsTitleInput: string;
  readonly createProjectsOrgHeaderText: string;
  readonly createProjectsOrgInput: string;
  readonly createProjectsOrgTypeHeaderText: string;
  readonly createProjectsOrgTypeInput: string;
  readonly createProjectsOrgLocationHeaderText: string;
  readonly createProjectsOrgLocationInput: string;
  readonly createProjectsOrgAmountHeaderText: string;
  readonly createProjectsOrgAmountInput: string;
  readonly createProjectsStartYearHeaderText: string;
  readonly createProjectsStartYearInput: string;
  readonly createProjectsStartMonthHeaderText: string;
  readonly createProjectsStartMonthInput: string;
  readonly createProjectsStartDayHeaderText: string;
  readonly createProjectsStartDayInput: string;
  readonly createProjectsEndYearHeaderText: string;
  readonly createProjectsEndYearInput: string;
  readonly createProjectsEndMonthHeaderText: string;
  readonly createProjectsEndMonthInput: string;
  readonly createProjectsEndDayHeaderText: string;
  readonly createProjectsEndDayInput: string;
  readonly selectProjectTypeComboBoxInput: string;
  readonly selectProjectTypeComboBoxTextValues: string;

  readonly noDataFoundTexts: string;
  readonly createTypeSearchInput: string; // Added for combobox search
  readonly noResultsFoundMessage: string; // Added for "No results found" message

  readonly loadingRecordsText: string;
  readonly table: string;
  readonly tableUpdateButton: string;
  readonly tableDeleteButton: string;
  readonly deleteModalHeaderText: string;
  readonly deleteModalButton: string;

  readonly toastMessageHeaderText: string;
  readonly toastMessageText: string;
  readonly toastCloseButton: string;
  readonly backAndCancelButton: string;
  readonly submitButton: string;

  constructor(page: Page) {
    this.sidebarPhoto = `css=span[class='flex h-full w-full items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-semibold']`;
    this.sidebarFullNameText = `css=h2[class='text-lg font-semibold mb-1']`;
    this.sidebarTitleText = `css=p[class='text-sm text-muted-foreground mb-6']`;

    this.sidebarGeneralInfoButton = `css=nav[class='w-full space-y-1'] > button:nth-child(1)`;
    this.sidebarBackgroundButton = `css=nav[class='w-full space-y-1'] > button:nth-child(3)`;
    this.sidebarWorksButton = `css=nav[class='w-full space-y-1'] > button:nth-child(5)`;
    this.sidebarProjectsButton = `css=nav[class='w-full space-y-1'] > button:nth-child(7)`;
    this.sidebarAttachmentsButton = `css=nav[class='w-full space-y-1'] > button:nth-child(9)`;
    this.sidebarORCIDButton = `css=div[class='w-full lg:w-72 shrink-0'] div[class='mt-auto pt-6 w-full'] button`;

    this.sidebarGeneralInfoText = `css=nav[class='w-full space-y-1'] > button:nth-child(1) > span:nth-child(2)`;
    this.sidebarBackgroundText = `css=nav[class='w-full space-y-1'] > button:nth-child(3) > span:nth-child(2)`;
    this.sidebarWorksText = `css=nav[class='w-full space-y-1'] > button:nth-child(5) > span:nth-child(2)`;
    this.sidebarProjectsText = `css=nav[class='w-full space-y-1'] > button:nth-child(7) > span:nth-child(2)`;
    this.sidebarAttachmentsText = `css=nav[class='w-full space-y-1'] > button:nth-child(9) > span:nth-child(2)`;
    this.sidebarORCIDText = `css=div[class='w-full lg:w-72 shrink-0'] div[class='mt-auto pt-6 w-full'] button`;

    this.sidebarGeneralInfoIcon = `css=nav[class='w-full space-y-1'] > button:nth-child(1) > span:nth-child(1)`;
    this.sidebarBackgroundIcon = `css=nav[class='w-full space-y-1'] > button:nth-child(3) > span:nth-child(1)`;
    this.sidebarWorksIcon = `css=nav[class='w-full space-y-1'] > button:nth-child(5) > span:nth-child(1)`;
    this.sidebarProjectsIcon = `css=nav[class='w-full space-y-1'] > button:nth-child(7) > span:nth-child(1)`;
    this.sidebarAttachmentsIcon = `css=nav[class='w-full space-y-1'] > button:nth-child(9) > span:nth-child(1)`;
    this.sidebarORCIDIcon = `css=div[class='w-full lg:w-72 shrink-0'] div[class='mt-auto pt-6 w-full'] button`;

    this.sidebarBackgroundValue = `css=nav[class='w-full space-y-1'] > button:nth-child(3) > span:nth-child(3)`;
    this.sidebarWorksValue = `css=nav[class='w-full space-y-1'] > button:nth-child(5) > span:nth-child(3)`;
    this.sidebarProjectsValue = `css=nav[class='w-full space-y-1'] > button:nth-child(7) > span:nth-child(3)`;
    this.sidebarAttachmentsValue = `css=nav[class='w-full space-y-1'] > button:nth-child(9) > span:nth-child(3)`;

    this.topBarGeneralButton = `css=div[class='inline-flex items-center p-1 text-muted-foreground h-14 w-full justify-start rounded-none bg-transparent border-b px-6'] button:nth-child(1)`;
    this.topBarBackgroundButton = `css=div[class='inline-flex items-center p-1 text-muted-foreground h-14 w-full justify-start rounded-none bg-transparent border-b px-6'] button:nth-child(2)`;
    this.topBarWorksButton = `css=div[class='inline-flex items-center p-1 text-muted-foreground h-14 w-full justify-start rounded-none bg-transparent border-b px-6'] button:nth-child(3)`;
    this.topBarProjectsButton = `css=div[class='inline-flex items-center p-1 text-muted-foreground h-14 w-full justify-start rounded-none bg-transparent border-b px-6'] button:nth-child(4)`;
    this.topBarAttachmentsButton = `css=div[class='inline-flex items-center p-1 text-muted-foreground h-14 w-full justify-start rounded-none bg-transparent border-b px-6'] button:nth-child(5)`;

    this.profileHeaderText = `css=div[class='w-full max-w-3xl'] div h1`;
    this.editProfileIcon = `css=div[class='flex gap-3'] svg[class='lucide lucide-square-pen']`;
    this.editProfile = `css=div[class='flex gap-3'] a[href='/profile/settings']`;
    this.passwordSettings = `css=div[class='flex gap-3'] svg[class='lucide lucide-lock']`;
    this.passwordSettings = `css=div[class='flex gap-3'] a[href='/profile/settings/password']`;
    this.emailSettings = `css=div[class='flex gap-3'] svg[class='lucide lucide-mail']`;
    this.emailSettings = `css=div[class='flex gap-3'] a[href='/profile/settings/email']`;

    this.firstName = `css=div[class='space-y-6'] div div:nth-child(1) p`;
    this.lastName = `css=div[class='space-y-6'] div div:nth-child(2) p`;
    this.email = `css=div[class='space-y-6'] > div:nth-child(2) p`;
    this.institution = `css=div[class='space-y-6'] > div:nth-child(3) p`;
    this.phoneNumber = `css=div[class='space-y-6'] > div:nth-child(4) p`;
    this.biography = `css=div[class='space-y-6'] > div:nth-child(5) p`;

    this.firstNameHeader = `css=div[class='space-y-6'] div div:nth-child(1) h3`;
    this.lastNameHeader = `css=div[class='space-y-6'] div div:nth-child(2) h3`;
    this.emailHeader = `css=div[class='space-y-6'] > div:nth-child(2) h3`;
    this.institutionHeader = `css=div[class='space-y-6'] > div:nth-child(3) h3`;
    this.phoneNumberHeader = `css=div[class='space-y-6'] > div:nth-child(4) h3`;
    this.biographyHeader = `css=div[class='space-y-6'] > div:nth-child(5) h3`;

    this.editProfileHeaderText = `xpath=//h1[normalize-space()='Update Profile']`;
    this.editProfileFirstName = `css=input[name='first_name']`;
    this.editProfileLastName = `css=input[name='last_name']`;
    this.editProfilePhoneNumber = `css=input[name='phone_number']`;
    this.editProfileBiography = `css=textarea[name='biography']`;
    this.editProfileFirstNameHeaderText = `xpath=//label[normalize-space()='First Name*']`;
    this.editProfileFirstNamePlaceHolderText = `xpath=//p[normalize-space()='First name is required']`;
    this.editProfileFirstNameErrorText = `css=div[class='flex space-x-4'] div[class='space-y-2 w-1/2'] p[class='text-sm font-medium text-destructive']`;
    this.editProfileLastNameHeaderText = `xpath=//label[normalize-space()='Last Name*']`;
    this.editProfileLastNameErrorText = `css=div[class='space-y-2 w-1/2'] p[class='text-sm font-medium text-destructive']`;
    this.editProfilePhoneNumberHeaderText = `xpath=//label[normalize-space()='Phone Number']`;
    this.editProfilePhoneNumberErrorText = `xpath=//p[normalize-space()='Phone number must contain only numbers']`;
    this.editProfilePhoneNumberErrorText2 = `xpath=//p[normalize-space()='Ensure this field has no more than 15 characters.']`;
    this.editProfileBiographyHeaderText = `xpath=//label[normalize-space()='Biography']`;

    this.passwordSettingsHeaderText = `xpath=//h1[normalize-space()='Change Password']`;
    this.passwordSettingsNewPasswordHeaderText = `xpath=//label[normalize-space()='New Password*']`;
    this.passwordSettingsNewPasswordInput = `css=input[name='new_password1']`;
    this.passwordSettingsNewPasswordEyeIconButton = `"css=button[class='inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 hover:text-accent-foreground h-9 rounded-md px-3 ml-2 hover:bg-transparent']"`;
    this.passwordSettingsConfirmNewPasswordHeaderText = `xpath=//label[normalize-space()='Confirm New Password*']`;
    this.passwordSettingsConfirmNewPasswordInput = `css=input[name='new_password2']`;
    this.passwordSettingsConfirmNewPasswordErrorText = `css=div[class="space-y-2"] p[class="text-sm font-medium text-destructive"]`;
    this.passwordSettingsConfirmNewPasswordErrorText2 = `css=div[class="text-sm text-red-500 font-medium"]`;

    this.emailSettingsHeaderText = `xpath=//h1[normalize-space()='Email Settings']`;
    this.emailSettingsCurrentEmailHeaderText = `css=h2[class='text-sm font-medium']`;
    this.emailSettingsCurrentEmailText = `css=span[class='text-sm']`;
    this.emailSettingsEditEmailButton = `css=div[class='flex gap-3'] button`;
    this.emailSettingsEditEmailHeaderText = `css=h2[class='text-lg font-semibold']`;
    this.emailSettingsNewEmailFrom = `css=form[class='space-y-6'] div[class='space-y-2']`;
    this.emailSettingsAlreadyVerifiedErrorText = `css=form[class='space-y-6'] div[class='text-sm text-red-500 font-medium']`;
    this.emailSettingsInvalidErrorText = `css=form[class='space-y-6'] p[class='text-sm font-medium text-destructive']`;

    this.backgroundHeaderText = `xpath=//h1[normalize-space()='Background']`;
    this.backgroundPlusIconButton = `css=div[class="flex justify-between items-center mb-6"] a[href="/profile/background/create"]`;
    this.noBackgroundIcon = `css=div svg[class='lucide lucide-graduation-cap w-8 h-8']`;
    this.noBackgroundHeaderText = `css=h2[class='text-xl font-semibold']`;
    this.noBackgroundText = `css=p[class='text-gray-500 max-w-md break-normal']`;
    this.noBackgroundAddButton = `css=div[class='bg-white rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center text-center space-y-4'] a[href="/profile/background/create"]`;

    this.createBackgroundHeaderText = `xpath=//h1[normalize-space()='Create Background']`;
    this.createBackgroundTypeHeaderText = `css=div[class='flex space-x-4']:first-child div[class='space-y-2 w-1/3'] label`;
    this.createBackgroundTypeButtonText = `css=button[role='combobox']`;
    this.createBackgroundTypeErrorText = `css=div[class='space-y-2 w-1/3'] p`;
    this.createBackgroundTypeTexts = `css=div[role='presentation'] div[role='group'] div`;
    this.createBackgroundRoleInput = `css=input[name='role']`;
    this.createBackgroundDepartmentInput = `css=input[name='department']`;
    this.createBackgroundOrganizationInput = `css=input[name='organization']`;
    this.createBackgroundOrganizationAddressInput = `css=input[name='organization_address']`;
    this.createBackgroundStartYearInput = `css=input[name='start_year']`;
    this.createBackgroundStartMonthInput = `css=input[name='start_month']`;
    this.createBackgroundStartDayInput = `css=input[name='start_day']`;
    this.createBackgroundEndYearInput = `css=input[name='end_year']`;
    this.createBackgroundEndMonthInput = `css=input[name='end_month']`;
    this.createBackgroundEndDayInput = `css=input[name='end_day']`;

    this.worksHeaderText = `xpath=//h1[normalize-space()='Research Works']`;
    this.worksPlusIconButton = `css=div[class="flex justify-between items-center mb-6"] a[href="/profile/work/create"]`;
    this.noWorksIcon = `css=div svg[class='lucide lucide-book-open w-8 h-8']`;
    this.noWorksHeaderText = `css=h2[class='text-xl font-semibold']`;
    this.noWorksText = `css=p[class='text-gray-500 max-w-md break-normal']`;
    this.noWorksAddButton = `css=div[class='bg-white rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center text-center space-y-4'] a[href="/profile/work/create"]`;

    this.createWorkHeaderText = `xpath=//h1[normalize-space()='Create Research Work']`;
    this.createWorkTypeHeaderText = `css=div[class='flex space-x-4']:nth-child(1) div[class='space-y-2 w-1/3'] label`;
    this.createWorkTypeButtonText = `css=button[role='combobox']`;
    this.createWorkTypeErrorText = `css=div[class='space-y-2 w-1/3'] p[class='text-sm font-medium text-destructive']`;
    this.createWorkJournalTitleHeaderText = `css=div[class='flex space-x-4']:nth-child(1) div[class='space-y-2 w-2/3'] label`;
    this.createWorkJournalTitleInput = `css=input[name='journal_title']`;
    this.createWorkJournalTitleErrorText = `css=div[class='space-y-2 w-2/3'] p[class='text-sm font-medium text-destructive']`;
    this.createWorkTitleHeaderText = `css=div[class='flex space-x-4']:nth-child(2) div[class='space-y-2 w-full'] label`;
    this.createWorkTitleInput = `css=input[name='title']`;
    this.createWorkTitleErrorText = `css=div[class='space-y-2 w-full'] p[class='text-sm font-medium text-destructive']`;
    this.createWorkPublicationYearHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/3']:nth-child(1) label`;
    this.createWorkPublicationYearInput = `css=input[name='publication_year']`;
    this.createWorkPublicationMonthHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/3']:nth-child(2) label`;
    this.createWorkPublicationMonthInput = `css=input[name='publication_month']`;
    this.createWorkPublicationDayHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/3']:nth-child(3) label`;
    this.createWorkPublicationDayInput = `css=input[name='publication_day']`;

    this.projectsHeaderText = `xpath=//h1[normalize-space()='Research Projects']`;
    this.projectsPlusIconButton = `css=div[class="flex justify-between items-center mb-6"] a[href="/profile/funding/create"]`;
    this.noProjectsIcon = `css=div[class='w-16 h-16 rounded-full bg-gray-100 flex items-center justify-center text-gray-400'] svg`;
    this.noProjectsHeaderText = `css=h2[class='text-xl font-semibold']`;
    this.noProjectsText = `css=p[class='text-gray-500 max-w-md break-normal']`;
    this.noProjectsAddButton = `css=div[class='bg-white rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center text-center space-y-4'] a[href='/profile/funding/create']`;

    this.createProjectsHeaderTextSection = `css=div[class='flex justify-between items-center mb-6']`;
    this.createProjectsTypeHeaderText = `css=div[class='flex space-x-4']:nth-child(1) div[class='space-y-2 w-1/3'] label`;
    this.createProjectsTypeButtonText = `css=button[role='combobox']`;
    this.createProjectsTitleHeaderText = `css=div[class='flex space-x-4']:nth-child(1) div[class='space-y-2 w-2/3'] label`;
    this.createProjectsTitleInput = `css=input[name='title']`;
    this.createProjectsOrgHeaderText = `css=div[class='flex space-x-4']:nth-child(2) div[class='space-y-2 w-1/4']:nth-child(1) label`;
    this.createProjectsOrgInput = `css=input[name='organization']`;
    this.createProjectsOrgTypeHeaderText = `css=div[class='flex space-x-4']:nth-child(2) div[class='space-y-2 w-1/4']:nth-child(2) label`;
    this.createProjectsOrgTypeInput = `css=input[name='organization_defined_type']`;
    this.createProjectsOrgLocationHeaderText = `css=div[class='flex space-x-4']:nth-child(2) div[class='space-y-2 w-1/4']:nth-child(3) label`;
    this.createProjectsOrgLocationInput = `css=input[name='organization_address']`;
    this.createProjectsOrgAmountHeaderText = `css=div[class='flex space-x-4']:nth-child(2) div[class='space-y-2 w-1/4']:nth-child(4) label`;
    this.createProjectsOrgAmountInput = `css=input[name='amount']`;
    this.createProjectsStartYearHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/6']:nth-child(1) label`;
    this.createProjectsStartYearInput = `css=input[name='start_year']`;
    this.createProjectsStartMonthHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/6']:nth-child(2) label`;
    this.createProjectsStartMonthInput = `css=input[name='start_month']`;
    this.createProjectsStartDayHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/6']:nth-child(3) label`;
    this.createProjectsStartDayInput = `css=input[name='start_day']`;
    this.createProjectsEndYearHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/6']:nth-child(4) label`;
    this.createProjectsEndYearInput = `css=input[name='end_year']`;
    this.createProjectsEndMonthHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/6']:nth-child(5) label`;
    this.createProjectsEndMonthInput = `css=input[name='end_month']`;
    this.createProjectsEndDayHeaderText = `css=div[class='flex space-x-4']:nth-child(3) div[class='space-y-2 w-1/6']:nth-child(6) label`;
    this.createProjectsEndDayInput = `css=input[name='end_day']`;
    this.selectProjectTypeComboBoxInput = `css=`;
    this.selectProjectTypeComboBoxTextValues = `css=`;

    this.noDataFoundTexts = `css=div[class='bg-white rounded-lg p-8 border border-gray-200 flex flex-col items-center justify-center text-center space-y-4']`;
    this.createTypeSearchInput = `css=div[class='flex items-center border-b px-3'] input`;
    this.noResultsFoundMessage = `css=div[class='py-6 text-center text-sm']`;

    this.loadingRecordsText = `css=div[class='flex-1 bg-white rounded-lg border shadow-sm overflow-hidden'] div[class='p-6'] p`;
    this.table = `css=div[class='border-gray-200']`;
    this.tableUpdateButton = `css=tbody tr td:last-child div button:first-child`;
    this.tableDeleteButton = `css=tbody tr td:last-child div button:last-child`;
    this.deleteModalHeaderText = `css=h2[class='text-lg font-semibold']`;
    this.deleteModalButton = `css=div[role='alertdialog'] button:last-child`;

    this.toastMessageHeaderText = `css=div[class='grid gap-1'] div[class='text-sm font-semibold']`;
    this.toastMessageText = `css=div[class='grid gap-1'] div[class='text-sm opacity-90']`;
    this.toastCloseButton = `css=button[class='absolute right-2 top-2 rounded-md p-1 text-foreground/50 opacity-0 transition-opacity hover:text-foreground focus:opacity-100 focus:outline-none focus:ring-2 group-hover:opacity-100 group-[.destructive]:text-red-300 group-[.destructive]:hover:text-red-50 group-[.destructive]:focus:ring-red-400 group-[.destructive]:focus:ring-offset-red-600']`;
    this.backAndCancelButton = `css=div[class='flex justify-between items-center mb-6'] a[class='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border bg-background hover:bg-accent h-10 px-4 py-2 border-gray-200 text-gray-700 hover:text-gray-900 flex items-center gap-2']`;
    this.submitButton = `css=button[type='submit']`;

    //Create Projects
    this.selectProjectTypeComboBoxInput = `css=div[class='flex flex-col'] button[role="combobox"]`;
    this.selectProjectTypeComboBoxTextValues = `css=div[role="option"]`;
  }
}
