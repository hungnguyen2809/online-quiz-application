import {Base64} from 'js-base64';
// const KEY = 'vinguyenthivanngochunghuyen';

const Encript = (plainText) => {
  return Base64.encode(plainText);
};

const Decript = (cipherText) => {
  return Base64.decode(cipherText);
};

export {Encript, Decript};
