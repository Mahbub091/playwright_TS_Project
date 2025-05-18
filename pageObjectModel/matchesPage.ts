import { Page } from "@playwright/test";

export class matchesPage {
  readonly matchesHeroText: string;

  constructor(page: Page) {
    this.matchesHeroText = `css=h1[class='text-2xl font-semibold']`;
  }
}
