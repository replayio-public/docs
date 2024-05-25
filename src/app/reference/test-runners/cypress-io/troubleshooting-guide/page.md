---
title: Cypress Troubleshooting Guide
---

> If your run into troubles and cannot find help here, feel free to hop into our [Discord server](https://replay.io/discord), where we’ll be happy to help you out.

# Cypress won’t start

`Can’t run because you’ve entered an invalid browser name`

```bash
Can't run because you've entered an invalid browser name.

Browser: Replay Chromium was not found on your system or is not supported by Cypress.

Cypress supports the following browsers:
 - electron
 - chrome
 - chromium
 - chrome:canary
 - edge
 - firefox

You can also use a custom browser: https://on.cypress.io/customize-browsers

Available browsers found on your system are:
 - chrome
 - chromium
 - firefox
 - firefox:dev
 - firefox:nightly
 - electron
 - Replay Firefox
```

- This is expected (for now). Check first whether the process exits immediately, chances are the test ends up proceeding as expected!
- While modifying `cypress.config.js`, make sure you’re returning the `config` object in `setupNodeEvents`
- Make sure you’re using the correct browser for your operating system. `replay-chromium` is only supported on linux, whereas `replay-firefox` supports both mac and linux.
- The environment variable `[CYPRESS_INSTALL_BINARY](https://docs.cypress.io/guides/references/advanced-installation)` may be suppressing the browser install step. If it’s set to `0`, make sure to add an explicit workflow step to install the browsers (`npx @replayio/cypress install`)
- Your caching strategy might be keeping our plugin from pulling in the correct browser. Start debugging it by turning off all caching, e.g. `actions/cache`

# How do I use Replay with versions earlier than 10.9?

Replay works best with Cypress 10.9 or later but can be used with Cypress 8 or later with some additional environment configuration:

- `RECORD_ALL_CONTENT` must be set when using `replay-firefox` to record replays
- `RECORD_REPLAY_METADATA_FILE` must be set for either browser to capture metadata about the test run.

When running locally, you can set these variables in your npm scripts so they are set every time:

```json
"scripts": {
	"test:cypress": "cypress run",
  "test:cypress:replay": "RECORD_ALL_CONTENT=1 RECORD_REPLAY_METADATA_FILE=/tmp/replay-metadata cypress run"
}
```

On CI, you can set these environment variables on the task that runs your tests:

```yaml
  # Install NPM dependencies, cache them correctly  
  # and run all Cypress tests
  - name: Cypress run
    uses: cypress-io/github-action@v5
			with:
				browser: replay-chromium
			env:
				RECORD_ALL_CONTENT: 1
				RECORD_REPLAY_METADATA_FILE: /tmp/replay-metadata

```

# Replay browser runs but doesn’t record

The Replay browser is compiled against OpenSSL 1.1 which has been deprecated and is not included on some more recent platforms. To manually install it on ubuntu, run the following:

```bash
wget http://security.ubuntu.com/ubuntu/pool/main/o/openssl/libssl1.1_1.1.1f-1ubuntu2.22_amd64.deb
sudo dpkg -i libssl1.1_1.1.1f-1ubuntu2.22_amd64.deb
```

# DeploySentinel

If you’re using DeploySentinel, you may notice that either you are unable to record replays or the replays created do not show the Cypress Panel when you open them. This is caused by environment variables set by our plugin that are not passed on by DeploySentinel.

Fortunately, you can set this manually on the command line or in your CI configuration. Follow the [instructions for running with earlier versions of Cypress](/reference/test-runners/cypress-io/faq) to configure `RECORD_REPLAY_METADATA_FILE` (and `RECORD_ALL_CONTENT` if you’re using Firefox).

```bash
RECORD_REPLAY_METADATA_FILE=/tmp/replay-metadata.json npx run cypress
```

# Browser Hangs

When the browser hangs while running a test, it is likely an interaction between the test and our browser recording features. In that case, it’s helpful to run the test in diagnostic mode which will run the test in a variety of scenarios with different browser features enabled.

You can run the test in **diagnostic mode** by passing in a mode flag.

```bash
npx @replayio/cypress run --mode diagnostics --level full 
```

For more information, see [Diagnostic modes](/reference/test-runners/cypress-io/getting-started) 

We also recommend going for the simplest reproduction which includes running the fewest specs possible and setting a timeout so that the test fails as soon as possible.

You can use the **Cypress timeout** command to set a timeout

```jsx
describe("test spec", () => {
  it("test case", () => {
    // set the timeout to 1min
    cy.visit("/login", { timeout: 60000 });
  });
});
```

You can set a single spec to run, by using the `--spec` flag

```bash
npx @replayio/cypress run --mode diagnostics --level full --spec tests/logout.spec.ts
```

# Providing us with Logs

Add the following environment variables to your CI run:

- `RECORD_REPLAY_VERBOSE: 1`
- `DEBUG: cypress:*`

# Minimizing test runtime overhead

Add the following environment variables when running Cypress with `Replay Chromium` to turn off diagnostics and get a true read on the runtime overhead.

- `RECORD_REPLAY_DISABLE_ASSERTS: 1`
- `RECORD_REPLAY_DISABLE_SOURCEMAP_COLLECTION: 1`
