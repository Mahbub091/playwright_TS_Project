import { Page } from "@playwright/test";

export class notificationPage {
  readonly notificationHeroText: string;

  constructor(page: Page) {
    this.notificationHeroText = `css=h1[class='text-2xl font-semibold']`;
  }
}
