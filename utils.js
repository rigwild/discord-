import AES from 'crypto-js/aes'
import cryptoJsUtf8 from 'crypto-js/enc-utf8'

export const crypt = (message, key) => AES.encrypt(message, key).toString()
export const decrypt = (crypted, key) => AES.decrypt(crypted, key).toString(cryptoJsUtf8)

const twoDigits = serializable => serializable.toString().padStart(2, '0')

/**
 * Transform a date object to a human-readable date format
 * `2019-12-31`
 * @param date Date to format
 * @returns formated date
 * @see https://gist.github.com/rigwild/bf712322eac2244096468985ee4a5aae
 */
export const toHumanDate = date =>
  `${date.getFullYear()}-${twoDigits(date.getMonth() + 1)}-${twoDigits(date.getDate())}`

/**
 * Transform a date object to a human-readable datetime format
 * `2019-12-31 - 24:60:60`
 * @param date Date to format
 * @returns formated datetime
 * @see https://gist.github.com/rigwild/bf712322eac2244096468985ee4a5aae
 */
export const toHumanDateTime = date =>
  `${toHumanDate(date)} - ${twoDigits(date.getHours())}:${twoDigits(date.getMinutes())}:${twoDigits(date.getSeconds())}`
