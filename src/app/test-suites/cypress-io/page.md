---
title: Cypress.io
---
## Installation

**1. Install the [@replayio/cypress](https://www.npmjs.com/package/@replayio/cypress) package in your project:**

```sh npm2yarn
npm install @replayio/cypress -D
```

**2. Add the Replay plugin to `cypress.config.js`**

<Tabs items={['CommonJS', 'ESM']}>
<Tabs.Tab>

```jsx copy filename="cypress.config.js"
const { defineConfig } = require("cypress");
// 🙋‍♂️ Add this line to require the replay plugin
const { plugin: replayPlugin } = require("@replayio/cypress");

module.exports = defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 🙋‍♂️ Add this line to install the replay plugin
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      // Make sure that setupNodeEvents returns config
      return config;
    },
  },
});
```

</Tabs.Tab>
<Tabs.Tab>

```jsx copy filename="cypress.config.ts"
import defineConfig from "cypress";
// 🙋‍♂️ Add this line to add the replay plugin
import { plugin as replayPlugin } from "@replayio/cypress";

export default defineConfig({
  e2e: {
    setupNodeEvents(on, config) {
      // 🙋‍♂️ Add this line to install the replay plugin
      replayPlugin(on, config, {
        upload: true,
        apiKey: process.env.REPLAY_API_KEY,
      });
      // Make sure that setupNodeEvents returns config
      return config;
    },
  },
});
```

</Tabs.Tab>
</Tabs>

**3. Import Replay to your [support file](https://docs.cypress.io/guides/references/configuration#e2e)**

It should be `cypress/support/e2e.js` for e2e tests (unless modified)

<Tabs items={['CommonJS', 'ESM']}>
<Tabs.Tab>

```jsx copy filename="cypress/support/e2e.js"
require("@replayio/cypress/support");
```

</Tabs.Tab>
<Tabs.Tab>

```jsx copy filename="cypress/support/e2e.ts"
import "@replayio/cypress/support";
```

</Tabs.Tab>
</Tabs>

## Setup Replay Dashboard

First, create a new team in Replay to organize your Cypress replays. You’ll also need an API Key to upload your replays and team API keys have much higher limits than personal API keys.

**1. Go to your Replay Dashboard and create a new team**

Alternatively, you can visit [this link](https://app.replay.io/team/new) to instantly create a new team.
<Video src={addTeam} />
<Callout type="info" emoji="💡">
Test Suites are currently in closed Beta. If you’d like to start recording your tests, test suites need to be enabled in your team. Join our [**waitlist**](https://replayio.typeform.com/to/jTudlerL) and we’ll reach out to you as soon as possible.
</Callout>

**2. Once you’ve created a team, click on the settings <MaterialSymbolsSettings className="w-6 h-6 inline-block" /> icon next to your team name and [create a new API Key](/getting-started/teams-admin/team-settings)**

<Video src={apiKeys} />

**3. Save that API in your CI environment as `REPLAY_API_KEY`**

This step may vary depending on your CI provider. You can learn more about how to set up environment variables with different CI providers [on this docs page](/test-suites/cypress/continuous-integration).

## Record your tests

### Recording locally

Once you have Replay plugin into your project, you are ready to create your recordings. These will be available in your [Replay Dashboard](https://app.replay.io). You can run your tests by adding the `--browser` flag.

```sh
npx cypress run --browser replay-chromium
```

```ansi
➜ npx cypress run --browser replay-chromium

====================================================================================================

  (Run Starting)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Cypress:        13.5.1                                                                         │
  │ Browser:        Replay 91 (headless)                                                           │
  │ Node Version:   v18.10.0 (/Users/filiphric/.nvm/versions/node/v18.10.0/bin/node)               │
  │ Specs:          1 found (spec.cy.ts)                                                           │
  │ Searched:       cypress/e2e/**/*.cy.{js,jsx,ts,tsx}                                            │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘


────────────────────────────────────────────────────────────────────────────────────────────────────
  Running:  spec.cy.ts                                                                      (1 of 1)
  ✓ add todo (1022ms)
  ✓ edit todo (1387ms)
  ✓ complete todo (987ms)
  ✓ remove todo (973ms)

  4 passing (5s)

  (Results)

  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ Tests:        4                                                                                │
  │ Passing:      4                                                                                │
  │ Failing:      0                                                                                │
  │ Pending:      0                                                                                │
  │ Skipped:      0                                                                                │
  │ Screenshots:  0                                                                                │
  │ Video:        false                                                                            │
  │ Duration:     4 seconds                                                                        │
  │ Spec Ran:     spec.cy.ts                                                                       │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘

[replay.io]: 🕑 Completing some outstanding work ...
[replay.io]:
[replay.io]: 🚀 Successfully uploaded 1 recordings:
[replay.io]:
[replay.io]:    ✅ cypress/e2e/spec.cy.ts
[replay.io]:

====================================================================================================

  (Run Finished)


       Spec                                              Tests  Passing  Failing  Pending  Skipped
  ┌────────────────────────────────────────────────────────────────────────────────────────────────┐
  │ ✔  spec.cy.ts                               00:04        4        4        -        -        - │
  └────────────────────────────────────────────────────────────────────────────────────────────────┘
    ✔  All specs passed!                        00:04        4        4        -        -        -

```

### Integrate into your CI workflow

Replay is designed to record tests in CI so you can debug when tests fail. Without Replay, test failures in CI are like a black box, with little insights into what went wrong. By recording with Replay, you get a full recording of the test run with debugging tools built in.

Here are basic configurations for some of the most popular providers which you can add to you project

<Tabs items={['GitHub Actions', 'CircleCI']}>
<Tabs.Tab>

```yml filename=".github/workflows/e2e.yml" copy
name: End-to-end tests
on: [push, pull_request]
jobs:
  cypress-run:
    runs-on: ubuntu-22.04
    steps:
      - name: Checkout
        uses: actions/checkout@v4
      - name: Cypress run
        uses: cypress-io/github-action@v6
        with:
          browser: replay-chromium
          build: npm run build
          start: npm start
        env:
          REPLAY_API_KEY: ${{ secrets.REPLAY_API_KEY }}
```

</Tabs.Tab>
<Tabs.Tab>

```yml filename=".circleci/e2e.yml" copy
version: 2.1
jobs:
  replay-upload:
    docker:
      - image: cimg/node:18.4.0-browsers
    steps:
      - checkout
      - run:
          name: "Install Dependencies"
          command: "npm ci"
      - run:
          name: "Run Cypress Tests"
          command: "npx cypress run --browser replay-chromium"
          environment:
            REPLAY_API_KEY: ${REPLAY_API_KEY}
workflows:
  cypress-test-workflow:
    jobs:
      - replay-upload:
          context: replayable
```

</Tabs.Tab>
</Tabs>

Looking for other CI providers? Checkout the [Continuous Integration section](/test-suites/cypress/continuous-integration).

## See also

- [Test Suite Dashboard for Cypress](/test-suites/cypress/dashboard)
- [Configure recording modes](/test-suites/cypress/configuration)
- [Continuous integration](/test-suites/cypress/continuous-integration)
- [Setting up a team](/getting-started/teams-admin/setting-up-a-team)
