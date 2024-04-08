---
title: Jest
---
import { Callout } from 'nextra/components'

# Jest

<Callout type="error" emoji="❗">
 This implementation is experimental. It is not configured for use with Replay Test Teams.
</Callout>

You can record jest using `replay-node`. To do so:

1. Install `replay-node`, [as described here](/reference-guide/recording/replay-node-(experimental)).
2. Run `replay-node --exec $jestCmd` to record the test. For example:
`replay-node --exec npm test` would record all of the tests run by the test script in your `package.json`, `replay-node --exec npm run test -- specific.test.ts` would pass “`specific.test.ts`” to `npm run test` and record that.

For more details on Replay Node, check out the [Recording Node.js Guide](/reference-guide/recording/replay-node-(experimental)).