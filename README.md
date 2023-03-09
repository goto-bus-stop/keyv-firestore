# keyv-firestore

Firebase Cloud Firestore backend for [Keyv](https://github.com/lukechilds/keyv), the simple persistent key-value storage module

[Install](#install) - [Usage](#usage) - [License: Apache-2.0](#license)

[![npm][npm-image]][npm-url]
[![travis][travis-image]][travis-url]
[![standard][standard-image]][standard-url]

[npm-image]: https://img.shields.io/npm/v/keyv-firestore.svg?style=flat-square
[npm-url]: https://www.npmjs.com/package/keyv-firestore
[travis-image]: https://img.shields.io/travis/com/goto-bus-stop/keyv-firestore/default.svg?style=flat-square
[travis-url]: https://travis-ci.com/goto-bus-stop/keyv-firestore
[standard-image]: https://img.shields.io/badge/code%20style-standard-brightgreen.svg?style=flat-square
[standard-url]: http://npm.im/standard

## Install

```
npm install keyv-firestore
```

## Usage

`keyv-firestore` uses nested collections for namespaces and keys. A root collection contains keys for each namespace, and each namespace key contains a single collection that holds key/value pairs. The path to a specific key is `root-collection/namespace/namespace/key`.

```js
var Keyv = require('keyv')
var KeyvFirestore = require('keyv-firestore')

const keyv = new Keyv({
  store: new KeyvFirestore({
    // REQUIRED: the project id to use
    projectId: 'my-firebase-project',
    // REQUIRED: the root collection to store things in
    collection: 'firestore-db-collection'
  })
})
```

You can set the `GOOGLE_APPLICATION_CREDENTIALS` environment variable to configure credentials, or pass in a JavaScript object in the `credentials` option.

```js
const keyv = new Keyv({
  store: new KeyvFirestore({
    projectId: 'my-firebase-project',
    collection: 'firestore-db-collection',
    credentials: require('./path/to/google-credentials.json')
  })
})
```

## Tests

To be able to run tests locally, put a `.google-credentials.json` file in this repository's root directory.

## License

[Apache-2.0](LICENSE.md)
