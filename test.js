'use strict'

const keyvVersion = process.env.KEYV_VERSION || '4.x'
const suiteVersion = process.env.KEYV_SUITE_VERSION || '1.x'
const nodeVersion = process.version

// Test suite >= 2 use vitest instead of ava.
const assert = require('assert')
const test = require(Number(suiteVersion.split('.')[0]) < 2 ? 'ava' : 'vitest')
const testSuite = require('@keyv/test-suite').default
const Keyv = require('keyv')
const KeyvFirestore = require('.')

// ava: before, vitest: beforeAll
const before = test.before || test.beforeAll
before(() => {
  assert(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'GOOGLE_APPLICATION_CREDENTIALS must be set')
})

let collection = 'keyv-firestore'
// Use a unique-er collection name for concurrent CI runs
if (process.env.GITHUB_ACTIONS) {
  collection = `keyv-firestore-gh${process.env.GITHUB_RUN_ID}-${keyvVersion}-${nodeVersion}`
}

testSuite(test, Keyv, () => new KeyvFirestore({
  projectId: 'uwave-demo',
  collection
}))
