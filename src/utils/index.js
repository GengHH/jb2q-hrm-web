/*
 * @Author: GengHH
 * @Date: 2021-01-25 12:20:50
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-08 20:19:27
 * @Description: 通用的一些判断或者函数
 * @FilePath: \jb2q-hrm-web\src\utils\index.js
 */

/**
 * 获取随机key
 * @param len
 * @param type
 * @returns {string}
 */
export function getRandomKey(len = 5, type = 'number') {
  const list = [];
  for (let i = 0; i < len; i++) {
    const randomNumber = Math.floor(Math.random() * (99999 - 10000)) + 10000;
    const item = type === 'str' ? randomNumber.toString(36) : randomNumber;
    list.push(item);
  }
  return list.join('-');
}

/**
 * 防抖
 * @param fn
 * @param wait
 * @param isImmediate
 * @returns {function(...[*]=)}
 */
export function debounce(fn, wait = 500, isImmediate = true) {
  let timerId = null;
  let flag = true;
  if (isImmediate) {
    return function() {
      clearTimeout(timerId);
      if (flag) {
        // eslint-disable-next-line prefer-rest-params
        fn.apply(this, arguments);
        flag = false;
      }
      timerId = setTimeout(() => {
        flag = true;
      }, wait);
    };
  }
  return function() {
    clearTimeout(timerId);
    timerId = setTimeout(() => {
      // eslint-disable-next-line prefer-rest-params
      fn.apply(this, arguments);
    }, wait);
  };
}

/**
 * isArray
 * @param v
 * @returns {any}
 */
export function isArray(v) {
  return typeof Array.isArray === 'function'
    ? Array.isArray(v)
    : Object.prototype.toString.call(v) === '[object Array]';
}

/**
 * 普通对象判断
 * @param val
 * @returns {boolean}
 */
export function isPlainObject(val) {
  return toString.call(val) === '[object Object]';
}

const DEFAULT_OMIT = [undefined, null, ''];

export function filterObject(val, omit = DEFAULT_OMIT) {
  if (!isPlainObject(val)) {
    return val;
  }
  return Object.keys(val).reduce((obj, key) => {
    const value = val[key];
    if (!omit.includes(value)) {
      if (isPlainObject(value)) {
        obj[key] = filterObject(value);
      } else {
        obj[key] = value;
      }
    }
    return obj;
  }, {});
}

/**
 * 获取字典表中的某项TEXT
 * @param {Array} data
 * @param {String} code
 */
export function getDicText(data, code, value) {
  if (isArray(data) && data.length && code && value) {
    let _dic = data.find(function(i) {
      return i.value === value;
    });
    return _dic ? _dic.label : '';
  }
  return '';
}

/**
 * 对象转url参数
 * @param {*} data,对象
 * @param {*} isPrefix,是否自动加上"?"
 * @param {*} arrayFormat
 */
export function queryParams(
  data = {},
  isPrefix = true,
  arrayFormat = 'brackets'
) {
  let prefix = isPrefix ? '?' : '';
  let _result = [];
  if (['indices', 'brackets', 'repeat', 'comma'].indexOf(arrayFormat) == -1)
    arrayFormat = 'brackets';
  for (let key in data) {
    let value = data[key];
    // 去掉为空的参数
    if (['', undefined, null].indexOf(value) >= 0) {
      continue;
    }
    // 如果值为数组，另行处理
    if (value.constructor === Array) {
      // e.g. {ids: [1, 2, 3]}
      switch (arrayFormat) {
        case 'indices':
          // 结果: ids[0]=1&ids[1]=2&ids[2]=3
          for (let i = 0; i < value.length; i++) {
            _result.push(key + '[' + i + ']=' + value[i]);
          }
          break;
        case 'brackets':
          // 结果: ids[]=1&ids[]=2&ids[]=3
          value.forEach(_value => {
            _result.push(key + '[]=' + _value);
          });
          break;
        case 'repeat':
          // 结果: ids=1&ids=2&ids=3
          value.forEach(_value => {
            _result.push(key + '=' + _value);
          });
          break;
        case 'comma':
          // 结果: ids=1,2,3
          let commaStr = '';
          value.forEach(_value => {
            commaStr += (commaStr ? ',' : '') + _value;
          });
          _result.push(key + '=' + commaStr);
          break;
        default:
          value.forEach(_value => {
            _result.push(key + '[]=' + _value);
          });
      }
    } else {
      _result.push(key + '=' + value);
    }
  }
  return _result.length ? prefix + _result.join('&') : '';
}
