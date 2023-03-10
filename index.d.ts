import {Store} from 'keyv'

// Not precise, but typing the entire class seems overkill
declare const keyvFirestore: new (options: {
  projectId?: string
  collection: string
  // https://github.com/googleapis/nodejs-firestore/blob/207c9359e369b6838f026fd62ff56df39332dcff/dev/src/index.ts#L513-L518
  credentials?: {
    client_email: string
    private_key: string
  }
}) => Store<string>

export = keyvFirestore
