/**
 * @desc 是否是两个字节
 * @note 字母 数字跟半角的符号算一个字符
 *       全角的符号还是算两个字符*
 *       全角的`×`code为215，需要处理
 */
export const isDoubleByte = (str: string): boolean => {
  return str.charCodeAt(0) > 255 || str.charCodeAt(0) === 215;
};

/**
 * @desc 获取一个字符串的长度
 * @note 字母 数字跟半角的符号算一个字符
 *       全角的符号还是算两个字符
 *       全角的`×`code为215，需要处理
 */
export const getFullLength = (str: string): number => {
  if (!str) return 0;
  if (str.trim() === '') return 0;
  return str.split('').reduce((sum, current) => {
    return sum + (current.charCodeAt(0) > 255 || current.charCodeAt(0) === 215 ? 2 : 1);
  }, 0);
};

/**
 * @desc 截取一个字符串指定长度
 * @example
 *  sliceFullLen('中文123', 6) => '中文12'
 *  sliceFullLen('123中文', 6) => '123中'
 */
export const sliceFullLen = (str: string, len = 10): string => {
  const strArr = str.split('');
  let count = 0;
  let ret = '';
  for (let i = 0; i < strArr.length; i++) {
    const ele = strArr[i];
    count += isDoubleByte(ele) ? 2 : 1;
    if (count <= len) {
      ret += ele;
    } else {
      break;
    }
  }
  return ret;
};

// 获取字符串长度,汉字算2个字符；
export const getStringLength = (str: string = '') => {
  let count = 0;
  // eslint-disable-next-line no-plusplus
  for (let i = 0; i < str.length; i++) {
    if (/[\u4e00-\u9fa5]/.test(str[i])) {
      count += 2;
    } else {
      count += 1;
    }
  }
  return count;
};

export const validateFullLength = (
  _: any,
  value: string,
  min: number = 0,
  max: number = 10,
  msg: string = '',
) => {
  if (getFullLength(value) <= max && getFullLength(value) >= min) return Promise.resolve();
  return Promise.reject(msg);
};

export const validateJsStringLength = (
  _: any,
  value: string,
  min: number = 0,
  max: number = 10,
  msg: string = '',
) => {
  if (min <= value.length && value.length <= max) return Promise.resolve();
  return Promise.reject(msg);
};
