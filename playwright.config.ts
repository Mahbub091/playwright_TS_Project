import { defineConfig, devices } from "@playwright/test";
import fs from "fs";
import * as dotenv from "dotenv";

dotenv.config();

// We're Deleting the last run reports to create a new one
const LAST_RUN_FILE = ".last-run.json";
if (fs.existsSync(LAST_RUN_FILE)) {
  fs.unlinkSync(LAST_RUN_FILE);
}

export default defineConfig({
  testDir: "./tests",

  // disabling the parallelism for the test suite to avoid flaky tests due to shared state
  fullyParallel: true,

  // Forbidding test.only on CI
  forbidOnly: !!process.env.CI,

  // Retry failed tests only on CI
  retries: process.env.CI ? 1 : 0,

  // Running all tests in a single worker
  workers: 5,

  // Generating only HTML reporter/ Allure report will be in the test run in the upcoming time
  reporter: [["allure-playwright", { resultsDir: "reports/allure-results" }]],

  use: {
    trace: "on-first-retry",
    screenshot: "only-on-failure",
  },

  // Browser options for test execution
  // Executing tests only in chrome headless mode now
  // In the upcoming time, we will be adding more browsers and CI/CD pipeline
  projects: [
    {
      name: "chromium",
      use: { ...devices["Desktop Chrome"] },
    },
  ],
});
