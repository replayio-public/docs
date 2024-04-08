---
title: WebdriverIO
---
import { Callout } from 'nextra/components'

# WebdriverIO

## Setup

Setting up Replay is as simple as downloading the browser, using it in your tests, and uploading the recordings.

1. Download the browser with `npx @replayio/replay update-browsers chromium`
2. Pass in the path to `chromium` in your webdriver config call. 
3. Upload recordings with the `npx @replayio/replay upload-all` command. 

## Example

As a test, let’s run this simple login script:

```jsx
describe('My Login application', () => {
  it('should login with valid credentials', async () => {
    await browser.url(`https://the-internet.herokuapp.com/login`);

    await $('#username').setValue('tomsmith');
    await $('#password').setValue('SuperSecretPassword!');
    await $('button[type="submit"]').click();
    await expect($('#flash')).toBeExisting();
    await expect($('#flash')).toHaveTextContaining('You logged into a secure area!');
  });
});
```

<Callout type="info" emoji="💡">
You can try this out on your own, by forking [this example repository](https://github.com/filiphric/replay-webdriverio-example).
</Callout>

Because Replay is simply a browser, we can pass it into `wdio.config.ts` file as we would with any other browser. Example configuration will look like this:

```jsx
exports.config = {
  specs: ["./test/*.js"],
	automationProtocol: 'devtools',
  capabilities: [{
    maxInstances: 1,
    browserName: 'chrome',
    acceptInsecureCerts: true,
    'goog:chromeOptions': {
        binary: '../.replay/runtimes/Replay-Chromium.app/Contents/MacOS/Chromium', // path to Replay Chromium binary, example fom MacOS
        args: [ '--disable-infobars', '--window-size=1920,1080']
    }
  }],
};
```

<Callout type="info" emoji="ℹ️">
You need to set up `automationProtocol: 'devtools'` option in your config instead of default `webdriver` protocol for now. This may change in future updates.
</Callout>

## Uploading your replays
After setting up everything, you will run your tests as you normally would. Replay will record all the activity inside the browser, which you can then upload and view in [Test Suite dashboard](/test-suites/features/test-suite-dashboard).

To upload your recording, run the following command:

```sh
npx @replayio/replay upload-all
```

Note: you need to provide API key, either in your shell environment, or by passing it into the command. [You can read more about Replay CLI here](/reference-guide/recording/replay-cli).