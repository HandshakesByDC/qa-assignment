# Technical QA Assessment

A take-home automation testing assignment for QA interview.

## Introduction

This repo consists of the Jest API automation testing for the QA Assignment

### User Stories

- User Story 1 -
  In order to store and use my pictures through the https://assessement.onrender.com/api/image API service:
  As an Anonymous user,
  I want to attach a picture to the Service
  and I want to have a permanent link to this picture,
  Otherwise, I want to be rejected and informed if the file is not a picture.

- User Story 2 -
  In order to save my time from uploading my pictures multiple times via https://assessement.onrender.com/api/zip API service:
  As an Anonymous user,
  I want to attach a zip file containing multiple images
  and I want each of these uploaded images to have a permanent link.

## Documentation

- Per the 2nd and 3rd requirements of this assignment, I made the write-up docs to summary the working process as BDD process, also logging bugs during working.
- Summary docs: `docs/QA Technical Assignment - Writeup.pdf`
- Bug report: `docs/Bug-report.xlsx`

## Installation

**Install dependencies**

Node Version: 16.x, 18.x ++

Clone the generated repository on your local machine, move to the project root folder and install the dependencies defined in [`package.json`](./package.json)

Using: Yarn or Npm

Install yarn:

```bash
$ npm install --global yarn
```

Install package by Npm:

```bash
$ npm install
```

Install package by Yarn:

```bash
$ yarn install
```

## CI / CD Flow integration with Github Action:

- When the above tests are finished, the results are published to GitHub pages:

https://simonetrinh.github.io/HandshakesByDC-QA-Assignment/report.html

- We can setup cron-job to run nighly but here I did not setup to save the resource for Github.

- As my config, it will be automatically triggered right after a Pull request merged or we can run it again by re-run any job.

## Cucumber integration

- Cucumber is integrated in this project. That mean we can combined this Working flow of Automation testing team with the TDD/BDD process of Development team.

- We can find cucumber features in `tests/feature`

### For VSCode IDE:

- Plugin need to install: Prettier, Cucumber (Gherkin) Full Support.

- For Cucumber config to recognize `.feature`` files:

In VSCode > Go to Cucumber plugin setting > Click `edit in setting.json` > Add these lines of config:

```
  "cucumberautocomplete.steps": [
    "tests/**/*.steps.ts",
  ],
  "cucumberautocomplete.syncfeatures": tests/**/*.feature",
```

## Running API Tests

Go to the Project root directory and run command:

```bash
$ yarn test
```

or

```bash
$ npm run test
```

test edit
