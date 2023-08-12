const MMKV = require('react-native-mmkv');

const Cache = new MMKV({
  id: `user-${userId}-storage`,
  path: `${USER_DIRECTORY}/storage`,
  encryptionKey: 'hunter2'
})
module.exports={Cache}

//exports.module = storage

/// storage.getString("")
/// storage.set("key", val)