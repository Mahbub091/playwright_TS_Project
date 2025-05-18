import { Page } from "@playwright/test";

export class startMatchingPage {
  readonly startMatchingHeroText: string;

  constructor(page: Page) {
    this.startMatchingHeroText = `css=h2[class='text-xl text-center text-blue-600 font-bold']`;
  }
}
