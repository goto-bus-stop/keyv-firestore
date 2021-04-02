const assert = require('assert').strict
const Firestore = require('@google-cloud/firestore')

class KeyvFirestore {
  constructor ({
    projectId,
    credentials,
    collection
  }) {
    assert.equal(typeof collection, 'string')

    this._store = new Firestore({ projectId, credentials })
    this._collection = this._store.collection(collection)
  }

  _col () {
    return this._collection.doc(this.namespace).collection(this.namespace)
  }

  _doc (key) {
    const prefix = `${this.namespace}:`
    return this._col().doc(key.slice(prefix.length))
  }

  get (key) {
    return this._doc(key).get().then((doc) => {
      if (doc.exists) {
        return doc.get('value')
      }
      return undefined
    })
  }

  set (key, value, ttl) {
    return this._doc(key).set({ value })
  }

  delete (key) {
    return this._doc(key).get().then((doc) => {
      if (doc.exists) {
        return this._doc(key).delete()
          .then(() => true)
      }
      return false
    })
  }

  _deleteBatch (query) {
    return query.get().then((snapshot) => {
      if (snapshot.size === 0) return true
      const batch = this._store.batch()
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref)
      })
      return batch.commit().then(() => false)
    })
  }

  clear () {
    return new Promise((resolve, reject) => {
      function next () {
        this._deleteBatch(this._col().limit(100)).then((finished) => {
          if (finished) {
            resolve()
          } else {
            next.call(this)
          }
        }).catch(reject)
      }
      next.call(this)
    })
  }
}

module.exports = KeyvFirestore
