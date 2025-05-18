# Streamlyne FundFit Test

<p align="center">
    <a href="https://github.com/your-username/streamlyne-fundfit-test/actions/workflows/ci.yml">
        <img src="https://github.com/your-username/streamlyne-fundfit-test/actions/workflows/ci.yml/badge.svg" alt="Build Status">
    </a>
    <a href="https://nodejs.org/">
        <img src="https://img.shields.io/badge/node-%3E%3D16-brightgreen" alt="Node Version">
    </a>
    <a href="https://www.typescriptlang.org/">
        <img src="https://img.shields.io/badge/types-TypeScript-blue" alt="TypeScript">
    </a>
</p>

An interactive test automation project using Playwright and TypeScript.

## Overview

This project is designed to automate testing for the Streamlyne FundFit application. It leverages the power of Playwright, a modern end-to-end testing framework, combined with TypeScript for type safety and maintainability.

## Features

- Cross-browser testing (Chromium, Firefox, WebKit)
- Headless and headed execution modes
- Parallel test execution
- Detailed test reports
- Easy-to-maintain test structure

## Prerequisites

Before you begin, ensure you have the following installed:

- [Node.js](https://nodejs.org/) (v16 or later)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

## Installation

1.  Clone the repository:

        ```bash
        git clone https://github.com/your-username/streamlyne-fundfit-test.git
        cd streamlyne-fundfit-test
        ```

2.  Install dependencies:
    `bash
    npm install
    `

## Usage

### Running Tests

To execute all tests in headless mode:

```bash
npx playwright test
```

To run tests in a specific browser:

```bash
npx playwright test --project=chromium
npx playwright test --project=firefox
npx playwright test --project=webkit
```

To run tests in headed mode:

```bash
npx playwright test --headed
```

### Generating Reports

After running tests, generate an HTML report:

```bash
npm run allure:serve
```

### Debugging Tests

Use the Playwright Inspector for debugging:

```bash
npx playwright test --debug
```

## Project Structure

```
streamlyne-fundfit-test/
├── pageObjectModel/     # Page Resources with Page Selectors
├── tests/               # Test files
├── testData/            # Storing test data on page resource basis
├── utilities/           # Resource needed for test management with custom action class
├── reports/             # Storing log and reporting resources
├── playwright.config.ts # Playwright configuration
├── .env                 # Storing Credentials and Sensitive information
├── package.json         # Project metadata and dependencies
└── README.md            # Project documentation
```

## Tools and Technologies

- **Playwright**: End-to-end testing framework
- **TypeScript**: Strongly typed programming language
- **Jest**: Test runner (integrated with Playwright)
- **ESLint**: Linting tool for code quality
- **Prettier**: Code formatter
- **Allure Reporting**: Test Reporting

## Contributing

1. Fork the repository.
2. Create a new branch (`git checkout -b feature/your-feature`).
3. Commit your changes (`git commit -m 'Add your feature'`).
   For questions or support, please contact [jvalle@streamlyne.com](mailto:jvalle@streamlyne.com).
