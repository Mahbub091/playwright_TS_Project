import { expect, Page } from "@playwright/test";
import { allure } from "allure-playwright";
import logger from "./logger";
import { number } from "zod";

export class Utils {
  private page: Page;

  constructor(page: Page) {
    this.page = page;
  }

  private async captureScreenshotOnFailure(testName: string): Promise<void> {
    try {
      const screenshot = await this.page.screenshot();
      allure.attachment(`${testName} Screenshot`, screenshot, "image/png");
      logger.error(`${testName} failed. Screenshot captured.`);
    } catch (error) {
      logger.error(`❌ Error capturing screenshot: ${error}`);
    }
  }

  private logMessage(
    message: string | string[],
    level: "info" | "error" = "info",
  ): void {
    if (level === "info") {
      logger.info(message);
    } else {
      logger.error(message);
    }
  }

  async navigateTo(url: string): Promise<void> {
    try {
      await this.page.goto(url);
      this.logMessage(`✅ Navigated to ${url}`);
    } catch (error) {
      const errorMsg = `❌ Failed to navigate to ${url}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("navigateTo");
      throw new Error(errorMsg);
    }
  }

  async navigateBack(): Promise<void> {
    try {
      await this.page.goBack();
      this.logMessage(`✅ Navigated back`);
    } catch (error) {
      const errorMsg = `❌ Failed to navigate back`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("navigateBack");
      throw new Error(errorMsg);
    }
  }

  async navigateForward(): Promise<void> {
    try {
      await this.page.goForward();
      this.logMessage(`✅ Navigated forward`);
    } catch (error) {
      const errorMsg = `❌ Failed to navigate forward`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("navigateForward");
      throw new Error(errorMsg);
    }
  }

  async verifyContainsUrl(
    url: string,
    isPartialUrl: boolean = false,
    timeout: number = 20000,
  ): Promise<void> {
    try {
      await this.page.waitForLoadState("load", { timeout: timeout });
      if (!isPartialUrl) {
        await expect(this.page).toHaveURL(url);
      } else {
        expect(this.page.url()).toContain(url);
      }
      this.logMessage(`✅ Verified URL contains: "${url}"`);
    } catch (error) {
      const errorMsg = `❌ Failed to verify URL contains: "${url}" within ${timeout}ms`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyContainsUrl");
      throw new Error(errorMsg);
    }
  }

  async verifyPageTitle(title: string, timeout: number = 20000): Promise<void> {
    try {
      await this.page.waitForLoadState("load", { timeout: timeout });
      const pageTitle = await this.page.title();
      expect(pageTitle).toContain(title);
      this.logMessage(`✅ Verified page title contains: "${title}"`);
    } catch (error) {
      const errorMsg = `❌ Failed to verify page title contains: "${title}" within ${timeout}ms`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyPageTitle");
      throw new Error(errorMsg);
    }
  }

  async clickOnElement(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout: timeout });
      await this.page.isVisible(identifier, { timeout: timeout });
      this.logMessage(`✅ Element is visible: ${identifier}`);
      await this.page.click(identifier);
      this.logMessage(`✅ Clicked on element: ${identifier}`);
    } catch (error) {
      const errorMsg = `❌ Failed to click on element: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("clickOnElement");
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsVisible(
    identifier: string | string[],
    timeout: number = 10000,
    isText: boolean = false,
  ): Promise<void> {
    const identifiers = Array.isArray(identifier) ? identifier : [identifier];

    try {
      await Promise.all(
        identifiers.map(async (id) => {
          const element = isText
            ? this.page.getByText(id)
            : this.page.locator(id);

          await expect(element).toBeVisible({ timeout });

          this.logMessage(`✅ Element is visible: ${id}`);
        }),
      );
    } catch (error) {
      const errorMsg = `❌ One or more elements are not visible: ${JSON.stringify(
        identifier,
      )}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsVisible");
      throw new Error(
        `${errorMsg} | Reason: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
  }

  async validateElementInvisibility(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      const locator = this.page.locator(identifier);

      await expect(locator).not.toBeVisible({ timeout });

      this.logMessage(`✅ Element is invisible as expected: ${identifier}`);
    } catch (error) {
      const errorMsg = `❌ Element "${identifier}" is visible when it should be invisible.`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateElementInvisibility");
      throw new Error(errorMsg);
    }
  }

  async verifyElementIsScrolledIntoView(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      const elementHandle = await this.page.waitForSelector(identifier, {
        timeout,
      });

      await this.wait(1);

      const isInViewport = await elementHandle.evaluate((el) => {
        const rect = el.getBoundingClientRect();
        return (
          rect.top >= 0 &&
          rect.bottom <=
            (window.innerHeight || document.documentElement.clientHeight)
        );
      });

      if (!isInViewport) {
        const errorMsg = `Element is not in viewport after scroll: ${identifier}`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure(
          "verifyElementIsScrolledIntoView",
        );
        throw new Error(errorMsg);
      }

      this.logMessage(`✅ Element is scrolled into view: ${identifier}`);
    } catch (error) {
      const errorMsg = `❌ Failed to verify scroll into view for: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyElementIsScrolledIntoView");
      throw new Error(errorMsg);
    }
  }

  async validateElementDimensions(
    identifier: string,
    expectedWidth: number,
    expectedHeight: number,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      const element = this.page.locator(identifier);
      await expect(element).toBeVisible({ timeout });

      const box = await element.boundingBox();
      if (!box) {
        throw new Error(`Could not retrieve dimensions for: ${identifier}`);
      }

      const { width, height } = box;

      if (
        Math.round(width) !== expectedWidth ||
        Math.round(height) !== expectedHeight
      ) {
        throw new Error(
          `Dimension mismatch for ${identifier} - Expected: ${expectedWidth}x${expectedHeight}, Got: ${Math.round(
            width,
          )}x${Math.round(height)}`,
        );
      }

      this.logMessage(
        `✅ Element dimensions validated: ${identifier} - ${Math.round(
          width,
        )}x${Math.round(height)}`,
      );
    } catch (error) {
      const errorMsg = `❌ Failed to validate dimensions for: ${identifier}`;
      this.logMessage(`${errorMsg} - ${error}`, "error");
      await this.captureScreenshotOnFailure("validateElementDimensions");
      throw new Error(errorMsg);
    }
  }

  async verifyElementPlaceholder(
    identifier: string,
    expectedPlaceholder: string,
    timeout: number = 10000,
    childSelector?: string,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      let target = this.page.locator(identifier);
      if (childSelector) {
        target = target.locator(childSelector);
        await target.first().waitFor({ timeout });
      }

      const actualPlaceholder =
        (await target.getAttribute("placeholder"))?.trim() ?? "";

      if (actualPlaceholder !== expectedPlaceholder.trim()) {
        const errorTarget = childSelector
          ? `${identifier} > ${childSelector}`
          : identifier;

        const errorMsg = `❌ Placeholder mismatch for "${errorTarget}" - Expected: "${expectedPlaceholder.trim()}", Actual: "${actualPlaceholder}"`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("verifyElementPlaceholder");
        throw new Error(errorMsg);
      }

      const successTarget = childSelector
        ? `${identifier} > ${childSelector}`
        : identifier;

      this.logMessage(
        `✅ Placeholder of ${successTarget} is as expected: "${actualPlaceholder}"`,
      );
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      throw new Error(`verifyElementPlaceholder failed: ${error.message}`);
    }
  }

  async wait(
    time: number,
    Options: {
      waitForSelector?: string;
      waitForNetworkIdle?: boolean;
      waitForLoadState?: "load" | "domcontentloaded" | "networkidle";
    } = {},
  ): Promise<void> {
    const { waitForSelector, waitForNetworkIdle, waitForLoadState } = Options;

    try {
      await this.page.waitForTimeout(time * 1000);
      if (waitForSelector) {
        await this.page.waitForSelector(waitForSelector, {
          state: "visible",
          timeout: 10000,
        });
        this.logMessage(`Waited for selector: ${waitForSelector}`);
      }

      if (waitForNetworkIdle) {
        await this.page.waitForLoadState("networkidle");
        this.logMessage(`Waited for network idle`);
      }
      if (waitForLoadState) {
        await this.page.waitForLoadState(waitForLoadState);
        this.logMessage(`Waited for load state: ${waitForLoadState}`);
      }
    } catch (error) {
      const errorMsg = `❌ Failed to wait for ${time} seconds to match specified conditions`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("wait");
      throw new Error(errorMsg);
    }
  }

  async enterText(
    identifier: string,
    text: string,
    childSelector?: string,
  ): Promise<void> {
    try {
      let target = this.page.locator(identifier);

      if (childSelector) {
        target = target.locator(childSelector);
        await target.first().waitFor();
      }

      await this.verifyElementIsVisible(
        childSelector ? `${identifier} >> ${childSelector}` : identifier,
      );
      await target.fill("");
      await target.fill(text);

      const targetName = childSelector
        ? `${identifier} > ${childSelector}`
        : identifier;

      this.logMessage(`✅ Typed "${text}" into element: ${targetName}`);
    } catch (error) {
      const targetName = childSelector
        ? `${identifier} > ${childSelector}`
        : identifier;

      const errorMsg = `❌ Failed to type text "${text}" into element: ${targetName}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("enterText");
      throw new Error(errorMsg);
    }
  }

  async validateAttribute(
    identifier: string | string[],
    attribute: string | "href" | "src" | "type",
    expectedValue: string,
    childSelector?: string,
    timeout: number = 10000,
  ): Promise<void> {
    const identifiers = Array.isArray(identifier) ? identifier : [identifier];

    try {
      await Promise.all(
        identifiers.map(async (id) => {
          await this.page.waitForSelector(id, { timeout });

          let target = this.page.locator(id);
          if (childSelector) {
            target = target.locator(childSelector);
            await target.first().waitFor({ timeout });
          }

          const attributeValue = await target.getAttribute(attribute);
          expect(attributeValue).toBe(expectedValue);

          const logTarget = childSelector ? `${id} > ${childSelector}` : id;
          this.logMessage(
            `✅ Attribute "${attribute}" of ${logTarget} is as expected: ${attributeValue}`,
          );
        }),
      );
    } catch (error) {
      const errorMsg = `❌ Failed to validate attribute "${attribute}" for one or more elements`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateAttribute");
      throw new Error(
        `${errorMsg} | Reason: ${
          error instanceof Error ? error.message : error
        }`,
      );
    }
  }

  async verifyElementText(
    identifier: string,
    expectedText: string | string[],
    childSelector?: string,
    placeholderText: "-" | "Not provided" = "-",
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      let target = this.page.locator(identifier);
      if (childSelector) {
        target = target.locator(childSelector);
        await target.first().waitFor({ timeout });
      }

      let textContent: string;

      if (!childSelector) {
        // Wait for the field value to change from "placeholderText" to something valid
        await expect(async () => {
          textContent = (await target.textContent())?.trim() ?? "";
          expect(textContent && textContent !== placeholderText).toBeTruthy();
        }).toPass({ timeout });
      }

      const errorTarget = childSelector
        ? `${identifier} > ${childSelector}`
        : identifier;

      if (typeof expectedText === "string") {
        textContent = (await target.textContent())?.trim() ?? "";
        const trimmedExpected = expectedText.trim();
        if (textContent !== trimmedExpected) {
          const errorMsg = `❌ Text mismatch for element "${errorTarget}" - Expected: "${trimmedExpected}", Actual: "${textContent}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("verifyElementText");
          throw new Error(errorMsg);
        }
      } else {
        textContent = (await target.textContent())?.trim() ?? "";
        const match = expectedText.map((e) => e.trim()).includes(textContent);
        if (!match) {
          const expectedStr = expectedText
            .map((e) => `"${e.trim()}"`)
            .join(" | ");
          const errorMsg = `❌ Text mismatch for element "${errorTarget}" - Expected one of: ${expectedStr}, Actual: "${textContent}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("verifyElementText");
          throw new Error(errorMsg);
        }
      }

      this.logMessage(
        `✅ Text of ${errorTarget} is as expected: "${textContent}"`,
      );
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      throw new Error(`❌ verifyElementText failed: ${error.message}`);
    }
  }

  async verifyElementTextDoesNotMatch(
    identifier: string,
    unexpectedText: string,
    placeholderText: "-" | "Not provided" = "-",
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      let target = this.page.locator(identifier);

      await expect(async () => {
        const text = (await target.textContent())?.trim();
        expect(text && text !== placeholderText).toBeTruthy();
      }).toPass({ timeout });

      const actualText = (await target.textContent())?.trim() ?? "";
      const trimmedUnexpected = unexpectedText.trim();

      if (actualText === trimmedUnexpected) {
        const errorMsg = `❌ Unexpected match: Element "${actualText}" should NOT have text "${trimmedUnexpected}"`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("verifyElementTextDoesNotMatch");
        throw new Error(errorMsg);
      }

      this.logMessage(
        `✅ Element "${actualText}" does NOT match unexpected text: "${trimmedUnexpected}"`,
      );
    } catch (error) {
      if (!(error instanceof Error)) throw error;
      throw new Error(
        `❌ verifyElementTextDoesNotMatch failed: ${error.message}`,
      );
    }
  }

  async verifyElementTextContains(
    identifier: string | string[],
    expectedText: string | string[],
    timeout: number = 10000,
  ): Promise<void> {
    const identifiers = Array.isArray(identifier) ? identifier : [identifier];
    const expectedTexts = Array.isArray(expectedText)
      ? expectedText
      : [expectedText];

    if (identifiers.length !== expectedTexts.length) {
      throw new Error(
        "❌ The number of identifiers must match the number of expected text values.",
      );
    }

    await Promise.all(
      identifiers.map(async (id, i) => {
        const expected = expectedTexts[i];
        try {
          await this.page.waitForSelector(id, { timeout });
          const element = this.page.locator(id);
          const textContent = await element.textContent();

          expect(textContent?.trim()).toContain(expected.trim());

          this.logMessage(
            `✅ Text of ${id} contains expected text: "${expected}"`,
          );
        } catch (error) {
          const errorMsg = `❌ Failed to verify text contains for: ${id}`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure("verifyElementTextContains");
          throw new Error(
            `${errorMsg} | Reason: ${
              error instanceof Error ? error.message : error
            }`,
          );
        }
      }),
    );
  }

  async validateTextAndClickOnElement(
    identifier: string,
    expectedText: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.locator(identifier).focus();
      await expect(this.page.locator(identifier)).toBeVisible();
      const actualText = await this.page.locator(identifier).textContent();

      if (actualText && actualText.trim() === expectedText.trim()) {
        this.logMessage(
          `✅ Text of ${identifier} is as expected: "${actualText}"`,
        );
        await this.page.locator(identifier).click();
        this.logMessage(`✅ Clicked on element: ${identifier}`);
      } else {
        const errorMsg = `❌ Text mismatch for element "${identifier}" - Expected: "${expectedText}", Actual: "${actualText}"`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("validateTextAndClickOnElement");
        throw new Error(errorMsg);
      }
    } catch (error) {
      throw error;
    }
  }

  async verifyCheckboxDataState(
    identifier: string,
    expectedState: "checked" | "unchecked",
    timeout: number = 10000,
  ): Promise<void> {
    try {
      if (expectedState !== "checked" && expectedState !== "unchecked") {
        throw new Error(`Invalid expectedState value: "${expectedState}"`);
      }

      await this.page.waitForSelector(identifier, { timeout });
      const element = this.page.locator(identifier);
      const actualState = await element.getAttribute("data-state");

      if (actualState !== expectedState) {
        throw new Error(
          `❌ Expected data-state to be "${expectedState}", but found "${actualState}"`,
        );
      }

      this.logMessage(
        `✅ data-state of ${identifier} is correctly "${actualState}"`,
      );
    } catch (error) {
      const errorMsg = `❌ Failed to verify data-state for: ${identifier} — Expected: "${expectedState}"`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyCheckboxDataState");
      throw new Error(errorMsg);
    }
  }

  async verifyInputValue(
    identifier: string,
    expectedValue: string,
    childSelector?: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      const target = this.page.locator(identifier);
      const element = childSelector ? target.locator(childSelector) : target;
      const actualValue = await element.inputValue();

      if (actualValue !== expectedValue) {
        throw new Error(
          `Expected input value to be "${expectedValue}", but found "${actualValue}"`,
        );
      }

      this.logMessage(
        `✅ Input value of ${
          childSelector ? `${identifier} >> ${childSelector}` : identifier
        } is as expected: "${actualValue}"`,
      );
    } catch (error) {
      const target = childSelector
        ? `${identifier} >> ${childSelector}`
        : identifier;
      const errorMsg = `❌ Failed to verify input value for: ${target}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyInputValue");
      throw new Error(errorMsg);
    }
  }

  async verifyInputIsDisable(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const element = this.page.locator(identifier);
      await expect(element).toBeDisabled();

      this.logMessage(`✅ Input field is disable.`);
    } catch (error) {
      const errorMsg = `❌ Failed to verify input field disable.`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyInputIsDisable");
      throw new Error(errorMsg);
    }
  }

  async clearInputField(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      const input = this.page.locator(identifier);
      await input.fill(""); // Clears the input

      this.logMessage(`✅ Cleared input field: ${identifier}`);
    } catch (error) {
      this.logMessage(`❌ Failed to clear input field: ${identifier}`, "error");
      await this.captureScreenshotOnFailure("clearInputField");
      throw new Error(
        `❌ Input field clearing failed | Reason: ${error.message}`,
      );
    }
  }

  async verifyButtonIsDisable(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const element = this.page.locator(identifier);
      await expect(element).toBeDisabled();

      this.logMessage(`✅ Button is disable.`);
    } catch (error) {
      const errorMsg = `❌ Failed to verify button is disable.`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("verifyButtonIsDisable");
      throw new Error(errorMsg);
    }
  }

  async verifyElementToHaveCSSProperty(
    identifier: string | string[],
    property: string,
    expectedValue: string,
  ): Promise<void> {
    const identifiers = Array.isArray(identifier) ? identifier : [identifier];

    for (const id of identifiers) {
      try {
        await this.page.waitForSelector(id, { state: "visible" });
        const element = this.page.locator(id);

        try {
          await expect(element).toHaveCSS(property, expectedValue, {
            timeout: 3000,
          });
          this.logMessage(
            `✅ CSS property "${property}" of ${id} is as expected: "${expectedValue}"`,
          );

          continue;
        } catch {
          const actualValue = await element.evaluate(
            (el, prop) => window.getComputedStyle(el).getPropertyValue(prop),
            property,
          );

          if (actualValue.trim() !== expectedValue.trim()) {
            const errorMsg = `❌ Expected CSS property "${property}" to be "${expectedValue}", but found "${actualValue}" for "${id}"`;
            this.logMessage(errorMsg, "error");
            await this.captureScreenshotOnFailure(
              "verifyElementToHaveCSSProperty",
            );
            throw new Error(errorMsg);
          }

          this.logMessage(
            `✅ CSS property "${property}" of ${id} is as expected (fallback method): "${actualValue.trim()}"`,
          );
        }
      } catch (error) {
        const errorMsg = `❌ Failed to verify CSS property "${property}" for: ${id} | Reason: ${
          error instanceof Error ? error.message : error
        }`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("verifyElementToHaveCSSProperty");
        throw error instanceof Error ? error : new Error(String(error));
      }
    }
  }

  async scrollToElement(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const targetElement = this.page.locator(identifier);
      await targetElement.scrollIntoViewIfNeeded();
      await this.wait(1);
      await this.page.isVisible(identifier);
      this.logMessage(` ✅Scrolled to element: ${identifier}`);
    } catch (error) {
      const errorMsg = ` ❌ Failed to scroll to element: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("scrollToElement");
      throw new Error(errorMsg);
    }
  }

  async verifyLinksTexts(
    identifier: string,
    expectedTexts: string | string[],
  ): Promise<void> {
    try {
      const elements = this.page.locator(identifier);
      const count = await elements.count();

      const textsArray = Array.isArray(expectedTexts)
        ? expectedTexts
        : new Array(count).fill(expectedTexts);

      if (textsArray.length !== count) {
        const msg = `❌ Expected ${textsArray.length} texts but found ${count} elements for "${identifier}"`;
        this.logMessage(msg, "error");
        await this.captureScreenshotOnFailure("verifyLinksTexts");
        throw new Error(msg);
      }

      for (let i = 0; i < count; i++) {
        const element = elements.nth(i);

        const isVisible = await element.isVisible();
        if (!isVisible) {
          const visibilityErrorMsg = `❌ Element at index ${i} for "${identifier}" is not visible.`;
          this.logMessage(visibilityErrorMsg, "error");
          await this.captureScreenshotOnFailure(
            `verifyLinksTexts_visibility_${i}`,
          );
          throw new Error(visibilityErrorMsg);
        }

        const actualText = (await element.innerText())?.trim();
        const expectedText = textsArray[i]?.trim();

        if (actualText !== expectedText) {
          const errorMsg = `❌ Mismatch at index ${i} for "${identifier}" - Expected: "${expectedText}", Actual: "${actualText}"`;
          this.logMessage(errorMsg, "error");
          await this.captureScreenshotOnFailure(`verifyLinksTexts_index_${i}`);
          throw new Error(errorMsg);
        }

        this.logMessage(`✅ Text match at index ${i}: "${actualText}"`);
      }

      this.logMessage(
        `✅ All link texts verified successfully for: ${identifier}`,
      );
    } catch (error) {
      const errorMessage = `❌ Failed to verify link texts for ${identifier} | Reason: ${
        error instanceof Error ? error.message : error
      }`;
      this.logMessage(errorMessage, "error");
      await this.captureScreenshotOnFailure("verifyLinksTexts_final");
      throw new Error(errorMessage);
    }
  }

  async validateNumericValueFromElement(identifier: string): Promise<void> {
    try {
      const locator = this.page.locator(identifier);
      await expect(locator).toBeVisible();

      const rawText = await locator.textContent();
      if (!rawText) {
        throw new Error(`Element "${identifier}" has no text content.`);
      }
      const cleaned = rawText.replace(/[^\d-]/g, "").trim();

      this.logMessage(
        `✅ Cleaned numeric text from "${identifier}": "${cleaned}"`,
      );

      const parsedValue = Number(cleaned);
      if (isNaN(parsedValue)) {
        const errorMsg = `❌ Failed to parse number from cleaned string: "${cleaned}"`;
        this.logMessage(errorMsg, "error");
        throw new Error(errorMsg);
      }

      const isInteger = Number.isInteger(parsedValue);
      const isFloat = !isInteger;

      this.logMessage(
        `✅ Parsed number: ${parsedValue} (Detected as ${
          isInteger ? "Integer" : "Float"
        })`,
      );

      if (isInteger) {
        const integerRegex = /^-?\d+$/;
        if (!integerRegex.test(cleaned)) {
          const errorMsg = `❌ Integer regex validation failed for "${cleaned}"`;
          this.logMessage(errorMsg, "error");
          throw new Error(errorMsg);
        }
        this.logMessage(`✅ Integer regex validation passed for "${cleaned}"`);
      } else {
        const floatRegex = /^-?\d+\.\d+$/;
        if (!floatRegex.test(cleaned)) {
          const errorMsg = `❌ Float regex validation failed for "${cleaned}"`;
          this.logMessage(errorMsg, "error");
          throw new Error(errorMsg);
        }
        this.logMessage(`✅ Float regex validation passed for "${cleaned}"`);
      }
    } catch (error) {
      const errorMsg = `❌ Failed to validate numeric value from "${identifier}"`;
      this.logMessage(
        errorMsg + ` — ${error instanceof Error ? error.message : error}`,
        "error",
      );
      await this.captureScreenshotOnFailure("validateNumericValueFromElement");
      throw new Error(errorMsg);
    }
  }

  async validateTitleByRegex(
    identifier: string,
    text?: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      const notifications = await this.page
        .locator(identifier)
        .allTextContents();

      if (notifications.length !== 0) {
        this.logMessage(`✅ ${notifications.length} Notifications found.`);
      } else {
        this.logMessage("✅ Notification not found.");
      }

      const titleRegex = /^[\w\s\-.']+$/;

      for (const [index, title] of notifications.entries()) {
        if (!titleRegex.test(title)) {
          throw new Error(
            `❌ Invalid notification title at index ${index}: "${title}"`,
          );
        }
      }

      if (text !== undefined) {
        const matchFound = notifications.includes(text);
        if (!matchFound) {
          throw new Error(
            `❌ Provided text "${text}" not found in notifications: ${JSON.stringify(
              notifications,
            )}`,
          );
        }
        this.logMessage(
          `✅ Text "${text}" was found in notification titles: ${notifications}.`,
        );
      }

      this.logMessage(
        `✅ All ${notifications.length} notification titles matched the expected format.`,
      );
    } catch (error) {
      this.logMessage("❌ Failed to validate notification titles.", "error");
      await this.captureScreenshotOnFailure("validateNotificationTitles");
      throw new Error(
        `❌ Notification title validation failed | Reason: ${error.message}`,
      );
    }
  }

  async validateNotificationTexts(
    identifier: string,
    matchTexts: string[],
    withoutMatchTexts: string[],
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });

      const texts = await this.page.locator(identifier).allTextContents();

      if (texts.length !== 0) {
        this.logMessage(`✅ ${texts.length} texts found.`);
      } else {
        this.logMessage("✅ text not found.");
      }

      const matchArray: string[] = [];
      const withoutMatchArray: string[] = [];

      for (const entry of texts) {
        const parts = entry.split("→").map((part) => part.trim());

        if (parts.length !== 2) {
          throw new Error(
            `❌ Invalid format (must contain exactly one '→'): "${entry}"`,
          );
        }

        if (parts[0] === parts[1]) {
          throw new Error(`❌ ${parts[0]} and ${parts[1]} was same value.`);
        }

        if (matchTexts.includes(parts[0])) {
          matchArray.push(parts[0]);
        } else {
          throw new Error(`❌ ${parts[0]} was not found in ${matchTexts}.`);
        }

        if (withoutMatchTexts.includes(parts[1])) {
          withoutMatchArray.push(parts[1]);
        } else {
          throw new Error(
            `❌ ${parts[1]} was not found in ${withoutMatchTexts}.`,
          );
        }
      }
    } catch (error) {
      this.logMessage("❌ Failed to validate notification texts", "error");
      await this.captureScreenshotOnFailure("validateNotificationTexts");
      throw new Error(
        `❌ Notification texts validation failed | Reason: ${error.message}`,
      );
    }
  }

  async validateNoDataFound(
    identifier: string,
    fallbackIdentifier: string,
    expectedText: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      const identifierLocator = this.page.locator(identifier);
      const identifierCount = await identifierLocator.count();

      if (identifierCount > 0) {
        const fullText = (await identifierLocator.allTextContents())
          .join(" ")
          .trim();

        if (fullText.includes(expectedText)) {
          this.logMessage(
            `✅ "No data found" matched expected text: "${expectedText}"`,
          );
        } else {
          const msg = `❌ "No data found" but text did not match.\nFound: "${fullText}"\nExpected: "${expectedText}"`;
          this.logMessage(msg, "error");
          await this.captureScreenshotOnFailure("validateNoDataFound");
          throw new Error(msg);
        }
        return;
      }

      // Identifier not found — wait briefly for fallback
      try {
        await this.page.waitForSelector(fallbackIdentifier, { timeout });
        const fallbackCount = await this.page
          .locator(fallbackIdentifier)
          .count();
        this.logMessage(
          `⚠️ Identifier not found, but ${fallbackCount} fallback data(s) exist.`,
        );
        return;
      } catch {
        const errorMsg = `❌ Neither "${identifier}" nor fallback data(s) found.`;
        this.logMessage(errorMsg, "error");
        await this.captureScreenshotOnFailure("missingData");
        throw new Error(errorMsg);
      }
    } catch (error) {
      const errorMsg = `❌ Failed during "no data found" validation: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateNoDataFound");
      throw error;
    }
  }

  async validateNameByRegex(
    identifier: string,
    mode: "FULL_NAME" | "FIRST_NAME" | "LAST_NAME",
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const fieldLocator = this.page.locator(identifier);
      const placeholderText = "-";

      // Wait until value is fetched from backend and is no longer a placeholder
      await expect(async () => {
        const text = (await fieldLocator.textContent())?.trim();
        expect(text && text !== placeholderText).toBeTruthy();
      }).toPass({ timeout });

      const name = (await fieldLocator.textContent())?.trim() as string;

      let regex: RegExp;
      let label: string;

      switch (mode) {
        case "FULL_NAME":
          regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'’-]+)+$/;
          label = "Full Name";
          break;
        case "FIRST_NAME":
          regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'’-]+)?$/;
          label = "First Name";
          break;
        case "LAST_NAME":
          regex = /^[A-Za-zÀ-ÖØ-öø-ÿ'’-]+(?: [A-Za-zÀ-ÖØ-öø-ÿ'’-]+)?$/;
          label = "Last Name";
          break;
        default:
          throw new Error(`Unsupported validation mode: ${mode}`);
      }

      if (regex.test(name)) {
        this.logMessage(`✅ ${label} "${name}" matches the regex.`);
      } else {
        throw new Error(`❌ ${label} "${name}" does not match the regex.`);
      }
    } catch (error) {
      this.logMessage(`❌ Failed to validate ${mode} name text`, "error");
      await this.captureScreenshotOnFailure("validateNameByRegex");
      throw new Error(
        `❌ ${mode} name validation failed | Reason: ${error.message}`,
      );
    }
  }

  async validatePhoneNumberByRegex(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const phoneNumber = await this.page.locator(identifier).textContent();
      const trimmed = phoneNumber?.trim();

      // Case 1: If the phone number is "Not provided" or empty
      if (!trimmed || trimmed === "Not provided" || trimmed === "-") {
        this.logMessage(`ℹ️ Phone number: Not provided`);
        return;
      }

      // Case 2: Validate phone number format
      const regex =
        /^(\+?\d{1,3}[-.\s]?)?(\(?\d{2,4}\)?[-.\s]?)?[\d]{3,4}[-.\s]?\d{3,4}$/;

      if (regex.test(trimmed)) {
        this.logMessage(`✅ Phone number "${trimmed}" matches the regex.`);
      } else {
        throw new Error(
          `❌ Phone number "${trimmed}" does not match the regex.`,
        );
      }
    } catch (error) {
      this.logMessage("❌ Failed to validate phone number text", "error");
      await this.captureScreenshotOnFailure("validatePhoneNumberByRegex");
      throw new Error(
        `❌ Phone number validation failed | Reason: ${error.message}`,
      );
    }
  }

  async validateUserBiographyByRegex(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const biography = await this.page.locator(identifier).textContent();
      const trimmed = biography?.trim();

      if (trimmed === "Not provided") {
        this.logMessage(`✅ Biography: Not provided`);
        return;
      }

      const regex = /^[A-Za-zÀ-ÖØ-öø-ÿ0-9,.'’!?"\s-]+$/;

      if (regex.test(trimmed as string)) {
        this.logMessage(`✅ Biography "${trimmed}" matches the regex.`);
      } else {
        throw new Error(`❌ Biography "${trimmed}" does not match the regex.`);
      }
    } catch (error) {
      this.logMessage("❌ Failed to validate biography text", "error");
      await this.captureScreenshotOnFailure("validateUserBiography");
      throw new Error(
        `❌ Biography validation failed | Reason: ${error.message}`,
      );
    }
  }

  async hoverOnElement(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    try {
      await this.page.waitForSelector(identifier, { timeout });
      const isVisible = await this.page.isVisible(identifier, { timeout });
      if (!isVisible) {
        throw new Error(`Element not visible: ${identifier}`);
      }
      this.logMessage(`✅ Element is visible: ${identifier}`);
      await this.page.hover(identifier);
      this.logMessage(`✅ Hovered over element: ${identifier}`);
    } catch (error) {
      const errorMsg = `❌ Failed to hover over element: ${identifier}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("hoverOnElement");
      throw new Error(errorMsg);
    }
  }

  async waitForMilliseconds(ms: number): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, ms));
    const message = `Waited for ${ms} milliseconds.`;
    this.logMessage(message);
  }

  async selectDropdownOptionByText(
    identifier: string,
    value: string,
    timeout = 10000,
  ): Promise<void> {
    try {
      this.logMessage(
        `✅ Selecting value "${value}" from dropdown with button: "${identifier}"`,
      );

      const button = this.page.locator(identifier);
      await button.waitFor({ state: "visible", timeout });

      const state = await button.getAttribute("data-state");
      if (state !== "open") {
        await button.click();
        this.logMessage(`✅ Clicked dropdown button to open`);
      }

      // Find all visible options and filter for exact text match
      const allOptions = this.page.locator(
        '[role="option"], [data-selectable="true"]',
      ); // Adjust selector as needed for your app
      const exactMatchOption = allOptions.filter({
        hasText: value,
      });

      await exactMatchOption.first().waitFor({ state: "visible", timeout });
      await exactMatchOption.first().click();

      this.logMessage(`✅ Selected option "${value}" successfully`);
    } catch (error) {
      const errorMsg = `❌ Failed to select "${value}" from dropdown "${identifier}": ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("selectDropdownOptionByText");
      throw new Error(errorMsg);
    }
  }

  async waitUntilElementIsInvisible(
    identifier: string,
    timeout: number = 10000,
  ): Promise<void> {
    const locator = this.page.locator(identifier);
    try {
      await expect(async () => {
        const isVisible = await locator.isVisible();
        expect(isVisible).toBeFalsy();
      }).toPass({ timeout });

      this.logMessage(`✅ Element is invisible as expected: ${identifier}`);
    } catch {
      const errorMsg = `❌ Element "${identifier}" is visible when it should be invisible.`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("validateElementInvisibility");
      throw new Error(errorMsg);
    }
  }

  async selectAllMatchingDropdownOptions(
    identifier: string,
    values: string[],
    isOptionClickable: boolean = true,
    timeout = 10000,
  ): Promise<void> {
    try {
      const button = this.page.locator(identifier);
      await button.waitFor({ state: "visible", timeout });

      // Open dropdown if not already open
      const state = await button.getAttribute("data-state");
      if (state !== "open") {
        await button.click();
        this.logMessage(`Clicked dropdown button to open`);
      }

      const allOptions = this.page.locator(
        'css=[role="option"], [data-selectable="true"]',
      );
      await allOptions.first().waitFor({ state: "visible", timeout });

      const optionElements = await allOptions.all();
      const dropdownCount = optionElements.length;

      // Extract text content from dropdown options
      const optionTexts = await Promise.all(
        optionElements.map(async (option) => ({
          element: option,
          text: (await option.textContent())?.trim() || "",
        })),
      );

      const dropdownTexts = optionTexts.map(({ text }) => text).filter(Boolean);
      const jsonValues = values.map((v) => v.trim());

      // Compare sets
      const missingInDropdown = jsonValues.filter(
        (v) => !dropdownTexts.includes(v),
      );
      const extraInDropdown = dropdownTexts.filter(
        (v) => !jsonValues.includes(v),
      );

      if (missingInDropdown.length > 0 || extraInDropdown.length > 0) {
        const errorDetails: string[] = [];

        if (missingInDropdown.length > 0) {
          errorDetails.push(
            `🔴 Missing in dropdown:\n- ${missingInDropdown.join("\n- ")}`,
          );
        }

        if (extraInDropdown.length > 0) {
          errorDetails.push(
            `🟠 Extra in dropdown:\n- ${extraInDropdown.join("\n- ")}`,
          );
        }

        const mismatchMessage = `❌ Dropdown mismatch:\n${errorDetails.join(
          "\n\n",
        )}`;
        this.logMessage(mismatchMessage, "error");
        await this.captureScreenshotOnFailure("dropdownMismatch");

        throw new Error(mismatchMessage);
      }

      // All matched — proceed to selection
      for (const text of jsonValues) {
        const match = optionTexts.find((opt) => opt.text === text);
        if (match) {
          const dropdownState = await button.getAttribute("data-state");
          if (dropdownState !== "open") {
            await button.click();
            this.logMessage(`Reopened dropdown for next selection`);
          }

          if (isOptionClickable) {
            await match.element.click(); // Uncomment if you want to click each option
            this.logMessage(`✅ Selected: "${text}"`);
            await this.page.waitForTimeout(300); // optional delay
          }
        }
      }
    } catch (error) {
      const errorMsg = `❌ Failed to select dropdown values from "${identifier}": ${error.message}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("selectAllMatchingDropdownOptions");
      throw new Error(errorMsg);
    }
  }

  async verifyExpectedOptionInDropdown(
    inputSelector: string,
    timeout = 10000,
  ): Promise<void> {
    try {
      const input = this.page.locator(inputSelector);
      await input.waitFor({ state: "visible", timeout });

      const value = (await input.inputValue())?.trim();
      if (!value) throw new Error("❌ Input value is empty");

      // Wait for dropdown to show results
      const options = this.page.locator(
        'css=[role="option"], [data-selectable="true"]',
      );
      await options
        .first()
        .waitFor({ state: "visible", timeout })
        .catch(() => {});

      const optionElements = await options.all();
      const texts = await Promise.all(
        optionElements.map(async (opt) => {
          const text = await opt.textContent();
          return text?.trim();
        }),
      );

      // Case-insensitive match
      const matchFound = texts.some(
        (text) => text?.replace(/[\s/-]/g, "") === value,
      );

      if (!matchFound) {
        // Check if a "No results found." message is shown
        const noResults = await this.page
          .locator("css=div[class='py-6 text-center text-sm']")
          .isVisible()
          .catch(() => false);

        const errorMessage = noResults
          ? `❌ Expected value "${value}" not found — "${texts}" is shown.`
          : `❌ Expected value "${value}" not found in options:\n- ${texts.join(
              "\n- ",
            )}`;

        this.logMessage(errorMessage, "error");
        await this.captureScreenshotOnFailure("dropdownOptionMissing");
        throw new Error(errorMessage);
      }

      this.logMessage(`✅ Dropdown contains expected option: "${value}"`);
    } catch (error) {
      const msg = `❌ Failed to verify dropdown option for "${inputSelector}": ${error.message}`;
      this.logMessage(msg, "error");
      await this.captureScreenshotOnFailure("verifyExpectedOptionInDropdown");
      throw new Error(msg);
    }
  }

  async pressKeyWithDelay(key: string): Promise<void> {
    try {
      await this.page.keyboard.press(key);
      this.logMessage(`✅ Pressed key: ${key}`);
    } catch (error) {
      const errorMsg = `❌ Failed to press key: ${key}`;
      this.logMessage(errorMsg, "error");
      await this.captureScreenshotOnFailure("pressKeyWithDelay");
      throw new Error(errorMsg);
    }
  }
} // This is the class curly braces
