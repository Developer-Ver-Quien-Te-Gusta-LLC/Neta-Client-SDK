import { MMKV } from 'react-native-mmkv'

const Cache = new MMKV({
  id: `user-${userId}-storage`,
  path: `${USER_DIRECTORY}/storage`,
  encryptionKey: 'hunter2'
})
export{Cache}

exports.module = storage

/// storage.getString("")
/// storage.set("key", val)