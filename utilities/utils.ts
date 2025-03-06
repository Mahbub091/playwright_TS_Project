import { expect, Page } from "@playwright/test";
import { allure } from "allure-playwright";

export class Utils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  
  private async captureScreenshotOnFailure(testName: string): Promise<void> {
    try {
      const screenshot = await this.page.screenshot();
      allure.attachment(`${testName} Screenshot`, screenshot, "image/png");
    } catch (error) {
      console.log("Error capturing screenshot:", error);
    }
  }

  
  private logToAllure(message: string): void {
    allure.attachment("Custom Log", message, "text/plain");
  }

  
  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      this.logToAllure(`Navigated to ${url}`); 
    } catch (error) {
      const errorMsg = `Failed to navigate to ${url}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("navigateTo");
      throw new Error(errorMsg);
    }
  }

  
  async clickOnElement(identifier: string): Promise<void> {
    try {
      await this.page.locator(identifier).click();
      this.logToAllure(`Clicked on element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to click on element with identifier: ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("clickOnElement");
      throw new Error(errorMsg);
    }
  }

  
  async mouseHover(identifier: string): Promise<void> {
    try {
      await this.page.locator(identifier).hover();
      this.logToAllure(`Hovered over element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to hover over element with identifier: ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("mouseHover");
      throw new Error(errorMsg);
    }
  }

  
  async fillInputBox(identifier: string, text: string): Promise<void> {
    try {
      await this.page.locator(identifier).fill(text);
      this.logToAllure(
        `Filled input box with identifier ${identifier} with text: ${text}`,
      );
    } catch (error) {
      const errorMsg = `Failed to fill input box with identifier ${identifier} with text: ${text}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("fillInputBox");
      throw new Error(errorMsg);
    }
  }

  
  async typeInputBox(identifier: string, text: string): Promise<void> {
    try {
      await this.page.locator(identifier).type(text);
      this.logToAllure(
        `Typed text: "${text}" in input box with identifier: ${identifier}`,
      );
    } catch (error) {
      const errorMsg = `Failed to type text: "${text}" in input box with identifier: ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("typeInputBox");
      throw new Error(errorMsg);
    }
  }

  
  async dblClickOnElement(identifier: string): Promise<void> {
    try {
      await this.page.locator(identifier).dblclick();
      this.logToAllure(
        `Double-clicked on element with identifier: ${identifier}`,
      );
    } catch (error) {
      const errorMsg = `Failed to double-click on element with identifier: ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("dblClickOnElement");
      throw new Error(errorMsg);
    }
  }

  
  async focusOnElement(identifier: string): Promise<void> {
    try {
      await this.page.locator(identifier).focus();
      this.logToAllure(`Focused on element with identifier: ${identifier}`);
    } catch (error) {
      const errorMsg = `Failed to focus on element with identifier: ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("focusOnElement");
      throw new Error(errorMsg);
    }
  }

  
  async verifyTitle(title: string): Promise<void> {
    try {
      await expect(this.page).toHaveTitle(title);
      this.logToAllure(`Verified page title: ${title}`);
    } catch (error) {
      const errorMsg = `Failed to verify title: ${title}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyTitle");
      throw new Error(errorMsg);
    }
  }

  
  async verifyContainsUrl(url: string): Promise<void> {
    try {
      await expect(this.page).toHaveURL(url);
      this.logToAllure(`Verified URL contains: ${url}`);
    } catch (error) {
      const errorMsg = `Failed to verify URL contains: ${url}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyContainsUrl");
      throw new Error(errorMsg);
    }
  }

  
  async verifyContainText(
    identifier: string,
    expectedText: string,
  ): Promise<void> {
    try {
      await expect
        .soft(this.page.locator(identifier))
        .toContainText(expectedText);
      this.logToAllure(
        `Verified element with identifier ${identifier} contains text: "${expectedText}"`,
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} contains text: "${expectedText}"`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyContainText");
      throw new Error(errorMsg);
    }
  }

  
  async verifyToHaveValue(
    identifier: string,
    inputFieldText: string,
  ): Promise<void> {
    try {
      await expect
        .soft(this.page.locator(identifier))
        .toHaveValue(inputFieldText);
      this.logToAllure(
        `Verified element with identifier ${identifier} has value: "${inputFieldText}"`,
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} has value: "${inputFieldText}"`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyToHaveValue");
      throw new Error(errorMsg);
    }
  }

  
  async verifyToHaveCss(
    identifier: string,
    key: string,
    value: string,
  ): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).toHaveCSS(key, value);
      this.logToAllure(
        `Verified element with identifier ${identifier} has CSS property: "${key}" with value: "${value}"`,
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} has CSS property: "${key}" with value: "${value}"`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyToHaveCss");
      throw new Error(errorMsg);
    }
  }

  
  async verifyElementIsVisible(identifier: string): Promise<void> {
    try {
      await expect.soft(this.page.locator(identifier)).toBeVisible();
      this.logToAllure(
        `Verified element with identifier ${identifier} is visible`,
      );
    } catch (error) {
      const errorMsg = `Failed to verify element with identifier ${identifier} is visible`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyElementIsVisible");
      throw new Error(errorMsg);
    }
  }

  
  async verifyLinksText(
    identifier: string,
    expectedTexts: string[],
  ): Promise<void> {
    try {
      const elements = this.page.locator(identifier);
      const count = await elements.count();
      for (let i = 0; i < count; i++) {
        const text = await elements.nth(i).innerText();
        expect.soft(text).toBe(expectedTexts[i]);
      }
      this.logToAllure(
        `Verified link texts for elements with identifier ${identifier}`,
      );
    } catch (error) {
      const errorMsg = `Failed to verify link texts for elements with identifier ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("verifyLinksText");
      throw new Error(errorMsg);
    }
  }

  
  async validateAndClick(
    identifier: string,
    expectedText: string,
  ): Promise<void> {
    try {
      await this.page.locator(identifier).focus();
      await expect.soft(this.page.locator(identifier)).toBeVisible(); 
      const actualText = await this.page.locator(identifier).textContent(); 

      
      if (actualText && actualText.trim() === expectedText) {
        await this.page.locator(identifier).click();
        this.logToAllure(
          `Validated and clicked on element with identifier: ${identifier} having expected text: "${expectedText}"`,
        );
      } else {
        const errorMsg = `Text does not match. Expected: "${expectedText}", but found: "${actualText}"`;
        this.logToAllure(errorMsg);
        await this.captureScreenshotOnFailure("validateAndClick");
        throw new Error(errorMsg);
      }
    } catch (error) {
      throw error;
    }
  }

  
  async validateButtonAttribute(
    identifier: string,
    hrefAttribute: string,
  ): Promise<void> {
    try {
      const button = await this.page.locator(identifier);
      await expect(button).toBeVisible();

      const hrefValue = await button.getAttribute("href");
      expect(hrefValue).toBe(hrefAttribute);
      this.logToAllure(
        `Verified button with identifier ${identifier} has href attribute: "${hrefValue}"`,
      );
    } catch (error) {
      const errorMsg = `Failed to verify button with identifier ${identifier} has href attribute: "${hrefAttribute}"`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("validateButtonAttribute");
      throw new Error(errorMsg);
    }
  }

  
  async scrollAndClick(identifier: string): Promise<void> {
    try {
      const targetElement = this.page.locator(identifier);
      await targetElement.scrollIntoViewIfNeeded();
      await expect(targetElement).toBeVisible();

      await targetElement.click();
      this.logToAllure(
        `Scrolled to and clicked on element with identifier: ${identifier}`,
      );
    } catch (error) {
      const errorMsg = `Failed to scroll and click on element with identifier: ${identifier}`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("scrollAndClick");
      throw new Error(errorMsg);
    }
  }

  
  async wait(
    time: number,
    options: {
      waitForSelector?: string;
      waitForNetworkIdle?: boolean;
      waitForLoadState?: "load" | "domcontentloaded" | "networkidle";
    } = {},
  ): Promise<void> {
    const { waitForSelector, waitForNetworkIdle, waitForLoadState } = options;

    try {
      await this.page.waitForTimeout(time * 1000);

      if (waitForSelector) {
        await this.page.waitForSelector(waitForSelector, {
          state: "visible",
          timeout: time * 1000,
        });
        this.logToAllure(`Waited for selector: ${waitForSelector}`);
      }

      if (waitForNetworkIdle) {
        await this.page.waitForLoadState("networkidle", {
          timeout: time * 1000,
        });
        this.logToAllure(`Waited for network idle state`);
      }

      if (waitForLoadState) {
        await this.page.waitForLoadState(waitForLoadState, {
          timeout: time * 1000,
        });
        this.logToAllure(`Waited for page load state: ${waitForLoadState}`);
      }
    } catch (error) {
      const errorMsg = `Failed to wait for the specified conditions`;
      this.logToAllure(errorMsg);
      await this.captureScreenshotOnFailure("wait");
      throw new Error(errorMsg);
    }
  }
}
