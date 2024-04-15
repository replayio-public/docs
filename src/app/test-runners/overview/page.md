---
title: Test Suites Overview
---

Replay Test Suites bring **time-travelling DevTools to your test runs**. You’ll get a better insight into how your test script interacts with application under test. Besides zooming in on your test execution, you can zoom out to get a birds-eye view of your test executions and **drive down test failures and flakes**.

{% basic icon="treeview" %}

## Test Steps Trace

Replay Devtools work great with your existing test suite. Cypress and Playwright plugins allow you to **rewind or fast forward** to any command from your test run.

The **command details** panel contains information on passed arguments, returned values and targeted element. Commands are integrated with the rest of DevTools. This means you can jump from a command detail into [Elements panel](/browser-devtools/elements-panel), or inspect API calls in the [Network panel](/browser-devtools/network-monitor).
{% /basic %}

{% figure
    alt="Playwright panel"
    src="/images/playwright_panel.png"
    gradient="bg-gradient-to-tr from-blue-200 via-fuchsia-300 to-orange-400"
    height=870
    width=870
/%}

{% basic icon="jumptocode" %}

## Jump To Code

**See what actually happened** when your test clicked, typed or in other way interacted with your website. Jump from a test command right into the function that was called on interaction.

With information on [line hit counts](/browser-devtools/source-viewer#hit-counts) and [jumping through line executions](/browser-devtools/source-viewer#jumping-to-a-line) you’ll be able to narrow down a flake root cause in minutes.
{% /basic %}

{% figure
    alt="Jumping to code"
    src="/images/jump_to_code.png"
    gradient="bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-200"
    height=870
    width=870
/%}

{% basic icon="console" %}

## Vizualize Your Race Conditions

Flakiness can be a caused by a single line of code. Reveal that line with a **print statement**. Find race conditions, unexpected data, rendering issues- you name it.

We have stories of [2 pixel shifts](https://blog.replay.io/a-journey-of-driving-down-test-flakes-to-0percent-at-metabase-part-3) and [false positives](https://blog.replay.io/finding-%22false-positive%22-tests-with-replay.io) that caused headaches to test maintainers. [Learn more](/time-travel-intro/add-console-logs-on-the-fly) about the power of time-travelling console logs.
{% /basic %}

{% figure
    alt="Race condition"
    src="/images/race_condition.png"
    gradient="bg-gradient-to-br from-sky-300 via-blue-300 to-violet-400"
    height=870
    width=870
/%}

{% basic icon="insight" %}

## Test Suite Analytics

Test Suite Dashboard helps you stay on top of your test suite health. **Focus on your top failing, or most flaky tests**. Get insights from your newest feature branch. Focus on most common errors.

Analytics give you actionable insights into your test runs and help you focus on the most important tests.
{% /basic %}

{% figure
    alt="Test suite analytics"
    src="/images/runs_view.png"
    gradient="bg-gradient-to-r from-pink-300 via-teal-800 to-teal-100"
    height=870
    width=870
/%}

{% basic icon="build" %}

## Debug CI Runs With Ease

**What happens on CI no longer stays on CI.** Replay Browser captures your test runs exactly as they happened and brings them to Replay DevTools where you can inspect them.

You can zoom out to take a look at your whole test run, or filter out those that are failing the most.
{% /basic %}

{% figure
    alt="Continuous integration"
    src="/images/ci.png"
    gradient="bg-gradient-to-t from-emerald-400 via-amber-100 to-sky-300"
    height=870
    width=870
/%}

{% basic icon="bracketscurly" %}

## Integrate With Any Framework

If test flakiness pushed you to consider switching to a new testing framework, be at ease. Replay is a browser based on Chromium that can be integrated to any test framework.

We have created an extra tooling around the most popular ones today - [Cypress.io](/test-runners/cypress-io) and [Playwright](/test-runners/playwright/installation).
{% /basic %}

{% icon icon="cypress" class="w-9 h-9 inline-block mr-4" /%}
{% icon icon="playwright" class="w-9 h-9 inline-block mr-4" /%}
{% icon icon="selenium" class="w-9 h-9 inline-block mr-4" /%}
{% icon icon="webdriverio" class="w-9 h-9 inline-block mr-4" /%}
{% icon icon="puppeteer" class="w-9 h-9 inline-block mr-4" /%}