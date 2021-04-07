/* eslint-disable no-unused-vars */
/*
 * @Author: GengHH
 * @Date: 2021-01-25 09:58:51
 * @LastEditors: GengHH
 * @LastEditTime: 2021-04-07 18:37:36
 * @Description: 兼容pl-xxx自定义组件IE9不支持placeHolder的情况
 * @FilePath: \jb2q-hrm-web\src\utils\placeholderPolyfill.js
 */
import Vue from 'vue';
Vue.directive('support', {
  inserted: function(el, binding, vnode) {
    //console.log(el, 'el');
    // 如果兼容placeholder则终止
    if ('placeholder' in document.createElement('input')) {
      return;
    }
    // select暂时不支持(input为只读状态时)
    var isReadOnly = el.getAttribute('readOnly');
    if (isReadOnly) return;

    // 由于第三方input组件都包了一个外层
    var input = el.querySelector('input');
    var placeholder = input.getAttribute('placeholder');
    var span = document.createElement('span');

    // .ie-placeholder 可根据类名自定义样式
    span.className = 'ie-placeholder';
    span.innerText = placeholder;
    // 位置设置
    if (input.parentNode.querySelector('.el-input__prefix')) {
      span.style.left = input.offsetLeft + '30' + 'px';
    } else {
      span.style.left = input.offsetLeft + '14' + 'px';
    }
    span.style.position = 'absolute';
    span.style.color = '#acacac';
    input.parentNode.style.position = 'relative';
    input.parentNode.appendChild(span);
    el.addEventListener('click', function(event) {
      if (event.target.nodeName == 'SPAN') {
        input.focus();
      }
      span.style.display = 'none';
    });
    span.addEventListener('click', function(event) {
      // span.style.display = "none";
      input.focus();
    });
    input.onblur = function(event) {
      if (!event.target.value) {
        if (el.parentNode.querySelector('.float-label')) {
          el.parentNode.querySelector('.float-label').className += ' hidden';
        }
        span.style.display = 'inline';
      }
    };
    input.oninput = function(event) {
      if (event.target.value) {
        span.style.display = 'none';
      } else {
        span.style.display = 'inline';
      }
    };
  },

  // 开始更新
  unbind: function(el) {
    var input = el.querySelector('input');
    input.onfocus = input.onblur = input.oninput = null;
  }
});
