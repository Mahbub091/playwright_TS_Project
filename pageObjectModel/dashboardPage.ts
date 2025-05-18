import { Page } from "@playwright/test";

export class dashboardPage {
  readonly dashboardButton: string;
  readonly dashboardNavbarText: string;
  readonly dashboardNavbarStartMatchingButton: string;
  readonly dashboardNavbarMatchesButton: string;
  readonly dashboardNavbarNotificationsButton: string;
  readonly dashboardNavbarAccountButton: string;
  readonly dashboardNavbarAccountTexts: string;
  readonly dashboardNavbarAccountProfileText: string;
  readonly dashboardNavbarAccountAdminText: string;
  readonly dashboardNavbarAccountLogoutText: string;
  readonly dashboardNavbarAccountSubmitFeedbackText: string;

  readonly dashboardAllOpportunitiesCard: string;

  readonly dashboardAllCardHeaderText: string;

  readonly dashboardAllOpportunitiesCardText: string;
  readonly dashboardNewResearchersOpportunitiesCardText: string;
  readonly dashboardExpireResearchersOpportunitiesCardText: string;
  readonly dashboardFoundingAvailableCardText: string;
  readonly dashboardAllResearchersCardText: string;
  readonly dashboardFoundingScenarioText: string;
  readonly dashboardRecentMatchNotificationsText: string;

  readonly dashboardFoundingScenarioButton: string;
  readonly dashboardRecentMatchNotificationsButton: string;

  readonly dashboardAllOpportunitiesIcon: string;
  readonly dashboardResearchersOpportunitiesIcon: string;
  readonly dashboardFoundingAvailableIcon: string;
  readonly dashboardAllResearchersIcon: string;
  readonly dashboardFoundingScenarioIcon: string;
  readonly dashboardRecentMatchNotificationsIcon: string;

  readonly dashboardAllOpportunitiesValue: string;
  readonly dashboardNewResearchersOpportunitiesValue: string;
  readonly dashboardExpireResearchersOpportunitiesValue: string;
  readonly dashboardFoundingAvailablePotentialValue: string;
  readonly dashboardFoundingAvailableTotalValue: string;
  readonly dashboardAllResearchersValue: string;

  readonly dashboardFoundingScenarioRechart: string;

  readonly dashboardNotificationTitle: string;
  readonly dashboardNotificationText: string;
  readonly dashboardNotificationViewButton: string;
  readonly dashboardNotificationButtonIcon: string;

  readonly dashboardNotificationLists: string;
  readonly dashboardNoNotificationText: string;

  // Dashboard NotificationModal
  readonly notificationModalHeader: string;
  readonly notificationModalCloseIcon: string;
  readonly notificationModalNameLabel: string;
  readonly notificationModalName: string;
  readonly notificationModalNotificationTypeSelectLabel: string;
  readonly notificationModalNotificationType: string;
  readonly notificationModalUsersEmailSelectLabel: string;
  readonly notificationModalUsersEmail: string;
  readonly notificationModalEmailCheckboxLabel: string;
  readonly notificationModalEmailCheckboxText: string;
  readonly notificationModalEmailCheckbox: string;
  readonly notificationModalMatchTypeSelectLabel: string;
  readonly notificationModalMatchTypeSelect: string;
  readonly notificationModalOpportunitiesSelectLabel: string;
  readonly notificationModalOpportunitiesSelect: string;
  readonly notificationModalSelectCollaborationLabel: string;
  readonly notificationModalSelectCollaborationIcon: string;
  readonly notificationModalSelectCollaborationText: string;
  readonly notificationModalFindCollaborationHeaderIcon: string;
  readonly notificationModalFindCollaborationHeader: string;
  readonly notificationModalFindCollaborationLabel: string;
  readonly notificationModalFindCollaborationSelect: string;
  readonly notificationModalFindCollaborationText: string;
  readonly notificationModalCloseButton: string;

  readonly dashboardCardLoader: string;

  constructor(page: Page) {
    this.dashboardButton = `css=a[data-intro='navbar-dashboard']`;
    this.dashboardNavbarText = `css=header[class='sticky border-b-[1px] bg-white shadow-sm top-0 z-40 w-full bg-blue-50'] a[data-intro]`;
    this.dashboardNavbarStartMatchingButton = `css=div[class='hidden md:flex items-center gap-4'] a:nth-child(1)`;
    this.dashboardNavbarMatchesButton = `css=a[data-intro='navbar-matchlist']`;
    this.dashboardNavbarNotificationsButton = `css=a[data-intro='navbar-notification']`;
    this.dashboardNavbarAccountButton = `css=nav[class='hidden md:flex justify-end items-center gap-4'] div[type='button']`;
    this.dashboardNavbarAccountTexts = `css=a[role="menuitem"]`;
    this.dashboardNavbarAccountProfileText = `css=a[href='/profile']`;
    this.dashboardNavbarAccountAdminText = `css=a[href='/organization-admin']`;
    this.dashboardNavbarAccountLogoutText = `css=a[href='/logout']`;
    this.dashboardNavbarAccountSubmitFeedbackText = `css=div[class='relative flex cursor-default select-none items-center gap-2 rounded-sm px-2 py-1.5 text-sm outline-none transition-colors focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 w-full flex items-center gap-2 cursor-pointer']`;

    this.dashboardAllOpportunitiesCard = `css=div[data-intro='opportunities-count'] div[class='tracking-tight text-sm font-medium']`;

    this.dashboardAllCardHeaderText = `css=div[class='grid gap-4 md:grid-cols-2 lg:grid-cols-4 w-full'] div div[class='p-6 flex flex-row items-center justify-between space-y-0 pb-2']`;

    this.dashboardAllOpportunitiesCardText = `css=div[data-intro='opportunities-count'] p[class='text-xs text-muted-foreground']`;
    this.dashboardNewResearchersOpportunitiesCardText = `css=body > div:nth-child(1) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > p:nth-child(2)`;
    this.dashboardExpireResearchersOpportunitiesCardText = `css=body > div:nth-child(1) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(2) > p:nth-child(2)`;
    this.dashboardFoundingAvailableCardText = `css=div[data-intro='funding-available'] p[class='text-xs text-muted-foreground']`;
    this.dashboardAllResearchersCardText = `css=div[data-intro='researchers-count'] p[class='text-xs text-muted-foreground']`;
    this.dashboardFoundingScenarioText = `css=div[data-intro='scenario-status'] p[class='text-xs text-muted-foreground']`;
    this.dashboardRecentMatchNotificationsText = `css=div[data-intro='recent-notifications'] div[class='flex items-center'] p[class='text-xs text-muted-foreground']`;

    this.dashboardFoundingScenarioButton = `css=div[data-intro='scenario-status'] span[class='text-sm font-bold text-blue-600 cursor-pointer hover:underline']`;
    this.dashboardRecentMatchNotificationsButton = `css=div[data-intro='recent-notifications'] span[class='text-sm font-bold text-blue-600 cursor-pointer hover:underline']`;

    this.dashboardAllOpportunitiesIcon = `css=svg[class='lucide lucide-dollar-sign']`;
    this.dashboardResearchersOpportunitiesIcon = `css=svg[class='lucide lucide-hand-coins']`;
    this.dashboardFoundingAvailableIcon = `css=svg[class='lucide lucide-circle-dollar-sign']`;
    this.dashboardAllResearchersIcon = `css=svg[class='lucide lucide-circle-help h-4 w-4 text-blue-600']`;
    this.dashboardFoundingScenarioIcon = `css=svg[class='lucide lucide-folder-kanban']`;
    this.dashboardRecentMatchNotificationsIcon = `css=svg[class='lucide lucide-bell-ring']`;

    this.dashboardAllOpportunitiesValue = `css=div[data-intro='opportunities-count'] div[class='text-2xl font-bold h-[1.75rem] flex items-center']`;
    this.dashboardNewResearchersOpportunitiesValue = `css=div[class='text-2xl font-bold text-blue-600 h-[1.75rem] flex items-center'] span`;
    this.dashboardExpireResearchersOpportunitiesValue = `css=div[class='text-2xl font-bold text-amber-500 h-[1.75rem] flex items-center'] span`;
    this.dashboardFoundingAvailablePotentialValue = `css=span[class='text-2xl font-bold text-blue-600']`;
    this.dashboardFoundingAvailableTotalValue = `css=span[class='ml-1 text-muted-foreground']`;
    this.dashboardAllResearchersValue = `css=div[data-intro="dashboard-welcome"] div[data-intro="researchers-count"] div[class="p-6 pt-0"] div span`;

    this.dashboardFoundingScenarioRechart = `css=div[class='recharts-wrapper']`;

    this.dashboardNotificationTitle = `css=div[data-intro='recent-notifications'] div:nth-child(2) div:nth-child(2) div p:nth-child(1)`;
    this.dashboardNotificationText = `css=div[data-intro='recent-notifications'] div:nth-child(2) div:nth-child(2) div p:nth-child(2)`;
    this.dashboardNotificationViewButton = `css=body > div:nth-child(1) > div:nth-child(1) > main:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(6) > div:nth-child(2) > div:nth-child(2) > div:nth-child(1) > div:nth-child(1) > div:nth-child(2) > button:nth-child(1)`;
    this.dashboardNotificationButtonIcon = `css=button[class='justify-center gap-2 whitespace-nowrap ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-blue-600 text-white px-3 py-1 rounded-full hover:bg-blue-700 text-xs font-medium flex items-center h-auto'] svg[class='lucide lucide-eye ml-1']`;

    this.dashboardNotificationLists = `css=div[data-intro='recent-notifications'] div[class='pt-0 mt-5'] div[class='space-y-4'] div div p:first-child`;
    this.dashboardNoNotificationText = `css=div[data-intro='recent-notifications'] div[class='flex flex-col items-center justify-center py-8 text-center']`;

    this.notificationModalHeader = `css=div[class='flex justify-between items-center'] h2[class='text-2xl font-bold']`;
    this.notificationModalCloseIcon = `css=button[class='absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground']`;
    this.notificationModalNameLabel = `xpath=//label[normalize-space()='Name']`;
    this.notificationModalName = `css=input[name='name']`;
    this.notificationModalNotificationTypeSelectLabel = `xpath=//label[normalize-space()='Notification Type']`;
    this.notificationModalNotificationType = `css=button[id=':rmg:-form-item']`;
    this.notificationModalUsersEmailSelectLabel = `xpath=//label[normalize-space()='Select Email Users']`;
    this.notificationModalUsersEmail = `css=button[id=':rbt:-form-item']`;
    this.notificationModalEmailCheckboxLabel = `xpath=//label[normalize-space()='Confirm receiving emails?']`;
    this.notificationModalEmailCheckboxText = `css=div[class='space-y-1 leading-none'] p`;
    this.notificationModalEmailCheckbox = `css=button[id=':rbv:-form-item']`;
    this.notificationModalMatchTypeSelectLabel = `xpath=//label[normalize-space()='Match Type']`;
    this.notificationModalMatchTypeSelect = `css=button[id=':rc0:-form-item']`;
    this.notificationModalOpportunitiesSelectLabel = `xpath=//label[normalize-space()='Opportunity Search']`;
    this.notificationModalOpportunitiesSelect = `css=button[id=':rc2:-form-item']`;
    this.notificationModalSelectCollaborationLabel = `xpath=//label[normalize-space()='Select Collaboration Institutions']`;
    this.notificationModalSelectCollaborationIcon = `css=svg[class='lucide lucide-circle-alert text-destructive mr-1']`;
    this.notificationModalSelectCollaborationText = `css=p[id=':rfc:-form-item-description']`;
    this.notificationModalFindCollaborationHeaderIcon = `css=svg[class='lucide lucide-building2 h-5 w-5 text-blue-600']`;
    this.notificationModalFindCollaborationHeader = `css=h2[class='text-2xl font-semibold text-blue-600']`;
    this.notificationModalFindCollaborationLabel = `css=label[class='text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 mb-2 block']`;
    this.notificationModalFindCollaborationSelect = `css=.y-between.group.flex.w-full.rounded-md.border.border-input.bg-transparent.px-3.py-1.text-sm.shadow-sm.transition-colors.justify-between.min-h-10.h-auto.cursor-not-allowed.opacity-50.mb-2`;
    this.notificationModalFindCollaborationText = `css=div[class='text-sm text-gray-500'] span`;
    this.notificationModalCloseButton = `css=button[class='inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 px-4 py-2']`;

    this.dashboardCardLoader = `css=div span[class='flex-col items-center justify-center flex']`;
  }
}
