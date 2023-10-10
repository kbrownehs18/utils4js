import CryptoJS from 'crypto-js';
import base64 from 'base-64';

import { range } from './array';

// Base64编码
export const base64Encode = (input: string) => {
  if (typeof btoa == 'function') {
    return btoa(input);
  }

  return base64.encode(input);
};

// Base64解码
export const base64Decode = (input: string) => {
  if (typeof atob === 'function') {
    return atob(input);
  }

  return base64.decode(input);
};

export const authcode = (
  text: string,
  decrypt: boolean,
  key: string = '',
  expiry: number = 0,
  ckeyLength: number = 8,
): string => {
  text = text.trim();
  if (text === '') {
    return '';
  }

  // 动态密钥长度
  ckeyLength = ckeyLength > 0 ? ckeyLength : 8;
  // 生成密钥
  key = md5(key === '' ? 'abcdefghijklmnopqrstuvwxyz0123456789' : key);

  // 密钥A用于加密
  const keyA = md5(key.substring(0, 16));
  // 密钥B用于验证
  const keyB = md5(key.substring(16));
  // 密钥C，生成动态密码部分
  // 解密的时候获取需要解密的字符串前面的ckey_length长度字符串
  // 加密的时候，用当前时间戳的微妙数md5加密的最后ckey_length长度字符串
  const keyC = decrypt ? text.substring(0, ckeyLength) : md5(Date.now().toString()).substring(32 - ckeyLength);
  // 用于计算的密钥
  const cryptKey = keyA + md5(keyA + keyC);
  const keyLength = cryptKey.length;

  if (decrypt) {
    text = base64Decode(text.substring(ckeyLength));
  } else {
    const timestamp = Math.floor(Date.now() / 1000);
    text = (expiry > 0 ? timestamp + expiry : '0000000000') + md5(text + keyB).substring(0, 16) + text;
  }

  const textLength = text.length;
  const box: number[] = range(256);

  let result = '';
  const rndKey: number[] = [];
  for (const i of range(256)) {
    rndKey.push(cryptKey.charAt(i % keyLength).charCodeAt(0));
  }

  let j = 0;
  for (const i of range(256)) {
    j = (j + box[i] + rndKey[i]) % 256;
    let temp = box[i];
    box[i] = box[j];
    box[j] = temp;
  }

  let a = 0;
  j = 0;

  for (const i of range(textLength)) {
    a = (a + 1) % 256;
    j = (j + box[a]) % 256;
    let temp = box[a];
    box[a] = box[j];
    box[j] = temp;
    result += String.fromCharCode(text[i].charCodeAt(0) ^ box[(box[a] + box[j]) % 256]);
  }

  if (decrypt) {
    const t = parseInt(result.substring(0, 10));
    const timestamp = Math.floor(Date.now() / 1000);
    if (
      (t === 0 || t - timestamp > 0) &&
      md5(result.substring(26) + keyB).substring(0, 16) === result.substring(10, 26)
    ) {
      return result.substring(26);
    }

    return '';
  }
  return keyC + base64Encode(result);
};

export const md5 = (str: string) => {
  return CryptoJS.MD5(str).toString();
};
