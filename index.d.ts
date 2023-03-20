import {Store} from 'keyv'

declare class KeyvFirestore<Value = any> implements Store<Value> {
  constructor(options: {
    projectId?: string
    collection: string
    // https://github.com/googleapis/nodejs-firestore/blob/207c9359e369b6838f026fd62ff56df39332dcff/dev/src/index.ts#L513-L518
    credentials?: {
      client_email: string
      private_key: string
    }
  })
  get(key: string): Value | Promise<Value | undefined> | undefined
  set(key: string, value: Value, ttl?: number): any
  delete(key: string): boolean | Promise<boolean>
  clear(): void | Promise<void>
}

export = KeyvFirestore
