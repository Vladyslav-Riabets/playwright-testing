# Playwright Fixtures - Web Application Testing Suite

## Project Overview

**Playwright Fixtures** is an automated test automation framework built with Playwright that demonstrates best practices for end-to-end (E2E) testing. This project showcases the use of Playwright fixtures, Page Object Model (POM) pattern, and authentication management for testing a web application's garage management system.

The framework is designed to test user workflows including login authentication and car management operations with reusable fixtures and maintainable test structures.

---

## Project Structure

```
playwright_fixtures/
├── package.json                          # Project dependencies and npm scripts
├── playwright.config.js                  # Playwright configuration
├── .env                                  # Environment variables (git-ignored)
├── .auth/                               # Authentication state storage
│   └── login.json                       # Stored session state after authentication
├── src/                                 # Source code directory
│   ├── fixtures/
│   │   └── userGaragePage.js           # Custom Playwright fixture for garage page
│   └── pages/
│       ├── LoginPage.js                # Page Object Model for login functionality
│       └── GaragePage.js               # Page Object Model for garage management
├── tests/                              # Test files directory
│   ├── auth.setup.js                  # Authentication setup/global setup file
│   └── test.spec.js                   # Main test specifications
├── playwright-report/                  # HTML test reports (auto-generated)
└── test-results/                       # Raw test results (auto-generated)
```

---

## Component Descriptions

### Root Level Files

#### **package.json**
- **Purpose**: Defines project metadata, dependencies, and npm scripts
- **Key Dependencies**:
  - `@playwright/test`: Main Playwright testing framework
  - `dotenv`: Loads environment variables from `.env` file
  - `@types/node`: TypeScript type definitions for Node.js
- **Available Scripts**:
  - `npm test`: Run all tests in headless mode
  - `npm run test:ui`: Run tests with interactive UI
  - `npm run test:headed`: Run tests with visible browser
  - `npm run test:storage-state`: Run specific test with storage state
  - `npm run report`: Display previous test report

#### **playwright.config.js**
- **Purpose**: Main Playwright configuration file
- **Configuration Includes**:
  - Test directory location (`./tests`)
  - Parallel execution settings
  - HTML reporter configuration
  - Browser projects (setup and chromium)
  - Global setup for authentication
  - HTTP credentials from environment variables
  - Base URL from environment variables
  - Trace on first retry for debugging

### Source Code Directory (`src/`)

#### **src/fixtures/userGaragePage.js**
- **Purpose**: Custom Playwright fixture that extends base test functionality
- **Functionality**:
  - Extends Playwright's `test` object with a reusable `userGaragePage` fixture
  - Handles automatic setup: navigates to garage page and verifies URL
  - Provides cleanup: automatically removes added cars after each test
  - Eliminates code duplication across multiple tests
- **Usage**: Imported in test files to access pre-authenticated garage page state

#### **src/pages/LoginPage.js**
- **Purpose**: Page Object Model for login functionality
- **Locators Defined**:
  - Email input field
  - Password input field
  - Sign-in button (header)
  - Login submit button
- **Methods**:
  - `getLoginForm()`: Opens the login dialog
  - `fillEmail()`: Enters email address
  - `fillPassword()`: Enters password
  - `fillForm()`: Combined method to fill both fields
  - `submit()`: Submits the login form

#### **src/pages/GaragePage.js**
- **Purpose**: Page Object Model for garage management operations
- **Locators Defined**:
  - Add car button
  - Car brand dropdown selector
  - Car model dropdown selector
  - Mileage input field
  - Add/Remove buttons
  - Car list items
  - Car name display
- **Methods**:
  - `checkUrl()`: Validates correct page navigation
  - `addCarBtn()`: Clicks add car button
  - `selectBrand()`: Selects car brand from dropdown
  - `selectModel()`: Selects car model from dropdown
  - `fillMileage()`: Enters mileage value
  - `submit()`: Confirms car addition
  - `removeCar()`: Deletes car from garage

### Tests Directory (`tests/`)

#### **auth.setup.js**
- **Purpose**: Global setup file for authentication
- **Workflow**:
  1. Navigates to application home page
  2. Opens login form
  3. Fills login credentials from environment variables
  4. Submits login
  5. Waits for redirect to garage page
  6. Saves authentication state to `.auth/login.json`
- **Dependencies**: Uses credentials from `TEST_USER` and `TEST_PASS` environment variables
- **Note**: Runs before all tests, only runs once per test session

#### **test.spec.js**
- **Purpose**: Main test specifications
- **Test Case**: "should add car to garage"
  - Uses `userGaragePage` fixture for automatic setup/teardown
  - Tests car addition workflow
  - Validates that added car appears with correct information
  - Demonstrates fixture and Page Object Model usage

### Auto-Generated Directories

#### **playwright-report/**
- **Purpose**: Stores HTML test reports
- **Contents**: `index.html` - Interactive report showing test results, traces, and screenshots
- **Viewing**: Run `npm run report` to open in browser

#### **test-results/**
- **Purpose**: Stores raw test result data
- **Used by**: Playwright reporter for generating HTML reports

#### **.auth/**
- **Purpose**: Stores authentication state between tests
- **Contents**: `login.json` - Session cookies and storage state from successful authentication
- **Usage**: Referenced in `playwright.config.js` to reuse authentication across test projects

---

## Setup & Installation

### Prerequisites
- **Node.js**: Version 14 or higher
- **npm**: Comes with Node.js

### Installation Steps

1. **Clone or navigate to the project directory**:
   ```bash
   cd playwright_fixtures
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Install Playwright browsers**:
   ```bash
   npx playwright install
   ```

4. **Create `.env` file** in project root:
   ```env
   BASE_URL=https://yourapp.com
   TEST_USER=your_test_email@example.com
   TEST_PASS=your_test_password
   AUTH_USER=optional_http_auth_user
   AUTH_PASS=optional_http_auth_password
   ```

---

## Configuration

### Environment Variables

All sensitive configuration is managed through the `.env` file:

| Variable | Description | Example |
|----------|-------------|---------|
| `BASE_URL` | Base URL of the application under test | `https://example.com` |
| `TEST_USER` | Test user email for authentication | `test@example.com` |
| `TEST_PASS` | Test user password | `password123` |
| `AUTH_USER` | Optional HTTP Basic Auth username | `admin` |
| `AUTH_PASS` | Optional HTTP Basic Auth password | `secret` |

### Playwright Configuration Highlights

- **Test Directory**: `./tests` - All test files are discovered here
- **Timeout**: Default 30 seconds per action
- **Retries**: 0 on local, 2 on CI
- **Workers**: Parallel execution enabled locally, single on CI
- **Reporter**: HTML report generation
- **Trace**: Automatically captured on first retry for debugging

---

## Running Tests

### Standard Test Execution
```bash
npm test
```
Runs all tests in headless mode (no visible browser).

### Interactive UI Mode
```bash
npm run test:ui
```
Opens Playwright's interactive test runner for step-by-step execution and debugging.

### Headed Mode
```bash
npm run test:headed
```
Runs tests with visible browser windows for visual verification.

### Specific Test with Storage State
```bash
npm run test:storage-state
```
Runs `test.spec.js` with stored authentication state.

### View Test Report
```bash
npm run report
```
Opens the HTML report from the last test run in your default browser.

---

## Testing Workflow

### Authentication Flow
1. **Setup Phase** (`auth.setup.js`):
   - Logs in with test credentials
   - Saves authentication state to `.auth/login.json`
   - Only runs once per session

2. **Test Phase** (`test.spec.js`):
   - Uses saved authentication state
   - No need to login again
   - Tests start already authenticated

3. **Fixture Setup** (`userGaragePage.js`):
   - Navigates to garage page
   - Initializes GaragePage object
   - Provides authenticated environment

### Test Execution Example
The test `should add car to garage`:
1. Opens garage page (via fixture)
2. Clicks "Add car" button
3. Fills form (brand: Audi, model: TT, mileage: 1)
4. Submits the form
5. Verifies car appears with text "Audi TT"
6. Removes car (via fixture cleanup)

---

## Key Features

✅ **Page Object Model Pattern** - Maintainable and reusable locator definitions  
✅ **Custom Fixtures** - Automatic setup and teardown for tests  
✅ **Authentication Management** - Login once, reuse across tests  
✅ **HTML Reporting** - Detailed test reports with artifacts  
✅ **Parallel Execution** - Run tests faster on local development  
✅ **Cross-browser Testing** - Configured for Chromium  
✅ **Environment Configuration** - Secure credential management via `.env`  
✅ **Tracing & Debugging** - Automatic trace capture on test failures  

---

## Best Practices Demonstrated

1. **Page Object Model**: Separates test logic from UI interactions
2. **Fixtures**: Reduces code duplication and ensures consistent test setup
3. **Global Setup**: Handles authentication once before all tests
4. **Environment Variables**: Keeps credentials out of source code
5. **Proper Waits**: Uses `waitForURL()` instead of arbitrary delays
6. **Error Reporting**: HTML reports with screenshots and traces

---

## Troubleshooting

### Tests Fail Due to Authentication
- Verify credentials in `.env` file
- Check that `auth.setup.js` runs without errors
- Review `playwright-report/` for detailed failure information

### Tests Timeout
- Check internet connection and application availability
- Increase timeout in `playwright.config.js` if needed
- Review trace files in test report

### Missing `.auth/login.json`
- Run `npm test` to execute `auth.setup.js` first
- Ensure authentication setup is configured in `playwright.config.js`

### Accessing Test Reports
- Run `npm run report` after test execution
- Reports are stored in `playwright-report/` directory

---

## Development Tips

- Use `npm run test:ui` for interactive debugging
- Review HTML reports after test failures
- Check `.auth/login.json` to verify authentication state
- Use `--debug` flag with Playwright Inspector: `npx playwright test --debug`

---

## License

ISC

---

**Last Updated**: February 23, 2026
