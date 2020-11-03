const test = require('ava')
const testSuite = require('@keyv/test-suite').default
const Keyv = require('keyv')
const KeyvFirestore = require('.')

test.before((t) => {
  t.truthy(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'GOOGLE_APPLICATION_CREDENTIALS must be set')
})

let collection = 'keyv-firestore'
// Use a unique-er collection name for concurrent CI runs
if (process.env.GITHUB_ACTIONS) {
  const keyvVersion = require('keyv/package.json').version
  const nodeVersion = process.version
  collection = `keyv-firestore-gh${process.env.GITHUB_RUN_ID}-${keyvVersion}-${nodeVersion}`
}

testSuite(test, Keyv, () => new KeyvFirestore({
  projectId: 'uwave-demo',
  collection
}))
