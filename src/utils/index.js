/* eslint-disable no-case-declarations */
/*
 * @Author: GengHH
 * @Date: 2021-01-25 12:20:50
 * @LastEditors: Please set LastEditors
 * @Description: 通用的一些判断或者函数
 * @FilePath: \jb2q-hrm-web\src\utils\index.js
 */

/**
 * 判断是不是个人和单位都没有登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isNoBody(vm) {
  let localData = JSON.parse(localStorage.getItem('vuex') || null);
  let login = !!localData?.person?.token || !!localData?.corporation?.token;
  if (vm) {
    //非管理员模块判断
    let a =
      !!vm &&
      !!vm.$store &&
      (!!vm.$store.getters['person/token'] ||
        !!vm.$store.getters['corporation/token']);
    return !a && !login;
  } else {
    //管理员模块判断
    return !login;
  }
}

/**
 * 判断是不是个人登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isPerson(vm) {
  let localData = JSON.parse(localStorage.getItem('vuex') || null);
  let login = !!localData?.person?.token;
  if (vm) {
    //非管理员模块判断
    let storePerson = vm && vm.$store && vm.$store.getters['person/token'];
    return storePerson || login;
  } else {
    //管理员模块判断
    return login;
  }
}

/**
 * 判断是不是单位登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isCorporation(vm) {
  let localData = JSON.parse(localStorage.getItem('a-vuex') || null);
  let login = !!localData?.corporation?.token;
  if (vm) {
    //非管理员模块判断
    let storeCorporation =
      vm && vm.$store && vm.$store.getters['corporation/token'];
    return storeCorporation || login;
  } else {
    //管理员模块判断
    return login;
  }
}

/**
 * 判断是不是管理员登录
 * @param {object} vm（vm对象）
 * @returns {boolean}
 */
export function isAdmin(vm) {
  let localData = JSON.parse(localStorage.getItem('a-vuex') || null);
  let login = !!localData?.admin?.token;
  if (vm) {
    //管理员模块判断
    let storeAdmin = vm && vm.$store && vm.$store.getters['admin/token'];
    return storeAdmin || login;
  } else {
    //非管理员模块判断
    return login;
  }
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
 * return "2021-07-06 11:10:31"
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
/**
 * 格式化树型数据
 */
export function treeDataformat(source, id, parentId, children, topId) {
  var cloneData = JSON.parse(JSON.stringify(source)); // 对源数据深度克隆
  return cloneData.filter(father => {
    // 循环所有项，并添加children属性
    var branchArr = cloneData.filter(child => father[id] == child[parentId]); // 返回每一项的子级数组
    branchArr.length > 0 ? (father[children] = branchArr) : ''; //给父级添加一个children属性，并赋值
    return father[parentId] == topId; // 如果第一层不是parentId=0，请自行修改
  });
}
/**
 * 判断是否证件号搜索
 */
export function isZjhm(str) {
  console.log(str);
  if (JSON.stringify(str).length < 14) {
    if (Number(str) + '' !== NaN + '') {
      return {
        xm: '',
        zjhm: str
      };
    } else {
      return {
        xm: str,
        zjhm: ''
      };
    }
  } else {
    return {
      xm: '',
      zjhm: str
    };
  }
}
/**
 * 判断是否空对象
 */
export function isEmptyObject(obj) {
  var name;

  for (name in obj) {
    return false;
  }
  return true;
}
/**
 * 获取错误信息
 */
export function getHtml(data) {
  let result = data.match(/<td(.*?)<\/td>/g).map(function(val) {
    return val.replace(/<\/?td>/g, '');
  });
  return result[1].split('>')[1];
}
/**
 * 去除空格
 */
export function trim(data) {
  if (data == null || data == undefined) {
    return '不是一个字符串或者对象';
  }
  if (typeof data === 'string') {
    return data.trim();
  } else if (typeof data === 'object') {
    if (data.constructor === Array) {
      if (data.length) {
        if (data[0].constructor === Object) {
          for (let i = 0; i < data.length; i++) {
            for (let j in data[i]) {
              data[i][j] =
                typeof data[i][j] == 'string' ? data[i][j].trim() : data[i][j];
            }
          }
          return data;
        } else {
          for (let i = 0; i < data.length; i++) {
            data[i] = typeof data[i] == 'string' ? data[i].trim() : data[i];
          }
          return data;
        }
      } else {
        return '空数组';
      }
    } else if (data.constructor === Object) {
      for (let i in data) {
        data[i] = typeof data[i] == 'string' ? data[i].trim() : data[i];
      }
      return data;
    }
  } else {
    return '不是一个字符串或者对象';
  }
}

/**
 * 使用jquery.nicescroll 自定义样式（兼容IE,全局统一）
 * @param {*} id
 */
export function niceScroll(dom) {
  if (!$.prototype.niceScroll) return;
  // if (dom !== '.el-table__body-wrapper') {
  //   return;
  // }
  if (dom) {
    let scrollConfig = {
      cursorcolor: '#aaa', // 改变滚动条颜色，使用16进制颜色值
      cursoropacitymin: 0, // 当滚动条是隐藏状态时改变透明度, 值范围 1 到 0
      cursoropacitymax: 1, // 当滚动条是显示状态时改变透明度, 值范围 1 到 0
      cursorwidth: '7px', // 滚动条的宽度，单位：便素
      cursorborder: '1px solid #fff', // CSS方式定义滚动条边框
      cursorborderradius: '5px', // 滚动条圆角（像素）
      scrollspeed: 60, // 滚动速度
      mousescrollstep: 40, // 鼠标滚轮的滚动速度 (像素)
      touchbehavior: false, // 激活拖拽滚动
      hwacceleration: true, // 激活硬件加速
      boxzoom: false, // 激活放大box的内容
      dblclickzoom: true, // (仅当 boxzoom=true时有效)双击box时放大
      gesturezoom: false, // (仅 boxzoom=true 和触屏设备时有效) 激活变焦当out/in（两个手指外张或收缩）
      grabcursorenabled: true, // (仅当 touchbehavior=true) 显示“抓住”图标display "grab" icon
      autohidemode: false // 隐藏滚动条的方式, 可用的值:true or false
    };
    if (dom === '.el-table__body-wrapper') {
      scrollConfig.mousescrollstep = 0;
    }
    let $doms = $(dom);
    if ($doms.length && $doms.length === 1) {
      $doms.niceScroll(scrollConfig);
    } else if ($doms.length && $doms.length > 0) {
      $doms.each(function() {
        $(this).niceScroll(scrollConfig);
      });
    }
  }
}
/**
 * 使用jquery.nicescroll 更新滚动条样式（兼容IE,全局统一）
 * @param {*} id
 */
export function niceScrollUpdate(dom) {
  if (!$.prototype.getNiceScroll) return;
  if (dom) {
    $(dom)
      ?.getNiceScroll()
      ?.resize();
  }
  $('#indexApp')
    ?.getNiceScroll()
    ?.resize();
}

/**
 *
 * 判断某个日期是否超过当前日期某些天数
 * @export
 * @param {*} date 指定日期（Date,String,null）
 * @param {*} day
 */
export function overDateSomeDays(date, day) {
  let nowDate = new Date();
  nowDate.setDate(nowDate.getDate() + (day || 0));
  let nowDateNum = nowDate
    ? '' +
      nowDate.getFullYear() +
      zeroFill(nowDate.getMonth() + 1) +
      zeroFill(nowDate.getDate())
    : 0;

  let _date = date
    ? typeof date === 'string'
      ? new Date(
          date.length === 8
            ? date.substring(0, 4) +
              '-' +
              date.substring(4, 6) +
              '-' +
              date.substring(6, 8)
            : date
        )
      : date
    : new Date();
  let tagertDateNum = _date
    ? '' +
      _date.getFullYear() +
      zeroFill(_date.getMonth() + 1) +
      zeroFill(_date.getDate())
    : 0;
  return tagertDateNum > nowDateNum;
}

function zeroFill(i) {
  if (i >= 0 && i <= 9) {
    return '0' + i;
  } else {
    return i;
  }
}
/**
 *获取当前时间 格式：yyyy-MM-dd HH:MM:SS
 *
 * @export
 */
export function getCurrentTime() {
  var date = new Date(); //当前时间
  var month = zeroFill(date.getMonth() + 1); //月
  var day = zeroFill(date.getDate()); //日
  var hour = zeroFill(date.getHours()); //时
  var minute = zeroFill(date.getMinutes()); //分
  var second = zeroFill(date.getSeconds()); //秒

  //当前时间
  var curTime =
    date.getFullYear() +
    '-' +
    month +
    '-' +
    day +
    ' ' +
    hour +
    ':' +
    minute +
    ':' +
    second;

  return curTime;
}

/**
 *格式化某个日期成八位数字   格式：yyyyMMdd
 *
 * @export
 */
export function getDateNumber(orignDate) {
  var date = new Date(orignDate); //当前时间
  var month = zeroFill(date.getMonth() + 1); //月
  var day = zeroFill(date.getDate()); //日
  //var hour = zeroFill(date.getHours()); //时
  //var minute = zeroFill(date.getMinutes()); //分
  //var second = zeroFill(date.getSeconds()); //秒

  //当前时间
  var targetDate = date.getFullYear() + month + day;

  return targetDate;
}
