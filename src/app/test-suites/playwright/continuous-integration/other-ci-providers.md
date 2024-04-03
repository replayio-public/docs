---
title: Recording with Other CI Providers
---
import { Callout } from 'nextra/components'

# Recording with Other CI Providers

<Callout type="info" emoji="👉">
Have questions? We’re here to help! Contact us in [Discord](https://replay.io/discord) or at support@replay.io.
</Callout>

To record tests and upload replays in other CI providers, you’ll need to complete the following steps in your workflow.

## Install dependencies

`@replayio/playwright` must be installed in your CI environment before the tests execute.

If your workflow has an existing `npm ci` or `yarn` command to install project dependencies, then you are all set. 

If not, you’ll need to add a step to install all project dependencies, or you can manually install just the Replay package directly with `npm i @replayio/playwright` .

## Installing Replay Browsers

By default, `@replayio/playwright` also installs the required Replay Browsers. However, if you have a setting to suppress browser installations during `npm ci` or `yarn`, you’ll need to also manually install the Replay Browsers in your workflow using:

`npx @replayio/playwright install` 

## Update test run command

Your existing test run command (for example, `npx playwright test`) must be updated to include the name of a Replay Browser and required environment variables to record. 

You should make this update wherever your run command is defined, typically in `package.json` or directly in the workflow file.

Pass the following flags to your run command:

- `--project project-name` (`replay-firefox` or `replay-chromium`)
- `--reporter=@replayio/playwright/reporter,line`

For example, to use Replay Firefox, the command is:

```yaml
npx playwright test --project replay-firefox --reporter=@replayio/playwright/reporter,line
```

**If you don’t specify a project, all projects defined in your config will run.**

## Upload replays

Use the `[@replayio/replay](https://github.com/replayio/replay-cli/tree/main/packages/replay)` CLI in your workflow to add source control metadata and upload replays to your team. 

1. Install the CLI
2. Add metadata for all replays generated during the test run
3. Upload replays with your API Key

**Example**

```bash
npm i -g @replayio/replay
replay metadata --init --keys source --warn
replay upload-all --api-key <api key>
```

You can also set `REPLAY_API_KEY` as an environment variable instead of passing to the `upload-all` command. This allows you to store the API Key in your CI provider to keep it secure.

The Replay CLI provides other commands and options, such as filtering which replays are uploaded.

[Full instructions at the `@replayio/replay` repo.](https://github.com/replayio/replay-cli/tree/main/packages/replay)

<Callout type="info" emoji="💡">
Once you’ve recorded, view test results and replays using the [Test Suite Dashboard](/test-suites/features/test-suite-dashboard) and [Pull Request Comments](/test-suites/features/pull-request-comments).
</Callout>