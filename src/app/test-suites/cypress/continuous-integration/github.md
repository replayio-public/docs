---
title: Integrate Replay with Cypress on GitHub
---
import { Callout } from 'nextra/components'

# GitHub Actions

Cypress team has created its [official GitHub Action](https://github.com/cypress-io/github-action). The action provides dependency installation, built-in caching, and multiple options for advanced workflow configuration. Using this GitHub Action is optional and some teams prefer their own custom setup. Replay integrates well with both workflows, as shown in examples below

<Callout type="default" emoji="💡">
These instructions assume that you have already installed [`@replayio/cypress`](https://www.npmjs.com/package/@replayio/cypress) plugin into your project. [Follow the instructions on this page](/test-suites/cypress/installation) to learn how to install the plugin.
</Callout>

## Using GitHub Actions with cypress-io/github-action

If you’re already using the Cypress’s [@cypress-io/github-action](https://github.com/cypress-io/github-action), modify the step like this:

```yaml
- name: Cypress run
  uses: cypress-io/github-action@v5
	with:
		# 🙋‍♂️ Specify Replay Chromium
    browser: replay-chromium
	env:
		REPLAY_API_KEY: ${{ secrets.REPLAY_API_KEY }}
```

Add a new step to run after this Cypress GitHub Action for uploading the replays:

```yaml
- name: Upload replays
  if: always()
  uses: replayio/action-upload@v0.5.1
  with:
    api-key: ${{ secrets.REPLAY_API_KEY }}
```

## Using GitHub Actions without cypress-io/github-action

If you’re using GitHub Actions and running tests by calling a script, but aren’t using Cypress’s [@cypress-io/github-action](https://github.com/cypress-io/github-action), create a similar script in `package.json` like this:

```json
"scripts": {
  "cy:run": "cypress run", // original test script
	"cy:run:replay": "cypress run --browser=replay-chromium" // new test script
}
```

Use that new test script instead in your current workflow file, and add the environment variable(s):

```yaml
- name: Cypress run
  # run: npm run cy:run 
	run: npm run cy:run:replay
	env:
		REPLAY_API_KEY: ${{ secrets.REPLAY_API_KEY }}
```

Add a new step to run after this Cypress GitHub Action for uploading the replays:

```yaml
- name: Upload replays
  if: always()
  uses: replayio/action-upload@v0.5.1
  with:
    api-key: ${{ secrets.REPLAY_API_KEY }}
```