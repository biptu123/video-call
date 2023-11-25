// cryptoUtils.js
import CryptoJS from 'crypto-js';

const secretKey = '006eed5415104134b408191e99f7276aafdIAAKoxobR6nhUOWPjrSODxnmEJjK09AL0l0uPRD2vfCWd2TNKL9P/MslIgC5+lsFFgZiZQQAAQAQDgAAAgAQDgAAAwAQDgAABAAQDgAA eed5415104134b408191e99f7276aafd'; 

export const encrypt = (data) => {
  const ciphertext = CryptoJS.AES.encrypt(JSON.stringify(data), secretKey).toString();
  return encodeURIComponent(ciphertext);
};

export const decrypt = (encryptedData) => {
  const ciphertext = decodeURIComponent(encryptedData);
  const bytes = CryptoJS.AES.decrypt(ciphertext, secretKey);
  const decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
  return decryptedData;
};
