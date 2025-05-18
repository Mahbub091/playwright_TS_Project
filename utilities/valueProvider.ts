import * as fs from "fs";
import * as path from "path";

interface UserData {
  expectedTexts: string[];
  navbarTexts: string[];
  dashboardAllCardHeaderTexts: [];
}

export class ExpectedTextProvider {
  protected expectedTexts: string[];
  protected navbarTexts: string[];
  protected dashboardAllCardHeaderTexts: string[];

  constructor() {
    const data = this.loadUserData();
    this.expectedTexts = data.expectedTexts;
    this.navbarTexts = data.navbarTexts;
    this.dashboardAllCardHeaderTexts = data.dashboardAllCardHeaderTexts;
  }

  private loadUserData(): UserData {
    const jsonFilePath = path.resolve(__dirname, "../testData/text.json");

    try {
      const data = fs.readFileSync(jsonFilePath, "utf-8");
      return JSON.parse(data);
    } catch (error) {
      throw new Error(`Error reading or parsing the file: ${jsonFilePath}`);
    }
  }
}
