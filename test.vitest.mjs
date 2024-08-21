import assert from 'node:assert'
import { readFileSync } from 'node:fs'
import * as vitest from 'vitest'
import testSuite from '@keyv/test-suite'
import Keyv from 'keyv'
import KeyvFirestore from '.'

const keyvVersion = JSON.parse(readFileSync(new URL('./node_modules/keyv/package.json', import.meta.url), 'utf8')).version
const nodeVersion = process.version

vitest.beforeAll(() => {
  assert(process.env.GOOGLE_APPLICATION_CREDENTIALS, 'GOOGLE_APPLICATION_CREDENTIALS must be set')
})

let collection = 'keyv-firestore'
// Use a unique-er collection name for concurrent CI runs
if (process.env.GITHUB_ACTIONS) {
  collection = `keyv-firestore-gh${process.env.GITHUB_RUN_ID}-${keyvVersion}-${nodeVersion}`
}

testSuite(vitest, Keyv, () => new KeyvFirestore({
  projectId: 'uwave-demo',
  collection
}))
