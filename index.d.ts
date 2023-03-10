import {Store} from 'keyv'

declare const keyvFirestore: new (options: {
  projectId?: string
  collection: string
  credentials?: {
    client_email: string
    private_key: string
  }
}) => Store<string>

export = keyvFirestore
