import CryptoJS from 'crypto-js'
const { enc: { Utf8, Base64, Hex }, AES, mode, pad, MD5 } = CryptoJS
class encryptUtils {
    encrypt(word, key, type = 'hert', ivVal = 'A-16-Byte-String') {
        const iv = Utf8.parse(ivVal)
        const $key = Utf8.parse(key)
        let encrypted = ""
        let srcs
        if (typeof word == "string") {
            srcs = Utf8.parse(word)
        } else if (typeof word == "object") {
            srcs = Utf8.parse(JSON.stringify($key))
        }
        encrypted = AES.encrypt(srcs, $key, {
            iv,
            mode: mode.CBC,
            padding: pad.Pkcs7
        })
        const { ciphertext } = encrypted
        if (type === 'hert') {
            return ciphertext.toString()
        }
        else if (type === 'base64') {
            return Base64.stringify(ciphertext)
        }
    }
    decrypt(word, key, type = 'hert', ivVal = 'A-16-Byte-String') {
        const iv = Utf8.parse(ivVal)
        const $key = Utf8.parse(key)
        let encryptedHexStr = Hex.parse(word)
        if (type === 'base64') {
            encryptedHexStr = Base64.parse(word)
        }
        const srcs = Base64.stringify(encryptedHexStr)
        const decryptData = AES.decrypt(srcs, $key, {
            iv,
            mode: mode.CBC,
            padding: pad.Pkcs7
        })
        return decryptData.toString(Utf8).toString()
    }
    getMd5(file) {
        return MD5(file).toString().toUpperCase()
    }
}

const self = new encryptUtils()

export default self
