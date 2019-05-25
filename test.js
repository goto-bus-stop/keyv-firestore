const test = require('ava')
const testSuite = require('@keyv/test-suite').default
const Keyv = require('keyv')
const KeyvFirestore = require('.')

test.before((t) => {
  t.truthy(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'GOOGLE_APPLICATION_CREDENTIALS must be set')
})

testSuite(test, Keyv, () => new KeyvFirestore({
  projectId: 'uwave-demo',
  collection: 'keyv-firestore'
}))
