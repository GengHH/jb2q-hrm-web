/* eslint-disable no-case-declarations */
/*
 * @Author: GengHH
 * @Date: 2021-01-25 12:20:50
 * @LastEditors: GengHH
 * @LastEditTime: 2021-03-30 18:06:19
 * @Description: 通用的一些判断或者函数
 * @FilePath: \jb2q-hrm-web\src\utils\index.js
 */

/**
 * 判断是不是个人和单位都没有登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isNoBody(vm) {
  let a =
    !!vm &&
    !!vm.$store &&
    (!!vm.$store.getters['person/token'] ||
      !!vm.$store.getters['corporation/token']);
  return !a;
}

/**
 * 判断是不是个人登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isPerson(vm) {
  return vm && vm.$store && vm.$store.getters['person/token'];
}

/**
 * 判断是不是单位登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isCorporation(vm) {
  return vm && vm.$store && vm.$store.getters['corporation/token'];
}

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
 * @param {String} value
 */
export function getDicText(data, value) {
  if (isArray(data) && data.length && value) {
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
  if (typeof data !== 'object') {
    return '?' + data;
  }
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

/**
 * 时间格式化
 * @param {*} date
 */
let formatNumber = n => {
  n = n.toString();
  return n[1] ? n : '0' + n;
};
export function formatTime(date) {
  const year = date.getFullYear();
  const month = date.getMonth() + 1;
  const day = date.getDate();
  const hour = date.getHours();
  const minute = date.getMinutes();
  const second = date.getSeconds();

  return (
    [year, month, day].map(formatNumber).join('-') +
    ' ' +
    [hour, minute, second].map(formatNumber).join(':')
  );
}
