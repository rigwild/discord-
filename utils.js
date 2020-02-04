import AES from 'crypto-js/aes'
import cryptoJsUtf8 from 'crypto-js/enc-utf8'

export const crypt = (message, key) => AES.encrypt(message, key).toString()
export const decrypt = (crypted, key) => AES.decrypt(crypted, key).toString(cryptoJsUtf8)
