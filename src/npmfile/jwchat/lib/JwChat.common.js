/*!
 *  JwChat.js v0.3.6
 *  (c) 2020-2021 codeGI
 *  Released under the MIT License.
 * 
 */
(function webpackUniversalModuleDefinition(root, factory) {
	if(typeof exports === 'object' && typeof module === 'object')
		module.exports = factory();
	else if(typeof define === 'function' && define.amd)
		define("JwChat", [], factory);
	else if(typeof exports === 'object')
		exports["JwChat"] = factory();
	else
		root["JwChat"] = factory();
})((typeof self !== 'undefined' ? self : this), function() {
return /******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "fb15");
/******/ })
/************************************************************************/
/******/ ({

/***/ "00ee":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var test = {};

test[TO_STRING_TAG] = 'z';

module.exports = String(test) === '[object z]';


/***/ }),

/***/ "0366":
/***/ (function(module, exports, __webpack_require__) {

var aFunction = __webpack_require__("1c0b");

// optional / simple context binding
module.exports = function (fn, that, length) {
  aFunction(fn);
  if (that === undefined) return fn;
  switch (length) {
    case 0: return function () {
      return fn.call(that);
    };
    case 1: return function (a) {
      return fn.call(that, a);
    };
    case 2: return function (a, b) {
      return fn.call(that, a, b);
    };
    case 3: return function (a, b, c) {
      return fn.call(that, a, b, c);
    };
  }
  return function (/* ...args */) {
    return fn.apply(that, arguments);
  };
};


/***/ }),

/***/ "0538":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var aFunction = __webpack_require__("1c0b");
var isObject = __webpack_require__("861d");

var slice = [].slice;
var factories = {};

var construct = function (C, argsLength, args) {
  if (!(argsLength in factories)) {
    for (var list = [], i = 0; i < argsLength; i++) list[i] = 'a[' + i + ']';
    // eslint-disable-next-line no-new-func
    factories[argsLength] = Function('C,a', 'return new C(' + list.join(',') + ')');
  } return factories[argsLength](C, args);
};

// `Function.prototype.bind` method implementation
// https://tc39.github.io/ecma262/#sec-function.prototype.bind
module.exports = Function.bind || function bind(that /* , ...args */) {
  var fn = aFunction(this);
  var partArgs = slice.call(arguments, 1);
  var boundFunction = function bound(/* args... */) {
    var args = partArgs.concat(slice.call(arguments));
    return this instanceof boundFunction ? construct(fn, args.length, args) : fn.apply(that, args);
  };
  if (isObject(fn.prototype)) boundFunction.prototype = fn.prototype;
  return boundFunction;
};


/***/ }),

/***/ "057f":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyNames = __webpack_require__("241c").f;

var toString = {}.toString;

var windowNames = typeof window == 'object' && window && Object.getOwnPropertyNames
  ? Object.getOwnPropertyNames(window) : [];

var getWindowNames = function (it) {
  try {
    return nativeGetOwnPropertyNames(it);
  } catch (error) {
    return windowNames.slice();
  }
};

// fallback for IE11 buggy Object.getOwnPropertyNames with iframe and window
module.exports.f = function getOwnPropertyNames(it) {
  return windowNames && toString.call(it) == '[object Window]'
    ? getWindowNames(it)
    : nativeGetOwnPropertyNames(toIndexedObject(it));
};


/***/ }),

/***/ "0621":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8788");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("4088222e", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "06cf":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createPropertyDescriptor = __webpack_require__("5c6c");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var has = __webpack_require__("5135");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");

var nativeGetOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
exports.f = DESCRIPTORS ? nativeGetOwnPropertyDescriptor : function getOwnPropertyDescriptor(O, P) {
  O = toIndexedObject(O);
  P = toPrimitive(P, true);
  if (IE8_DOM_DEFINE) try {
    return nativeGetOwnPropertyDescriptor(O, P);
  } catch (error) { /* empty */ }
  if (has(O, P)) return createPropertyDescriptor(!propertyIsEnumerableModule.f.call(O, P), O[P]);
};


/***/ }),

/***/ "0cfb":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var createElement = __webpack_require__("cc12");

// Thank's IE8 for his funny defineProperty
module.exports = !DESCRIPTORS && !fails(function () {
  return Object.defineProperty(createElement('div'), 'a', {
    get: function () { return 7; }
  }).a != 7;
});


/***/ }),

/***/ "1276":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var isRegExp = __webpack_require__("44e7");
var anObject = __webpack_require__("825a");
var requireObjectCoercible = __webpack_require__("1d80");
var speciesConstructor = __webpack_require__("4840");
var advanceStringIndex = __webpack_require__("8aa5");
var toLength = __webpack_require__("50c4");
var callRegExpExec = __webpack_require__("14c3");
var regexpExec = __webpack_require__("9263");
var fails = __webpack_require__("d039");

var arrayPush = [].push;
var min = Math.min;
var MAX_UINT32 = 0xFFFFFFFF;

// babel-minify transpiles RegExp('x', 'y') -> /x/y and it causes SyntaxError
var SUPPORTS_Y = !fails(function () { return !RegExp(MAX_UINT32, 'y'); });

// @@split logic
fixRegExpWellKnownSymbolLogic('split', 2, function (SPLIT, nativeSplit, maybeCallNative) {
  var internalSplit;
  if (
    'abbc'.split(/(b)*/)[1] == 'c' ||
    'test'.split(/(?:)/, -1).length != 4 ||
    'ab'.split(/(?:ab)*/).length != 2 ||
    '.'.split(/(.?)(.?)/).length != 4 ||
    '.'.split(/()()/).length > 1 ||
    ''.split(/.?/).length
  ) {
    // based on es5-shim implementation, need to rework it
    internalSplit = function (separator, limit) {
      var string = String(requireObjectCoercible(this));
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (separator === undefined) return [string];
      // If `separator` is not a regex, use native split
      if (!isRegExp(separator)) {
        return nativeSplit.call(string, separator, lim);
      }
      var output = [];
      var flags = (separator.ignoreCase ? 'i' : '') +
                  (separator.multiline ? 'm' : '') +
                  (separator.unicode ? 'u' : '') +
                  (separator.sticky ? 'y' : '');
      var lastLastIndex = 0;
      // Make `global` and avoid `lastIndex` issues by working with a copy
      var separatorCopy = new RegExp(separator.source, flags + 'g');
      var match, lastIndex, lastLength;
      while (match = regexpExec.call(separatorCopy, string)) {
        lastIndex = separatorCopy.lastIndex;
        if (lastIndex > lastLastIndex) {
          output.push(string.slice(lastLastIndex, match.index));
          if (match.length > 1 && match.index < string.length) arrayPush.apply(output, match.slice(1));
          lastLength = match[0].length;
          lastLastIndex = lastIndex;
          if (output.length >= lim) break;
        }
        if (separatorCopy.lastIndex === match.index) separatorCopy.lastIndex++; // Avoid an infinite loop
      }
      if (lastLastIndex === string.length) {
        if (lastLength || !separatorCopy.test('')) output.push('');
      } else output.push(string.slice(lastLastIndex));
      return output.length > lim ? output.slice(0, lim) : output;
    };
  // Chakra, V8
  } else if ('0'.split(undefined, 0).length) {
    internalSplit = function (separator, limit) {
      return separator === undefined && limit === 0 ? [] : nativeSplit.call(this, separator, limit);
    };
  } else internalSplit = nativeSplit;

  return [
    // `String.prototype.split` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.split
    function split(separator, limit) {
      var O = requireObjectCoercible(this);
      var splitter = separator == undefined ? undefined : separator[SPLIT];
      return splitter !== undefined
        ? splitter.call(separator, O, limit)
        : internalSplit.call(String(O), separator, limit);
    },
    // `RegExp.prototype[@@split]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@split
    //
    // NOTE: This cannot be properly polyfilled in engines that don't support
    // the 'y' flag.
    function (regexp, limit) {
      var res = maybeCallNative(internalSplit, regexp, this, limit, internalSplit !== nativeSplit);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);
      var C = speciesConstructor(rx, RegExp);

      var unicodeMatching = rx.unicode;
      var flags = (rx.ignoreCase ? 'i' : '') +
                  (rx.multiline ? 'm' : '') +
                  (rx.unicode ? 'u' : '') +
                  (SUPPORTS_Y ? 'y' : 'g');

      // ^(? + rx + ) is needed, in combination with some S slicing, to
      // simulate the 'y' flag.
      var splitter = new C(SUPPORTS_Y ? rx : '^(?:' + rx.source + ')', flags);
      var lim = limit === undefined ? MAX_UINT32 : limit >>> 0;
      if (lim === 0) return [];
      if (S.length === 0) return callRegExpExec(splitter, S) === null ? [S] : [];
      var p = 0;
      var q = 0;
      var A = [];
      while (q < S.length) {
        splitter.lastIndex = SUPPORTS_Y ? q : 0;
        var z = callRegExpExec(splitter, SUPPORTS_Y ? S : S.slice(q));
        var e;
        if (
          z === null ||
          (e = min(toLength(splitter.lastIndex + (SUPPORTS_Y ? 0 : q)), S.length)) === p
        ) {
          q = advanceStringIndex(S, q, unicodeMatching);
        } else {
          A.push(S.slice(p, q));
          if (A.length === lim) return A;
          for (var i = 1; i <= z.length - 1; i++) {
            A.push(z[i]);
            if (A.length === lim) return A;
          }
          q = p = e;
        }
      }
      A.push(S.slice(p));
      return A;
    }
  ];
}, !SUPPORTS_Y);


/***/ }),

/***/ "14c3":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");
var regexpExec = __webpack_require__("9263");

// `RegExpExec` abstract operation
// https://tc39.github.io/ecma262/#sec-regexpexec
module.exports = function (R, S) {
  var exec = R.exec;
  if (typeof exec === 'function') {
    var result = exec.call(R, S);
    if (typeof result !== 'object') {
      throw TypeError('RegExp exec method returned something other than an Object or null');
    }
    return result;
  }

  if (classof(R) !== 'RegExp') {
    throw TypeError('RegExp#exec called on incompatible receiver');
  }

  return regexpExec.call(R, S);
};



/***/ }),

/***/ "159b":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var forEach = __webpack_require__("17c2");
var createNonEnumerableProperty = __webpack_require__("9112");

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  // some Chrome versions have non-configurable methods on DOMTokenList
  if (CollectionPrototype && CollectionPrototype.forEach !== forEach) try {
    createNonEnumerableProperty(CollectionPrototype, 'forEach', forEach);
  } catch (error) {
    CollectionPrototype.forEach = forEach;
  }
}


/***/ }),

/***/ "17c2":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $forEach = __webpack_require__("b727").forEach;
var arrayMethodIsStrict = __webpack_require__("a640");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var STRICT_METHOD = arrayMethodIsStrict('forEach');
var USES_TO_LENGTH = arrayMethodUsesToLength('forEach');

// `Array.prototype.forEach` method implementation
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
module.exports = (!STRICT_METHOD || !USES_TO_LENGTH) ? function forEach(callbackfn /* , thisArg */) {
  return $forEach(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
} : [].forEach;


/***/ }),

/***/ "1a3d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1c4106e7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("c46a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1c4106e7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1c4106e7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_1c4106e7_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "1be4":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('document', 'documentElement');


/***/ }),

/***/ "1c0b":
/***/ (function(module, exports) {

module.exports = function (it) {
  if (typeof it != 'function') {
    throw TypeError(String(it) + ' is not a function');
  } return it;
};


/***/ }),

/***/ "1c7e":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var SAFE_CLOSING = false;

try {
  var called = 0;
  var iteratorWithReturn = {
    next: function () {
      return { done: !!called++ };
    },
    'return': function () {
      SAFE_CLOSING = true;
    }
  };
  iteratorWithReturn[ITERATOR] = function () {
    return this;
  };
  // eslint-disable-next-line no-throw-literal
  Array.from(iteratorWithReturn, function () { throw 2; });
} catch (error) { /* empty */ }

module.exports = function (exec, SKIP_CLOSING) {
  if (!SKIP_CLOSING && !SAFE_CLOSING) return false;
  var ITERATION_SUPPORT = false;
  try {
    var object = {};
    object[ITERATOR] = function () {
      return {
        next: function () {
          return { done: ITERATION_SUPPORT = true };
        }
      };
    };
    exec(object);
  } catch (error) { /* empty */ }
  return ITERATION_SUPPORT;
};


/***/ }),

/***/ "1d80":
/***/ (function(module, exports) {

// `RequireObjectCoercible` abstract operation
// https://tc39.github.io/ecma262/#sec-requireobjectcoercible
module.exports = function (it) {
  if (it == undefined) throw TypeError("Can't call method on " + it);
  return it;
};


/***/ }),

/***/ "1dde":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var V8_VERSION = __webpack_require__("2d00");

var SPECIES = wellKnownSymbol('species');

module.exports = function (METHOD_NAME) {
  // We can't use this feature detection in V8 since it causes
  // deoptimization and serious performance degradation
  // https://github.com/zloirock/core-js/issues/677
  return V8_VERSION >= 51 || !fails(function () {
    var array = [];
    var constructor = array.constructor = {};
    constructor[SPECIES] = function () {
      return { foo: 1 };
    };
    return array[METHOD_NAME](Boolean).foo !== 1;
  });
};


/***/ }),

/***/ "1de5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


module.exports = function (url, options) {
  if (!options) {
    // eslint-disable-next-line no-param-reassign
    options = {};
  } // eslint-disable-next-line no-underscore-dangle, no-param-reassign


  url = url && url.__esModule ? url.default : url;

  if (typeof url !== 'string') {
    return url;
  } // If url is already wrapped in quotes, remove them


  if (/^['"].*['"]$/.test(url)) {
    // eslint-disable-next-line no-param-reassign
    url = url.slice(1, -1);
  }

  if (options.hash) {
    // eslint-disable-next-line no-param-reassign
    url += options.hash;
  } // Should url be wrapped?
  // See https://drafts.csswg.org/css-values-3/#urls


  if (/["'() \t\n]/.test(url) || options.needQuotes) {
    return "\"".concat(url.replace(/"/g, '\\"').replace(/\n/g, '\\n'), "\"");
  }

  return url;
};

/***/ }),

/***/ "2037":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("f934");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("432493b5", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "23cb":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var max = Math.max;
var min = Math.min;

// Helper for a popular repeating case of the spec:
// Let integer be ? ToInteger(index).
// If integer < 0, let result be max((length + integer), 0); else let result be min(integer, length).
module.exports = function (index, length) {
  var integer = toInteger(index);
  return integer < 0 ? max(integer + length, 0) : min(integer, length);
};


/***/ }),

/***/ "23e7":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var setGlobal = __webpack_require__("ce4e");
var copyConstructorProperties = __webpack_require__("e893");
var isForced = __webpack_require__("94ca");

/*
  options.target      - name of the target object
  options.global      - target is the global object
  options.stat        - export as static methods of target
  options.proto       - export as prototype methods of target
  options.real        - real prototype method for the `pure` version
  options.forced      - export even if the native feature is available
  options.bind        - bind methods to the target, required for the `pure` version
  options.wrap        - wrap constructors to preventing global pollution, required for the `pure` version
  options.unsafe      - use the simple assignment of property instead of delete + defineProperty
  options.sham        - add a flag to not completely full polyfills
  options.enumerable  - export as enumerable property
  options.noTargetGet - prevent calling a getter on target
*/
module.exports = function (options, source) {
  var TARGET = options.target;
  var GLOBAL = options.global;
  var STATIC = options.stat;
  var FORCED, target, key, targetProperty, sourceProperty, descriptor;
  if (GLOBAL) {
    target = global;
  } else if (STATIC) {
    target = global[TARGET] || setGlobal(TARGET, {});
  } else {
    target = (global[TARGET] || {}).prototype;
  }
  if (target) for (key in source) {
    sourceProperty = source[key];
    if (options.noTargetGet) {
      descriptor = getOwnPropertyDescriptor(target, key);
      targetProperty = descriptor && descriptor.value;
    } else targetProperty = target[key];
    FORCED = isForced(GLOBAL ? key : TARGET + (STATIC ? '.' : '#') + key, options.forced);
    // contained in target
    if (!FORCED && targetProperty !== undefined) {
      if (typeof sourceProperty === typeof targetProperty) continue;
      copyConstructorProperties(sourceProperty, targetProperty);
    }
    // add a flag to not completely full polyfills
    if (options.sham || (targetProperty && targetProperty.sham)) {
      createNonEnumerableProperty(sourceProperty, 'sham', true);
    }
    // extend global
    redefine(target, key, sourceProperty, options);
  }
};


/***/ }),

/***/ "241c":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

var hiddenKeys = enumBugKeys.concat('length', 'prototype');

// `Object.getOwnPropertyNames` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertynames
exports.f = Object.getOwnPropertyNames || function getOwnPropertyNames(O) {
  return internalObjectKeys(O, hiddenKeys);
};


/***/ }),

/***/ "24d7":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".chatPage[data-v-41d80346]{margin:0 auto;position:relative;background:#fff;overflow:hidden}.chatPage .taleBox[data-v-41d80346]{height:calc(100% - 140px);min-height:100px;overflow:hidden}.chatPage .toolBox[data-v-41d80346]{height:140px;box-shadow:0 2px 4px rgba(0,0,0,.12),0 0 6px rgba(0,0,0,.04);position:relative}.chatPage .toolBox .quickList[data-v-41d80346]{transform:translateY(-100%);background:#fff;position:absolute;z-index:5}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "24fb":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
*/
// css base code, injected by the css-loader
// eslint-disable-next-line func-names
module.exports = function (useSourceMap) {
  var list = []; // return the list of modules as css string

  list.toString = function toString() {
    return this.map(function (item) {
      var content = cssWithMappingToString(item, useSourceMap);

      if (item[2]) {
        return "@media ".concat(item[2], " {").concat(content, "}");
      }

      return content;
    }).join('');
  }; // import a list of modules into the list
  // eslint-disable-next-line func-names


  list.i = function (modules, mediaQuery, dedupe) {
    if (typeof modules === 'string') {
      // eslint-disable-next-line no-param-reassign
      modules = [[null, modules, '']];
    }

    var alreadyImportedModules = {};

    if (dedupe) {
      for (var i = 0; i < this.length; i++) {
        // eslint-disable-next-line prefer-destructuring
        var id = this[i][0];

        if (id != null) {
          alreadyImportedModules[id] = true;
        }
      }
    }

    for (var _i = 0; _i < modules.length; _i++) {
      var item = [].concat(modules[_i]);

      if (dedupe && alreadyImportedModules[item[0]]) {
        // eslint-disable-next-line no-continue
        continue;
      }

      if (mediaQuery) {
        if (!item[2]) {
          item[2] = mediaQuery;
        } else {
          item[2] = "".concat(mediaQuery, " and ").concat(item[2]);
        }
      }

      list.push(item);
    }
  };

  return list;
};

function cssWithMappingToString(item, useSourceMap) {
  var content = item[1] || ''; // eslint-disable-next-line prefer-destructuring

  var cssMapping = item[3];

  if (!cssMapping) {
    return content;
  }

  if (useSourceMap && typeof btoa === 'function') {
    var sourceMapping = toComment(cssMapping);
    var sourceURLs = cssMapping.sources.map(function (source) {
      return "/*# sourceURL=".concat(cssMapping.sourceRoot || '').concat(source, " */");
    });
    return [content].concat(sourceURLs).concat([sourceMapping]).join('\n');
  }

  return [content].join('\n');
} // Adapted from convert-source-map (MIT)


function toComment(sourceMap) {
  // eslint-disable-next-line no-undef
  var base64 = btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap))));
  var data = "sourceMappingURL=data:application/json;charset=utf-8;base64,".concat(base64);
  return "/*# ".concat(data, " */");
}

/***/ }),

/***/ "2532":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var notARegExp = __webpack_require__("5a34");
var requireObjectCoercible = __webpack_require__("1d80");
var correctIsRegExpLogic = __webpack_require__("ab13");

// `String.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-string.prototype.includes
$({ target: 'String', proto: true, forced: !correctIsRegExpLogic('includes') }, {
  includes: function includes(searchString /* , position = 0 */) {
    return !!~String(requireObjectCoercible(this))
      .indexOf(notARegExp(searchString), arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "25f0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var redefine = __webpack_require__("6eeb");
var anObject = __webpack_require__("825a");
var fails = __webpack_require__("d039");
var flags = __webpack_require__("ad6d");

var TO_STRING = 'toString';
var RegExpPrototype = RegExp.prototype;
var nativeToString = RegExpPrototype[TO_STRING];

var NOT_GENERIC = fails(function () { return nativeToString.call({ source: 'a', flags: 'b' }) != '/a/b'; });
// FF44- RegExp#toString has a wrong name
var INCORRECT_NAME = nativeToString.name != TO_STRING;

// `RegExp.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-regexp.prototype.tostring
if (NOT_GENERIC || INCORRECT_NAME) {
  redefine(RegExp.prototype, TO_STRING, function toString() {
    var R = anObject(this);
    var p = String(R.source);
    var rf = R.flags;
    var f = String(rf === undefined && R instanceof RegExp && !('flags' in RegExpPrototype) ? flags.call(R) : rf);
    return '/' + p + '/' + f;
  }, { unsafe: true });
}


/***/ }),

/***/ "25f8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chatList_vue_vue_type_style_index_0_id_422b11e3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("ada3");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chatList_vue_vue_type_style_index_0_id_422b11e3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chatList_vue_vue_type_style_index_0_id_422b11e3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_chatList_vue_vue_type_style_index_0_id_422b11e3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "2626":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getBuiltIn = __webpack_require__("d066");
var definePropertyModule = __webpack_require__("9bf2");
var wellKnownSymbol = __webpack_require__("b622");
var DESCRIPTORS = __webpack_require__("83ab");

var SPECIES = wellKnownSymbol('species');

module.exports = function (CONSTRUCTOR_NAME) {
  var Constructor = getBuiltIn(CONSTRUCTOR_NAME);
  var defineProperty = definePropertyModule.f;

  if (DESCRIPTORS && Constructor && !Constructor[SPECIES]) {
    defineProperty(Constructor, SPECIES, {
      configurable: true,
      get: function () { return this; }
    });
  }
};


/***/ }),

/***/ "2b85":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".web__msg[data-v-3183498c]{padding:0 10px;height:auto;overflow:hidden}.web__msg-input[data-v-3183498c]{display:block;width:100%;height:60px;overflow-x:hidden;overflow-y:auto;box-sizing:border-box;resize:none;outline:0;background-color:#fff;border:0;word-break:break-all;font-size:13px;line-height:17px;-webkit-appearance:none}.web__msg-menu[data-v-3183498c]{text-align:right}.web__msg-submit[data-v-3183498c]{display:inline-block;outline:none;cursor:pointer;text-align:center}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "2d00":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var userAgent = __webpack_require__("342f");

var process = global.process;
var versions = process && process.versions;
var v8 = versions && versions.v8;
var match, version;

if (v8) {
  match = v8.split('.');
  version = match[0] + match[1];
} else if (userAgent) {
  match = userAgent.match(/Edge\/(\d+)/);
  if (!match || match[1] >= 74) {
    match = userAgent.match(/Chrome\/(\d+)/);
    if (match) version = match[1];
  }
}

module.exports = version && +version;


/***/ }),

/***/ "33e0":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a477b5c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("a1f7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a477b5c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a477b5c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_a477b5c4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "3410":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toObject = __webpack_require__("7b0b");
var nativeGetPrototypeOf = __webpack_require__("e163");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetPrototypeOf(1); });

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES, sham: !CORRECT_PROTOTYPE_GETTER }, {
  getPrototypeOf: function getPrototypeOf(it) {
    return nativeGetPrototypeOf(toObject(it));
  }
});



/***/ }),

/***/ "342f":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");

module.exports = getBuiltIn('navigator', 'userAgent') || '';


/***/ }),

/***/ "3452":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_41d80346_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("40d8");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_41d80346_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_41d80346_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_41d80346_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "35a1":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("f5df");
var Iterators = __webpack_require__("3f8c");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');

module.exports = function (it) {
  if (it != undefined) return it[ITERATOR]
    || it['@@iterator']
    || Iterators[classof(it)];
};


/***/ }),

/***/ "37ba":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".el-menu-demo[data-v-1c4106e7]{width:100%;height:42px;line-height:40px;display:flex;position:relative}.el-menu-demo>*[data-v-1c4106e7]{height:unset;line-height:unset;width:40%;padding:0;text-align:center;box-shadow:none}.addBtn[data-v-1c4106e7]{width:20%;position:absolute;right:0}.addBtn[data-v-1c4106e7]:focus{outline:none;text-align:center}.wrapper[data-v-1c4106e7]{padding:0;height:100%;width:0;max-width:100%;min-width:220px;margin:0 auto;text-align:left;position:relative}ul[data-v-1c4106e7]{padding:0;list-style:none;height:84%;overflow:auto}li[data-v-1c4106e7]{padding:.5rem;padding-right:0;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);margin:.2rem 0}li p[data-v-1c4106e7]{margin:0}li:hover i[data-v-1c4106e7]{display:inline-block}li i[data-v-1c4106e7]{margin:0 .05rem}i[data-v-1c4106e7]:hover{color:#409eff;cursor:pointer}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "37e8":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var anObject = __webpack_require__("825a");
var objectKeys = __webpack_require__("df75");

// `Object.defineProperties` method
// https://tc39.github.io/ecma262/#sec-object.defineproperties
module.exports = DESCRIPTORS ? Object.defineProperties : function defineProperties(O, Properties) {
  anObject(O);
  var keys = objectKeys(Properties);
  var length = keys.length;
  var index = 0;
  var key;
  while (length > index) definePropertyModule.f(O, key = keys[index++], Properties[key]);
  return O;
};


/***/ }),

/***/ "3bbe":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it) && it !== null) {
    throw TypeError("Can't set " + String(it) + ' as a prototype');
  } return it;
};


/***/ }),

/***/ "3c2a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e30f");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("31f579f4", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "3ca3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var STRING_ITERATOR = 'String Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(STRING_ITERATOR);

// `String.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-string.prototype-@@iterator
defineIterator(String, 'String', function (iterated) {
  setInternalState(this, {
    type: STRING_ITERATOR,
    string: String(iterated),
    index: 0
  });
// `%StringIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%stringiteratorprototype%.next
}, function next() {
  var state = getInternalState(this);
  var string = state.string;
  var index = state.index;
  var point;
  if (index >= string.length) return { value: undefined, done: true };
  point = charAt(string, index);
  state.index += point.length;
  return { value: point, done: false };
});


/***/ }),

/***/ "3f8c":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "40d8":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("24d7");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("75c4cbd6", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "4160":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var forEach = __webpack_require__("17c2");

// `Array.prototype.forEach` method
// https://tc39.github.io/ecma262/#sec-array.prototype.foreach
$({ target: 'Array', proto: true, forced: [].forEach != forEach }, {
  forEach: forEach
});


/***/ }),

/***/ "428f":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");

module.exports = global;


/***/ }),

/***/ "44ad":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var classof = __webpack_require__("c6b6");

var split = ''.split;

// fallback for non-array-like ES3 and non-enumerable old V8 strings
module.exports = fails(function () {
  // throws an error in rhino, see https://github.com/mozilla/rhino/issues/346
  // eslint-disable-next-line no-prototype-builtins
  return !Object('z').propertyIsEnumerable(0);
}) ? function (it) {
  return classof(it) == 'String' ? split.call(it, '') : Object(it);
} : Object;


/***/ }),

/***/ "44d2":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var create = __webpack_require__("7c73");
var definePropertyModule = __webpack_require__("9bf2");

var UNSCOPABLES = wellKnownSymbol('unscopables');
var ArrayPrototype = Array.prototype;

// Array.prototype[@@unscopables]
// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
if (ArrayPrototype[UNSCOPABLES] == undefined) {
  definePropertyModule.f(ArrayPrototype, UNSCOPABLES, {
    configurable: true,
    value: create(null)
  });
}

// add a key to Array.prototype[@@unscopables]
module.exports = function (key) {
  ArrayPrototype[UNSCOPABLES][key] = true;
};


/***/ }),

/***/ "44e7":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var classof = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

// `IsRegExp` abstract operation
// https://tc39.github.io/ecma262/#sec-isregexp
module.exports = function (it) {
  var isRegExp;
  return isObject(it) && ((isRegExp = it[MATCH]) !== undefined ? !!isRegExp : classof(it) == 'RegExp');
};


/***/ }),

/***/ "466d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toLength = __webpack_require__("50c4");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

// @@match logic
fixRegExpWellKnownSymbolLogic('match', 1, function (MATCH, nativeMatch, maybeCallNative) {
  return [
    // `String.prototype.match` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.match
    function match(regexp) {
      var O = requireObjectCoercible(this);
      var matcher = regexp == undefined ? undefined : regexp[MATCH];
      return matcher !== undefined ? matcher.call(regexp, O) : new RegExp(regexp)[MATCH](String(O));
    },
    // `RegExp.prototype[@@match]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@match
    function (regexp) {
      var res = maybeCallNative(nativeMatch, regexp, this);
      if (res.done) return res.value;

      var rx = anObject(regexp);
      var S = String(this);

      if (!rx.global) return regExpExec(rx, S);

      var fullUnicode = rx.unicode;
      rx.lastIndex = 0;
      var A = [];
      var n = 0;
      var result;
      while ((result = regExpExec(rx, S)) !== null) {
        var matchStr = String(result[0]);
        A[n] = matchStr;
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
        n++;
      }
      return n === 0 ? null : A;
    }
  ];
});


/***/ }),

/***/ "4840":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aFunction = __webpack_require__("1c0b");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `SpeciesConstructor` abstract operation
// https://tc39.github.io/ecma262/#sec-speciesconstructor
module.exports = function (O, defaultConstructor) {
  var C = anObject(O).constructor;
  var S;
  return C === undefined || (S = anObject(C)[SPECIES]) == undefined ? defaultConstructor : aFunction(S);
};


/***/ }),

/***/ "4930":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !!Object.getOwnPropertySymbols && !fails(function () {
  // Chrome 38 Symbol has incorrect toString conversion
  // eslint-disable-next-line no-undef
  return !String(Symbol());
});


/***/ }),

/***/ "498a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $trim = __webpack_require__("58a8").trim;
var forcedStringTrimMethod = __webpack_require__("c8d2");

// `String.prototype.trim` method
// https://tc39.github.io/ecma262/#sec-string.prototype.trim
$({ target: 'String', proto: true, forced: forcedStringTrimMethod('trim') }, {
  trim: function trim() {
    return $trim(this);
  }
});


/***/ }),

/***/ "499e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// EXPORTS
__webpack_require__.d(__webpack_exports__, "default", function() { return /* binding */ addStylesClient; });

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/listToStyles.js
/**
 * Translates the list format produced by css-loader into something
 * easier to manipulate.
 */
function listToStyles (parentId, list) {
  var styles = []
  var newStyles = {}
  for (var i = 0; i < list.length; i++) {
    var item = list[i]
    var id = item[0]
    var css = item[1]
    var media = item[2]
    var sourceMap = item[3]
    var part = {
      id: parentId + ':' + i,
      css: css,
      media: media,
      sourceMap: sourceMap
    }
    if (!newStyles[id]) {
      styles.push(newStyles[id] = { id: id, parts: [part] })
    } else {
      newStyles[id].parts.push(part)
    }
  }
  return styles
}

// CONCATENATED MODULE: ./node_modules/vue-style-loader/lib/addStylesClient.js
/*
  MIT License http://www.opensource.org/licenses/mit-license.php
  Author Tobias Koppers @sokra
  Modified by Evan You @yyx990803
*/



var hasDocument = typeof document !== 'undefined'

if (typeof DEBUG !== 'undefined' && DEBUG) {
  if (!hasDocument) {
    throw new Error(
    'vue-style-loader cannot be used in a non-browser environment. ' +
    "Use { target: 'node' } in your Webpack config to indicate a server-rendering environment."
  ) }
}

/*
type StyleObject = {
  id: number;
  parts: Array<StyleObjectPart>
}

type StyleObjectPart = {
  css: string;
  media: string;
  sourceMap: ?string
}
*/

var stylesInDom = {/*
  [id: number]: {
    id: number,
    refs: number,
    parts: Array<(obj?: StyleObjectPart) => void>
  }
*/}

var head = hasDocument && (document.head || document.getElementsByTagName('head')[0])
var singletonElement = null
var singletonCounter = 0
var isProduction = false
var noop = function () {}
var options = null
var ssrIdKey = 'data-vue-ssr-id'

// Force single-tag solution on IE6-9, which has a hard limit on the # of <style>
// tags it will allow on a page
var isOldIE = typeof navigator !== 'undefined' && /msie [6-9]\b/.test(navigator.userAgent.toLowerCase())

function addStylesClient (parentId, list, _isProduction, _options) {
  isProduction = _isProduction

  options = _options || {}

  var styles = listToStyles(parentId, list)
  addStylesToDom(styles)

  return function update (newList) {
    var mayRemove = []
    for (var i = 0; i < styles.length; i++) {
      var item = styles[i]
      var domStyle = stylesInDom[item.id]
      domStyle.refs--
      mayRemove.push(domStyle)
    }
    if (newList) {
      styles = listToStyles(parentId, newList)
      addStylesToDom(styles)
    } else {
      styles = []
    }
    for (var i = 0; i < mayRemove.length; i++) {
      var domStyle = mayRemove[i]
      if (domStyle.refs === 0) {
        for (var j = 0; j < domStyle.parts.length; j++) {
          domStyle.parts[j]()
        }
        delete stylesInDom[domStyle.id]
      }
    }
  }
}

function addStylesToDom (styles /* Array<StyleObject> */) {
  for (var i = 0; i < styles.length; i++) {
    var item = styles[i]
    var domStyle = stylesInDom[item.id]
    if (domStyle) {
      domStyle.refs++
      for (var j = 0; j < domStyle.parts.length; j++) {
        domStyle.parts[j](item.parts[j])
      }
      for (; j < item.parts.length; j++) {
        domStyle.parts.push(addStyle(item.parts[j]))
      }
      if (domStyle.parts.length > item.parts.length) {
        domStyle.parts.length = item.parts.length
      }
    } else {
      var parts = []
      for (var j = 0; j < item.parts.length; j++) {
        parts.push(addStyle(item.parts[j]))
      }
      stylesInDom[item.id] = { id: item.id, refs: 1, parts: parts }
    }
  }
}

function createStyleElement () {
  var styleElement = document.createElement('style')
  styleElement.type = 'text/css'
  head.appendChild(styleElement)
  return styleElement
}

function addStyle (obj /* StyleObjectPart */) {
  var update, remove
  var styleElement = document.querySelector('style[' + ssrIdKey + '~="' + obj.id + '"]')

  if (styleElement) {
    if (isProduction) {
      // has SSR styles and in production mode.
      // simply do nothing.
      return noop
    } else {
      // has SSR styles but in dev mode.
      // for some reason Chrome can't handle source map in server-rendered
      // style tags - source maps in <style> only works if the style tag is
      // created and inserted dynamically. So we remove the server rendered
      // styles and inject new ones.
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  if (isOldIE) {
    // use singleton mode for IE9.
    var styleIndex = singletonCounter++
    styleElement = singletonElement || (singletonElement = createStyleElement())
    update = applyToSingletonTag.bind(null, styleElement, styleIndex, false)
    remove = applyToSingletonTag.bind(null, styleElement, styleIndex, true)
  } else {
    // use multi-style-tag mode in all other cases
    styleElement = createStyleElement()
    update = applyToTag.bind(null, styleElement)
    remove = function () {
      styleElement.parentNode.removeChild(styleElement)
    }
  }

  update(obj)

  return function updateStyle (newObj /* StyleObjectPart */) {
    if (newObj) {
      if (newObj.css === obj.css &&
          newObj.media === obj.media &&
          newObj.sourceMap === obj.sourceMap) {
        return
      }
      update(obj = newObj)
    } else {
      remove()
    }
  }
}

var replaceText = (function () {
  var textStore = []

  return function (index, replacement) {
    textStore[index] = replacement
    return textStore.filter(Boolean).join('\n')
  }
})()

function applyToSingletonTag (styleElement, index, remove, obj) {
  var css = remove ? '' : obj.css

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = replaceText(index, css)
  } else {
    var cssNode = document.createTextNode(css)
    var childNodes = styleElement.childNodes
    if (childNodes[index]) styleElement.removeChild(childNodes[index])
    if (childNodes.length) {
      styleElement.insertBefore(cssNode, childNodes[index])
    } else {
      styleElement.appendChild(cssNode)
    }
  }
}

function applyToTag (styleElement, obj) {
  var css = obj.css
  var media = obj.media
  var sourceMap = obj.sourceMap

  if (media) {
    styleElement.setAttribute('media', media)
  }
  if (options.ssrId) {
    styleElement.setAttribute(ssrIdKey, obj.id)
  }

  if (sourceMap) {
    // https://developer.chrome.com/devtools/docs/javascript-debugging
    // this makes source maps inside style tags work properly in Chrome
    css += '\n/*# sourceURL=' + sourceMap.sources[0] + ' */'
    // http://stackoverflow.com/a/26603875
    css += '\n/*# sourceMappingURL=data:application/json;base64,' + btoa(unescape(encodeURIComponent(JSON.stringify(sourceMap)))) + ' */'
  }

  if (styleElement.styleSheet) {
    styleElement.styleSheet.cssText = css
  } else {
    while (styleElement.firstChild) {
      styleElement.removeChild(styleElement.firstChild)
    }
    styleElement.appendChild(document.createTextNode(css))
  }
}


/***/ }),

/***/ "4a6b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".userCard[data-v-303b8c24]{padding:.5rem .8rem;margin:0;background:#fff;margin:0 auto;border-radius:.7rem;text-align:left;box-shadow:0 14px 28px rgba(0,0,0,.25),0 10px 10px rgba(0,0,0,.22)}.userCard .item[data-v-303b8c24]{width:100%;line-height:1.6rem;padding:.1rem 0;display:flex}.userCard .item>*[data-v-303b8c24]{display:inline-block}.cover[data-v-303b8c24]{width:50px}.icon[data-v-303b8c24]{width:1.2rem}.label[data-v-303b8c24]{width:5rem;text-align:left;opacity:.7}.content[data-v-303b8c24]{padding-left:.4rem}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "4ae1":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var getBuiltIn = __webpack_require__("d066");
var aFunction = __webpack_require__("1c0b");
var anObject = __webpack_require__("825a");
var isObject = __webpack_require__("861d");
var create = __webpack_require__("7c73");
var bind = __webpack_require__("0538");
var fails = __webpack_require__("d039");

var nativeConstruct = getBuiltIn('Reflect', 'construct');

// `Reflect.construct` method
// https://tc39.github.io/ecma262/#sec-reflect.construct
// MS Edge supports only 2 arguments and argumentsList argument is optional
// FF Nightly sets third argument as `new.target`, but does not create `this` from it
var NEW_TARGET_BUG = fails(function () {
  function F() { /* empty */ }
  return !(nativeConstruct(function () { /* empty */ }, [], F) instanceof F);
});
var ARGS_BUG = !fails(function () {
  nativeConstruct(function () { /* empty */ });
});
var FORCED = NEW_TARGET_BUG || ARGS_BUG;

$({ target: 'Reflect', stat: true, forced: FORCED, sham: FORCED }, {
  construct: function construct(Target, args /* , newTarget */) {
    aFunction(Target);
    anObject(args);
    var newTarget = arguments.length < 3 ? Target : aFunction(arguments[2]);
    if (ARGS_BUG && !NEW_TARGET_BUG) return nativeConstruct(Target, args, newTarget);
    if (Target == newTarget) {
      // w/o altered newTarget, optimization for 0-4 arguments
      switch (args.length) {
        case 0: return new Target();
        case 1: return new Target(args[0]);
        case 2: return new Target(args[0], args[1]);
        case 3: return new Target(args[0], args[1], args[2]);
        case 4: return new Target(args[0], args[1], args[2], args[3]);
      }
      // w/o altered newTarget, lot of arguments case
      var $args = [null];
      $args.push.apply($args, args);
      return new (bind.apply(Target, $args))();
    }
    // with altered newTarget, not support built-in constructors
    var proto = newTarget.prototype;
    var instance = create(isObject(proto) ? proto : Object.prototype);
    var result = Function.apply.call(Target, instance, args);
    return isObject(result) ? result : instance;
  }
});


/***/ }),

/***/ "4d63":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var inheritIfRequired = __webpack_require__("7156");
var defineProperty = __webpack_require__("9bf2").f;
var getOwnPropertyNames = __webpack_require__("241c").f;
var isRegExp = __webpack_require__("44e7");
var getFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var setInternalState = __webpack_require__("69f3").set;
var setSpecies = __webpack_require__("2626");
var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');
var NativeRegExp = global.RegExp;
var RegExpPrototype = NativeRegExp.prototype;
var re1 = /a/g;
var re2 = /a/g;

// "new" should create a new object, old webkit bug
var CORRECT_NEW = new NativeRegExp(re1) !== re1;

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y;

var FORCED = DESCRIPTORS && isForced('RegExp', (!CORRECT_NEW || UNSUPPORTED_Y || fails(function () {
  re2[MATCH] = false;
  // RegExp constructor can alter flags and IsRegExp works correct with @@match
  return NativeRegExp(re1) != re1 || NativeRegExp(re2) == re2 || NativeRegExp(re1, 'i') != '/a/i';
})));

// `RegExp` constructor
// https://tc39.github.io/ecma262/#sec-regexp-constructor
if (FORCED) {
  var RegExpWrapper = function RegExp(pattern, flags) {
    var thisIsRegExp = this instanceof RegExpWrapper;
    var patternIsRegExp = isRegExp(pattern);
    var flagsAreUndefined = flags === undefined;
    var sticky;

    if (!thisIsRegExp && patternIsRegExp && pattern.constructor === RegExpWrapper && flagsAreUndefined) {
      return pattern;
    }

    if (CORRECT_NEW) {
      if (patternIsRegExp && !flagsAreUndefined) pattern = pattern.source;
    } else if (pattern instanceof RegExpWrapper) {
      if (flagsAreUndefined) flags = getFlags.call(pattern);
      pattern = pattern.source;
    }

    if (UNSUPPORTED_Y) {
      sticky = !!flags && flags.indexOf('y') > -1;
      if (sticky) flags = flags.replace(/y/g, '');
    }

    var result = inheritIfRequired(
      CORRECT_NEW ? new NativeRegExp(pattern, flags) : NativeRegExp(pattern, flags),
      thisIsRegExp ? this : RegExpPrototype,
      RegExpWrapper
    );

    if (UNSUPPORTED_Y && sticky) setInternalState(result, { sticky: sticky });

    return result;
  };
  var proxy = function (key) {
    key in RegExpWrapper || defineProperty(RegExpWrapper, key, {
      configurable: true,
      get: function () { return NativeRegExp[key]; },
      set: function (it) { NativeRegExp[key] = it; }
    });
  };
  var keys = getOwnPropertyNames(NativeRegExp);
  var index = 0;
  while (keys.length > index) proxy(keys[index++]);
  RegExpPrototype.constructor = RegExpWrapper;
  RegExpWrapper.prototype = RegExpPrototype;
  redefine(global, 'RegExp', RegExpWrapper);
}

// https://tc39.github.io/ecma262/#sec-get-regexp-@@species
setSpecies('RegExp');


/***/ }),

/***/ "4d64":
/***/ (function(module, exports, __webpack_require__) {

var toIndexedObject = __webpack_require__("fc6a");
var toLength = __webpack_require__("50c4");
var toAbsoluteIndex = __webpack_require__("23cb");

// `Array.prototype.{ indexOf, includes }` methods implementation
var createMethod = function (IS_INCLUDES) {
  return function ($this, el, fromIndex) {
    var O = toIndexedObject($this);
    var length = toLength(O.length);
    var index = toAbsoluteIndex(fromIndex, length);
    var value;
    // Array#includes uses SameValueZero equality algorithm
    // eslint-disable-next-line no-self-compare
    if (IS_INCLUDES && el != el) while (length > index) {
      value = O[index++];
      // eslint-disable-next-line no-self-compare
      if (value != value) return true;
    // Array#indexOf ignores holes, Array#includes - not
    } else for (;length > index; index++) {
      if ((IS_INCLUDES || index in O) && O[index] === el) return IS_INCLUDES || index || 0;
    } return !IS_INCLUDES && -1;
  };
};

module.exports = {
  // `Array.prototype.includes` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.includes
  includes: createMethod(true),
  // `Array.prototype.indexOf` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.indexof
  indexOf: createMethod(false)
};


/***/ }),

/***/ "4de4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $filter = __webpack_require__("b727").filter;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('filter');
// Edge 14- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('filter');

// `Array.prototype.filter` method
// https://tc39.github.io/ecma262/#sec-array.prototype.filter
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  filter: function filter(callbackfn /* , thisArg */) {
    return $filter(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "4df4":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var bind = __webpack_require__("0366");
var toObject = __webpack_require__("7b0b");
var callWithSafeIterationClosing = __webpack_require__("9bdd");
var isArrayIteratorMethod = __webpack_require__("e95a");
var toLength = __webpack_require__("50c4");
var createProperty = __webpack_require__("8418");
var getIteratorMethod = __webpack_require__("35a1");

// `Array.from` method implementation
// https://tc39.github.io/ecma262/#sec-array.from
module.exports = function from(arrayLike /* , mapfn = undefined, thisArg = undefined */) {
  var O = toObject(arrayLike);
  var C = typeof this == 'function' ? this : Array;
  var argumentsLength = arguments.length;
  var mapfn = argumentsLength > 1 ? arguments[1] : undefined;
  var mapping = mapfn !== undefined;
  var iteratorMethod = getIteratorMethod(O);
  var index = 0;
  var length, result, step, iterator, next, value;
  if (mapping) mapfn = bind(mapfn, argumentsLength > 2 ? arguments[2] : undefined, 2);
  // if the target is not iterable or it's an array with the default iterator - use a simple case
  if (iteratorMethod != undefined && !(C == Array && isArrayIteratorMethod(iteratorMethod))) {
    iterator = iteratorMethod.call(O);
    next = iterator.next;
    result = new C();
    for (;!(step = next.call(iterator)).done; index++) {
      value = mapping ? callWithSafeIterationClosing(iterator, mapfn, [step.value, index], true) : step.value;
      createProperty(result, index, value);
    }
  } else {
    length = toLength(O.length);
    result = new C(length);
    for (;length > index; index++) {
      value = mapping ? mapfn(O[index], index) : O[index];
      createProperty(result, index, value);
    }
  }
  result.length = index;
  return result;
};


/***/ }),

/***/ "50c4":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");

var min = Math.min;

// `ToLength` abstract operation
// https://tc39.github.io/ecma262/#sec-tolength
module.exports = function (argument) {
  return argument > 0 ? min(toInteger(argument), 0x1FFFFFFFFFFFFF) : 0; // 2 ** 53 - 1 == 9007199254740991
};


/***/ }),

/***/ "5135":
/***/ (function(module, exports) {

var hasOwnProperty = {}.hasOwnProperty;

module.exports = function (it, key) {
  return hasOwnProperty.call(it, key);
};


/***/ }),

/***/ "5319":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fixRegExpWellKnownSymbolLogic = __webpack_require__("d784");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");
var advanceStringIndex = __webpack_require__("8aa5");
var regExpExec = __webpack_require__("14c3");

var max = Math.max;
var min = Math.min;
var floor = Math.floor;
var SUBSTITUTION_SYMBOLS = /\$([$&'`]|\d\d?|<[^>]*>)/g;
var SUBSTITUTION_SYMBOLS_NO_NAMED = /\$([$&'`]|\d\d?)/g;

var maybeToString = function (it) {
  return it === undefined ? it : String(it);
};

// @@replace logic
fixRegExpWellKnownSymbolLogic('replace', 2, function (REPLACE, nativeReplace, maybeCallNative, reason) {
  var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = reason.REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE;
  var REPLACE_KEEPS_$0 = reason.REPLACE_KEEPS_$0;
  var UNSAFE_SUBSTITUTE = REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE ? '$' : '$0';

  return [
    // `String.prototype.replace` method
    // https://tc39.github.io/ecma262/#sec-string.prototype.replace
    function replace(searchValue, replaceValue) {
      var O = requireObjectCoercible(this);
      var replacer = searchValue == undefined ? undefined : searchValue[REPLACE];
      return replacer !== undefined
        ? replacer.call(searchValue, O, replaceValue)
        : nativeReplace.call(String(O), searchValue, replaceValue);
    },
    // `RegExp.prototype[@@replace]` method
    // https://tc39.github.io/ecma262/#sec-regexp.prototype-@@replace
    function (regexp, replaceValue) {
      if (
        (!REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE && REPLACE_KEEPS_$0) ||
        (typeof replaceValue === 'string' && replaceValue.indexOf(UNSAFE_SUBSTITUTE) === -1)
      ) {
        var res = maybeCallNative(nativeReplace, regexp, this, replaceValue);
        if (res.done) return res.value;
      }

      var rx = anObject(regexp);
      var S = String(this);

      var functionalReplace = typeof replaceValue === 'function';
      if (!functionalReplace) replaceValue = String(replaceValue);

      var global = rx.global;
      if (global) {
        var fullUnicode = rx.unicode;
        rx.lastIndex = 0;
      }
      var results = [];
      while (true) {
        var result = regExpExec(rx, S);
        if (result === null) break;

        results.push(result);
        if (!global) break;

        var matchStr = String(result[0]);
        if (matchStr === '') rx.lastIndex = advanceStringIndex(S, toLength(rx.lastIndex), fullUnicode);
      }

      var accumulatedResult = '';
      var nextSourcePosition = 0;
      for (var i = 0; i < results.length; i++) {
        result = results[i];

        var matched = String(result[0]);
        var position = max(min(toInteger(result.index), S.length), 0);
        var captures = [];
        // NOTE: This is equivalent to
        //   captures = result.slice(1).map(maybeToString)
        // but for some reason `nativeSlice.call(result, 1, result.length)` (called in
        // the slice polyfill when slicing native arrays) "doesn't work" in safari 9 and
        // causes a crash (https://pastebin.com/N21QzeQA) when trying to debug it.
        for (var j = 1; j < result.length; j++) captures.push(maybeToString(result[j]));
        var namedCaptures = result.groups;
        if (functionalReplace) {
          var replacerArgs = [matched].concat(captures, position, S);
          if (namedCaptures !== undefined) replacerArgs.push(namedCaptures);
          var replacement = String(replaceValue.apply(undefined, replacerArgs));
        } else {
          replacement = getSubstitution(matched, S, position, captures, namedCaptures, replaceValue);
        }
        if (position >= nextSourcePosition) {
          accumulatedResult += S.slice(nextSourcePosition, position) + replacement;
          nextSourcePosition = position + matched.length;
        }
      }
      return accumulatedResult + S.slice(nextSourcePosition);
    }
  ];

  // https://tc39.github.io/ecma262/#sec-getsubstitution
  function getSubstitution(matched, str, position, captures, namedCaptures, replacement) {
    var tailPos = position + matched.length;
    var m = captures.length;
    var symbols = SUBSTITUTION_SYMBOLS_NO_NAMED;
    if (namedCaptures !== undefined) {
      namedCaptures = toObject(namedCaptures);
      symbols = SUBSTITUTION_SYMBOLS;
    }
    return nativeReplace.call(replacement, symbols, function (match, ch) {
      var capture;
      switch (ch.charAt(0)) {
        case '$': return '$';
        case '&': return matched;
        case '`': return str.slice(0, position);
        case "'": return str.slice(tailPos);
        case '<':
          capture = namedCaptures[ch.slice(1, -1)];
          break;
        default: // \d\d?
          var n = +ch;
          if (n === 0) return match;
          if (n > m) {
            var f = floor(n / 10);
            if (f === 0) return match;
            if (f <= m) return captures[f - 1] === undefined ? ch.charAt(1) : captures[f - 1] + ch.charAt(1);
            return match;
          }
          capture = captures[n - 1];
      }
      return capture === undefined ? '' : capture;
    });
  }
});


/***/ }),

/***/ "558e":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cf286f3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("3c2a");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cf286f3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cf286f3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_6cf286f3_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "5692":
/***/ (function(module, exports, __webpack_require__) {

var IS_PURE = __webpack_require__("c430");
var store = __webpack_require__("c6cd");

(module.exports = function (key, value) {
  return store[key] || (store[key] = value !== undefined ? value : {});
})('versions', []).push({
  version: '3.6.5',
  mode: IS_PURE ? 'pure' : 'global',
  copyright: '© 2020 Denis Pushkarev (zloirock.ru)'
});


/***/ }),

/***/ "56ef":
/***/ (function(module, exports, __webpack_require__) {

var getBuiltIn = __webpack_require__("d066");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var anObject = __webpack_require__("825a");

// all object keys, includes non-enumerable and symbols
module.exports = getBuiltIn('Reflect', 'ownKeys') || function ownKeys(it) {
  var keys = getOwnPropertyNamesModule.f(anObject(it));
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  return getOwnPropertySymbols ? keys.concat(getOwnPropertySymbols(it)) : keys;
};


/***/ }),

/***/ "5740":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tools_vue_vue_type_style_index_0_id_252ec5ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("2037");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tools_vue_vue_type_style_index_0_id_252ec5ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tools_vue_vue_type_style_index_0_id_252ec5ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_tools_vue_vue_type_style_index_0_id_252ec5ee_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "578b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".login-container .el-input[data-v-0cd7acd4]{display:inline-block;height:47px;width:85%}.login-container .el-input[data-v-0cd7acd4] input{background:transparent!important;border:0;-webkit-appearance:none;border-radius:0;padding:12px 5px 12px 15px;color:#fff;height:47px;caret-color:#fff}.login-container .el-input[data-v-0cd7acd4] input:-webkit-autofill{box-shadow:inset 0 0 0 1000px #283443!important;-webkit-text-fill-color:#fff!important}.login-container .el-form-item[data-v-0cd7acd4]{border:1px solid hsla(0,0%,100%,.1);background:rgba(0,0,0,.1);border-radius:5px;color:#454545}.login-container[data-v-0cd7acd4]{background:#2d3a4b;margin:0 auto;padding:1rem 0;position:relative;width:100%;height:100%;border-radius:.5rem}.login-container .login-form[data-v-0cd7acd4]{position:absolute;width:520px;top:50%;left:50%;transform:translate(-50%,-50%)}.login-container .svg-container[data-v-0cd7acd4]{padding:6px 5px 6px 15px;color:#889aa4;vertical-align:middle;width:30px;display:inline-block}.login-container .show-pwd[data-v-0cd7acd4]{position:absolute;right:10px;top:7px;font-size:16px;color:#889aa4;cursor:pointer;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "5798":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0cd7acd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("bdf7");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0cd7acd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0cd7acd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_0cd7acd4_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "57b0":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/iconfont.e33f2472.ttf";

/***/ }),

/***/ "5899":
/***/ (function(module, exports) {

// a string of all valid unicode whitespaces
// eslint-disable-next-line max-len
module.exports = '\u0009\u000A\u000B\u000C\u000D\u0020\u00A0\u1680\u2000\u2001\u2002\u2003\u2004\u2005\u2006\u2007\u2008\u2009\u200A\u202F\u205F\u3000\u2028\u2029\uFEFF';


/***/ }),

/***/ "58a8":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");
var whitespaces = __webpack_require__("5899");

var whitespace = '[' + whitespaces + ']';
var ltrim = RegExp('^' + whitespace + whitespace + '*');
var rtrim = RegExp(whitespace + whitespace + '*$');

// `String.prototype.{ trim, trimStart, trimEnd, trimLeft, trimRight }` methods implementation
var createMethod = function (TYPE) {
  return function ($this) {
    var string = String(requireObjectCoercible($this));
    if (TYPE & 1) string = string.replace(ltrim, '');
    if (TYPE & 2) string = string.replace(rtrim, '');
    return string;
  };
};

module.exports = {
  // `String.prototype.{ trimLeft, trimStart }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimstart
  start: createMethod(1),
  // `String.prototype.{ trimRight, trimEnd }` methods
  // https://tc39.github.io/ecma262/#sec-string.prototype.trimend
  end: createMethod(2),
  // `String.prototype.trim` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.trim
  trim: createMethod(3)
};


/***/ }),

/***/ "5a34":
/***/ (function(module, exports, __webpack_require__) {

var isRegExp = __webpack_require__("44e7");

module.exports = function (it) {
  if (isRegExp(it)) {
    throw TypeError("The method doesn't accept regular expressions");
  } return it;
};


/***/ }),

/***/ "5c6c":
/***/ (function(module, exports) {

module.exports = function (bitmap, value) {
  return {
    enumerable: !(bitmap & 1),
    configurable: !(bitmap & 2),
    writable: !(bitmap & 4),
    value: value
  };
};


/***/ }),

/***/ "5dda":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_303b8c24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8112");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_303b8c24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_303b8c24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_1_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_303b8c24_scoped_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "60da":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var objectKeys = __webpack_require__("df75");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var toObject = __webpack_require__("7b0b");
var IndexedObject = __webpack_require__("44ad");

var nativeAssign = Object.assign;
var defineProperty = Object.defineProperty;

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
module.exports = !nativeAssign || fails(function () {
  // should have correct order of operations (Edge bug)
  if (DESCRIPTORS && nativeAssign({ b: 1 }, nativeAssign(defineProperty({}, 'a', {
    enumerable: true,
    get: function () {
      defineProperty(this, 'b', {
        value: 3,
        enumerable: false
      });
    }
  }), { b: 2 })).b !== 1) return true;
  // should work with symbols and should have deterministic property order (V8 bug)
  var A = {};
  var B = {};
  // eslint-disable-next-line no-undef
  var symbol = Symbol();
  var alphabet = 'abcdefghijklmnopqrst';
  A[symbol] = 7;
  alphabet.split('').forEach(function (chr) { B[chr] = chr; });
  return nativeAssign({}, A)[symbol] != 7 || objectKeys(nativeAssign({}, B)).join('') != alphabet;
}) ? function assign(target, source) { // eslint-disable-line no-unused-vars
  var T = toObject(target);
  var argumentsLength = arguments.length;
  var index = 1;
  var getOwnPropertySymbols = getOwnPropertySymbolsModule.f;
  var propertyIsEnumerable = propertyIsEnumerableModule.f;
  while (argumentsLength > index) {
    var S = IndexedObject(arguments[index++]);
    var keys = getOwnPropertySymbols ? objectKeys(S).concat(getOwnPropertySymbols(S)) : objectKeys(S);
    var length = keys.length;
    var j = 0;
    var key;
    while (length > j) {
      key = keys[j++];
      if (!DESCRIPTORS || propertyIsEnumerable.call(S, key)) T[key] = S[key];
    }
  } return T;
} : nativeAssign;


/***/ }),

/***/ "6326":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/iconfont.a6b9ab8a.woff";

/***/ }),

/***/ "6547":
/***/ (function(module, exports, __webpack_require__) {

var toInteger = __webpack_require__("a691");
var requireObjectCoercible = __webpack_require__("1d80");

// `String.prototype.{ codePointAt, at }` methods implementation
var createMethod = function (CONVERT_TO_STRING) {
  return function ($this, pos) {
    var S = String(requireObjectCoercible($this));
    var position = toInteger(pos);
    var size = S.length;
    var first, second;
    if (position < 0 || position >= size) return CONVERT_TO_STRING ? '' : undefined;
    first = S.charCodeAt(position);
    return first < 0xD800 || first > 0xDBFF || position + 1 === size
      || (second = S.charCodeAt(position + 1)) < 0xDC00 || second > 0xDFFF
        ? CONVERT_TO_STRING ? S.charAt(position) : first
        : CONVERT_TO_STRING ? S.slice(position, position + 2) : (first - 0xD800 << 10) + (second - 0xDC00) + 0x10000;
  };
};

module.exports = {
  // `String.prototype.codePointAt` method
  // https://tc39.github.io/ecma262/#sec-string.prototype.codepointat
  codeAt: createMethod(false),
  // `String.prototype.at` method
  // https://github.com/mathiasbynens/String.prototype.at
  charAt: createMethod(true)
};


/***/ }),

/***/ "654f":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e225");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("f5364a82", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "65f0":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var wellKnownSymbol = __webpack_require__("b622");

var SPECIES = wellKnownSymbol('species');

// `ArraySpeciesCreate` abstract operation
// https://tc39.github.io/ecma262/#sec-arrayspeciescreate
module.exports = function (originalArray, length) {
  var C;
  if (isArray(originalArray)) {
    C = originalArray.constructor;
    // cross-realm fallback
    if (typeof C == 'function' && (C === Array || isArray(C.prototype))) C = undefined;
    else if (isObject(C)) {
      C = C[SPECIES];
      if (C === null) C = undefined;
    }
  } return new (C === undefined ? Array : C)(length === 0 ? 0 : length);
};


/***/ }),

/***/ "6834":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_enterBox_vue_vue_type_style_index_0_id_3183498c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("db93");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_enterBox_vue_vue_type_style_index_0_id_3183498c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_enterBox_vue_vue_type_style_index_0_id_3183498c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_enterBox_vue_vue_type_style_index_0_id_3183498c_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "69f3":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_WEAK_MAP = __webpack_require__("7f9a");
var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");
var createNonEnumerableProperty = __webpack_require__("9112");
var objectHas = __webpack_require__("5135");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");

var WeakMap = global.WeakMap;
var set, get, has;

var enforce = function (it) {
  return has(it) ? get(it) : set(it, {});
};

var getterFor = function (TYPE) {
  return function (it) {
    var state;
    if (!isObject(it) || (state = get(it)).type !== TYPE) {
      throw TypeError('Incompatible receiver, ' + TYPE + ' required');
    } return state;
  };
};

if (NATIVE_WEAK_MAP) {
  var store = new WeakMap();
  var wmget = store.get;
  var wmhas = store.has;
  var wmset = store.set;
  set = function (it, metadata) {
    wmset.call(store, it, metadata);
    return metadata;
  };
  get = function (it) {
    return wmget.call(store, it) || {};
  };
  has = function (it) {
    return wmhas.call(store, it);
  };
} else {
  var STATE = sharedKey('state');
  hiddenKeys[STATE] = true;
  set = function (it, metadata) {
    createNonEnumerableProperty(it, STATE, metadata);
    return metadata;
  };
  get = function (it) {
    return objectHas(it, STATE) ? it[STATE] : {};
  };
  has = function (it) {
    return objectHas(it, STATE);
  };
}

module.exports = {
  set: set,
  get: get,
  has: has,
  enforce: enforce,
  getterFor: getterFor
};


/***/ }),

/***/ "6de8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_244b2bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("654f");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_244b2bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_244b2bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_244b2bce_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "6eeb":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var setGlobal = __webpack_require__("ce4e");
var inspectSource = __webpack_require__("8925");
var InternalStateModule = __webpack_require__("69f3");

var getInternalState = InternalStateModule.get;
var enforceInternalState = InternalStateModule.enforce;
var TEMPLATE = String(String).split('String');

(module.exports = function (O, key, value, options) {
  var unsafe = options ? !!options.unsafe : false;
  var simple = options ? !!options.enumerable : false;
  var noTargetGet = options ? !!options.noTargetGet : false;
  if (typeof value == 'function') {
    if (typeof key == 'string' && !has(value, 'name')) createNonEnumerableProperty(value, 'name', key);
    enforceInternalState(value).source = TEMPLATE.join(typeof key == 'string' ? key : '');
  }
  if (O === global) {
    if (simple) O[key] = value;
    else setGlobal(key, value);
    return;
  } else if (!unsafe) {
    delete O[key];
  } else if (!noTargetGet && O[key]) {
    simple = true;
  }
  if (simple) O[key] = value;
  else createNonEnumerableProperty(O, key, value);
// add fake Function#toString for correct work wrapped methods / constructors with methods like LoDash isNative
})(Function.prototype, 'toString', function toString() {
  return typeof this == 'function' && getInternalState(this).source || inspectSource(this);
});


/***/ }),

/***/ "7156":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");
var setPrototypeOf = __webpack_require__("d2bb");

// makes subclassing work correct for wrapped built-ins
module.exports = function ($this, dummy, Wrapper) {
  var NewTarget, NewTargetPrototype;
  if (
    // it can work only with native `setPrototypeOf`
    setPrototypeOf &&
    // we haven't completely correct pre-ES6 way for getting `new.target`, so use this
    typeof (NewTarget = dummy.constructor) == 'function' &&
    NewTarget !== Wrapper &&
    isObject(NewTargetPrototype = NewTarget.prototype) &&
    NewTargetPrototype !== Wrapper.prototype
  ) setPrototypeOf($this, NewTargetPrototype);
  return $this;
};


/***/ }),

/***/ "7418":
/***/ (function(module, exports) {

exports.f = Object.getOwnPropertySymbols;


/***/ }),

/***/ "746f":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var has = __webpack_require__("5135");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineProperty = __webpack_require__("9bf2").f;

module.exports = function (NAME) {
  var Symbol = path.Symbol || (path.Symbol = {});
  if (!has(Symbol, NAME)) defineProperty(Symbol, NAME, {
    value: wrappedWellKnownSymbolModule.f(NAME)
  });
};


/***/ }),

/***/ "7839":
/***/ (function(module, exports) {

// IE8- don't enum bug keys
module.exports = [
  'constructor',
  'hasOwnProperty',
  'isPrototypeOf',
  'propertyIsEnumerable',
  'toLocaleString',
  'toString',
  'valueOf'
];


/***/ }),

/***/ "7b0b":
/***/ (function(module, exports, __webpack_require__) {

var requireObjectCoercible = __webpack_require__("1d80");

// `ToObject` abstract operation
// https://tc39.github.io/ecma262/#sec-toobject
module.exports = function (argument) {
  return Object(requireObjectCoercible(argument));
};


/***/ }),

/***/ "7b57":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_0_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_0_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_module_true_lang_css___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("84e1");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_6_oneOf_0_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_0_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_module_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_6_oneOf_0_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_0_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_module_true_lang_css___WEBPACK_IMPORTED_MODULE_0__);
 /* harmony default export */ __webpack_exports__["default"] = (_node_modules_vue_style_loader_index_js_ref_6_oneOf_0_0_node_modules_css_loader_dist_cjs_js_ref_6_oneOf_0_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_2_node_modules_postcss_loader_src_index_js_ref_6_oneOf_0_3_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_module_true_lang_css___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7c73":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var defineProperties = __webpack_require__("37e8");
var enumBugKeys = __webpack_require__("7839");
var hiddenKeys = __webpack_require__("d012");
var html = __webpack_require__("1be4");
var documentCreateElement = __webpack_require__("cc12");
var sharedKey = __webpack_require__("f772");

var GT = '>';
var LT = '<';
var PROTOTYPE = 'prototype';
var SCRIPT = 'script';
var IE_PROTO = sharedKey('IE_PROTO');

var EmptyConstructor = function () { /* empty */ };

var scriptTag = function (content) {
  return LT + SCRIPT + GT + content + LT + '/' + SCRIPT + GT;
};

// Create object with fake `null` prototype: use ActiveX Object with cleared prototype
var NullProtoObjectViaActiveX = function (activeXDocument) {
  activeXDocument.write(scriptTag(''));
  activeXDocument.close();
  var temp = activeXDocument.parentWindow.Object;
  activeXDocument = null; // avoid memory leak
  return temp;
};

// Create object with fake `null` prototype: use iframe Object with cleared prototype
var NullProtoObjectViaIFrame = function () {
  // Thrash, waste and sodomy: IE GC bug
  var iframe = documentCreateElement('iframe');
  var JS = 'java' + SCRIPT + ':';
  var iframeDocument;
  iframe.style.display = 'none';
  html.appendChild(iframe);
  // https://github.com/zloirock/core-js/issues/475
  iframe.src = String(JS);
  iframeDocument = iframe.contentWindow.document;
  iframeDocument.open();
  iframeDocument.write(scriptTag('document.F=Object'));
  iframeDocument.close();
  return iframeDocument.F;
};

// Check for document.domain and active x support
// No need to use active x approach when document.domain is not set
// see https://github.com/es-shims/es5-shim/issues/150
// variation of https://github.com/kitcambridge/es5-shim/commit/4f738ac066346
// avoid IE GC bug
var activeXDocument;
var NullProtoObject = function () {
  try {
    /* global ActiveXObject */
    activeXDocument = document.domain && new ActiveXObject('htmlfile');
  } catch (error) { /* ignore */ }
  NullProtoObject = activeXDocument ? NullProtoObjectViaActiveX(activeXDocument) : NullProtoObjectViaIFrame();
  var length = enumBugKeys.length;
  while (length--) delete NullProtoObject[PROTOTYPE][enumBugKeys[length]];
  return NullProtoObject();
};

hiddenKeys[IE_PROTO] = true;

// `Object.create` method
// https://tc39.github.io/ecma262/#sec-object.create
module.exports = Object.create || function create(O, Properties) {
  var result;
  if (O !== null) {
    EmptyConstructor[PROTOTYPE] = anObject(O);
    result = new EmptyConstructor();
    EmptyConstructor[PROTOTYPE] = null;
    // add "__proto__" for Object.getPrototypeOf polyfill
    result[IE_PROTO] = O;
  } else result = NullProtoObject();
  return Properties === undefined ? result : defineProperties(result, Properties);
};


/***/ }),

/***/ "7dd0":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var createIteratorConstructor = __webpack_require__("9ed3");
var getPrototypeOf = __webpack_require__("e163");
var setPrototypeOf = __webpack_require__("d2bb");
var setToStringTag = __webpack_require__("d44e");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");
var Iterators = __webpack_require__("3f8c");
var IteratorsCore = __webpack_require__("ae93");

var IteratorPrototype = IteratorsCore.IteratorPrototype;
var BUGGY_SAFARI_ITERATORS = IteratorsCore.BUGGY_SAFARI_ITERATORS;
var ITERATOR = wellKnownSymbol('iterator');
var KEYS = 'keys';
var VALUES = 'values';
var ENTRIES = 'entries';

var returnThis = function () { return this; };

module.exports = function (Iterable, NAME, IteratorConstructor, next, DEFAULT, IS_SET, FORCED) {
  createIteratorConstructor(IteratorConstructor, NAME, next);

  var getIterationMethod = function (KIND) {
    if (KIND === DEFAULT && defaultIterator) return defaultIterator;
    if (!BUGGY_SAFARI_ITERATORS && KIND in IterablePrototype) return IterablePrototype[KIND];
    switch (KIND) {
      case KEYS: return function keys() { return new IteratorConstructor(this, KIND); };
      case VALUES: return function values() { return new IteratorConstructor(this, KIND); };
      case ENTRIES: return function entries() { return new IteratorConstructor(this, KIND); };
    } return function () { return new IteratorConstructor(this); };
  };

  var TO_STRING_TAG = NAME + ' Iterator';
  var INCORRECT_VALUES_NAME = false;
  var IterablePrototype = Iterable.prototype;
  var nativeIterator = IterablePrototype[ITERATOR]
    || IterablePrototype['@@iterator']
    || DEFAULT && IterablePrototype[DEFAULT];
  var defaultIterator = !BUGGY_SAFARI_ITERATORS && nativeIterator || getIterationMethod(DEFAULT);
  var anyNativeIterator = NAME == 'Array' ? IterablePrototype.entries || nativeIterator : nativeIterator;
  var CurrentIteratorPrototype, methods, KEY;

  // fix native
  if (anyNativeIterator) {
    CurrentIteratorPrototype = getPrototypeOf(anyNativeIterator.call(new Iterable()));
    if (IteratorPrototype !== Object.prototype && CurrentIteratorPrototype.next) {
      if (!IS_PURE && getPrototypeOf(CurrentIteratorPrototype) !== IteratorPrototype) {
        if (setPrototypeOf) {
          setPrototypeOf(CurrentIteratorPrototype, IteratorPrototype);
        } else if (typeof CurrentIteratorPrototype[ITERATOR] != 'function') {
          createNonEnumerableProperty(CurrentIteratorPrototype, ITERATOR, returnThis);
        }
      }
      // Set @@toStringTag to native iterators
      setToStringTag(CurrentIteratorPrototype, TO_STRING_TAG, true, true);
      if (IS_PURE) Iterators[TO_STRING_TAG] = returnThis;
    }
  }

  // fix Array#{values, @@iterator}.name in V8 / FF
  if (DEFAULT == VALUES && nativeIterator && nativeIterator.name !== VALUES) {
    INCORRECT_VALUES_NAME = true;
    defaultIterator = function values() { return nativeIterator.call(this); };
  }

  // define iterator
  if ((!IS_PURE || FORCED) && IterablePrototype[ITERATOR] !== defaultIterator) {
    createNonEnumerableProperty(IterablePrototype, ITERATOR, defaultIterator);
  }
  Iterators[NAME] = defaultIterator;

  // export additional methods
  if (DEFAULT) {
    methods = {
      values: getIterationMethod(VALUES),
      keys: IS_SET ? defaultIterator : getIterationMethod(KEYS),
      entries: getIterationMethod(ENTRIES)
    };
    if (FORCED) for (KEY in methods) {
      if (BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME || !(KEY in IterablePrototype)) {
        redefine(IterablePrototype, KEY, methods[KEY]);
      }
    } else $({ target: NAME, proto: true, forced: BUGGY_SAFARI_ITERATORS || INCORRECT_VALUES_NAME }, methods);
  }

  return methods;
};


/***/ }),

/***/ "7dfa":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_561fedf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("cea2");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_561fedf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_561fedf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_561fedf6_scoped_true_lang_scss___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "7f9a":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var inspectSource = __webpack_require__("8925");

var WeakMap = global.WeakMap;

module.exports = typeof WeakMap === 'function' && /native code/.test(inspectSource(WeakMap));


/***/ }),

/***/ "8112":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("4a6b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("195d0bc2", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "825a":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

module.exports = function (it) {
  if (!isObject(it)) {
    throw TypeError(String(it) + ' is not an object');
  } return it;
};


/***/ }),

/***/ "83ab":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

// Thank's IE8 for his funny defineProperty
module.exports = !fails(function () {
  return Object.defineProperty({}, 1, { get: function () { return 7; } })[1] != 7;
});


/***/ }),

/***/ "8418":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toPrimitive = __webpack_require__("c04e");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = function (object, key, value) {
  var propertyKey = toPrimitive(key);
  if (propertyKey in object) definePropertyModule.f(object, propertyKey, createPropertyDescriptor(0, value));
  else object[propertyKey] = value;
};


/***/ }),

/***/ "84e1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("de9b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("4d63536c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "861d":
/***/ (function(module, exports) {

module.exports = function (it) {
  return typeof it === 'object' ? it !== null : typeof it === 'function';
};


/***/ }),

/***/ "8788":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".jwchat-count[data-v-b98501ac]{padding:0;margin:0;position:relative;overflow:hidden;display:flex;justify-items:center;align-items:center;margin:0 auto}.jwchat-count .title[data-v-b98501ac]{margin-right:.2rem;text-align:center}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "8875":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_FACTORY__, __WEBPACK_AMD_DEFINE_ARRAY__, __WEBPACK_AMD_DEFINE_RESULT__;// addapted from the document.currentScript polyfill by Adam Miller
// MIT license
// source: https://github.com/amiller-gh/currentScript-polyfill

// added support for Firefox https://bugzilla.mozilla.org/show_bug.cgi?id=1620505

(function (root, factory) {
  if (true) {
    !(__WEBPACK_AMD_DEFINE_ARRAY__ = [], __WEBPACK_AMD_DEFINE_FACTORY__ = (factory),
				__WEBPACK_AMD_DEFINE_RESULT__ = (typeof __WEBPACK_AMD_DEFINE_FACTORY__ === 'function' ?
				(__WEBPACK_AMD_DEFINE_FACTORY__.apply(exports, __WEBPACK_AMD_DEFINE_ARRAY__)) : __WEBPACK_AMD_DEFINE_FACTORY__),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
  } else {}
}(typeof self !== 'undefined' ? self : this, function () {
  function getCurrentScript () {
    if (document.currentScript) {
      return document.currentScript
    }
  
    // IE 8-10 support script readyState
    // IE 11+ & Firefox support stack trace
    try {
      throw new Error();
    }
    catch (err) {
      // Find the second match for the "at" string to get file src url from stack.
      var ieStackRegExp = /.*at [^(]*\((.*):(.+):(.+)\)$/ig,
        ffStackRegExp = /@([^@]*):(\d+):(\d+)\s*$/ig,
        stackDetails = ieStackRegExp.exec(err.stack) || ffStackRegExp.exec(err.stack),
        scriptLocation = (stackDetails && stackDetails[1]) || false,
        line = (stackDetails && stackDetails[2]) || false,
        currentLocation = document.location.href.replace(document.location.hash, ''),
        pageSource,
        inlineScriptSourceRegExp,
        inlineScriptSource,
        scripts = document.getElementsByTagName('script'); // Live NodeList collection
  
      if (scriptLocation === currentLocation) {
        pageSource = document.documentElement.outerHTML;
        inlineScriptSourceRegExp = new RegExp('(?:[^\\n]+?\\n){0,' + (line - 2) + '}[^<]*<script>([\\d\\D]*?)<\\/script>[\\d\\D]*', 'i');
        inlineScriptSource = pageSource.replace(inlineScriptSourceRegExp, '$1').trim();
      }
  
      for (var i = 0; i < scripts.length; i++) {
        // If ready state is interactive, return the script tag
        if (scripts[i].readyState === 'interactive') {
          return scripts[i];
        }
  
        // If src matches, return the script tag
        if (scripts[i].src === scriptLocation) {
          return scripts[i];
        }
  
        // If inline source matches, return the script tag
        if (
          scriptLocation === currentLocation &&
          scripts[i].innerHTML &&
          scripts[i].innerHTML.trim() === inlineScriptSource
        ) {
          return scripts[i];
        }
      }
  
      // If no match, return null
      return null;
    }
  };

  return getCurrentScript
}));


/***/ }),

/***/ "8902":
/***/ (function(module, exports, __webpack_require__) {

var __WEBPACK_AMD_DEFINE_RESULT__;/*! iScroll v5.2.0 ~ (c) 2008-2016 Matteo Spinelli ~ http://cubiq.org/license */
(function (window, document, Math) {
var rAF = window.requestAnimationFrame	||
	window.webkitRequestAnimationFrame	||
	window.mozRequestAnimationFrame		||
	window.oRequestAnimationFrame		||
	window.msRequestAnimationFrame		||
	function (callback) { window.setTimeout(callback, 1000 / 60); };

var utils = (function () {
	var me = {};

	var _elementStyle = document.createElement('div').style;
	var _vendor = (function () {
		var vendors = ['t', 'webkitT', 'MozT', 'msT', 'OT'],
			transform,
			i = 0,
			l = vendors.length;

		for ( ; i < l; i++ ) {
			transform = vendors[i] + 'ransform';
			if ( transform in _elementStyle ) return vendors[i].substr(0, vendors[i].length-1);
		}

		return false;
	})();

	function _prefixStyle (style) {
		if ( _vendor === false ) return false;
		if ( _vendor === '' ) return style;
		return _vendor + style.charAt(0).toUpperCase() + style.substr(1);
	}

	me.getTime = Date.now || function getTime () { return new Date().getTime(); };

	me.extend = function (target, obj) {
		for ( var i in obj ) {
			target[i] = obj[i];
		}
	};

	me.addEvent = function (el, type, fn, capture) {
		el.addEventListener(type, fn, !!capture);
	};

	me.removeEvent = function (el, type, fn, capture) {
		el.removeEventListener(type, fn, !!capture);
	};

	me.prefixPointerEvent = function (pointerEvent) {
		return window.MSPointerEvent ?
			'MSPointer' + pointerEvent.charAt(7).toUpperCase() + pointerEvent.substr(8):
			pointerEvent;
	};

	me.momentum = function (current, start, time, lowerMargin, wrapperSize, deceleration) {
		var distance = current - start,
			speed = Math.abs(distance) / time,
			destination,
			duration;

		deceleration = deceleration === undefined ? 0.0006 : deceleration;

		destination = current + ( speed * speed ) / ( 2 * deceleration ) * ( distance < 0 ? -1 : 1 );
		duration = speed / deceleration;

		if ( destination < lowerMargin ) {
			destination = wrapperSize ? lowerMargin - ( wrapperSize / 2.5 * ( speed / 8 ) ) : lowerMargin;
			distance = Math.abs(destination - current);
			duration = distance / speed;
		} else if ( destination > 0 ) {
			destination = wrapperSize ? wrapperSize / 2.5 * ( speed / 8 ) : 0;
			distance = Math.abs(current) + destination;
			duration = distance / speed;
		}

		return {
			destination: Math.round(destination),
			duration: duration
		};
	};

	var _transform = _prefixStyle('transform');

	me.extend(me, {
		hasTransform: _transform !== false,
		hasPerspective: _prefixStyle('perspective') in _elementStyle,
		hasTouch: 'ontouchstart' in window,
		hasPointer: !!(window.PointerEvent || window.MSPointerEvent), // IE10 is prefixed
		hasTransition: _prefixStyle('transition') in _elementStyle
	});

	/*
	This should find all Android browsers lower than build 535.19 (both stock browser and webview)
	- galaxy S2 is ok
    - 2.3.6 : `AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1`
    - 4.0.4 : `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S3 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S4 is badAndroid (stock brower, webview)
     `AppleWebKit/534.30 (KHTML, like Gecko) Version/4.0 Mobile Safari/534.30`
   - galaxy S5 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
   - galaxy S6 is OK
     `AppleWebKit/537.36 (KHTML, like Gecko) Version/4.0 Mobile Safari/537.36 (Chrome/)`
  */
	me.isBadAndroid = (function() {
		var appVersion = window.navigator.appVersion;
		// Android browser is not a chrome browser.
		if (/Android/.test(appVersion) && !(/Chrome\/\d/.test(appVersion))) {
			var safariVersion = appVersion.match(/Safari\/(\d+.\d)/);
			if(safariVersion && typeof safariVersion === "object" && safariVersion.length >= 2) {
				return parseFloat(safariVersion[1]) < 535.19;
			} else {
				return true;
			}
		} else {
			return false;
		}
	})();

	me.extend(me.style = {}, {
		transform: _transform,
		transitionTimingFunction: _prefixStyle('transitionTimingFunction'),
		transitionDuration: _prefixStyle('transitionDuration'),
		transitionDelay: _prefixStyle('transitionDelay'),
		transformOrigin: _prefixStyle('transformOrigin')
	});

	me.hasClass = function (e, c) {
		var re = new RegExp("(^|\\s)" + c + "(\\s|$)");
		return re.test(e.className);
	};

	me.addClass = function (e, c) {
		if ( me.hasClass(e, c) ) {
			return;
		}

		var newclass = e.className.split(' ');
		newclass.push(c);
		e.className = newclass.join(' ');
	};

	me.removeClass = function (e, c) {
		if ( !me.hasClass(e, c) ) {
			return;
		}

		var re = new RegExp("(^|\\s)" + c + "(\\s|$)", 'g');
		e.className = e.className.replace(re, ' ');
	};

	me.offset = function (el) {
		var left = -el.offsetLeft,
			top = -el.offsetTop;

		// jshint -W084
		while (el = el.offsetParent) {
			left -= el.offsetLeft;
			top -= el.offsetTop;
		}
		// jshint +W084

		return {
			left: left,
			top: top
		};
	};

	me.preventDefaultException = function (el, exceptions) {
		for ( var i in exceptions ) {
			if ( exceptions[i].test(el[i]) ) {
				return true;
			}
		}

		return false;
	};

	me.extend(me.eventType = {}, {
		touchstart: 1,
		touchmove: 1,
		touchend: 1,

		mousedown: 2,
		mousemove: 2,
		mouseup: 2,

		pointerdown: 3,
		pointermove: 3,
		pointerup: 3,

		MSPointerDown: 3,
		MSPointerMove: 3,
		MSPointerUp: 3
	});

	me.extend(me.ease = {}, {
		quadratic: {
			style: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
			fn: function (k) {
				return k * ( 2 - k );
			}
		},
		circular: {
			style: 'cubic-bezier(0.1, 0.57, 0.1, 1)',	// Not properly "circular" but this looks better, it should be (0.075, 0.82, 0.165, 1)
			fn: function (k) {
				return Math.sqrt( 1 - ( --k * k ) );
			}
		},
		back: {
			style: 'cubic-bezier(0.175, 0.885, 0.32, 1.275)',
			fn: function (k) {
				var b = 4;
				return ( k = k - 1 ) * k * ( ( b + 1 ) * k + b ) + 1;
			}
		},
		bounce: {
			style: '',
			fn: function (k) {
				if ( ( k /= 1 ) < ( 1 / 2.75 ) ) {
					return 7.5625 * k * k;
				} else if ( k < ( 2 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 1.5 / 2.75 ) ) * k + 0.75;
				} else if ( k < ( 2.5 / 2.75 ) ) {
					return 7.5625 * ( k -= ( 2.25 / 2.75 ) ) * k + 0.9375;
				} else {
					return 7.5625 * ( k -= ( 2.625 / 2.75 ) ) * k + 0.984375;
				}
			}
		},
		elastic: {
			style: '',
			fn: function (k) {
				var f = 0.22,
					e = 0.4;

				if ( k === 0 ) { return 0; }
				if ( k == 1 ) { return 1; }

				return ( e * Math.pow( 2, - 10 * k ) * Math.sin( ( k - f / 4 ) * ( 2 * Math.PI ) / f ) + 1 );
			}
		}
	});

	me.tap = function (e, eventName) {
		var ev = document.createEvent('Event');
		ev.initEvent(eventName, true, true);
		ev.pageX = e.pageX;
		ev.pageY = e.pageY;
		e.target.dispatchEvent(ev);
	};

	me.click = function (e) {
		var target = e.target,
			ev;

		if ( !(/(SELECT|INPUT|TEXTAREA)/i).test(target.tagName) ) {
			ev = document.createEvent('MouseEvents');
			ev.initMouseEvent('click', true, true, e.view, 1,
				target.screenX, target.screenY, target.clientX, target.clientY,
				e.ctrlKey, e.altKey, e.shiftKey, e.metaKey,
				0, null);

			ev._constructed = true;
			target.dispatchEvent(ev);
		}
	};

	return me;
})();
function IScroll (el, options) {
	this.wrapper = typeof el == 'string' ? document.querySelector(el) : el;
	this.scroller = this.wrapper.children[0];
	this.scrollerStyle = this.scroller.style;		// cache style for better performance

	this.options = {

		resizeScrollbars: true,

		mouseWheelSpeed: 20,

		snapThreshold: 0.334,

// INSERT POINT: OPTIONS
		disablePointer : !utils.hasPointer,
		disableTouch : utils.hasPointer || !utils.hasTouch,
		disableMouse : utils.hasPointer || utils.hasTouch,
		startX: 0,
		startY: 0,
		scrollY: true,
		directionLockThreshold: 5,
		momentum: true,

		bounce: true,
		bounceTime: 600,
		bounceEasing: '',

		preventDefault: true,
		preventDefaultException: { tagName: /^(INPUT|TEXTAREA|BUTTON|SELECT)$/ },

		HWCompositing: true,
		useTransition: true,
		useTransform: true,
		bindToWrapper: typeof window.onmousedown === "undefined"
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	// Normalize options
	this.translateZ = this.options.HWCompositing && utils.hasPerspective ? ' translateZ(0)' : '';

	this.options.useTransition = utils.hasTransition && this.options.useTransition;
	this.options.useTransform = utils.hasTransform && this.options.useTransform;

	this.options.eventPassthrough = this.options.eventPassthrough === true ? 'vertical' : this.options.eventPassthrough;
	this.options.preventDefault = !this.options.eventPassthrough && this.options.preventDefault;

	// If you want eventPassthrough I have to lock one of the axes
	this.options.scrollY = this.options.eventPassthrough == 'vertical' ? false : this.options.scrollY;
	this.options.scrollX = this.options.eventPassthrough == 'horizontal' ? false : this.options.scrollX;

	// With eventPassthrough we also need lockDirection mechanism
	this.options.freeScroll = this.options.freeScroll && !this.options.eventPassthrough;
	this.options.directionLockThreshold = this.options.eventPassthrough ? 0 : this.options.directionLockThreshold;

	this.options.bounceEasing = typeof this.options.bounceEasing == 'string' ? utils.ease[this.options.bounceEasing] || utils.ease.circular : this.options.bounceEasing;

	this.options.resizePolling = this.options.resizePolling === undefined ? 60 : this.options.resizePolling;

	if ( this.options.tap === true ) {
		this.options.tap = 'tap';
	}

	if ( this.options.shrinkScrollbars == 'scale' ) {
		this.options.useTransition = false;
	}

	this.options.invertWheelDirection = this.options.invertWheelDirection ? -1 : 1;

// INSERT POINT: NORMALIZATION

	// Some defaults
	this.x = 0;
	this.y = 0;
	this.directionX = 0;
	this.directionY = 0;
	this._events = {};

// INSERT POINT: DEFAULTS

	this._init();
	this.refresh();

	this.scrollTo(this.options.startX, this.options.startY);
	this.enable();
}

IScroll.prototype = {
	version: '5.2.0',

	_init: function () {
		this._initEvents();

		if ( this.options.scrollbars || this.options.indicators ) {
			this._initIndicators();
		}

		if ( this.options.mouseWheel ) {
			this._initWheel();
		}

		if ( this.options.snap ) {
			this._initSnap();
		}

		if ( this.options.keyBindings ) {
			this._initKeys();
		}

// INSERT POINT: _init

	},

	destroy: function () {
		this._initEvents(true);
		clearTimeout(this.resizeTimeout);
 		this.resizeTimeout = null;
		this._execEvent('destroy');
	},

	_transitionEnd: function (e) {
		if ( e.target != this.scroller || !this.isInTransition ) {
			return;
		}

		this._transitionTime();
		if ( !this.resetPosition(this.options.bounceTime) ) {
			this.isInTransition = false;
			this._execEvent('scrollEnd');
		}
	},

	_start: function (e) {
		// React to left mouse button only
		if ( utils.eventType[e.type] != 1 ) {
		  // for button property
		  // http://unixpapa.com/js/mouse.html
		  var button;
	    if (!e.which) {
	      /* IE case */
	      button = (e.button < 2) ? 0 :
	               ((e.button == 4) ? 1 : 2);
	    } else {
	      /* All others */
	      button = e.button;
	    }
			if ( button !== 0 ) {
				return;
			}
		}

		if ( !this.enabled || (this.initiated && utils.eventType[e.type] !== this.initiated) ) {
			return;
		}

		if ( this.options.preventDefault && !utils.isBadAndroid && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.touches ? e.touches[0] : e,
			pos;

		this.initiated	= utils.eventType[e.type];
		this.moved		= false;
		this.distX		= 0;
		this.distY		= 0;
		this.directionX = 0;
		this.directionY = 0;
		this.directionLocked = 0;

		this.startTime = utils.getTime();

		if ( this.options.useTransition && this.isInTransition ) {
			this._transitionTime();
			this.isInTransition = false;
			pos = this.getComputedPosition();
			this._translate(Math.round(pos.x), Math.round(pos.y));
			this._execEvent('scrollEnd');
		} else if ( !this.options.useTransition && this.isAnimating ) {
			this.isAnimating = false;
			this._execEvent('scrollEnd');
		}

		this.startX    = this.x;
		this.startY    = this.y;
		this.absStartX = this.x;
		this.absStartY = this.y;
		this.pointX    = point.pageX;
		this.pointY    = point.pageY;

		this._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault ) {	// increases performance on Android? TODO: check!
			e.preventDefault();
		}

		var point		= e.touches ? e.touches[0] : e,
			deltaX		= point.pageX - this.pointX,
			deltaY		= point.pageY - this.pointY,
			timestamp	= utils.getTime(),
			newX, newY,
			absDistX, absDistY;

		this.pointX		= point.pageX;
		this.pointY		= point.pageY;

		this.distX		+= deltaX;
		this.distY		+= deltaY;
		absDistX		= Math.abs(this.distX);
		absDistY		= Math.abs(this.distY);

		// We need to move at least 10 pixels for the scrolling to initiate
		if ( timestamp - this.endTime > 300 && (absDistX < 10 && absDistY < 10) ) {
			return;
		}

		// If you are scrolling in one direction lock the other
		if ( !this.directionLocked && !this.options.freeScroll ) {
			if ( absDistX > absDistY + this.options.directionLockThreshold ) {
				this.directionLocked = 'h';		// lock horizontally
			} else if ( absDistY >= absDistX + this.options.directionLockThreshold ) {
				this.directionLocked = 'v';		// lock vertically
			} else {
				this.directionLocked = 'n';		// no lock
			}
		}

		if ( this.directionLocked == 'h' ) {
			if ( this.options.eventPassthrough == 'vertical' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'horizontal' ) {
				this.initiated = false;
				return;
			}

			deltaY = 0;
		} else if ( this.directionLocked == 'v' ) {
			if ( this.options.eventPassthrough == 'horizontal' ) {
				e.preventDefault();
			} else if ( this.options.eventPassthrough == 'vertical' ) {
				this.initiated = false;
				return;
			}

			deltaX = 0;
		}

		deltaX = this.hasHorizontalScroll ? deltaX : 0;
		deltaY = this.hasVerticalScroll ? deltaY : 0;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		// Slow down if outside of the boundaries
		if ( newX > 0 || newX < this.maxScrollX ) {
			newX = this.options.bounce ? this.x + deltaX / 3 : newX > 0 ? 0 : this.maxScrollX;
		}
		if ( newY > 0 || newY < this.maxScrollY ) {
			newY = this.options.bounce ? this.y + deltaY / 3 : newY > 0 ? 0 : this.maxScrollY;
		}

		this.directionX = deltaX > 0 ? -1 : deltaX < 0 ? 1 : 0;
		this.directionY = deltaY > 0 ? -1 : deltaY < 0 ? 1 : 0;

		if ( !this.moved ) {
			this._execEvent('scrollStart');
		}

		this.moved = true;

		this._translate(newX, newY);

/* REPLACE START: _move */

		if ( timestamp - this.startTime > 300 ) {
			this.startTime = timestamp;
			this.startX = this.x;
			this.startY = this.y;
		}

/* REPLACE END: _move */

	},

	_end: function (e) {
		if ( !this.enabled || utils.eventType[e.type] !== this.initiated ) {
			return;
		}

		if ( this.options.preventDefault && !utils.preventDefaultException(e.target, this.options.preventDefaultException) ) {
			e.preventDefault();
		}

		var point = e.changedTouches ? e.changedTouches[0] : e,
			momentumX,
			momentumY,
			duration = utils.getTime() - this.startTime,
			newX = Math.round(this.x),
			newY = Math.round(this.y),
			distanceX = Math.abs(newX - this.startX),
			distanceY = Math.abs(newY - this.startY),
			time = 0,
			easing = '';

		this.isInTransition = 0;
		this.initiated = 0;
		this.endTime = utils.getTime();

		// reset if we are outside of the boundaries
		if ( this.resetPosition(this.options.bounceTime) ) {
			return;
		}

		this.scrollTo(newX, newY);	// ensures that the last position is rounded

		// we scrolled less than 10 pixels
		if ( !this.moved ) {
			if ( this.options.tap ) {
				utils.tap(e, this.options.tap);
			}

			if ( this.options.click ) {
				utils.click(e);
			}

			this._execEvent('scrollCancel');
			return;
		}

		if ( this._events.flick && duration < 200 && distanceX < 100 && distanceY < 100 ) {
			this._execEvent('flick');
			return;
		}

		// start momentum animation if needed
		if ( this.options.momentum && duration < 300 ) {
			momentumX = this.hasHorizontalScroll ? utils.momentum(this.x, this.startX, duration, this.maxScrollX, this.options.bounce ? this.wrapperWidth : 0, this.options.deceleration) : { destination: newX, duration: 0 };
			momentumY = this.hasVerticalScroll ? utils.momentum(this.y, this.startY, duration, this.maxScrollY, this.options.bounce ? this.wrapperHeight : 0, this.options.deceleration) : { destination: newY, duration: 0 };
			newX = momentumX.destination;
			newY = momentumY.destination;
			time = Math.max(momentumX.duration, momentumY.duration);
			this.isInTransition = 1;
		}


		if ( this.options.snap ) {
			var snap = this._nearestSnap(newX, newY);
			this.currentPage = snap;
			time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(newX - snap.x), 1000),
						Math.min(Math.abs(newY - snap.y), 1000)
					), 300);
			newX = snap.x;
			newY = snap.y;

			this.directionX = 0;
			this.directionY = 0;
			easing = this.options.bounceEasing;
		}

// INSERT POINT: _end

		if ( newX != this.x || newY != this.y ) {
			// change easing function when scroller goes out of the boundaries
			if ( newX > 0 || newX < this.maxScrollX || newY > 0 || newY < this.maxScrollY ) {
				easing = utils.ease.quadratic;
			}

			this.scrollTo(newX, newY, time, easing);
			return;
		}

		this._execEvent('scrollEnd');
	},

	_resize: function () {
		var that = this;

		clearTimeout(this.resizeTimeout);

		this.resizeTimeout = setTimeout(function () {
			that.refresh();
		}, this.options.resizePolling);
	},

	resetPosition: function (time) {
		var x = this.x,
			y = this.y;

		time = time || 0;

		if ( !this.hasHorizontalScroll || this.x > 0 ) {
			x = 0;
		} else if ( this.x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( !this.hasVerticalScroll || this.y > 0 ) {
			y = 0;
		} else if ( this.y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		if ( x == this.x && y == this.y ) {
			return false;
		}

		this.scrollTo(x, y, time, this.options.bounceEasing);

		return true;
	},

	disable: function () {
		this.enabled = false;
	},

	enable: function () {
		this.enabled = true;
	},

	refresh: function () {
		var rf = this.wrapper.offsetHeight;		// Force reflow

		this.wrapperWidth	= this.wrapper.clientWidth;
		this.wrapperHeight	= this.wrapper.clientHeight;

/* REPLACE START: refresh */

		this.scrollerWidth	= this.scroller.offsetWidth;
		this.scrollerHeight	= this.scroller.offsetHeight;

		this.maxScrollX		= this.wrapperWidth - this.scrollerWidth;
		this.maxScrollY		= this.wrapperHeight - this.scrollerHeight;

/* REPLACE END: refresh */

		this.hasHorizontalScroll	= this.options.scrollX && this.maxScrollX < 0;
		this.hasVerticalScroll		= this.options.scrollY && this.maxScrollY < 0;

		if ( !this.hasHorizontalScroll ) {
			this.maxScrollX = 0;
			this.scrollerWidth = this.wrapperWidth;
		}

		if ( !this.hasVerticalScroll ) {
			this.maxScrollY = 0;
			this.scrollerHeight = this.wrapperHeight;
		}

		this.endTime = 0;
		this.directionX = 0;
		this.directionY = 0;

		this.wrapperOffset = utils.offset(this.wrapper);

		this._execEvent('refresh');

		this.resetPosition();

// INSERT POINT: _refresh

	},

	on: function (type, fn) {
		if ( !this._events[type] ) {
			this._events[type] = [];
		}

		this._events[type].push(fn);
	},

	off: function (type, fn) {
		if ( !this._events[type] ) {
			return;
		}

		var index = this._events[type].indexOf(fn);

		if ( index > -1 ) {
			this._events[type].splice(index, 1);
		}
	},

	_execEvent: function (type) {
		if ( !this._events[type] ) {
			return;
		}

		var i = 0,
			l = this._events[type].length;

		if ( !l ) {
			return;
		}

		for ( ; i < l; i++ ) {
			this._events[type][i].apply(this, [].slice.call(arguments, 1));
		}
	},

	scrollBy: function (x, y, time, easing) {
		x = this.x + x;
		y = this.y + y;
		time = time || 0;

		this.scrollTo(x, y, time, easing);
	},

	scrollTo: function (x, y, time, easing) {
		easing = easing || utils.ease.circular;

		this.isInTransition = this.options.useTransition && time > 0;
		var transitionType = this.options.useTransition && easing.style;
		if ( !time || transitionType ) {
				if(transitionType) {
					this._transitionTimingFunction(easing.style);
					this._transitionTime(time);
				}
			this._translate(x, y);
		} else {
			this._animate(x, y, time, easing.fn);
		}
	},

	scrollToElement: function (el, time, offsetX, offsetY, easing) {
		el = el.nodeType ? el : this.scroller.querySelector(el);

		if ( !el ) {
			return;
		}

		var pos = utils.offset(el);

		pos.left -= this.wrapperOffset.left;
		pos.top  -= this.wrapperOffset.top;

		// if offsetX/Y are true we center the element to the screen
		if ( offsetX === true ) {
			offsetX = Math.round(el.offsetWidth / 2 - this.wrapper.offsetWidth / 2);
		}
		if ( offsetY === true ) {
			offsetY = Math.round(el.offsetHeight / 2 - this.wrapper.offsetHeight / 2);
		}

		pos.left -= offsetX || 0;
		pos.top  -= offsetY || 0;

		pos.left = pos.left > 0 ? 0 : pos.left < this.maxScrollX ? this.maxScrollX : pos.left;
		pos.top  = pos.top  > 0 ? 0 : pos.top  < this.maxScrollY ? this.maxScrollY : pos.top;

		time = time === undefined || time === null || time === 'auto' ? Math.max(Math.abs(this.x-pos.left), Math.abs(this.y-pos.top)) : time;

		this.scrollTo(pos.left, pos.top, time, easing);
	},

	_transitionTime: function (time) {
		time = time || 0;

		var durationProp = utils.style.transitionDuration;
		this.scrollerStyle[durationProp] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.scrollerStyle[durationProp] = '0.0001ms';
			// remove 0.0001ms
			var self = this;
			rAF(function() {
				if(self.scrollerStyle[durationProp] === '0.0001ms') {
					self.scrollerStyle[durationProp] = '0s';
				}
			});
		}


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTime(time);
			}
		}


// INSERT POINT: _transitionTime

	},

	_transitionTimingFunction: function (easing) {
		this.scrollerStyle[utils.style.transitionTimingFunction] = easing;


		if ( this.indicators ) {
			for ( var i = this.indicators.length; i--; ) {
				this.indicators[i].transitionTimingFunction(easing);
			}
		}


// INSERT POINT: _transitionTimingFunction

	},

	_translate: function (x, y) {
		if ( this.options.useTransform ) {

/* REPLACE START: _translate */

			this.scrollerStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.translateZ;

/* REPLACE END: _translate */

		} else {
			x = Math.round(x);
			y = Math.round(y);
			this.scrollerStyle.left = x + 'px';
			this.scrollerStyle.top = y + 'px';
		}

		this.x = x;
		this.y = y;


	if ( this.indicators ) {
		for ( var i = this.indicators.length; i--; ) {
			this.indicators[i].updatePosition();
		}
	}


// INSERT POINT: _translate

	},

	_initEvents: function (remove) {
		var eventType = remove ? utils.removeEvent : utils.addEvent,
			target = this.options.bindToWrapper ? this.wrapper : window;

		eventType(window, 'orientationchange', this);
		eventType(window, 'resize', this);

		if ( this.options.click ) {
			eventType(this.wrapper, 'click', this, true);
		}

		if ( !this.options.disableMouse ) {
			eventType(this.wrapper, 'mousedown', this);
			eventType(target, 'mousemove', this);
			eventType(target, 'mousecancel', this);
			eventType(target, 'mouseup', this);
		}

		if ( utils.hasPointer && !this.options.disablePointer ) {
			eventType(this.wrapper, utils.prefixPointerEvent('pointerdown'), this);
			eventType(target, utils.prefixPointerEvent('pointermove'), this);
			eventType(target, utils.prefixPointerEvent('pointercancel'), this);
			eventType(target, utils.prefixPointerEvent('pointerup'), this);
		}

		if ( utils.hasTouch && !this.options.disableTouch ) {
			eventType(this.wrapper, 'touchstart', this);
			eventType(target, 'touchmove', this);
			eventType(target, 'touchcancel', this);
			eventType(target, 'touchend', this);
		}

		eventType(this.scroller, 'transitionend', this);
		eventType(this.scroller, 'webkitTransitionEnd', this);
		eventType(this.scroller, 'oTransitionEnd', this);
		eventType(this.scroller, 'MSTransitionEnd', this);
	},

	getComputedPosition: function () {
		var matrix = window.getComputedStyle(this.scroller, null),
			x, y;

		if ( this.options.useTransform ) {
			matrix = matrix[utils.style.transform].split(')')[0].split(', ');
			x = +(matrix[12] || matrix[4]);
			y = +(matrix[13] || matrix[5]);
		} else {
			x = +matrix.left.replace(/[^-\d.]/g, '');
			y = +matrix.top.replace(/[^-\d.]/g, '');
		}

		return { x: x, y: y };
	},
	_initIndicators: function () {
		var interactive = this.options.interactiveScrollbars,
			customStyle = typeof this.options.scrollbars != 'string',
			indicators = [],
			indicator;

		var that = this;

		this.indicators = [];

		if ( this.options.scrollbars ) {
			// Vertical scrollbar
			if ( this.options.scrollY ) {
				indicator = {
					el: createDefaultScrollbar('v', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenX: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}

			// Horizontal scrollbar
			if ( this.options.scrollX ) {
				indicator = {
					el: createDefaultScrollbar('h', interactive, this.options.scrollbars),
					interactive: interactive,
					defaultScrollbars: true,
					customStyle: customStyle,
					resize: this.options.resizeScrollbars,
					shrink: this.options.shrinkScrollbars,
					fade: this.options.fadeScrollbars,
					listenY: false
				};

				this.wrapper.appendChild(indicator.el);
				indicators.push(indicator);
			}
		}

		if ( this.options.indicators ) {
			// TODO: check concat compatibility
			indicators = indicators.concat(this.options.indicators);
		}

		for ( var i = indicators.length; i--; ) {
			this.indicators.push( new Indicator(this, indicators[i]) );
		}

		// TODO: check if we can use array.map (wide compatibility and performance issues)
		function _indicatorsMap (fn) {
			if (that.indicators) {
				for ( var i = that.indicators.length; i--; ) {
					fn.call(that.indicators[i]);
				}
			}
		}

		if ( this.options.fadeScrollbars ) {
			this.on('scrollEnd', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollCancel', function () {
				_indicatorsMap(function () {
					this.fade();
				});
			});

			this.on('scrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1);
				});
			});

			this.on('beforeScrollStart', function () {
				_indicatorsMap(function () {
					this.fade(1, true);
				});
			});
		}


		this.on('refresh', function () {
			_indicatorsMap(function () {
				this.refresh();
			});
		});

		this.on('destroy', function () {
			_indicatorsMap(function () {
				this.destroy();
			});

			delete this.indicators;
		});
	},

	_initWheel: function () {
		utils.addEvent(this.wrapper, 'wheel', this);
		utils.addEvent(this.wrapper, 'mousewheel', this);
		utils.addEvent(this.wrapper, 'DOMMouseScroll', this);

		this.on('destroy', function () {
			clearTimeout(this.wheelTimeout);
			this.wheelTimeout = null;
			utils.removeEvent(this.wrapper, 'wheel', this);
			utils.removeEvent(this.wrapper, 'mousewheel', this);
			utils.removeEvent(this.wrapper, 'DOMMouseScroll', this);
		});
	},

	_wheel: function (e) {
		if ( !this.enabled ) {
			return;
		}

		e.preventDefault();

		var wheelDeltaX, wheelDeltaY,
			newX, newY,
			that = this;

		if ( this.wheelTimeout === undefined ) {
			that._execEvent('scrollStart');
		}

		// Execute the scrollEnd event after 400ms the wheel stopped scrolling
		clearTimeout(this.wheelTimeout);
		this.wheelTimeout = setTimeout(function () {
			if(!that.options.snap) {
				that._execEvent('scrollEnd');
			}
			that.wheelTimeout = undefined;
		}, 400);

		if ( 'deltaX' in e ) {
			if (e.deltaMode === 1) {
				wheelDeltaX = -e.deltaX * this.options.mouseWheelSpeed;
				wheelDeltaY = -e.deltaY * this.options.mouseWheelSpeed;
			} else {
				wheelDeltaX = -e.deltaX;
				wheelDeltaY = -e.deltaY;
			}
		} else if ( 'wheelDeltaX' in e ) {
			wheelDeltaX = e.wheelDeltaX / 120 * this.options.mouseWheelSpeed;
			wheelDeltaY = e.wheelDeltaY / 120 * this.options.mouseWheelSpeed;
		} else if ( 'wheelDelta' in e ) {
			wheelDeltaX = wheelDeltaY = e.wheelDelta / 120 * this.options.mouseWheelSpeed;
		} else if ( 'detail' in e ) {
			wheelDeltaX = wheelDeltaY = -e.detail / 3 * this.options.mouseWheelSpeed;
		} else {
			return;
		}

		wheelDeltaX *= this.options.invertWheelDirection;
		wheelDeltaY *= this.options.invertWheelDirection;

		if ( !this.hasVerticalScroll ) {
			wheelDeltaX = wheelDeltaY;
			wheelDeltaY = 0;
		}

		if ( this.options.snap ) {
			newX = this.currentPage.pageX;
			newY = this.currentPage.pageY;

			if ( wheelDeltaX > 0 ) {
				newX--;
			} else if ( wheelDeltaX < 0 ) {
				newX++;
			}

			if ( wheelDeltaY > 0 ) {
				newY--;
			} else if ( wheelDeltaY < 0 ) {
				newY++;
			}

			this.goToPage(newX, newY);

			return;
		}

		newX = this.x + Math.round(this.hasHorizontalScroll ? wheelDeltaX : 0);
		newY = this.y + Math.round(this.hasVerticalScroll ? wheelDeltaY : 0);

		this.directionX = wheelDeltaX > 0 ? -1 : wheelDeltaX < 0 ? 1 : 0;
		this.directionY = wheelDeltaY > 0 ? -1 : wheelDeltaY < 0 ? 1 : 0;

		if ( newX > 0 ) {
			newX = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
		}

		if ( newY > 0 ) {
			newY = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
		}

		this.scrollTo(newX, newY, 0);

// INSERT POINT: _wheel
	},

	_initSnap: function () {
		this.currentPage = {};

		if ( typeof this.options.snap == 'string' ) {
			this.options.snap = this.scroller.querySelectorAll(this.options.snap);
		}

		this.on('refresh', function () {
			var i = 0, l,
				m = 0, n,
				cx, cy,
				x = 0, y,
				stepX = this.options.snapStepX || this.wrapperWidth,
				stepY = this.options.snapStepY || this.wrapperHeight,
				el;

			this.pages = [];

			if ( !this.wrapperWidth || !this.wrapperHeight || !this.scrollerWidth || !this.scrollerHeight ) {
				return;
			}

			if ( this.options.snap === true ) {
				cx = Math.round( stepX / 2 );
				cy = Math.round( stepY / 2 );

				while ( x > -this.scrollerWidth ) {
					this.pages[i] = [];
					l = 0;
					y = 0;

					while ( y > -this.scrollerHeight ) {
						this.pages[i][l] = {
							x: Math.max(x, this.maxScrollX),
							y: Math.max(y, this.maxScrollY),
							width: stepX,
							height: stepY,
							cx: x - cx,
							cy: y - cy
						};

						y -= stepY;
						l++;
					}

					x -= stepX;
					i++;
				}
			} else {
				el = this.options.snap;
				l = el.length;
				n = -1;

				for ( ; i < l; i++ ) {
					if ( i === 0 || el[i].offsetLeft <= el[i-1].offsetLeft ) {
						m = 0;
						n++;
					}

					if ( !this.pages[m] ) {
						this.pages[m] = [];
					}

					x = Math.max(-el[i].offsetLeft, this.maxScrollX);
					y = Math.max(-el[i].offsetTop, this.maxScrollY);
					cx = x - Math.round(el[i].offsetWidth / 2);
					cy = y - Math.round(el[i].offsetHeight / 2);

					this.pages[m][n] = {
						x: x,
						y: y,
						width: el[i].offsetWidth,
						height: el[i].offsetHeight,
						cx: cx,
						cy: cy
					};

					if ( x > this.maxScrollX ) {
						m++;
					}
				}
			}

			this.goToPage(this.currentPage.pageX || 0, this.currentPage.pageY || 0, 0);

			// Update snap threshold if needed
			if ( this.options.snapThreshold % 1 === 0 ) {
				this.snapThresholdX = this.options.snapThreshold;
				this.snapThresholdY = this.options.snapThreshold;
			} else {
				this.snapThresholdX = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].width * this.options.snapThreshold);
				this.snapThresholdY = Math.round(this.pages[this.currentPage.pageX][this.currentPage.pageY].height * this.options.snapThreshold);
			}
		});

		this.on('flick', function () {
			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.x - this.startX), 1000),
						Math.min(Math.abs(this.y - this.startY), 1000)
					), 300);

			this.goToPage(
				this.currentPage.pageX + this.directionX,
				this.currentPage.pageY + this.directionY,
				time
			);
		});
	},

	_nearestSnap: function (x, y) {
		if ( !this.pages.length ) {
			return { x: 0, y: 0, pageX: 0, pageY: 0 };
		}

		var i = 0,
			l = this.pages.length,
			m = 0;

		// Check if we exceeded the snap threshold
		if ( Math.abs(x - this.absStartX) < this.snapThresholdX &&
			Math.abs(y - this.absStartY) < this.snapThresholdY ) {
			return this.currentPage;
		}

		if ( x > 0 ) {
			x = 0;
		} else if ( x < this.maxScrollX ) {
			x = this.maxScrollX;
		}

		if ( y > 0 ) {
			y = 0;
		} else if ( y < this.maxScrollY ) {
			y = this.maxScrollY;
		}

		for ( ; i < l; i++ ) {
			if ( x >= this.pages[i][0].cx ) {
				x = this.pages[i][0].x;
				break;
			}
		}

		l = this.pages[i].length;

		for ( ; m < l; m++ ) {
			if ( y >= this.pages[0][m].cy ) {
				y = this.pages[0][m].y;
				break;
			}
		}

		if ( i == this.currentPage.pageX ) {
			i += this.directionX;

			if ( i < 0 ) {
				i = 0;
			} else if ( i >= this.pages.length ) {
				i = this.pages.length - 1;
			}

			x = this.pages[i][0].x;
		}

		if ( m == this.currentPage.pageY ) {
			m += this.directionY;

			if ( m < 0 ) {
				m = 0;
			} else if ( m >= this.pages[0].length ) {
				m = this.pages[0].length - 1;
			}

			y = this.pages[0][m].y;
		}

		return {
			x: x,
			y: y,
			pageX: i,
			pageY: m
		};
	},

	goToPage: function (x, y, time, easing) {
		easing = easing || this.options.bounceEasing;

		if ( x >= this.pages.length ) {
			x = this.pages.length - 1;
		} else if ( x < 0 ) {
			x = 0;
		}

		if ( y >= this.pages[x].length ) {
			y = this.pages[x].length - 1;
		} else if ( y < 0 ) {
			y = 0;
		}

		var posX = this.pages[x][y].x,
			posY = this.pages[x][y].y;

		time = time === undefined ? this.options.snapSpeed || Math.max(
			Math.max(
				Math.min(Math.abs(posX - this.x), 1000),
				Math.min(Math.abs(posY - this.y), 1000)
			), 300) : time;

		this.currentPage = {
			x: posX,
			y: posY,
			pageX: x,
			pageY: y
		};

		this.scrollTo(posX, posY, time, easing);
	},

	next: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x++;

		if ( x >= this.pages.length && this.hasVerticalScroll ) {
			x = 0;
			y++;
		}

		this.goToPage(x, y, time, easing);
	},

	prev: function (time, easing) {
		var x = this.currentPage.pageX,
			y = this.currentPage.pageY;

		x--;

		if ( x < 0 && this.hasVerticalScroll ) {
			x = 0;
			y--;
		}

		this.goToPage(x, y, time, easing);
	},

	_initKeys: function (e) {
		// default key bindings
		var keys = {
			pageUp: 33,
			pageDown: 34,
			end: 35,
			home: 36,
			left: 37,
			up: 38,
			right: 39,
			down: 40
		};
		var i;

		// if you give me characters I give you keycode
		if ( typeof this.options.keyBindings == 'object' ) {
			for ( i in this.options.keyBindings ) {
				if ( typeof this.options.keyBindings[i] == 'string' ) {
					this.options.keyBindings[i] = this.options.keyBindings[i].toUpperCase().charCodeAt(0);
				}
			}
		} else {
			this.options.keyBindings = {};
		}

		for ( i in keys ) {
			this.options.keyBindings[i] = this.options.keyBindings[i] || keys[i];
		}

		utils.addEvent(window, 'keydown', this);

		this.on('destroy', function () {
			utils.removeEvent(window, 'keydown', this);
		});
	},

	_key: function (e) {
		if ( !this.enabled ) {
			return;
		}

		var snap = this.options.snap,	// we are using this alot, better to cache it
			newX = snap ? this.currentPage.pageX : this.x,
			newY = snap ? this.currentPage.pageY : this.y,
			now = utils.getTime(),
			prevTime = this.keyTime || 0,
			acceleration = 0.250,
			pos;

		if ( this.options.useTransition && this.isInTransition ) {
			pos = this.getComputedPosition();

			this._translate(Math.round(pos.x), Math.round(pos.y));
			this.isInTransition = false;
		}

		this.keyAcceleration = now - prevTime < 200 ? Math.min(this.keyAcceleration + acceleration, 50) : 0;

		switch ( e.keyCode ) {
			case this.options.keyBindings.pageUp:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX += snap ? 1 : this.wrapperWidth;
				} else {
					newY += snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.pageDown:
				if ( this.hasHorizontalScroll && !this.hasVerticalScroll ) {
					newX -= snap ? 1 : this.wrapperWidth;
				} else {
					newY -= snap ? 1 : this.wrapperHeight;
				}
				break;
			case this.options.keyBindings.end:
				newX = snap ? this.pages.length-1 : this.maxScrollX;
				newY = snap ? this.pages[0].length-1 : this.maxScrollY;
				break;
			case this.options.keyBindings.home:
				newX = 0;
				newY = 0;
				break;
			case this.options.keyBindings.left:
				newX += snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.up:
				newY += snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.right:
				newX -= snap ? -1 : 5 + this.keyAcceleration>>0;
				break;
			case this.options.keyBindings.down:
				newY -= snap ? 1 : 5 + this.keyAcceleration>>0;
				break;
			default:
				return;
		}

		if ( snap ) {
			this.goToPage(newX, newY);
			return;
		}

		if ( newX > 0 ) {
			newX = 0;
			this.keyAcceleration = 0;
		} else if ( newX < this.maxScrollX ) {
			newX = this.maxScrollX;
			this.keyAcceleration = 0;
		}

		if ( newY > 0 ) {
			newY = 0;
			this.keyAcceleration = 0;
		} else if ( newY < this.maxScrollY ) {
			newY = this.maxScrollY;
			this.keyAcceleration = 0;
		}

		this.scrollTo(newX, newY, 0);

		this.keyTime = now;
	},

	_animate: function (destX, destY, duration, easingFn) {
		var that = this,
			startX = this.x,
			startY = this.y,
			startTime = utils.getTime(),
			destTime = startTime + duration;

		function step () {
			var now = utils.getTime(),
				newX, newY,
				easing;

			if ( now >= destTime ) {
				that.isAnimating = false;
				that._translate(destX, destY);

				if ( !that.resetPosition(that.options.bounceTime) ) {
					that._execEvent('scrollEnd');
				}

				return;
			}

			now = ( now - startTime ) / duration;
			easing = easingFn(now);
			newX = ( destX - startX ) * easing + startX;
			newY = ( destY - startY ) * easing + startY;
			that._translate(newX, newY);

			if ( that.isAnimating ) {
				rAF(step);
			}
		}

		this.isAnimating = true;
		step();
	},
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
			case 'orientationchange':
			case 'resize':
				this._resize();
				break;
			case 'transitionend':
			case 'webkitTransitionEnd':
			case 'oTransitionEnd':
			case 'MSTransitionEnd':
				this._transitionEnd(e);
				break;
			case 'wheel':
			case 'DOMMouseScroll':
			case 'mousewheel':
				this._wheel(e);
				break;
			case 'keydown':
				this._key(e);
				break;
			case 'click':
				if ( this.enabled && !e._constructed ) {
					e.preventDefault();
					e.stopPropagation();
				}
				break;
		}
	}
};
function createDefaultScrollbar (direction, interactive, type) {
	var scrollbar = document.createElement('div'),
		indicator = document.createElement('div');

	if ( type === true ) {
		scrollbar.style.cssText = 'position:absolute;z-index:9999';
		indicator.style.cssText = '-webkit-box-sizing:border-box;-moz-box-sizing:border-box;box-sizing:border-box;position:absolute;background:rgba(0,0,0,0.5);border:1px solid rgba(255,255,255,0.9);border-radius:3px';
	}

	indicator.className = 'iScrollIndicator';

	if ( direction == 'h' ) {
		if ( type === true ) {
			scrollbar.style.cssText += ';height:7px;left:2px;right:2px;bottom:0';
			indicator.style.height = '100%';
		}
		scrollbar.className = 'iScrollHorizontalScrollbar';
	} else {
		if ( type === true ) {
			scrollbar.style.cssText += ';width:7px;bottom:2px;top:2px;right:1px';
			indicator.style.width = '100%';
		}
		scrollbar.className = 'iScrollVerticalScrollbar';
	}

	scrollbar.style.cssText += ';overflow:hidden';

	if ( !interactive ) {
		scrollbar.style.pointerEvents = 'none';
	}

	scrollbar.appendChild(indicator);

	return scrollbar;
}

function Indicator (scroller, options) {
	this.wrapper = typeof options.el == 'string' ? document.querySelector(options.el) : options.el;
	this.wrapperStyle = this.wrapper.style;
	this.indicator = this.wrapper.children[0];
	this.indicatorStyle = this.indicator.style;
	this.scroller = scroller;

	this.options = {
		listenX: true,
		listenY: true,
		interactive: false,
		resize: true,
		defaultScrollbars: false,
		shrink: false,
		fade: false,
		speedRatioX: 0,
		speedRatioY: 0
	};

	for ( var i in options ) {
		this.options[i] = options[i];
	}

	this.sizeRatioX = 1;
	this.sizeRatioY = 1;
	this.maxPosX = 0;
	this.maxPosY = 0;

	if ( this.options.interactive ) {
		if ( !this.options.disableTouch ) {
			utils.addEvent(this.indicator, 'touchstart', this);
			utils.addEvent(window, 'touchend', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.addEvent(window, utils.prefixPointerEvent('pointerup'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(this.indicator, 'mousedown', this);
			utils.addEvent(window, 'mouseup', this);
		}
	}

	if ( this.options.fade ) {
		this.wrapperStyle[utils.style.transform] = this.scroller.translateZ;
		var durationProp = utils.style.transitionDuration;
		this.wrapperStyle[durationProp] = utils.isBadAndroid ? '0.0001ms' : '0ms';
		// remove 0.0001ms
		var self = this;
		if(utils.isBadAndroid) {
			rAF(function() {
				if(self.wrapperStyle[durationProp] === '0.0001ms') {
					self.wrapperStyle[durationProp] = '0s';
				}
			});
		}
		this.wrapperStyle.opacity = '0';
	}
}

Indicator.prototype = {
	handleEvent: function (e) {
		switch ( e.type ) {
			case 'touchstart':
			case 'pointerdown':
			case 'MSPointerDown':
			case 'mousedown':
				this._start(e);
				break;
			case 'touchmove':
			case 'pointermove':
			case 'MSPointerMove':
			case 'mousemove':
				this._move(e);
				break;
			case 'touchend':
			case 'pointerup':
			case 'MSPointerUp':
			case 'mouseup':
			case 'touchcancel':
			case 'pointercancel':
			case 'MSPointerCancel':
			case 'mousecancel':
				this._end(e);
				break;
		}
	},

	destroy: function () {
		if ( this.options.fadeScrollbars ) {
			clearTimeout(this.fadeTimeout);
			this.fadeTimeout = null;
		}
		if ( this.options.interactive ) {
			utils.removeEvent(this.indicator, 'touchstart', this);
			utils.removeEvent(this.indicator, utils.prefixPointerEvent('pointerdown'), this);
			utils.removeEvent(this.indicator, 'mousedown', this);

			utils.removeEvent(window, 'touchmove', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
			utils.removeEvent(window, 'mousemove', this);

			utils.removeEvent(window, 'touchend', this);
			utils.removeEvent(window, utils.prefixPointerEvent('pointerup'), this);
			utils.removeEvent(window, 'mouseup', this);
		}

		if ( this.options.defaultScrollbars ) {
			this.wrapper.parentNode.removeChild(this.wrapper);
		}
	},

	_start: function (e) {
		var point = e.touches ? e.touches[0] : e;

		e.preventDefault();
		e.stopPropagation();

		this.transitionTime();

		this.initiated = true;
		this.moved = false;
		this.lastPointX	= point.pageX;
		this.lastPointY	= point.pageY;

		this.startTime	= utils.getTime();

		if ( !this.options.disableTouch ) {
			utils.addEvent(window, 'touchmove', this);
		}
		if ( !this.options.disablePointer ) {
			utils.addEvent(window, utils.prefixPointerEvent('pointermove'), this);
		}
		if ( !this.options.disableMouse ) {
			utils.addEvent(window, 'mousemove', this);
		}

		this.scroller._execEvent('beforeScrollStart');
	},

	_move: function (e) {
		var point = e.touches ? e.touches[0] : e,
			deltaX, deltaY,
			newX, newY,
			timestamp = utils.getTime();

		if ( !this.moved ) {
			this.scroller._execEvent('scrollStart');
		}

		this.moved = true;

		deltaX = point.pageX - this.lastPointX;
		this.lastPointX = point.pageX;

		deltaY = point.pageY - this.lastPointY;
		this.lastPointY = point.pageY;

		newX = this.x + deltaX;
		newY = this.y + deltaY;

		this._pos(newX, newY);

// INSERT POINT: indicator._move

		e.preventDefault();
		e.stopPropagation();
	},

	_end: function (e) {
		if ( !this.initiated ) {
			return;
		}

		this.initiated = false;

		e.preventDefault();
		e.stopPropagation();

		utils.removeEvent(window, 'touchmove', this);
		utils.removeEvent(window, utils.prefixPointerEvent('pointermove'), this);
		utils.removeEvent(window, 'mousemove', this);

		if ( this.scroller.options.snap ) {
			var snap = this.scroller._nearestSnap(this.scroller.x, this.scroller.y);

			var time = this.options.snapSpeed || Math.max(
					Math.max(
						Math.min(Math.abs(this.scroller.x - snap.x), 1000),
						Math.min(Math.abs(this.scroller.y - snap.y), 1000)
					), 300);

			if ( this.scroller.x != snap.x || this.scroller.y != snap.y ) {
				this.scroller.directionX = 0;
				this.scroller.directionY = 0;
				this.scroller.currentPage = snap;
				this.scroller.scrollTo(snap.x, snap.y, time, this.scroller.options.bounceEasing);
			}
		}

		if ( this.moved ) {
			this.scroller._execEvent('scrollEnd');
		}
	},

	transitionTime: function (time) {
		time = time || 0;
		var durationProp = utils.style.transitionDuration;
		this.indicatorStyle[durationProp] = time + 'ms';

		if ( !time && utils.isBadAndroid ) {
			this.indicatorStyle[durationProp] = '0.0001ms';
			// remove 0.0001ms
			var self = this;
			rAF(function() {
				if(self.indicatorStyle[durationProp] === '0.0001ms') {
					self.indicatorStyle[durationProp] = '0s';
				}
			});
		}
	},

	transitionTimingFunction: function (easing) {
		this.indicatorStyle[utils.style.transitionTimingFunction] = easing;
	},

	refresh: function () {
		this.transitionTime();

		if ( this.options.listenX && !this.options.listenY ) {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll ? 'block' : 'none';
		} else if ( this.options.listenY && !this.options.listenX ) {
			this.indicatorStyle.display = this.scroller.hasVerticalScroll ? 'block' : 'none';
		} else {
			this.indicatorStyle.display = this.scroller.hasHorizontalScroll || this.scroller.hasVerticalScroll ? 'block' : 'none';
		}

		if ( this.scroller.hasHorizontalScroll && this.scroller.hasVerticalScroll ) {
			utils.addClass(this.wrapper, 'iScrollBothScrollbars');
			utils.removeClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '8px';
				} else {
					this.wrapper.style.bottom = '8px';
				}
			}
		} else {
			utils.removeClass(this.wrapper, 'iScrollBothScrollbars');
			utils.addClass(this.wrapper, 'iScrollLoneScrollbar');

			if ( this.options.defaultScrollbars && this.options.customStyle ) {
				if ( this.options.listenX ) {
					this.wrapper.style.right = '2px';
				} else {
					this.wrapper.style.bottom = '2px';
				}
			}
		}

		var r = this.wrapper.offsetHeight;	// force refresh

		if ( this.options.listenX ) {
			this.wrapperWidth = this.wrapper.clientWidth;
			if ( this.options.resize ) {
				this.indicatorWidth = Math.max(Math.round(this.wrapperWidth * this.wrapperWidth / (this.scroller.scrollerWidth || this.wrapperWidth || 1)), 8);
				this.indicatorStyle.width = this.indicatorWidth + 'px';
			} else {
				this.indicatorWidth = this.indicator.clientWidth;
			}

			this.maxPosX = this.wrapperWidth - this.indicatorWidth;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryX = -this.indicatorWidth + 8;
				this.maxBoundaryX = this.wrapperWidth - 8;
			} else {
				this.minBoundaryX = 0;
				this.maxBoundaryX = this.maxPosX;
			}

			this.sizeRatioX = this.options.speedRatioX || (this.scroller.maxScrollX && (this.maxPosX / this.scroller.maxScrollX));
		}

		if ( this.options.listenY ) {
			this.wrapperHeight = this.wrapper.clientHeight;
			if ( this.options.resize ) {
				this.indicatorHeight = Math.max(Math.round(this.wrapperHeight * this.wrapperHeight / (this.scroller.scrollerHeight || this.wrapperHeight || 1)), 8);
				this.indicatorStyle.height = this.indicatorHeight + 'px';
			} else {
				this.indicatorHeight = this.indicator.clientHeight;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;

			if ( this.options.shrink == 'clip' ) {
				this.minBoundaryY = -this.indicatorHeight + 8;
				this.maxBoundaryY = this.wrapperHeight - 8;
			} else {
				this.minBoundaryY = 0;
				this.maxBoundaryY = this.maxPosY;
			}

			this.maxPosY = this.wrapperHeight - this.indicatorHeight;
			this.sizeRatioY = this.options.speedRatioY || (this.scroller.maxScrollY && (this.maxPosY / this.scroller.maxScrollY));
		}

		this.updatePosition();
	},

	updatePosition: function () {
		var x = this.options.listenX && Math.round(this.sizeRatioX * this.scroller.x) || 0,
			y = this.options.listenY && Math.round(this.sizeRatioY * this.scroller.y) || 0;

		if ( !this.options.ignoreBoundaries ) {
			if ( x < this.minBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth + x, 8);
					this.indicatorStyle.width = this.width + 'px';
				}
				x = this.minBoundaryX;
			} else if ( x > this.maxBoundaryX ) {
				if ( this.options.shrink == 'scale' ) {
					this.width = Math.max(this.indicatorWidth - (x - this.maxPosX), 8);
					this.indicatorStyle.width = this.width + 'px';
					x = this.maxPosX + this.indicatorWidth - this.width;
				} else {
					x = this.maxBoundaryX;
				}
			} else if ( this.options.shrink == 'scale' && this.width != this.indicatorWidth ) {
				this.width = this.indicatorWidth;
				this.indicatorStyle.width = this.width + 'px';
			}

			if ( y < this.minBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight + y * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
				}
				y = this.minBoundaryY;
			} else if ( y > this.maxBoundaryY ) {
				if ( this.options.shrink == 'scale' ) {
					this.height = Math.max(this.indicatorHeight - (y - this.maxPosY) * 3, 8);
					this.indicatorStyle.height = this.height + 'px';
					y = this.maxPosY + this.indicatorHeight - this.height;
				} else {
					y = this.maxBoundaryY;
				}
			} else if ( this.options.shrink == 'scale' && this.height != this.indicatorHeight ) {
				this.height = this.indicatorHeight;
				this.indicatorStyle.height = this.height + 'px';
			}
		}

		this.x = x;
		this.y = y;

		if ( this.scroller.options.useTransform ) {
			this.indicatorStyle[utils.style.transform] = 'translate(' + x + 'px,' + y + 'px)' + this.scroller.translateZ;
		} else {
			this.indicatorStyle.left = x + 'px';
			this.indicatorStyle.top = y + 'px';
		}
	},

	_pos: function (x, y) {
		if ( x < 0 ) {
			x = 0;
		} else if ( x > this.maxPosX ) {
			x = this.maxPosX;
		}

		if ( y < 0 ) {
			y = 0;
		} else if ( y > this.maxPosY ) {
			y = this.maxPosY;
		}

		x = this.options.listenX ? Math.round(x / this.sizeRatioX) : this.scroller.x;
		y = this.options.listenY ? Math.round(y / this.sizeRatioY) : this.scroller.y;

		this.scroller.scrollTo(x, y);
	},

	fade: function (val, hold) {
		if ( hold && !this.visible ) {
			return;
		}

		clearTimeout(this.fadeTimeout);
		this.fadeTimeout = null;

		var time = val ? 250 : 500,
			delay = val ? 0 : 300;

		val = val ? '1' : '0';

		this.wrapperStyle[utils.style.transitionDuration] = time + 'ms';

		this.fadeTimeout = setTimeout((function (val) {
			this.wrapperStyle.opacity = val;
			this.visible = +val;
		}).bind(this, val), delay);
	}
};

IScroll.utils = utils;

if (  true && module.exports ) {
	module.exports = IScroll;
} else if ( true ) {
        !(__WEBPACK_AMD_DEFINE_RESULT__ = (function () { return IScroll; }).call(exports, __webpack_require__, exports, module),
				__WEBPACK_AMD_DEFINE_RESULT__ !== undefined && (module.exports = __WEBPACK_AMD_DEFINE_RESULT__));
} else {}

})(window, document, Math);


/***/ }),

/***/ "8925":
/***/ (function(module, exports, __webpack_require__) {

var store = __webpack_require__("c6cd");

var functionToString = Function.toString;

// this helper broken in `3.4.1-3.4.4`, so we can't use `shared` helper
if (typeof store.inspectSource != 'function') {
  store.inspectSource = function (it) {
    return functionToString.call(it);
  };
}

module.exports = store.inspectSource;


/***/ }),

/***/ "8aa5":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var charAt = __webpack_require__("6547").charAt;

// `AdvanceStringIndex` abstract operation
// https://tc39.github.io/ecma262/#sec-advancestringindex
module.exports = function (S, index, unicode) {
  return index + (unicode ? charAt(S, index).length : 1);
};


/***/ }),

/***/ "8c14":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("d32c");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("8f96ec2a", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "8f16":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".systemTalk[data-v-7a8b6269]{padding:0;margin:0;display:inline-block}.systemTalk .title[data-v-7a8b6269]{width:100%;font-weight:700;border-bottom:1px solid #dcdfe6}.systemTalk .subtitle[data-v-7a8b6269]{font-size:.5rem}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "90e3":
/***/ (function(module, exports) {

var id = 0;
var postfix = Math.random();

module.exports = function (key) {
  return 'Symbol(' + String(key === undefined ? '' : key) + ')_' + (++id + postfix).toString(36);
};


/***/ }),

/***/ "9112":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var definePropertyModule = __webpack_require__("9bf2");
var createPropertyDescriptor = __webpack_require__("5c6c");

module.exports = DESCRIPTORS ? function (object, key, value) {
  return definePropertyModule.f(object, key, createPropertyDescriptor(1, value));
} : function (object, key, value) {
  object[key] = value;
  return object;
};


/***/ }),

/***/ "9263":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var regexpFlags = __webpack_require__("ad6d");
var stickyHelpers = __webpack_require__("9f7f");

var nativeExec = RegExp.prototype.exec;
// This always refers to the native implementation, because the
// String#replace polyfill uses ./fix-regexp-well-known-symbol-logic.js,
// which loads this file before patching the method.
var nativeReplace = String.prototype.replace;

var patchedExec = nativeExec;

var UPDATES_LAST_INDEX_WRONG = (function () {
  var re1 = /a/;
  var re2 = /b*/g;
  nativeExec.call(re1, 'a');
  nativeExec.call(re2, 'a');
  return re1.lastIndex !== 0 || re2.lastIndex !== 0;
})();

var UNSUPPORTED_Y = stickyHelpers.UNSUPPORTED_Y || stickyHelpers.BROKEN_CARET;

// nonparticipating capturing group, copied from es5-shim's String#split patch.
var NPCG_INCLUDED = /()??/.exec('')[1] !== undefined;

var PATCH = UPDATES_LAST_INDEX_WRONG || NPCG_INCLUDED || UNSUPPORTED_Y;

if (PATCH) {
  patchedExec = function exec(str) {
    var re = this;
    var lastIndex, reCopy, match, i;
    var sticky = UNSUPPORTED_Y && re.sticky;
    var flags = regexpFlags.call(re);
    var source = re.source;
    var charsAdded = 0;
    var strCopy = str;

    if (sticky) {
      flags = flags.replace('y', '');
      if (flags.indexOf('g') === -1) {
        flags += 'g';
      }

      strCopy = String(str).slice(re.lastIndex);
      // Support anchored sticky behavior.
      if (re.lastIndex > 0 && (!re.multiline || re.multiline && str[re.lastIndex - 1] !== '\n')) {
        source = '(?: ' + source + ')';
        strCopy = ' ' + strCopy;
        charsAdded++;
      }
      // ^(? + rx + ) is needed, in combination with some str slicing, to
      // simulate the 'y' flag.
      reCopy = new RegExp('^(?:' + source + ')', flags);
    }

    if (NPCG_INCLUDED) {
      reCopy = new RegExp('^' + source + '$(?!\\s)', flags);
    }
    if (UPDATES_LAST_INDEX_WRONG) lastIndex = re.lastIndex;

    match = nativeExec.call(sticky ? reCopy : re, strCopy);

    if (sticky) {
      if (match) {
        match.input = match.input.slice(charsAdded);
        match[0] = match[0].slice(charsAdded);
        match.index = re.lastIndex;
        re.lastIndex += match[0].length;
      } else re.lastIndex = 0;
    } else if (UPDATES_LAST_INDEX_WRONG && match) {
      re.lastIndex = re.global ? match.index + match[0].length : lastIndex;
    }
    if (NPCG_INCLUDED && match && match.length > 1) {
      // Fix browsers whose `exec` methods don't consistently return `undefined`
      // for NPCG, like IE8. NOTE: This doesn' work for /(.?)?/
      nativeReplace.call(match[0], reCopy, function () {
        for (i = 1; i < arguments.length - 2; i++) {
          if (arguments[i] === undefined) match[i] = undefined;
        }
      });
    }

    return match;
  };
}

module.exports = patchedExec;


/***/ }),

/***/ "94ca":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

var replacement = /#|\.prototype\./;

var isForced = function (feature, detection) {
  var value = data[normalize(feature)];
  return value == POLYFILL ? true
    : value == NATIVE ? false
    : typeof detection == 'function' ? fails(detection)
    : !!detection;
};

var normalize = isForced.normalize = function (string) {
  return String(string).replace(replacement, '.').toLowerCase();
};

var data = isForced.data = {};
var NATIVE = isForced.NATIVE = 'N';
var POLYFILL = isForced.POLYFILL = 'P';

module.exports = isForced;


/***/ }),

/***/ "9916":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_quickList_vue_vue_type_style_index_0_id_4a1bc502_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("8c14");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_quickList_vue_vue_type_style_index_0_id_4a1bc502_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_quickList_vue_vue_type_style_index_0_id_4a1bc502_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_quickList_vue_vue_type_style_index_0_id_4a1bc502_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9bdd":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");

// call something on iterator step with safe closing on error
module.exports = function (iterator, fn, value, ENTRIES) {
  try {
    return ENTRIES ? fn(anObject(value)[0], value[1]) : fn(value);
  // 7.4.6 IteratorClose(iterator, completion)
  } catch (error) {
    var returnMethod = iterator['return'];
    if (returnMethod !== undefined) anObject(returnMethod.call(iterator));
    throw error;
  }
};


/***/ }),

/***/ "9bf2":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var IE8_DOM_DEFINE = __webpack_require__("0cfb");
var anObject = __webpack_require__("825a");
var toPrimitive = __webpack_require__("c04e");

var nativeDefineProperty = Object.defineProperty;

// `Object.defineProperty` method
// https://tc39.github.io/ecma262/#sec-object.defineproperty
exports.f = DESCRIPTORS ? nativeDefineProperty : function defineProperty(O, P, Attributes) {
  anObject(O);
  P = toPrimitive(P, true);
  anObject(Attributes);
  if (IE8_DOM_DEFINE) try {
    return nativeDefineProperty(O, P, Attributes);
  } catch (error) { /* empty */ }
  if ('get' in Attributes || 'set' in Attributes) throw TypeError('Accessors not supported');
  if ('value' in Attributes) O[P] = Attributes.value;
  return O;
};


/***/ }),

/***/ "9d39":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b98501ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("0621");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b98501ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b98501ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_index_vue_vue_type_style_index_0_id_b98501ac_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9e6d":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemTalk_vue_vue_type_style_index_0_id_4e6c1e3a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("e99f");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemTalk_vue_vue_type_style_index_0_id_4e6c1e3a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemTalk_vue_vue_type_style_index_0_id_4e6c1e3a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_itemTalk_vue_vue_type_style_index_0_id_4e6c1e3a_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "9ed3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var IteratorPrototype = __webpack_require__("ae93").IteratorPrototype;
var create = __webpack_require__("7c73");
var createPropertyDescriptor = __webpack_require__("5c6c");
var setToStringTag = __webpack_require__("d44e");
var Iterators = __webpack_require__("3f8c");

var returnThis = function () { return this; };

module.exports = function (IteratorConstructor, NAME, next) {
  var TO_STRING_TAG = NAME + ' Iterator';
  IteratorConstructor.prototype = create(IteratorPrototype, { next: createPropertyDescriptor(1, next) });
  setToStringTag(IteratorConstructor, TO_STRING_TAG, false, true);
  Iterators[TO_STRING_TAG] = returnThis;
  return IteratorConstructor;
};


/***/ }),

/***/ "9f77":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".windowBar[data-v-6a43a66e]{background:#fff;height:100%;min-width:150px;overflow:hidden;display:flex;border-right:1px solid #dcdfe6}.windowBar .toolBarBox[data-v-6a43a66e]{width:60px;border-right:1px solid #dcdfe6}.windowBar .toolBarBox img[data-v-6a43a66e]{width:50px}.windowBar .winBarBox[data-v-6a43a66e]{padding:0 5px;margin-top:15px;width:calc(100% - 10px);height:calc(100% - 20px)}.windowBar .winItem[data-v-6a43a66e]{display:flex;align-items:center;position:relative;transition:transform .6s;background:#fff;-webkit-user-select:none;-moz-user-select:none;-ms-user-select:none;user-select:none}.windowBar .winItem[data-v-6a43a66e]:hover,.windowBar .winItem:hover .itemOperation[data-v-6a43a66e]{background:#f9f9f9}.windowBar .winItem.winActive[data-v-6a43a66e],.windowBar .winItem.winActive .itemOperation[data-v-6a43a66e]{background:#f0f0f0}.windowBar .winItem .itemOperation[data-v-6a43a66e]{position:absolute;display:flex;align-items:center;justify-content:center;height:100%;padding:0 5px;transform:translateX(100%);right:0}.windowBar .winItem .itemOperation[data-v-6a43a66e] .el-button{margin:0}.windowBar[data-v-6a43a66e] .el-divider__text{padding:0 5px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "9f7f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";


var fails = __webpack_require__("d039");

// babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError,
// so we use an intermediate function.
function RE(s, f) {
  return RegExp(s, f);
}

exports.UNSUPPORTED_Y = fails(function () {
  // babel-minify transpiles RegExp('a', 'y') -> /a/y and it causes SyntaxError
  var re = RE('a', 'y');
  re.lastIndex = 2;
  return re.exec('abcd') != null;
});

exports.BROKEN_CARET = fails(function () {
  // https://bugzilla.mozilla.org/show_bug.cgi?id=773687
  var re = RE('^r', 'gy');
  re.lastIndex = 2;
  return re.exec('str') != null;
});


/***/ }),

/***/ "a1f7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("e48c");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("3684165a", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "a4d3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var global = __webpack_require__("da84");
var getBuiltIn = __webpack_require__("d066");
var IS_PURE = __webpack_require__("c430");
var DESCRIPTORS = __webpack_require__("83ab");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");
var isArray = __webpack_require__("e8b5");
var isObject = __webpack_require__("861d");
var anObject = __webpack_require__("825a");
var toObject = __webpack_require__("7b0b");
var toIndexedObject = __webpack_require__("fc6a");
var toPrimitive = __webpack_require__("c04e");
var createPropertyDescriptor = __webpack_require__("5c6c");
var nativeObjectCreate = __webpack_require__("7c73");
var objectKeys = __webpack_require__("df75");
var getOwnPropertyNamesModule = __webpack_require__("241c");
var getOwnPropertyNamesExternal = __webpack_require__("057f");
var getOwnPropertySymbolsModule = __webpack_require__("7418");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");
var propertyIsEnumerableModule = __webpack_require__("d1e7");
var createNonEnumerableProperty = __webpack_require__("9112");
var redefine = __webpack_require__("6eeb");
var shared = __webpack_require__("5692");
var sharedKey = __webpack_require__("f772");
var hiddenKeys = __webpack_require__("d012");
var uid = __webpack_require__("90e3");
var wellKnownSymbol = __webpack_require__("b622");
var wrappedWellKnownSymbolModule = __webpack_require__("e538");
var defineWellKnownSymbol = __webpack_require__("746f");
var setToStringTag = __webpack_require__("d44e");
var InternalStateModule = __webpack_require__("69f3");
var $forEach = __webpack_require__("b727").forEach;

var HIDDEN = sharedKey('hidden');
var SYMBOL = 'Symbol';
var PROTOTYPE = 'prototype';
var TO_PRIMITIVE = wellKnownSymbol('toPrimitive');
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(SYMBOL);
var ObjectPrototype = Object[PROTOTYPE];
var $Symbol = global.Symbol;
var $stringify = getBuiltIn('JSON', 'stringify');
var nativeGetOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
var nativeDefineProperty = definePropertyModule.f;
var nativeGetOwnPropertyNames = getOwnPropertyNamesExternal.f;
var nativePropertyIsEnumerable = propertyIsEnumerableModule.f;
var AllSymbols = shared('symbols');
var ObjectPrototypeSymbols = shared('op-symbols');
var StringToSymbolRegistry = shared('string-to-symbol-registry');
var SymbolToStringRegistry = shared('symbol-to-string-registry');
var WellKnownSymbolsStore = shared('wks');
var QObject = global.QObject;
// Don't use setters in Qt Script, https://github.com/zloirock/core-js/issues/173
var USE_SETTER = !QObject || !QObject[PROTOTYPE] || !QObject[PROTOTYPE].findChild;

// fallback for old Android, https://code.google.com/p/v8/issues/detail?id=687
var setSymbolDescriptor = DESCRIPTORS && fails(function () {
  return nativeObjectCreate(nativeDefineProperty({}, 'a', {
    get: function () { return nativeDefineProperty(this, 'a', { value: 7 }).a; }
  })).a != 7;
}) ? function (O, P, Attributes) {
  var ObjectPrototypeDescriptor = nativeGetOwnPropertyDescriptor(ObjectPrototype, P);
  if (ObjectPrototypeDescriptor) delete ObjectPrototype[P];
  nativeDefineProperty(O, P, Attributes);
  if (ObjectPrototypeDescriptor && O !== ObjectPrototype) {
    nativeDefineProperty(ObjectPrototype, P, ObjectPrototypeDescriptor);
  }
} : nativeDefineProperty;

var wrap = function (tag, description) {
  var symbol = AllSymbols[tag] = nativeObjectCreate($Symbol[PROTOTYPE]);
  setInternalState(symbol, {
    type: SYMBOL,
    tag: tag,
    description: description
  });
  if (!DESCRIPTORS) symbol.description = description;
  return symbol;
};

var isSymbol = USE_SYMBOL_AS_UID ? function (it) {
  return typeof it == 'symbol';
} : function (it) {
  return Object(it) instanceof $Symbol;
};

var $defineProperty = function defineProperty(O, P, Attributes) {
  if (O === ObjectPrototype) $defineProperty(ObjectPrototypeSymbols, P, Attributes);
  anObject(O);
  var key = toPrimitive(P, true);
  anObject(Attributes);
  if (has(AllSymbols, key)) {
    if (!Attributes.enumerable) {
      if (!has(O, HIDDEN)) nativeDefineProperty(O, HIDDEN, createPropertyDescriptor(1, {}));
      O[HIDDEN][key] = true;
    } else {
      if (has(O, HIDDEN) && O[HIDDEN][key]) O[HIDDEN][key] = false;
      Attributes = nativeObjectCreate(Attributes, { enumerable: createPropertyDescriptor(0, false) });
    } return setSymbolDescriptor(O, key, Attributes);
  } return nativeDefineProperty(O, key, Attributes);
};

var $defineProperties = function defineProperties(O, Properties) {
  anObject(O);
  var properties = toIndexedObject(Properties);
  var keys = objectKeys(properties).concat($getOwnPropertySymbols(properties));
  $forEach(keys, function (key) {
    if (!DESCRIPTORS || $propertyIsEnumerable.call(properties, key)) $defineProperty(O, key, properties[key]);
  });
  return O;
};

var $create = function create(O, Properties) {
  return Properties === undefined ? nativeObjectCreate(O) : $defineProperties(nativeObjectCreate(O), Properties);
};

var $propertyIsEnumerable = function propertyIsEnumerable(V) {
  var P = toPrimitive(V, true);
  var enumerable = nativePropertyIsEnumerable.call(this, P);
  if (this === ObjectPrototype && has(AllSymbols, P) && !has(ObjectPrototypeSymbols, P)) return false;
  return enumerable || !has(this, P) || !has(AllSymbols, P) || has(this, HIDDEN) && this[HIDDEN][P] ? enumerable : true;
};

var $getOwnPropertyDescriptor = function getOwnPropertyDescriptor(O, P) {
  var it = toIndexedObject(O);
  var key = toPrimitive(P, true);
  if (it === ObjectPrototype && has(AllSymbols, key) && !has(ObjectPrototypeSymbols, key)) return;
  var descriptor = nativeGetOwnPropertyDescriptor(it, key);
  if (descriptor && has(AllSymbols, key) && !(has(it, HIDDEN) && it[HIDDEN][key])) {
    descriptor.enumerable = true;
  }
  return descriptor;
};

var $getOwnPropertyNames = function getOwnPropertyNames(O) {
  var names = nativeGetOwnPropertyNames(toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (!has(AllSymbols, key) && !has(hiddenKeys, key)) result.push(key);
  });
  return result;
};

var $getOwnPropertySymbols = function getOwnPropertySymbols(O) {
  var IS_OBJECT_PROTOTYPE = O === ObjectPrototype;
  var names = nativeGetOwnPropertyNames(IS_OBJECT_PROTOTYPE ? ObjectPrototypeSymbols : toIndexedObject(O));
  var result = [];
  $forEach(names, function (key) {
    if (has(AllSymbols, key) && (!IS_OBJECT_PROTOTYPE || has(ObjectPrototype, key))) {
      result.push(AllSymbols[key]);
    }
  });
  return result;
};

// `Symbol` constructor
// https://tc39.github.io/ecma262/#sec-symbol-constructor
if (!NATIVE_SYMBOL) {
  $Symbol = function Symbol() {
    if (this instanceof $Symbol) throw TypeError('Symbol is not a constructor');
    var description = !arguments.length || arguments[0] === undefined ? undefined : String(arguments[0]);
    var tag = uid(description);
    var setter = function (value) {
      if (this === ObjectPrototype) setter.call(ObjectPrototypeSymbols, value);
      if (has(this, HIDDEN) && has(this[HIDDEN], tag)) this[HIDDEN][tag] = false;
      setSymbolDescriptor(this, tag, createPropertyDescriptor(1, value));
    };
    if (DESCRIPTORS && USE_SETTER) setSymbolDescriptor(ObjectPrototype, tag, { configurable: true, set: setter });
    return wrap(tag, description);
  };

  redefine($Symbol[PROTOTYPE], 'toString', function toString() {
    return getInternalState(this).tag;
  });

  redefine($Symbol, 'withoutSetter', function (description) {
    return wrap(uid(description), description);
  });

  propertyIsEnumerableModule.f = $propertyIsEnumerable;
  definePropertyModule.f = $defineProperty;
  getOwnPropertyDescriptorModule.f = $getOwnPropertyDescriptor;
  getOwnPropertyNamesModule.f = getOwnPropertyNamesExternal.f = $getOwnPropertyNames;
  getOwnPropertySymbolsModule.f = $getOwnPropertySymbols;

  wrappedWellKnownSymbolModule.f = function (name) {
    return wrap(wellKnownSymbol(name), name);
  };

  if (DESCRIPTORS) {
    // https://github.com/tc39/proposal-Symbol-description
    nativeDefineProperty($Symbol[PROTOTYPE], 'description', {
      configurable: true,
      get: function description() {
        return getInternalState(this).description;
      }
    });
    if (!IS_PURE) {
      redefine(ObjectPrototype, 'propertyIsEnumerable', $propertyIsEnumerable, { unsafe: true });
    }
  }
}

$({ global: true, wrap: true, forced: !NATIVE_SYMBOL, sham: !NATIVE_SYMBOL }, {
  Symbol: $Symbol
});

$forEach(objectKeys(WellKnownSymbolsStore), function (name) {
  defineWellKnownSymbol(name);
});

$({ target: SYMBOL, stat: true, forced: !NATIVE_SYMBOL }, {
  // `Symbol.for` method
  // https://tc39.github.io/ecma262/#sec-symbol.for
  'for': function (key) {
    var string = String(key);
    if (has(StringToSymbolRegistry, string)) return StringToSymbolRegistry[string];
    var symbol = $Symbol(string);
    StringToSymbolRegistry[string] = symbol;
    SymbolToStringRegistry[symbol] = string;
    return symbol;
  },
  // `Symbol.keyFor` method
  // https://tc39.github.io/ecma262/#sec-symbol.keyfor
  keyFor: function keyFor(sym) {
    if (!isSymbol(sym)) throw TypeError(sym + ' is not a symbol');
    if (has(SymbolToStringRegistry, sym)) return SymbolToStringRegistry[sym];
  },
  useSetter: function () { USE_SETTER = true; },
  useSimple: function () { USE_SETTER = false; }
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL, sham: !DESCRIPTORS }, {
  // `Object.create` method
  // https://tc39.github.io/ecma262/#sec-object.create
  create: $create,
  // `Object.defineProperty` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperty
  defineProperty: $defineProperty,
  // `Object.defineProperties` method
  // https://tc39.github.io/ecma262/#sec-object.defineproperties
  defineProperties: $defineProperties,
  // `Object.getOwnPropertyDescriptor` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
  getOwnPropertyDescriptor: $getOwnPropertyDescriptor
});

$({ target: 'Object', stat: true, forced: !NATIVE_SYMBOL }, {
  // `Object.getOwnPropertyNames` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertynames
  getOwnPropertyNames: $getOwnPropertyNames,
  // `Object.getOwnPropertySymbols` method
  // https://tc39.github.io/ecma262/#sec-object.getownpropertysymbols
  getOwnPropertySymbols: $getOwnPropertySymbols
});

// Chrome 38 and 39 `Object.getOwnPropertySymbols` fails on primitives
// https://bugs.chromium.org/p/v8/issues/detail?id=3443
$({ target: 'Object', stat: true, forced: fails(function () { getOwnPropertySymbolsModule.f(1); }) }, {
  getOwnPropertySymbols: function getOwnPropertySymbols(it) {
    return getOwnPropertySymbolsModule.f(toObject(it));
  }
});

// `JSON.stringify` method behavior with symbols
// https://tc39.github.io/ecma262/#sec-json.stringify
if ($stringify) {
  var FORCED_JSON_STRINGIFY = !NATIVE_SYMBOL || fails(function () {
    var symbol = $Symbol();
    // MS Edge converts symbol values to JSON as {}
    return $stringify([symbol]) != '[null]'
      // WebKit converts symbol values to JSON as null
      || $stringify({ a: symbol }) != '{}'
      // V8 throws on boxed symbols
      || $stringify(Object(symbol)) != '{}';
  });

  $({ target: 'JSON', stat: true, forced: FORCED_JSON_STRINGIFY }, {
    // eslint-disable-next-line no-unused-vars
    stringify: function stringify(it, replacer, space) {
      var args = [it];
      var index = 1;
      var $replacer;
      while (arguments.length > index) args.push(arguments[index++]);
      $replacer = replacer;
      if (!isObject(replacer) && it === undefined || isSymbol(it)) return; // IE8 returns string on undefined
      if (!isArray(replacer)) replacer = function (key, value) {
        if (typeof $replacer == 'function') value = $replacer.call(this, key, value);
        if (!isSymbol(value)) return value;
      };
      args[1] = replacer;
      return $stringify.apply(null, args);
    }
  });
}

// `Symbol.prototype[@@toPrimitive]` method
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@toprimitive
if (!$Symbol[PROTOTYPE][TO_PRIMITIVE]) {
  createNonEnumerableProperty($Symbol[PROTOTYPE], TO_PRIMITIVE, $Symbol[PROTOTYPE].valueOf);
}
// `Symbol.prototype[@@toStringTag]` property
// https://tc39.github.io/ecma262/#sec-symbol.prototype-@@tostringtag
setToStringTag($Symbol, SYMBOL);

hiddenKeys[HIDDEN] = true;


/***/ }),

/***/ "a630":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var from = __webpack_require__("4df4");
var checkCorrectnessOfIteration = __webpack_require__("1c7e");

var INCORRECT_ITERATION = !checkCorrectnessOfIteration(function (iterable) {
  Array.from(iterable);
});

// `Array.from` method
// https://tc39.github.io/ecma262/#sec-array.from
$({ target: 'Array', stat: true, forced: INCORRECT_ITERATION }, {
  from: from
});


/***/ }),

/***/ "a640":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var fails = __webpack_require__("d039");

module.exports = function (METHOD_NAME, argument) {
  var method = [][METHOD_NAME];
  return !!method && fails(function () {
    // eslint-disable-next-line no-useless-call,no-throw-literal
    method.call(null, argument || function () { throw 1; }, 1);
  });
};


/***/ }),

/***/ "a691":
/***/ (function(module, exports) {

var ceil = Math.ceil;
var floor = Math.floor;

// `ToInteger` abstract operation
// https://tc39.github.io/ecma262/#sec-tointeger
module.exports = function (argument) {
  return isNaN(argument = +argument) ? 0 : (argument > 0 ? floor : ceil)(argument);
};


/***/ }),

/***/ "a9e3":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var isForced = __webpack_require__("94ca");
var redefine = __webpack_require__("6eeb");
var has = __webpack_require__("5135");
var classof = __webpack_require__("c6b6");
var inheritIfRequired = __webpack_require__("7156");
var toPrimitive = __webpack_require__("c04e");
var fails = __webpack_require__("d039");
var create = __webpack_require__("7c73");
var getOwnPropertyNames = __webpack_require__("241c").f;
var getOwnPropertyDescriptor = __webpack_require__("06cf").f;
var defineProperty = __webpack_require__("9bf2").f;
var trim = __webpack_require__("58a8").trim;

var NUMBER = 'Number';
var NativeNumber = global[NUMBER];
var NumberPrototype = NativeNumber.prototype;

// Opera ~12 has broken Object#toString
var BROKEN_CLASSOF = classof(create(NumberPrototype)) == NUMBER;

// `ToNumber` abstract operation
// https://tc39.github.io/ecma262/#sec-tonumber
var toNumber = function (argument) {
  var it = toPrimitive(argument, false);
  var first, third, radix, maxCode, digits, length, index, code;
  if (typeof it == 'string' && it.length > 2) {
    it = trim(it);
    first = it.charCodeAt(0);
    if (first === 43 || first === 45) {
      third = it.charCodeAt(2);
      if (third === 88 || third === 120) return NaN; // Number('+0x1') should be NaN, old V8 fix
    } else if (first === 48) {
      switch (it.charCodeAt(1)) {
        case 66: case 98: radix = 2; maxCode = 49; break; // fast equal of /^0b[01]+$/i
        case 79: case 111: radix = 8; maxCode = 55; break; // fast equal of /^0o[0-7]+$/i
        default: return +it;
      }
      digits = it.slice(2);
      length = digits.length;
      for (index = 0; index < length; index++) {
        code = digits.charCodeAt(index);
        // parseInt parses a string to a first unavailable symbol
        // but ToNumber should return NaN if a string contains unavailable symbols
        if (code < 48 || code > maxCode) return NaN;
      } return parseInt(digits, radix);
    }
  } return +it;
};

// `Number` constructor
// https://tc39.github.io/ecma262/#sec-number-constructor
if (isForced(NUMBER, !NativeNumber(' 0o1') || !NativeNumber('0b1') || NativeNumber('+0x1'))) {
  var NumberWrapper = function Number(value) {
    var it = arguments.length < 1 ? 0 : value;
    var dummy = this;
    return dummy instanceof NumberWrapper
      // check on 1..constructor(foo) case
      && (BROKEN_CLASSOF ? fails(function () { NumberPrototype.valueOf.call(dummy); }) : classof(dummy) != NUMBER)
        ? inheritIfRequired(new NativeNumber(toNumber(it)), dummy, NumberWrapper) : toNumber(it);
  };
  for (var keys = DESCRIPTORS ? getOwnPropertyNames(NativeNumber) : (
    // ES3:
    'MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,' +
    // ES2015 (in case, if modules with ES2015 Number statics required before):
    'EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,' +
    'MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger'
  ).split(','), j = 0, key; keys.length > j; j++) {
    if (has(NativeNumber, key = keys[j]) && !has(NumberWrapper, key)) {
      defineProperty(NumberWrapper, key, getOwnPropertyDescriptor(NativeNumber, key));
    }
  }
  NumberWrapper.prototype = NumberPrototype;
  NumberPrototype.constructor = NumberWrapper;
  redefine(global, NUMBER, NumberWrapper);
}


/***/ }),

/***/ "aa20":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "fonts/iconfont.5e558b21.eot";

/***/ }),

/***/ "ab13":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

var MATCH = wellKnownSymbol('match');

module.exports = function (METHOD_NAME) {
  var regexp = /./;
  try {
    '/./'[METHOD_NAME](regexp);
  } catch (e) {
    try {
      regexp[MATCH] = false;
      return '/./'[METHOD_NAME](regexp);
    } catch (f) { /* empty */ }
  } return false;
};


/***/ }),

/***/ "ac1f":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var exec = __webpack_require__("9263");

$({ target: 'RegExp', proto: true, forced: /./.exec !== exec }, {
  exec: exec
});


/***/ }),

/***/ "ad6d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var anObject = __webpack_require__("825a");

// `RegExp.prototype.flags` getter implementation
// https://tc39.github.io/ecma262/#sec-get-regexp.prototype.flags
module.exports = function () {
  var that = anObject(this);
  var result = '';
  if (that.global) result += 'g';
  if (that.ignoreCase) result += 'i';
  if (that.multiline) result += 'm';
  if (that.dotAll) result += 's';
  if (that.unicode) result += 'u';
  if (that.sticky) result += 'y';
  return result;
};


/***/ }),

/***/ "ada3":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("b9a3");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("05205629", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "ae40":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var fails = __webpack_require__("d039");
var has = __webpack_require__("5135");

var defineProperty = Object.defineProperty;
var cache = {};

var thrower = function (it) { throw it; };

module.exports = function (METHOD_NAME, options) {
  if (has(cache, METHOD_NAME)) return cache[METHOD_NAME];
  if (!options) options = {};
  var method = [][METHOD_NAME];
  var ACCESSORS = has(options, 'ACCESSORS') ? options.ACCESSORS : false;
  var argument0 = has(options, 0) ? options[0] : thrower;
  var argument1 = has(options, 1) ? options[1] : undefined;

  return cache[METHOD_NAME] = !!method && !fails(function () {
    if (ACCESSORS && !DESCRIPTORS) return true;
    var O = { length: -1 };

    if (ACCESSORS) defineProperty(O, 1, { enumerable: true, get: thrower });
    else O[1] = 1;

    method.call(O, argument0, argument1);
  });
};


/***/ }),

/***/ "ae93":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var getPrototypeOf = __webpack_require__("e163");
var createNonEnumerableProperty = __webpack_require__("9112");
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");
var IS_PURE = __webpack_require__("c430");

var ITERATOR = wellKnownSymbol('iterator');
var BUGGY_SAFARI_ITERATORS = false;

var returnThis = function () { return this; };

// `%IteratorPrototype%` object
// https://tc39.github.io/ecma262/#sec-%iteratorprototype%-object
var IteratorPrototype, PrototypeOfArrayIteratorPrototype, arrayIterator;

if ([].keys) {
  arrayIterator = [].keys();
  // Safari 8 has buggy iterators w/o `next`
  if (!('next' in arrayIterator)) BUGGY_SAFARI_ITERATORS = true;
  else {
    PrototypeOfArrayIteratorPrototype = getPrototypeOf(getPrototypeOf(arrayIterator));
    if (PrototypeOfArrayIteratorPrototype !== Object.prototype) IteratorPrototype = PrototypeOfArrayIteratorPrototype;
  }
}

if (IteratorPrototype == undefined) IteratorPrototype = {};

// 25.1.2.1.1 %IteratorPrototype%[@@iterator]()
if (!IS_PURE && !has(IteratorPrototype, ITERATOR)) {
  createNonEnumerableProperty(IteratorPrototype, ITERATOR, returnThis);
}

module.exports = {
  IteratorPrototype: IteratorPrototype,
  BUGGY_SAFARI_ITERATORS: BUGGY_SAFARI_ITERATORS
};


/***/ }),

/***/ "b041":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classof = __webpack_require__("f5df");

// `Object.prototype.toString` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
module.exports = TO_STRING_TAG_SUPPORT ? {}.toString : function toString() {
  return '[object ' + classof(this) + ']';
};


/***/ }),

/***/ "b0c0":
/***/ (function(module, exports, __webpack_require__) {

var DESCRIPTORS = __webpack_require__("83ab");
var defineProperty = __webpack_require__("9bf2").f;

var FunctionPrototype = Function.prototype;
var FunctionPrototypeToString = FunctionPrototype.toString;
var nameRE = /^\s*function ([^ (]*)/;
var NAME = 'name';

// Function instances `.name` property
// https://tc39.github.io/ecma262/#sec-function-instances-name
if (DESCRIPTORS && !(NAME in FunctionPrototype)) {
  defineProperty(FunctionPrototype, NAME, {
    configurable: true,
    get: function () {
      try {
        return FunctionPrototypeToString.call(this).match(nameRE)[1];
      } catch (error) {
        return '';
      }
    }
  });
}


/***/ }),

/***/ "b26b":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("8f16");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("379c4680", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "b622":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var shared = __webpack_require__("5692");
var has = __webpack_require__("5135");
var uid = __webpack_require__("90e3");
var NATIVE_SYMBOL = __webpack_require__("4930");
var USE_SYMBOL_AS_UID = __webpack_require__("fdbf");

var WellKnownSymbolsStore = shared('wks');
var Symbol = global.Symbol;
var createWellKnownSymbol = USE_SYMBOL_AS_UID ? Symbol : Symbol && Symbol.withoutSetter || uid;

module.exports = function (name) {
  if (!has(WellKnownSymbolsStore, name)) {
    if (NATIVE_SYMBOL && has(Symbol, name)) WellKnownSymbolsStore[name] = Symbol[name];
    else WellKnownSymbolsStore[name] = createWellKnownSymbol('Symbol.' + name);
  } return WellKnownSymbolsStore[name];
};


/***/ }),

/***/ "b64b":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var toObject = __webpack_require__("7b0b");
var nativeKeys = __webpack_require__("df75");
var fails = __webpack_require__("d039");

var FAILS_ON_PRIMITIVES = fails(function () { nativeKeys(1); });

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
$({ target: 'Object', stat: true, forced: FAILS_ON_PRIMITIVES }, {
  keys: function keys(it) {
    return nativeKeys(toObject(it));
  }
});


/***/ }),

/***/ "b6c8":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_windowBar_vue_vue_type_style_index_0_id_6a43a66e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("d1e1");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_windowBar_vue_vue_type_style_index_0_id_6a43a66e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_windowBar_vue_vue_type_style_index_0_id_6a43a66e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_windowBar_vue_vue_type_style_index_0_id_6a43a66e_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "b727":
/***/ (function(module, exports, __webpack_require__) {

var bind = __webpack_require__("0366");
var IndexedObject = __webpack_require__("44ad");
var toObject = __webpack_require__("7b0b");
var toLength = __webpack_require__("50c4");
var arraySpeciesCreate = __webpack_require__("65f0");

var push = [].push;

// `Array.prototype.{ forEach, map, filter, some, every, find, findIndex }` methods implementation
var createMethod = function (TYPE) {
  var IS_MAP = TYPE == 1;
  var IS_FILTER = TYPE == 2;
  var IS_SOME = TYPE == 3;
  var IS_EVERY = TYPE == 4;
  var IS_FIND_INDEX = TYPE == 6;
  var NO_HOLES = TYPE == 5 || IS_FIND_INDEX;
  return function ($this, callbackfn, that, specificCreate) {
    var O = toObject($this);
    var self = IndexedObject(O);
    var boundFunction = bind(callbackfn, that, 3);
    var length = toLength(self.length);
    var index = 0;
    var create = specificCreate || arraySpeciesCreate;
    var target = IS_MAP ? create($this, length) : IS_FILTER ? create($this, 0) : undefined;
    var value, result;
    for (;length > index; index++) if (NO_HOLES || index in self) {
      value = self[index];
      result = boundFunction(value, index, O);
      if (TYPE) {
        if (IS_MAP) target[index] = result; // map
        else if (result) switch (TYPE) {
          case 3: return true;              // some
          case 5: return value;             // find
          case 6: return index;             // findIndex
          case 2: push.call(target, value); // filter
        } else if (IS_EVERY) return false;  // every
      }
    }
    return IS_FIND_INDEX ? -1 : IS_SOME || IS_EVERY ? IS_EVERY : target;
  };
};

module.exports = {
  // `Array.prototype.forEach` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.foreach
  forEach: createMethod(0),
  // `Array.prototype.map` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.map
  map: createMethod(1),
  // `Array.prototype.filter` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.filter
  filter: createMethod(2),
  // `Array.prototype.some` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.some
  some: createMethod(3),
  // `Array.prototype.every` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.every
  every: createMethod(4),
  // `Array.prototype.find` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.find
  find: createMethod(5),
  // `Array.prototype.findIndex` method
  // https://tc39.github.io/ecma262/#sec-array.prototype.findIndex
  findIndex: createMethod(6)
};


/***/ }),

/***/ "b9a3":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, "[data-v-422b11e3] .iScrollVerticalScrollbar.iScrollLoneScrollbar{z-index:1!important}.wrapper[data-v-422b11e3]{position:relative;width:525px;height:382px;overflow:hidden;touch-action:none;-webkit-text-size-adjust:none;-moz-text-size-adjust:none;-ms-text-size-adjust:none;text-size-adjust:none}.wrapper .downBtn[data-v-422b11e3]{position:absolute;cursor:pointer;right:1rem;width:2rem;height:2rem;bottom:2rem}.wrapper .downBtn[data-v-422b11e3]:before{content:\"V\";position:absolute;background:hsla(0,0%,80%,.2);width:2rem;height:2rem;line-height:2rem;text-align:center;border-radius:50%;top:60%;left:50%;transform:translateX(-50%)}.wrapper .downBtn span[data-v-422b11e3]{background:#409eff;padding:.1rem .5rem;font-size:.7rem;border-radius:.5rem;color:#fff;position:absolute;top:50%;left:50%;transform:translate(-50%,-50%)}.wrapper .scroller[data-v-422b11e3]{position:absolute;width:calc(100% - 1.5rem);padding:.5rem;padding-right:1.5rem;-webkit-tap-highlight-color:rgba(0,0,0,0);transform:translateZ(0)}.wrapper .scroller .web__main-item[data-v-422b11e3]{position:relative;font-size:0;margin-bottom:10px;padding-left:60px;min-height:68px;text-align:left}.wrapper .scroller .web__main-text[data-v-422b11e3],.wrapper .scroller .web__main-user[data-v-422b11e3]{display:inline-block;vertical-align:top;font-size:14px}.wrapper .scroller .web__main-user[data-v-422b11e3]{position:absolute;cursor:pointer;left:3px}.wrapper .scroller .web__main-user img[data-v-422b11e3]{width:40px;height:40px;border-radius:100%}.wrapper .scroller .web__main-user cite[data-v-422b11e3]{position:absolute;left:60px;top:-2px;line-height:24px;font-size:12px;white-space:nowrap;color:#999;text-align:left;font-style:normal}.wrapper .scroller .web__main-user cite i[data-v-422b11e3]{padding-left:15px;font-style:normal}.wrapper .scroller .web__main-text[data-v-422b11e3]{max-width:75%;position:relative;line-height:22px;margin-top:25px;padding:8px 15px;background-color:#f3f3f3;border-radius:3px;border:1px solid #f0f0f0;color:#000;word-break:break-all}.wrapper .scroller .web__main-arrow[data-v-422b11e3]{top:6px;left:-8px;border-width:8px;border-left-width:0;border-right-color:#ebeef5}.wrapper .scroller .web__main-arrow[data-v-422b11e3],.wrapper .scroller .web__main-arrow[data-v-422b11e3]:after{position:absolute;display:block;width:0;height:0;border-color:transparent;border-style:solid}.wrapper .scroller .web__main-arrow[data-v-422b11e3]:after{content:\" \";top:-7px;left:1px;border-width:7px;border-left-width:0;border-right-color:#ebeef5}.wrapper .scroller .web__main-item--mine .web__main-text .web__main-arrow[data-v-422b11e3]{left:auto;right:-5px;border-color:transparent;border-style:solid;border-width:8px;border-right-width:0;border-left-color:#409eff}.wrapper .scroller .web__main-item--mine .web__main-text .web__main-arrow[data-v-422b11e3]:after{left:auto;right:-2px;border-color:transparent;border-style:solid;border-width:7px;border-right-width:0;border-left-color:#409eff}.wrapper .scroller .web__main-list[data-v-422b11e3]{margin:10px 0}.wrapper .scroller .web__main-list li[data-v-422b11e3]{height:30px;color:#409eff;line-height:30px}.wrapper .scroller .web__main-item--mine[data-v-422b11e3]{text-align:right;padding-left:0;padding-right:60px}.wrapper .scroller .web__main-item--mine .web__main-user[data-v-422b11e3]{left:auto;right:3px}.wrapper .scroller .web__main-item--mine .web__main-user cite[data-v-422b11e3]{left:auto;right:60px;text-align:right}.wrapper .scroller .web__main-item--mine .web__main-user cite i[data-v-422b11e3]{padding-left:0;padding-right:15px}.wrapper .scroller .web__main-item--mine .web__main-text[data-v-422b11e3]{margin-left:0;text-align:left;background-color:#409eff;color:#fff}.wrapper .scroller .web__main-item--mine .web__main-text img[data-v-422b11e3]{max-width:200px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "bdf7":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("578b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("4f16c6bd", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "c04e":
/***/ (function(module, exports, __webpack_require__) {

var isObject = __webpack_require__("861d");

// `ToPrimitive` abstract operation
// https://tc39.github.io/ecma262/#sec-toprimitive
// instead of the ES6 spec version, we didn't implement @@toPrimitive case
// and the second argument - flag - preferred type is a string
module.exports = function (input, PREFERRED_STRING) {
  if (!isObject(input)) return input;
  var fn, val;
  if (PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  if (typeof (fn = input.valueOf) == 'function' && !isObject(val = fn.call(input))) return val;
  if (!PREFERRED_STRING && typeof (fn = input.toString) == 'function' && !isObject(val = fn.call(input))) return val;
  throw TypeError("Can't convert object to primitive value");
};


/***/ }),

/***/ "c0f7":
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__.p + "img/iconfont.11ed3f13.svg";

/***/ }),

/***/ "c430":
/***/ (function(module, exports) {

module.exports = false;


/***/ }),

/***/ "c46a":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("37ba");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("6773c10c", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "c6b6":
/***/ (function(module, exports) {

var toString = {}.toString;

module.exports = function (it) {
  return toString.call(it).slice(8, -1);
};


/***/ }),

/***/ "c6cd":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var setGlobal = __webpack_require__("ce4e");

var SHARED = '__core-js_shared__';
var store = global[SHARED] || setGlobal(SHARED, {});

module.exports = store;


/***/ }),

/***/ "c8ba":
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || new Function("return this")();
} catch (e) {
	// This works if the window reference is available
	if (typeof window === "object") g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),

/***/ "c8d2":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");
var whitespaces = __webpack_require__("5899");

var non = '\u200B\u0085\u180E';

// check that a method works with the correct list
// of whitespaces and has a correct name
module.exports = function (METHOD_NAME) {
  return fails(function () {
    return !!whitespaces[METHOD_NAME]() || non[METHOD_NAME]() != non || whitespaces[METHOD_NAME].name !== METHOD_NAME;
  });
};


/***/ }),

/***/ "ca84":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toIndexedObject = __webpack_require__("fc6a");
var indexOf = __webpack_require__("4d64").indexOf;
var hiddenKeys = __webpack_require__("d012");

module.exports = function (object, names) {
  var O = toIndexedObject(object);
  var i = 0;
  var result = [];
  var key;
  for (key in O) !has(hiddenKeys, key) && has(O, key) && result.push(key);
  // Don't enum bug & hidden keys
  while (names.length > i) if (has(O, key = names[i++])) {
    ~indexOf(result, key) || result.push(key);
  }
  return result;
};


/***/ }),

/***/ "caad":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $includes = __webpack_require__("4d64").includes;
var addToUnscopables = __webpack_require__("44d2");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var USES_TO_LENGTH = arrayMethodUsesToLength('indexOf', { ACCESSORS: true, 1: 0 });

// `Array.prototype.includes` method
// https://tc39.github.io/ecma262/#sec-array.prototype.includes
$({ target: 'Array', proto: true, forced: !USES_TO_LENGTH }, {
  includes: function includes(el /* , fromIndex = 0 */) {
    return $includes(this, el, arguments.length > 1 ? arguments[1] : undefined);
  }
});

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('includes');


/***/ }),

/***/ "cc12":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var isObject = __webpack_require__("861d");

var document = global.document;
// typeof document.createElement is 'object' in old IE
var EXISTS = isObject(document) && isObject(document.createElement);

module.exports = function (it) {
  return EXISTS ? document.createElement(it) : {};
};


/***/ }),

/***/ "cca6":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var assign = __webpack_require__("60da");

// `Object.assign` method
// https://tc39.github.io/ecma262/#sec-object.assign
$({ target: 'Object', stat: true, forced: Object.assign !== assign }, {
  assign: assign
});


/***/ }),

/***/ "ce4e":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var createNonEnumerableProperty = __webpack_require__("9112");

module.exports = function (key, value) {
  try {
    createNonEnumerableProperty(global, key, value);
  } catch (error) {
    global[key] = value;
  } return value;
};


/***/ }),

/***/ "cea2":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("ea3b");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("3f7b3b49", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "d012":
/***/ (function(module, exports) {

module.exports = {};


/***/ }),

/***/ "d039":
/***/ (function(module, exports) {

module.exports = function (exec) {
  try {
    return !!exec();
  } catch (error) {
    return true;
  }
};


/***/ }),

/***/ "d066":
/***/ (function(module, exports, __webpack_require__) {

var path = __webpack_require__("428f");
var global = __webpack_require__("da84");

var aFunction = function (variable) {
  return typeof variable == 'function' ? variable : undefined;
};

module.exports = function (namespace, method) {
  return arguments.length < 2 ? aFunction(path[namespace]) || aFunction(global[namespace])
    : path[namespace] && path[namespace][method] || global[namespace] && global[namespace][method];
};


/***/ }),

/***/ "d11e":
/***/ (function(module) {

module.exports = JSON.parse("{\"/::)\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif\",\"/::~\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif\",\"/::B\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/2.gif\",\"/::|\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/3.gif\",\"/:8-)\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/4.gif\",\"/::<\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif\",\"/::$\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/6.gif\",\"/::X\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/7.gif\",\"/::Z\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/8.gif\",\"/::'(\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/9.gif\",\"/::-|\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/10.gif\",\"/::@\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/11.gif\",\"/::P\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/12.gif\",\"/::D\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/13.gif\",\"/::O\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/14.gif\",\"/::(\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/15.gif\",\"/::+\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/16.gif\",\"/:--b\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/17.gif\",\"/::Q\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/18.gif\",\"/::T\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/19.gif\",\"/:,@P\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/20.gif\",\"/:,@-D\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/21.gif\",\"/::d\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/22.gif\",\"/:,@o\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/23.gif\",\"/::g\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/24.gif\",\"/:|-)\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/25.gif\",\"/::!\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/26.gif\",\"/::L\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/27.gif\",\"/::>\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/28.gif\",\"/::,@\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/29.gif\",\"/:,@f\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/30.gif\",\"/::-S\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/31.gif\",\"/:?\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/32.gif\",\"/:,@x\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/33.gif\",\"/:,@@\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/34.gif\",\"/::8\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/35.gif\",\"/:,@!\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/36.gif\",\"/:!!!\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/37.gif\",\"/:xx\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/38.gif\",\"/:bye\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/39.gif\",\"/:wipe\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/40.gif\",\"/:dig\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/41.gif\",\"/:handclap\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/42.gif\",\"/:&-(\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/43.gif\",\"/:B-)\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/44.gif\",\"/:<@\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/45.gif\",\"/:@>\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/46.gif\",\"/::-O\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/47.gif\",\"/:>-|\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/48.gif\",\"/:P-(\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/49.gif\",\"/::'|\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/50.gif\",\"/:X-)\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/51.gif\",\"/::*\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/52.gif\",\"/:@x\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/53.gif\",\"/:8*\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/54.gif\",\"/:pd\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/55.gif\",\"/:<W>\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/56.gif\",\"/:beer\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/57.gif\",\"/:basketb\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/58.gif\",\"/:oo\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/59.gif\",\"/:coffee\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/60.gif\",\"/:eat\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/61.gif\",\"/:pig\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/62.gif\",\"/:rose\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif\",\"/:fade\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/64.gif\",\"/:showlove\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/65.gif\",\"/:heart\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/66.gif\",\"/:break\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/67.gif\",\"/:cake\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/68.gif\",\"/:li\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/69.gif\",\"/:bome\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/70.gif\",\"/:kn\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/71.gif\",\"/:footb\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/72.gif\",\"/:ladybug\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/73.gif\",\"/:shit\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/74.gif\",\"/:moon\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/75.gif\",\"/:sun\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/76.gif\",\"/:gift\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/77.gif\",\"/:hug\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/78.gif\",\"/:strong\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif\",\"/:weak\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/80.gif\",\"/:share\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/81.gif\",\"/:v\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/82.gif\",\"/:@)\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif\",\"/:jj\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/84.gif\",\"/:@@\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/85.gif\",\"/:bad\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/86.gif\",\"/:lvu\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/87.gif\",\"/:no\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/88.gif\",\"/:ok\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/89.gif\",\"/:love\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/90.gif\",\"/:<L>\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/91.gif\",\"/:jump\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/92.gif\",\"/:shake\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/93.gif\",\"/:<O>\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/94.gif\",\"/:circle\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/95.gif\",\"/:kotow\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/96.gif\",\"/:turn\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/97.gif\",\"/:skip\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/98.gif\",\"/:oY\":\"https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/99.gif\",\":smile:\":{\"panel\":\"6AfH8\",\"position\":\"2px 2px\"},\":mask:\":{\"panel\":\"6AfH8\",\"position\":\"-30px 2px\"},\":joy:\":{\"panel\":\"6AfH8\",\"position\":\"-62px 2px\"},\":stuck_out_tongue_closed_eyes:\":{\"panel\":\"6AfH8\",\"position\":\"-94px 2px\"},\":flushed:\":{\"panel\":\"6AfH8\",\"position\":\"-126px 2px\"},\":scream:\":{\"panel\":\"6AfH8\",\"position\":\"-158px 2px\"},\":pensive:\":{\"panel\":\"6AfH8\",\"position\":\"-190px 2px\"},\":unamused:\":{\"panel\":\"6AfH8\",\"position\":\"-222px 2px\"},\"[Hey]\":{\"panel\":\"6AfH8\",\"position\":\"-254px 2px\"},\"[Facepalm]\":{\"panel\":\"6AfH8\",\"position\":\"-286px 2px\"},\"[Smirk]\":{\"panel\":\"6AfH8\",\"position\":\"-318px 2px\"},\"[Smart]\":{\"panel\":\"6AfH8\",\"position\":\"-350px 2px\"},\"[Concerned]\":{\"panel\":\"6AfH8\",\"position\":\"-382px 2px\"},\"[Yeah!]\":{\"panel\":\"6AfH8\",\"position\":\"-414px 2px\"},\":ghost:\":{\"panel\":\"6AfH8\",\"position\":\"-446px 2px\"},\":pray:\":{\"panel\":\"6AfH8\",\"position\":\"2px -30px\"},\":muscle:\":{\"panel\":\"6AfH8\",\"position\":\"-30px -30px\"},\":tada:\":{\"panel\":\"6AfH8\",\"position\":\"-62px -30px\"},\":gift:\":{\"panel\":\"6AfH8\",\"position\":\"-94px -30px\"},\"[Packet]\":{\"panel\":\"6AfH8\",\"position\":\"-126px -30px\"},\"[好的]\":\"👌\",\"[加油]\":\"💪️\"}");

/***/ }),

/***/ "d1e1":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("9f77");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("c8df3fdc", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "d1e7":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var nativePropertyIsEnumerable = {}.propertyIsEnumerable;
var getOwnPropertyDescriptor = Object.getOwnPropertyDescriptor;

// Nashorn ~ JDK8 bug
var NASHORN_BUG = getOwnPropertyDescriptor && !nativePropertyIsEnumerable.call({ 1: 2 }, 1);

// `Object.prototype.propertyIsEnumerable` method implementation
// https://tc39.github.io/ecma262/#sec-object.prototype.propertyisenumerable
exports.f = NASHORN_BUG ? function propertyIsEnumerable(V) {
  var descriptor = getOwnPropertyDescriptor(this, V);
  return !!descriptor && descriptor.enumerable;
} : nativePropertyIsEnumerable;


/***/ }),

/***/ "d28b":
/***/ (function(module, exports, __webpack_require__) {

var defineWellKnownSymbol = __webpack_require__("746f");

// `Symbol.iterator` well-known symbol
// https://tc39.github.io/ecma262/#sec-symbol.iterator
defineWellKnownSymbol('iterator');


/***/ }),

/***/ "d2bb":
/***/ (function(module, exports, __webpack_require__) {

var anObject = __webpack_require__("825a");
var aPossiblePrototype = __webpack_require__("3bbe");

// `Object.setPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.setprototypeof
// Works with __proto__ only. Old v8 can't work with null proto objects.
/* eslint-disable no-proto */
module.exports = Object.setPrototypeOf || ('__proto__' in {} ? function () {
  var CORRECT_SETTER = false;
  var test = {};
  var setter;
  try {
    setter = Object.getOwnPropertyDescriptor(Object.prototype, '__proto__').set;
    setter.call(test, []);
    CORRECT_SETTER = test instanceof Array;
  } catch (error) { /* empty */ }
  return function setPrototypeOf(O, proto) {
    anObject(O);
    aPossiblePrototype(proto);
    if (CORRECT_SETTER) setter.call(O, proto);
    else O.__proto__ = proto;
    return O;
  };
}() : undefined);


/***/ }),

/***/ "d32c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".quickListBox[data-v-4a1bc502]{padding:0;margin:0;text-align:left;max-height:100px;overflow:auto;width:100%;padding:5px;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);transition:all 2s;box-sizing:border-box}.quickListBox .quickItem[data-v-4a1bc502]{padding:.2rem 0;display:flex}.quickListBox .quickItem[data-v-4a1bc502]:hover{background:#fafafa}.quickListBox .quickItem span[data-v-4a1bc502]{display:inline-block;width:100%;overflow:hidden;white-space:nowrap;text-overflow:ellipsis}.quickListBox .quickItem .enterBtn[data-v-4a1bc502]{align-self:center;cursor:pointer}.quickListBox .quickItem .enterBtn[data-v-4a1bc502]:hover{color:red}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "d3b7":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var redefine = __webpack_require__("6eeb");
var toString = __webpack_require__("b041");

// `Object.prototype.toString` method
// https://tc39.github.io/ecma262/#sec-object.prototype.tostring
if (!TO_STRING_TAG_SUPPORT) {
  redefine(Object.prototype, 'toString', toString, { unsafe: true });
}


/***/ }),

/***/ "d44e":
/***/ (function(module, exports, __webpack_require__) {

var defineProperty = __webpack_require__("9bf2").f;
var has = __webpack_require__("5135");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');

module.exports = function (it, TAG, STATIC) {
  if (it && !has(it = STATIC ? it : it.prototype, TO_STRING_TAG)) {
    defineProperty(it, TO_STRING_TAG, { configurable: true, value: TAG });
  }
};


/***/ }),

/***/ "d784":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

// TODO: Remove from `core-js@4` since it's moved to entry points
__webpack_require__("ac1f");
var redefine = __webpack_require__("6eeb");
var fails = __webpack_require__("d039");
var wellKnownSymbol = __webpack_require__("b622");
var regexpExec = __webpack_require__("9263");
var createNonEnumerableProperty = __webpack_require__("9112");

var SPECIES = wellKnownSymbol('species');

var REPLACE_SUPPORTS_NAMED_GROUPS = !fails(function () {
  // #replace needs built-in support for named groups.
  // #match works fine because it just return the exec results, even if it has
  // a "grops" property.
  var re = /./;
  re.exec = function () {
    var result = [];
    result.groups = { a: '7' };
    return result;
  };
  return ''.replace(re, '$<a>') !== '7';
});

// IE <= 11 replaces $0 with the whole match, as if it was $&
// https://stackoverflow.com/questions/6024666/getting-ie-to-replace-a-regex-with-the-literal-string-0
var REPLACE_KEEPS_$0 = (function () {
  return 'a'.replace(/./, '$0') === '$0';
})();

var REPLACE = wellKnownSymbol('replace');
// Safari <= 13.0.3(?) substitutes nth capture where n>m with an empty string
var REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE = (function () {
  if (/./[REPLACE]) {
    return /./[REPLACE]('a', '$0') === '';
  }
  return false;
})();

// Chrome 51 has a buggy "split" implementation when RegExp#exec !== nativeExec
// Weex JS has frozen built-in prototypes, so use try / catch wrapper
var SPLIT_WORKS_WITH_OVERWRITTEN_EXEC = !fails(function () {
  var re = /(?:)/;
  var originalExec = re.exec;
  re.exec = function () { return originalExec.apply(this, arguments); };
  var result = 'ab'.split(re);
  return result.length !== 2 || result[0] !== 'a' || result[1] !== 'b';
});

module.exports = function (KEY, length, exec, sham) {
  var SYMBOL = wellKnownSymbol(KEY);

  var DELEGATES_TO_SYMBOL = !fails(function () {
    // String methods call symbol-named RegEp methods
    var O = {};
    O[SYMBOL] = function () { return 7; };
    return ''[KEY](O) != 7;
  });

  var DELEGATES_TO_EXEC = DELEGATES_TO_SYMBOL && !fails(function () {
    // Symbol-named RegExp methods call .exec
    var execCalled = false;
    var re = /a/;

    if (KEY === 'split') {
      // We can't use real regex here since it causes deoptimization
      // and serious performance degradation in V8
      // https://github.com/zloirock/core-js/issues/306
      re = {};
      // RegExp[@@split] doesn't call the regex's exec method, but first creates
      // a new one. We need to return the patched regex when creating the new one.
      re.constructor = {};
      re.constructor[SPECIES] = function () { return re; };
      re.flags = '';
      re[SYMBOL] = /./[SYMBOL];
    }

    re.exec = function () { execCalled = true; return null; };

    re[SYMBOL]('');
    return !execCalled;
  });

  if (
    !DELEGATES_TO_SYMBOL ||
    !DELEGATES_TO_EXEC ||
    (KEY === 'replace' && !(
      REPLACE_SUPPORTS_NAMED_GROUPS &&
      REPLACE_KEEPS_$0 &&
      !REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    )) ||
    (KEY === 'split' && !SPLIT_WORKS_WITH_OVERWRITTEN_EXEC)
  ) {
    var nativeRegExpMethod = /./[SYMBOL];
    var methods = exec(SYMBOL, ''[KEY], function (nativeMethod, regexp, str, arg2, forceStringMethod) {
      if (regexp.exec === regexpExec) {
        if (DELEGATES_TO_SYMBOL && !forceStringMethod) {
          // The native String method already delegates to @@method (this
          // polyfilled function), leasing to infinite recursion.
          // We avoid it by directly calling the native @@method method.
          return { done: true, value: nativeRegExpMethod.call(regexp, str, arg2) };
        }
        return { done: true, value: nativeMethod.call(str, regexp, arg2) };
      }
      return { done: false };
    }, {
      REPLACE_KEEPS_$0: REPLACE_KEEPS_$0,
      REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE: REGEXP_REPLACE_SUBSTITUTES_UNDEFINED_CAPTURE
    });
    var stringMethod = methods[0];
    var regexMethod = methods[1];

    redefine(String.prototype, KEY, stringMethod);
    redefine(RegExp.prototype, SYMBOL, length == 2
      // 21.2.5.8 RegExp.prototype[@@replace](string, replaceValue)
      // 21.2.5.11 RegExp.prototype[@@split](string, limit)
      ? function (string, arg) { return regexMethod.call(string, this, arg); }
      // 21.2.5.6 RegExp.prototype[@@match](string)
      // 21.2.5.9 RegExp.prototype[@@search](string)
      : function (string) { return regexMethod.call(string, this); }
    );
  }

  if (sham) createNonEnumerableProperty(RegExp.prototype[SYMBOL], 'sham', true);
};


/***/ }),

/***/ "d81d":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var $map = __webpack_require__("b727").map;
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('map');
// FF49- issue
var USES_TO_LENGTH = arrayMethodUsesToLength('map');

// `Array.prototype.map` method
// https://tc39.github.io/ecma262/#sec-array.prototype.map
// with adding support of @@species
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  map: function map(callbackfn /* , thisArg */) {
    return $map(this, callbackfn, arguments.length > 1 ? arguments[1] : undefined);
  }
});


/***/ }),

/***/ "da84":
/***/ (function(module, exports, __webpack_require__) {

/* WEBPACK VAR INJECTION */(function(global) {var check = function (it) {
  return it && it.Math == Math && it;
};

// https://github.com/zloirock/core-js/issues/86#issuecomment-115759028
module.exports =
  // eslint-disable-next-line no-undef
  check(typeof globalThis == 'object' && globalThis) ||
  check(typeof window == 'object' && window) ||
  check(typeof self == 'object' && self) ||
  check(typeof global == 'object' && global) ||
  // eslint-disable-next-line no-new-func
  Function('return this')();

/* WEBPACK VAR INJECTION */}.call(this, __webpack_require__("c8ba")))

/***/ }),

/***/ "db93":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("2b85");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("b0ba5c54", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "dbb4":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var ownKeys = __webpack_require__("56ef");
var toIndexedObject = __webpack_require__("fc6a");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var createProperty = __webpack_require__("8418");

// `Object.getOwnPropertyDescriptors` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptors
$({ target: 'Object', stat: true, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptors: function getOwnPropertyDescriptors(object) {
    var O = toIndexedObject(object);
    var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
    var keys = ownKeys(O);
    var result = {};
    var index = 0;
    var key, descriptor;
    while (keys.length > index) {
      descriptor = getOwnPropertyDescriptor(O, key = keys[index++]);
      if (descriptor !== undefined) createProperty(result, key, descriptor);
    }
    return result;
  }
});


/***/ }),

/***/ "ddb0":
/***/ (function(module, exports, __webpack_require__) {

var global = __webpack_require__("da84");
var DOMIterables = __webpack_require__("fdbc");
var ArrayIteratorMethods = __webpack_require__("e260");
var createNonEnumerableProperty = __webpack_require__("9112");
var wellKnownSymbol = __webpack_require__("b622");

var ITERATOR = wellKnownSymbol('iterator');
var TO_STRING_TAG = wellKnownSymbol('toStringTag');
var ArrayValues = ArrayIteratorMethods.values;

for (var COLLECTION_NAME in DOMIterables) {
  var Collection = global[COLLECTION_NAME];
  var CollectionPrototype = Collection && Collection.prototype;
  if (CollectionPrototype) {
    // some Chrome versions have non-configurable methods on DOMTokenList
    if (CollectionPrototype[ITERATOR] !== ArrayValues) try {
      createNonEnumerableProperty(CollectionPrototype, ITERATOR, ArrayValues);
    } catch (error) {
      CollectionPrototype[ITERATOR] = ArrayValues;
    }
    if (!CollectionPrototype[TO_STRING_TAG]) {
      createNonEnumerableProperty(CollectionPrototype, TO_STRING_TAG, COLLECTION_NAME);
    }
    if (DOMIterables[COLLECTION_NAME]) for (var METHOD_NAME in ArrayIteratorMethods) {
      // some Chrome versions have non-configurable methods on DOMTokenList
      if (CollectionPrototype[METHOD_NAME] !== ArrayIteratorMethods[METHOD_NAME]) try {
        createNonEnumerableProperty(CollectionPrototype, METHOD_NAME, ArrayIteratorMethods[METHOD_NAME]);
      } catch (error) {
        CollectionPrototype[METHOD_NAME] = ArrayIteratorMethods[METHOD_NAME];
      }
    }
  }
}


/***/ }),

/***/ "de9b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
var ___CSS_LOADER_GET_URL_IMPORT___ = __webpack_require__("1de5");
var ___CSS_LOADER_URL_IMPORT_0___ = __webpack_require__("aa20");
var ___CSS_LOADER_URL_IMPORT_1___ = __webpack_require__("6326");
var ___CSS_LOADER_URL_IMPORT_2___ = __webpack_require__("57b0");
var ___CSS_LOADER_URL_IMPORT_3___ = __webpack_require__("c0f7");
exports = ___CSS_LOADER_API_IMPORT___(false);
var ___CSS_LOADER_URL_REPLACEMENT_0___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___);
var ___CSS_LOADER_URL_REPLACEMENT_1___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_0___, { hash: "#iefix" });
var ___CSS_LOADER_URL_REPLACEMENT_2___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_1___);
var ___CSS_LOADER_URL_REPLACEMENT_3___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_2___);
var ___CSS_LOADER_URL_REPLACEMENT_4___ = ___CSS_LOADER_GET_URL_IMPORT___(___CSS_LOADER_URL_IMPORT_3___, { hash: "#iconfont" });
// Module
exports.push([module.i, "@font-face{font-family:iconfont;src:url(" + ___CSS_LOADER_URL_REPLACEMENT_0___ + ");src:url(" + ___CSS_LOADER_URL_REPLACEMENT_1___ + ") format(\"embedded-opentype\"),url(\"data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAABTcAAsAAAAAJJwAABSOAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCGOgq2QKl4ATYCJANkCzQABCAFhG0HgkQbWB2joprVCdlfHfCG1Ed3sDBViaqzxqMWHXO/zro6gQC24LDryJu8f4a+Mg2l9OH5Of1z330Rfy9xrAlQAw9WQ0Jw74ZJXUNdoKJUtkH3C8xaBypmtOtnwtTz/3JKVU4TZXI1P6lnnQmFD6GRn0dI7XYfYXrXtED8oDrb4LvlNyc/CfIkgmyOPDNJ24nBTUza3/Y3bZDzgU8FuLnQkuYK537vttq3QdN+8johptm/imiCK53ZWh9AVIibMlUmXaGV8QQer+wHPcsfkMyyA1IAqei+S1FaDkmPIeAyKerm2/R1IDcSPaX/RJVCX5uBeNVOckLKVErNw+PqQABI4cEPiTu7aZEiWDCOYIVxWjFSdIXBxvQhEAeFIU2yIBsggJhZyVwHsJ7/fdIPa8QAAwEFs826U0EOPvn2GHU4HXjnitFYnAzgoSmAAvADsAAjDa0jLKhJ/DgvDXtXLB4DGMSMhbCP7ZP2eQmTqUCR0aba3vf1Xt/dXnpnf98eczqhj4i0y1iIElO2liUJBvGT2gUsOIj19gAlVBBCAim0ODwdAj01DXbo/o8HChFkMJBDAQZGIEKQeeQAQIKQMEIfUaaBEuhjpoEK6KPTQAj0sdNAAvRJOXDBCwgthDAgOAgZQPAQMoHQQSgAgkAoAkIPoQQINYTRQGggTAGChTAVCAGE7UCIIXwBBIXwFRAiCN9jGsiAL6IQBgilQMghdGIaKIB+6TRggG+PrQYjADBpTVgBH4L4ACBtAhNPUZkFQ3myneMEcmgWH69ahH0oJKJKI9y7ScCyEolQyLKLFosVSrncPrnorlVyrnqFRCzzoCIqiH4sZXXy/JxELjdQoVAYFAnLCiVWdkPSiwq6BAmnNutoGKWMTqwTMKx7clYXr3pSqg+YWrmcSMrGRN0pNVKVSa80cgbl8WfZMB9Wyg5nw1ZAJKwXS+2jaUKJH0vjNhW+rFyukCjnQkuCeFF//xcdx1adaDxZ8F93vG/k1qlHAQ9Gy/h9gCfhfOIHV/BBpu4yBX9UqVz5Q/W85Ey36+lh9HozgY95557NGHv+8dmn043h2pkF3cInPLVncyf9RT7+XlpP9+r04e4+6boCd8XHX49A7UsVxPH+BFwIx2b6w6mc5MIhDrrPutkh+2f1YRIpqdZT2Zau8WhmC5ZcYALJdCmRp7ZD1LziULaLVNZWbUl9lW7+t2AJPPzkgxuY47qwK65QHpDhMHvV6AyP5FOU5TQbSUfZ7f1422YWY1VGmo0cSSfnFoW1irJ/llG2xMvPt8yKh2OjM2N0gy94Cx6ZlpuIOg6TaHnuyisCVlIdshcC3nL2183XpSTlZDnN19KWTCbPPn/bwjdc7COqtRJir5N3HGWX96qDfaiFSeC69Ii3R1arLH3ih6154nT9cjBujO6TzKQarcQGXOpyPkgPif3OVSVTBaCuacsA7UM827Nlnxv/ZhU8Ox9k9L6hZf3qqNqQqr3Vi1EsEseYxQhATqnqXmqg2C5yR4wMCZcySamFsYGpRamLsSDEEdALJjRDtoTC44xJh1Cggq1DpgpXMiuLQtdkyGOBl0nTMjKWMCbLyXQzvVv3L617cO9UDXACGJI7kQJ15UpW9eVaEFodAMypdLjcVmC86mP9HCpoCLlr7Xa0L1CJ1VDQq+rs6u1Dc784n3liRDubaVVfoH+FAsEQlRHIBsu6gmzCCRWmdJBAIwuESJj6iiZZPwkS3FeuwirXSgS4qAAAK+UXKE6lN4T6kKIrElztkBIA23Itq2NO2e1sqWW07anDnSGjgNlRuwu3Uhw0K7rr3lpDqCfUdhKCwmaGHtM+E4AEA26BNu7BkHXnFZHDBAo8MOH9GL5tcxf0Ga1EqNSbM9kKspUgm61ylmXD+wbNY5cSpQQXglZSWjdaSfBSLZJT2Fw0X794Nr0a6hyiOpbjfc+qx+NLXEpMQN3tn6QJu5R1GWSN6gMCZ7TPmuhSdUDnuCxdiNB2JAMYMywwkwyIJc4mvWzpNZTG75Rvrmx107dX669e1XtoUB8Dps/H38hFBI7UXkmk0dUSF7r+Z1vhcmmq8VqMUJc2Ysf83tvFuGTx5uvpIp2a6cs979Ny0iHJ+qtR2r1bqEePeppLwWZClgoMVmjAbZRKeL5Rb7vSLDT2NYXsDCzfVLjUX9BilYGlV8R7G5Hh6fkRkr+YDJ9/PFOCQXO9yRbZIBOAnSSF9XrWYpxhphg2DXen652yKaVgYfJwnMlGalk/U8BqtkExScIOIYMdPIAvyWYCb4R4VVA2zQYNiFq+ntGiRh0FG6NloVG3Q2usmmre4j5zlDY+CpUuREROYY0RUv8wXL0cL4IlJl0vK6mwUbhwg6EwmlvCfF0WjMVqQIDFJtkQqnGUmgDsdAFWkoKZQ1qCreXb1+Og0Ll345XJzjmqA8ZQIZ5YTxYIsNoVsC51jgGz2KzW0aFczyuOI60L2VJNcbQ9oSmAPjUQsCqNQj9tkEDHGrlaae29njXqyWC1GbFKI8U5UqCisNuFQ6ivIVXnriBKEPkGPawBoA65BtVMq6JNU725RWD6LP7DjfJF67K41E8JtyC0avk8CdoIyWahAKF2f6aqzjKBpaOMFdMjAmZWNX2+5304U4aQcpQEKKF81HpYiB376Fx3KMpgMQ7KzBpiWVyIUsWlWW6hUCwyLJayWp7Wi8sTJW8rcTPv5gf0cvLmwAolE45inEvMDMIeY4kzXf+jxTuEVmJUIu4scprhApQ/Wk9e/Pj885nIODlgzl8uRwAvBJBkMWHzTKTQhTB/8XJ8JlzcJibDK096b3pcf9Ups+rrx9/u6eDxmX2B7526+AKcQl1lRDex/EIAvjUYe2RzNV3teckycQBlgyaRaHvRUcrMfuNE940jb7wyixl3dunqr/ly7L1jcwpqoxISAHN0UBo7Mi03crT+vqlrJuCYLHClWi2X7zjaC2GC+6sdoyodyBUgE1AOmIaIjrVr3AJ8YZwsX5TNfSBk1SJ8MHhMmYIKAmYnFTiggbugVSsykG8nw3YzvjAsMS+0MLzv0INDosLH7oOa1w9teaVRXy9wD/dSLbNrrjnZsVrzLP8tmDQP9PMj990PkIXzs7MncseX63MNk1RWVTD078PhtDqtZn482TIi+i/KUvp3Q7S4Vqzehj+PXPf3v+4nS4z/uwcFcG7iSZUKJ1NT9eBIx8s6pVLiX7cf0qzeRXyJ3V7CF3lb01QgtsJCm7j3Ow+Plz++/lal/8O5XrP6lPSv22xs2t+PTsr8Sv9+kDHspycXRHul/SdKR7w53irtlD47PSji8y5EMZZ4RevtuBff/iCsYVsSitpiYkn87eOKMLU97gYmNMR8HMq8aROWfraqOWCsIa3SzMqSgyanBXHD5gZOTJax5so0g39DniknYur4PGWrIn5CvS0YfyTs2Y2Z/NRpqtJ3e4dfkd8AzrLHw6t6J2kmTWJWmCNk25og+PJRhWr59q5kJBPFVbexH1wsLBjZFPBUmUQSsWGFDPWokzfv27GIedrNHGS70QXBIvVHVwOGdF1RRsdFcdxcTIDyuCJIf7qitLR9m1wo4jVnkf90nEYsljVJyvvKg7x+CJqt3XXcwygmMX79IdOCxseIRJT1aN015IMNvVxuqbPnh60yW+iUcwWhnwnsf0TUzHIr3DS1rTsm537ZUpvofOitsP9+nqvYL7ob/JFaeuw5RIv/39D9b4ZUzydMBE1xMy1Imn9zzQDRq3rWUB8U82B/1ZDl7h6mQoElatD4wVTrR9ciukURI6CWucmxBctY9pzhz9zZg9dV8Szxsr0XapsS9UPKxxdPvGHG+SRUpyXbFvzTQWiyW9S2Nym7w1/0zL3tYx3VPOLomItjfV4L1oXt3nm6o6Pz/fQPqla+Ozv9yO6WSftGjfs0xW/yXllLy0FQh16Ka7u3zPt1YpQ8aqLsU/mnHhra4lNu2q9rGVrh0pJp5kIYQswWSghjNjMghAviiWYJpRwllOGMAp4jDFGDS1ZMoVwQJ2wSWMCYLSB3aoiZMzNiJj8nVBML0RDzZ01Zci7iZ4u4lfuA287tgBNusjzPbp+bPL+BneHxhDWbWQJPHoCflsn9a1XirCGt4+sxkIW4drmFuHW5hrT7tBNVhoborpQazhKuwS0iIvOqHSUlsHtwSbGdYHEx1ezFJReihGwkZyfVZNdmF2Tno3+sTb0/QExtdN5Wx9Xm14/tBr88a6mOrvs+Y2HDtYVjxsb4+oDikIbEpFXBuuhEWN+l4pamN/KQXgusnW37QqRt0pB96RvLDo9WZBQ4rzw/uqCtKbosqlx1P6Y9ZujCGJ8YJB9Xbo+S5CCfXm356JXy1nb0+q/mcRLbqfz2GmvY5FzYmxVR8j5T8cQUU4a8Trrm+YmDFIaXQ9fQ/IK1KUOnLV+fyJvtBwXPT2JU5zShgPKfU5+tRaZ3Buwe8I5pzDLXn3iBANr4+JhdMWvSFj7rcrXvq63dl9glNqTLPI+/FqqvZSkNU9o9v0rAyB92GV2u9+2zRawKqOzOykt8Pzwx/vevriToLjg2672JOWRv8Oaw+xcXjsju6M55VfZ7rrbzk5ogwW/cmFZJdPAv7jZIzUfnfVQ8NLt9X3aVNSRMEKUbmL/0jK2+ohKJkwIbH75F3dsUx8cjJoRuxvydYbaODtsSfmaYwE/njbrY2CcA8WLSrPgqFRwc1hXjchYFrqGx6p8mJR24ENooWWVeNtJYVXTN5r5OFaeIVUy3vVsxapYkNtc7fshi/T+VASf+mL/mTXi1AtZjlzq+fVOrsOObtvWPLgdUJdyG1+p5ri8DvPugVuQmsr8CSM1DNRLN4LBeuwRvZcShkoPp37DrgIIXA2GQ8LBE/sgBk716N+oFrpJLh0w/ydqD/8uPsaxJV88+21NVXotqh7vijGWlgiAvkWD+UZ+4yTm1A7N4q3XwTDU8SbAMz1D8bLmYA6ZlZ3FQ7Vyz7lTqAgW+xd/6gSHEzIc9JoeDZGVXzRiol0hO6AZZiSewvYWQxK20nTOhi3ZxYuiXOcqJgtbOdPCghxwuMCmK+y0Phc5K3xZG/vRCc+d5c9CNjUfeSzUqjmg+728yX3NsP7xZn3gH+J6Cz5kik56ekpMfrpdJz33WM8ux/PXbdVNnmpavmA19GAGEb4F4NlQQ/xLK9qxdP325cfmr19cfb9WHFeRMGQmUvbzeXzGAlbvnjNdFeLie9S9H1WRJY25NhEFsjEda1ShuzKkNN0iMA/GZ1yRTD+9n4k7XPud7+Oe1pzmTH9/TcYCr5T2dnpPoIr6WOx66Y5SA28a7x15JVKTYw42znMlFWdqykLKZ1O5pL9WWhmRkJRcNis23IeCPwbFlLmX+GDOSi/xj8mx5/sVneAxlbu6xZVxZRBrzkosGxBXaC83J55JXVIa/v48PLJ060j1sQG1UYZ6txns8zfAoGiYeOqRaNM7YEF6cnvA2x3bQw53IOfEPXQ/MZtJu3LxihO3QM5PAAm5LsBpkIMPX/6i6wlvUfNPS9Nn+aRK/Tf8k361NVz1+3EnUalJUfL/pZub2oreL18/P1B1NWrij7PTiAw0jmk3l4Z4FNZaq36zW36osNQWe4eUatb9z9a/df61WjNJ/fy+pIdH4teYc8/CNNYvyx75Zs6fS2Ym67iflVZ73nI+0OY/s83h31e44+1PDost1M6bvUbrn31vcWRxtJ0BYEyF8UzjAhTfBanP7lg9kQ0NZzm62I3AjIZ5p/jSg/LS1MDqj5NCxjy9nsPsao3KDR++K8vkwRJfwz996/TIXu/K/huxRM+OkW3rB4ySBT92o1ol7khJX3nz+/vRprhHf2MVx4m+Ef06bbvPiLXxe/83anv2NO1M9VGLxHENQSMm1Dy4L+PrTH65csXxm287k4en+eUdtGY3Gk/MXHZu5qs5VRrWf7Nu0YHyWdm/HKE1z7NVPUS+V1IPcLalJbT7suUJLsDCvOR/e8VkmicSYlTC7hovt06v1FFYtL4BXQrlaUx4/G0StGgvLGBXP+bpB/oMidlJvOradw4juj3FH25cddYbz42NjzX4zR800cRv8TLwYw7mQm70k5hy3dQ8rZk83cY5pe+5Pq7oHM7WfYf/9d+Ase+bCHdZmNnCWfOjn6Bb2yWPaQg8Uabkf/PgxPcAw94xf1IrXnq8VXpkDObe4iPzocmN7ctXacnZuV0Zi/IdzcoErGTlYuXV2yMLnNACAlmQI71eQftg3N/1hmLnw130/htHTzJ68/2dshDgX0uPU4VT9LwZqzeojVmPTbYCzifbS8tuY3+l95ssxD9pFA6mTbBFad5tpNOKXe5YOw+qhzI/g7GppHLkswkJ72i+pEckztIfa/ztxNvSMfVdZY9SvYvRPjCXPXvwmDs2iFuY6AIjBRFUS4D8PpxucTmAffSxi2uvWKMfA6RTZArgrHGfyF43GAJBKBwD/fahRe9ksUSfs+T+MqLNpBiK40xRieFNsBz9aABlCaSHEiKal8JXYvAwaU2RAWAkAH0tvNAHnKM1AibM0BecGxXZ4QQug9y0tBBdKS1EQzUXKMCgNZbsBZkHQ9oBqjqHsEls2VnRAJT4zTh8f/QIm1kvoWkCQN3UOIZgiHOKuWrdWUmkwoGe3awPfRxoZ7AC3y6610f5KYG2Y4zLHgJRhZwDGapMLVKXB3A04FJKntsq+P+8ASsLHmJhNvs39AhgxXUEF/7NokwLUOR8KbbIp5qm6lHXTiCxRZW0DBagEIgNfiiNqUviZOgBnLavPoEX2BZJd1Yryy9WLwbrgMfs2yxo3hSGUsERAhERExETyd5FnJScKoiQqwhGeqImGaImO6ImBGImJuEA0RrPQYjLKu/z2x6phgv4huA4bMMCkQzO4JLoJDyQqmB2H6FXnDDq/SWitDiJXE0R2kNcucq1QB6ESCWYqfL+Q7XAUsFaM5YMAQhvXDf1SrEPlQ6pLYNrPVmub5Mbp2NXFOS7LWMHCQkVWHAr1GKo2w3xE4UiHuWo9dHVhJoQNIsUnd1ckQgAA\") format(\"woff2\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_2___ + ") format(\"woff\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_3___ + ") format(\"truetype\"),url(" + ___CSS_LOADER_URL_REPLACEMENT_4___ + ") format(\"svg\")}.index_iconfont_18Yo7{font-family:iconfont!important;font-size:16px;font-style:normal;-webkit-font-smoothing:antialiased;-moz-osx-font-smoothing:grayscale}.index_icon-jiantou_EnTV9:before{content:\"\\e656\"}.index_icon-jiantou_xiangzuoliangci_1LjeY:before{content:\"\\eb0a\"}.index_icon-jiantou_xiangyouliangci_1ALjv:before{content:\"\\e6e7\"}.index_icon-jiantou-xiangzuo_1aKIO:before{content:\"\\e672\"}.index_icon-jiantou-xiangyou_2D0HU:before{content:\"\\e673\"}.index_icon-look_2RAx3:before{content:\"\\e603\"}.index_icon-zyj_unlooked_2UiuV:before{content:\"\\e6e9\"}.index_icon-empty_10V3u:before{content:\"\\e699\"}.index_icon-empty1_C3fM7:before{content:\"\\e604\"}.index_icon-gengduo_1vykO:before{content:\"\\e60a\"}.index_icon-all_2l-Yd:before{content:\"\\e6ef\"}.index_icon-QRcode1_2T9pU:before{content:\"\\e75e\"}.index_icon-comments_3tsAE:before{content:\"\\e7b2\"}.index_icon-comment-single_1ykLl:before{content:\"\\e601\"}.index_icon-email_5mBOn:before{content:\"\\e602\"}.index_icon-ditu_2-Lbx:before{content:\"\\e635\"}.index_icon-lishi_1ZrK5:before{content:\"\\e64e\"}.index_icon-zhangdan_1Zh1G:before{content:\"\\e65a\"}.index_icon-xiangce_3sH8t:before{content:\"\\e65b\"}.index_icon-hongbao_6bWVC:before{content:\"\\e623\"}.index_icon-shipin_1XHCH:before{content:\"\\e64f\"}.index_icon-dizhi_3zISq:before{content:\"\\e658\"}.index_icon-wenjian_1Hp26:before{content:\"\\e73e\"}.index_icon-xiaolian_U-OcR:before{content:\"\\edb8\"}", ""]);
// Exports
exports.locals = {
	"iconfont": "index_iconfont_18Yo7",
	"icon-jiantou": "index_icon-jiantou_EnTV9",
	"icon-jiantou_xiangzuoliangci": "index_icon-jiantou_xiangzuoliangci_1LjeY",
	"icon-jiantou_xiangyouliangci": "index_icon-jiantou_xiangyouliangci_1ALjv",
	"icon-jiantou-xiangzuo": "index_icon-jiantou-xiangzuo_1aKIO",
	"icon-jiantou-xiangyou": "index_icon-jiantou-xiangyou_2D0HU",
	"icon-look": "index_icon-look_2RAx3",
	"icon-zyj_unlooked": "index_icon-zyj_unlooked_2UiuV",
	"icon-empty": "index_icon-empty_10V3u",
	"icon-empty1": "index_icon-empty1_C3fM7",
	"icon-gengduo": "index_icon-gengduo_1vykO",
	"icon-all": "index_icon-all_2l-Yd",
	"icon-QRcode1": "index_icon-QRcode1_2T9pU",
	"icon-comments": "index_icon-comments_3tsAE",
	"icon-comment-single": "index_icon-comment-single_1ykLl",
	"icon-email": "index_icon-email_5mBOn",
	"icon-ditu": "index_icon-ditu_2-Lbx",
	"icon-lishi": "index_icon-lishi_1ZrK5",
	"icon-zhangdan": "index_icon-zhangdan_1Zh1G",
	"icon-xiangce": "index_icon-xiangce_3sH8t",
	"icon-hongbao": "index_icon-hongbao_6bWVC",
	"icon-shipin": "index_icon-shipin_1XHCH",
	"icon-dizhi": "index_icon-dizhi_3zISq",
	"icon-wenjian": "index_icon-wenjian_1Hp26",
	"icon-xiaolian": "index_icon-xiaolian_U-OcR"
};
module.exports = exports;


/***/ }),

/***/ "df75":
/***/ (function(module, exports, __webpack_require__) {

var internalObjectKeys = __webpack_require__("ca84");
var enumBugKeys = __webpack_require__("7839");

// `Object.keys` method
// https://tc39.github.io/ecma262/#sec-object.keys
module.exports = Object.keys || function keys(O) {
  return internalObjectKeys(O, enumBugKeys);
};


/***/ }),

/***/ "e01a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";
// `Symbol.prototype.description` getter
// https://tc39.github.io/ecma262/#sec-symbol.prototype.description

var $ = __webpack_require__("23e7");
var DESCRIPTORS = __webpack_require__("83ab");
var global = __webpack_require__("da84");
var has = __webpack_require__("5135");
var isObject = __webpack_require__("861d");
var defineProperty = __webpack_require__("9bf2").f;
var copyConstructorProperties = __webpack_require__("e893");

var NativeSymbol = global.Symbol;

if (DESCRIPTORS && typeof NativeSymbol == 'function' && (!('description' in NativeSymbol.prototype) ||
  // Safari 12 bug
  NativeSymbol().description !== undefined
)) {
  var EmptyStringDescriptionStore = {};
  // wrap Symbol constructor for correct work with undefined description
  var SymbolWrapper = function Symbol() {
    var description = arguments.length < 1 || arguments[0] === undefined ? undefined : String(arguments[0]);
    var result = this instanceof SymbolWrapper
      ? new NativeSymbol(description)
      // in Edge 13, String(Symbol(undefined)) === 'Symbol(undefined)'
      : description === undefined ? NativeSymbol() : NativeSymbol(description);
    if (description === '') EmptyStringDescriptionStore[result] = true;
    return result;
  };
  copyConstructorProperties(SymbolWrapper, NativeSymbol);
  var symbolPrototype = SymbolWrapper.prototype = NativeSymbol.prototype;
  symbolPrototype.constructor = SymbolWrapper;

  var symbolToString = symbolPrototype.toString;
  var native = String(NativeSymbol('test')) == 'Symbol(test)';
  var regexp = /^Symbol\((.*)\)[^)]+$/;
  defineProperty(symbolPrototype, 'description', {
    configurable: true,
    get: function description() {
      var symbol = isObject(this) ? this.valueOf() : this;
      var string = symbolToString.call(symbol);
      if (has(EmptyStringDescriptionStore, symbol)) return '';
      var desc = native ? string.slice(7, -1) : string.replace(regexp, '$1');
      return desc === '' ? undefined : desc;
    }
  });

  $({ global: true, forced: true }, {
    Symbol: SymbolWrapper
  });
}


/***/ }),

/***/ "e163":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var toObject = __webpack_require__("7b0b");
var sharedKey = __webpack_require__("f772");
var CORRECT_PROTOTYPE_GETTER = __webpack_require__("e177");

var IE_PROTO = sharedKey('IE_PROTO');
var ObjectPrototype = Object.prototype;

// `Object.getPrototypeOf` method
// https://tc39.github.io/ecma262/#sec-object.getprototypeof
module.exports = CORRECT_PROTOTYPE_GETTER ? Object.getPrototypeOf : function (O) {
  O = toObject(O);
  if (has(O, IE_PROTO)) return O[IE_PROTO];
  if (typeof O.constructor == 'function' && O instanceof O.constructor) {
    return O.constructor.prototype;
  } return O instanceof Object ? ObjectPrototype : null;
};


/***/ }),

/***/ "e177":
/***/ (function(module, exports, __webpack_require__) {

var fails = __webpack_require__("d039");

module.exports = !fails(function () {
  function F() { /* empty */ }
  F.prototype.constructor = null;
  return Object.getPrototypeOf(new F()) !== F.prototype;
});


/***/ }),

/***/ "e225":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".wrapper[data-v-244b2bce]{padding:0;height:100%;max-width:100%;width:0;min-width:220px;margin:0 auto}li[data-v-244b2bce]{list-style:none}.notice[data-v-244b2bce]{height:30%;text-align:left;position:relative}.notice .empty[data-v-244b2bce]{position:absolute;left:50%;transform:translateX(-50%)}.userList[data-v-244b2bce]{height:70%;text-align:left;border-top:1px solid rgba(0,0,0,.1)}.userList li[data-v-244b2bce]{height:2rem;line-height:2rem;padding:.2rem}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e260":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var toIndexedObject = __webpack_require__("fc6a");
var addToUnscopables = __webpack_require__("44d2");
var Iterators = __webpack_require__("3f8c");
var InternalStateModule = __webpack_require__("69f3");
var defineIterator = __webpack_require__("7dd0");

var ARRAY_ITERATOR = 'Array Iterator';
var setInternalState = InternalStateModule.set;
var getInternalState = InternalStateModule.getterFor(ARRAY_ITERATOR);

// `Array.prototype.entries` method
// https://tc39.github.io/ecma262/#sec-array.prototype.entries
// `Array.prototype.keys` method
// https://tc39.github.io/ecma262/#sec-array.prototype.keys
// `Array.prototype.values` method
// https://tc39.github.io/ecma262/#sec-array.prototype.values
// `Array.prototype[@@iterator]` method
// https://tc39.github.io/ecma262/#sec-array.prototype-@@iterator
// `CreateArrayIterator` internal method
// https://tc39.github.io/ecma262/#sec-createarrayiterator
module.exports = defineIterator(Array, 'Array', function (iterated, kind) {
  setInternalState(this, {
    type: ARRAY_ITERATOR,
    target: toIndexedObject(iterated), // target
    index: 0,                          // next index
    kind: kind                         // kind
  });
// `%ArrayIteratorPrototype%.next` method
// https://tc39.github.io/ecma262/#sec-%arrayiteratorprototype%.next
}, function () {
  var state = getInternalState(this);
  var target = state.target;
  var kind = state.kind;
  var index = state.index++;
  if (!target || index >= target.length) {
    state.target = undefined;
    return { value: undefined, done: true };
  }
  if (kind == 'keys') return { value: index, done: false };
  if (kind == 'values') return { value: target[index], done: false };
  return { value: [index, target[index]], done: false };
}, 'values');

// argumentsList[@@iterator] is %ArrayProto_values%
// https://tc39.github.io/ecma262/#sec-createunmappedargumentsobject
// https://tc39.github.io/ecma262/#sec-createmappedargumentsobject
Iterators.Arguments = Iterators.Array;

// https://tc39.github.io/ecma262/#sec-array.prototype-@@unscopables
addToUnscopables('keys');
addToUnscopables('values');
addToUnscopables('entries');


/***/ }),

/***/ "e30f":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".empty[data-v-6cf286f3]{width:100%;height:100%;margin:0 auto;display:flex;align-items:center;justify-content:center;position:relative}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e439":
/***/ (function(module, exports, __webpack_require__) {

var $ = __webpack_require__("23e7");
var fails = __webpack_require__("d039");
var toIndexedObject = __webpack_require__("fc6a");
var nativeGetOwnPropertyDescriptor = __webpack_require__("06cf").f;
var DESCRIPTORS = __webpack_require__("83ab");

var FAILS_ON_PRIMITIVES = fails(function () { nativeGetOwnPropertyDescriptor(1); });
var FORCED = !DESCRIPTORS || FAILS_ON_PRIMITIVES;

// `Object.getOwnPropertyDescriptor` method
// https://tc39.github.io/ecma262/#sec-object.getownpropertydescriptor
$({ target: 'Object', stat: true, forced: FORCED, sham: !DESCRIPTORS }, {
  getOwnPropertyDescriptor: function getOwnPropertyDescriptor(it, key) {
    return nativeGetOwnPropertyDescriptor(toIndexedObject(it), key);
  }
});


/***/ }),

/***/ "e48c":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".item[data-v-a477b5c4]{display:flex;align-items:center;position:relative}.item .cover[data-v-a477b5c4]{border-radius:50%;margin-right:12px;box-shadow:0 3px 3px 0 rgba(0,0,0,.1);cursor:pointer}.item .info[data-v-a477b5c4]{display:flex;flex-direction:column;justify-content:center}.item .info p[data-v-a477b5c4]{margin:0;padding:0;text-overflow:ellipsis;overflow:hidden;text-align:left;white-space:nowrap;font-size:13px;cursor:pointer}.item .info p[data-v-a477b5c4]:hover{opacity:.8}.item .info p[data-v-a477b5c4]:last-child{font-size:12px}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "e538":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");

exports.f = wellKnownSymbol;


/***/ }),

/***/ "e88c":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_systemTalk_vue_vue_type_style_index_0_id_7a8b6269_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__("b26b");
/* harmony import */ var _node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_systemTalk_vue_vue_type_style_index_0_id_7a8b6269_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default = /*#__PURE__*/__webpack_require__.n(_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_systemTalk_vue_vue_type_style_index_0_id_7a8b6269_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0__);
/* unused harmony reexport * */
 /* unused harmony default export */ var _unused_webpack_default_export = (_node_modules_vue_style_loader_index_js_ref_8_oneOf_1_0_node_modules_css_loader_dist_cjs_js_ref_8_oneOf_1_1_node_modules_vue_loader_lib_loaders_stylePostLoader_js_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_2_node_modules_postcss_loader_src_index_js_ref_8_oneOf_1_3_node_modules_sass_loader_dist_cjs_js_ref_8_oneOf_1_4_node_modules_cache_loader_dist_cjs_js_ref_0_0_node_modules_vue_loader_lib_index_js_vue_loader_options_systemTalk_vue_vue_type_style_index_0_id_7a8b6269_lang_scss_scoped_true___WEBPACK_IMPORTED_MODULE_0___default.a); 

/***/ }),

/***/ "e893":
/***/ (function(module, exports, __webpack_require__) {

var has = __webpack_require__("5135");
var ownKeys = __webpack_require__("56ef");
var getOwnPropertyDescriptorModule = __webpack_require__("06cf");
var definePropertyModule = __webpack_require__("9bf2");

module.exports = function (target, source) {
  var keys = ownKeys(source);
  var defineProperty = definePropertyModule.f;
  var getOwnPropertyDescriptor = getOwnPropertyDescriptorModule.f;
  for (var i = 0; i < keys.length; i++) {
    var key = keys[i];
    if (!has(target, key)) defineProperty(target, key, getOwnPropertyDescriptor(source, key));
  }
};


/***/ }),

/***/ "e8b5":
/***/ (function(module, exports, __webpack_require__) {

var classof = __webpack_require__("c6b6");

// `IsArray` abstract operation
// https://tc39.github.io/ecma262/#sec-isarray
module.exports = Array.isArray || function isArray(arg) {
  return classof(arg) == 'Array';
};


/***/ }),

/***/ "e95a":
/***/ (function(module, exports, __webpack_require__) {

var wellKnownSymbol = __webpack_require__("b622");
var Iterators = __webpack_require__("3f8c");

var ITERATOR = wellKnownSymbol('iterator');
var ArrayPrototype = Array.prototype;

// check on default Array iterator
module.exports = function (it) {
  return it !== undefined && (Iterators.Array === it || ArrayPrototype[ITERATOR] === it);
};


/***/ }),

/***/ "e99f":
/***/ (function(module, exports, __webpack_require__) {

// style-loader: Adds some css to the DOM by adding a <style> tag

// load the styles
var content = __webpack_require__("faaa");
if(typeof content === 'string') content = [[module.i, content, '']];
if(content.locals) module.exports = content.locals;
// add the styles to the DOM
var add = __webpack_require__("499e").default
var update = add("d4efab66", content, true, {"sourceMap":false,"shadowMode":false});

/***/ }),

/***/ "ea3b":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".ChatPage[data-v-561fedf6]{margin:0 auto;background:#fff;box-shadow:0 2px 12px 0 rgba(0,0,0,.1);position:relative}.ChatPage .winBar[data-v-561fedf6]{position:absolute;transform:translateX(-100%)}.ChatPage .header[data-v-561fedf6]{background-color:#409eff;display:flex;margin:0 auto;padding-left:12px;align-items:center;height:60px;position:relative;color:#fff}.ChatPage .main[data-v-561fedf6]{display:flex;height:calc(100% - 60px)}.ChatPage .main .rightBox[data-v-561fedf6]{box-shadow:0 -3px 3px 0 rgba(0,0,0,.1);width:45%;position:relative}.ChatPage .main .rightBox .switch[data-v-561fedf6]{position:absolute;left:-1.2rem;top:20%;background:hsla(0,0%,80%,.5);padding:.3rem 0 .3rem .1rem;border-radius:100% 0 0 100%;color:#fff;cursor:pointer}.ChatPage .main .rightBox .switch[data-v-561fedf6]:hover{background:#409eff}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "f5df":
/***/ (function(module, exports, __webpack_require__) {

var TO_STRING_TAG_SUPPORT = __webpack_require__("00ee");
var classofRaw = __webpack_require__("c6b6");
var wellKnownSymbol = __webpack_require__("b622");

var TO_STRING_TAG = wellKnownSymbol('toStringTag');
// ES3 wrong here
var CORRECT_ARGUMENTS = classofRaw(function () { return arguments; }()) == 'Arguments';

// fallback for IE11 Script Access Denied error
var tryGet = function (it, key) {
  try {
    return it[key];
  } catch (error) { /* empty */ }
};

// getting tag from ES6+ `Object.prototype.toString`
module.exports = TO_STRING_TAG_SUPPORT ? classofRaw : function (it) {
  var O, tag, result;
  return it === undefined ? 'Undefined' : it === null ? 'Null'
    // @@toStringTag case
    : typeof (tag = tryGet(O = Object(it), TO_STRING_TAG)) == 'string' ? tag
    // builtinTag case
    : CORRECT_ARGUMENTS ? classofRaw(O)
    // ES3 arguments fallback
    : (result = classofRaw(O)) == 'Object' && typeof O.callee == 'function' ? 'Arguments' : result;
};


/***/ }),

/***/ "f772":
/***/ (function(module, exports, __webpack_require__) {

var shared = __webpack_require__("5692");
var uid = __webpack_require__("90e3");

var keys = shared('keys');

module.exports = function (key) {
  return keys[key] || (keys[key] = uid(key));
};


/***/ }),

/***/ "f934":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".toolsBox[data-v-252ec5ee]{position:relative;text-align:left;box-sizing:border-box;display:flex;align-items:center;height:30px}i[data-v-252ec5ee]{padding-left:6px;font-size:20px;color:#888a91}i[data-v-252ec5ee]:hover{color:#76b1f9}.emjioBox[data-v-252ec5ee]{background:#fff;height:150px;width:300px;overflow:auto;text-align:left;padding:0}.emjioBox li[data-v-252ec5ee]{display:inline-block;width:28px;height:28px;line-height:28px;text-align:center;cursor:pointer}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "faaa":
/***/ (function(module, exports, __webpack_require__) {

// Imports
var ___CSS_LOADER_API_IMPORT___ = __webpack_require__("24fb");
exports = ___CSS_LOADER_API_IMPORT___(false);
// Module
exports.push([module.i, ".item_msg[data-v-4e6c1e3a]{padding:0;margin:0;display:inline-block;display:flex}.item_msg .web__msg--file[data-v-4e6c1e3a],.item_msg .web__msg--img[data-v-4e6c1e3a],.item_msg .web__msg--video[data-v-4e6c1e3a]{max-width:250px;min-width:50px;width:100%;margin:10px 0;border:1px solid #eee;overflow:hidden;border-radius:5px;cursor:pointer;display:block}.item_msg .web__msg--img[data-class=iconBox][data-v-4e6c1e3a]{max-width:24px;min-width:unset;border:none;margin:0;vertical-align:bottom;display:inline-block}", ""]);
// Exports
module.exports = exports;


/***/ }),

/***/ "fb15":
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
// ESM COMPAT FLAG
__webpack_require__.r(__webpack_exports__);

// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/setPublicPath.js
// This file is imported into lib/wc client bundles.

if (typeof window !== 'undefined') {
  var currentScript = window.document.currentScript
  if (true) {
    var getCurrentScript = __webpack_require__("8875")
    currentScript = getCurrentScript()

    // for backward compatibility, because previously we directly included the polyfill
    if (!('currentScript' in document)) {
      Object.defineProperty(document, 'currentScript', { get: getCurrentScript })
    }
  }

  var src = currentScript && currentScript.src.match(/(.+\/)[^/]+\.js(\?.*)?$/)
  if (src) {
    __webpack_require__.p = src[1] // eslint-disable-line
  }
}

// Indicate to webpack that this file can be concatenated
/* harmony default export */ var setPublicPath = (null);

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.map.js
var es_array_map = __webpack_require__("d81d");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.function.name.js
var es_function_name = __webpack_require__("b0c0");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.js
var es_symbol = __webpack_require__("a4d3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.filter.js
var es_array_filter = __webpack_require__("4de4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.for-each.js
var es_array_for_each = __webpack_require__("4160");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptor.js
var es_object_get_own_property_descriptor = __webpack_require__("e439");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-own-property-descriptors.js
var es_object_get_own_property_descriptors = __webpack_require__("dbb4");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.keys.js
var es_object_keys = __webpack_require__("b64b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.for-each.js
var web_dom_collections_for_each = __webpack_require__("159b");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/defineProperty.js
function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/objectSpread2.js









function ownKeys(object, enumerableOnly) {
  var keys = Object.keys(object);

  if (Object.getOwnPropertySymbols) {
    var symbols = Object.getOwnPropertySymbols(object);
    if (enumerableOnly) symbols = symbols.filter(function (sym) {
      return Object.getOwnPropertyDescriptor(object, sym).enumerable;
    });
    keys.push.apply(keys, symbols);
  }

  return keys;
}

function _objectSpread2(target) {
  for (var i = 1; i < arguments.length; i++) {
    var source = arguments[i] != null ? arguments[i] : {};

    if (i % 2) {
      ownKeys(Object(source), true).forEach(function (key) {
        _defineProperty(target, key, source[key]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
    } else {
      ownKeys(Object(source)).forEach(function (key) {
        Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
      });
    }
  }

  return target;
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/index.vue?vue&type=template&id=41d80346&scoped=true&
var render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"chatPage",style:(_vm.setStyle)},[_c('div',{staticClass:"taleBox"},[_c('chatList',{attrs:{"list":_vm.taleList,"config":_vm.chatListConfig},on:{"click":function($event){return _vm.$emit('clickTalk', $event)},"loadHistory":_vm.loadHistoryHandler}})],1),_c('div',{staticClass:"toolBox"},[_c('tools',{staticClass:"tools",attrs:{"tools":_vm.toolConfig},on:{"emoji":_vm.bindEmoji}},[_vm._t("tools",null,{"slot":"tools"})],2),_c('quickList',{staticClass:"quickList",attrs:{"list":_vm.quickList,"msg":_vm.msg},on:{"submit":_vm.quickSubmit}}),_c('EnterBox',{attrs:{"insert":_vm.insert},on:{"submit":function($event){return _vm.$emit('enter', $event)}},model:{value:(_vm.msg),callback:function ($$v) {_vm.msg=$$v},expression:"msg"}})],1)])}
var staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/index.vue?vue&type=template&id=41d80346&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.number.constructor.js
var es_number_constructor = __webpack_require__("a9e3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.exec.js
var es_regexp_exec = __webpack_require__("ac1f");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.match.js
var es_string_match = __webpack_require__("466d");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/enterBox.vue?vue&type=template&id=3183498c&scoped=true&
var enterBoxvue_type_template_id_3183498c_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"web__msg",on:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleSend($event)}}},[_c('textarea',{directives:[{name:"model",rawName:"v-model",value:(_vm.currentMsg),expression:"currentMsg"}],ref:"msgBox",staticClass:"web__msg-input",attrs:{"rows":"3","placeholder":_vm.placeholder},domProps:{"value":(_vm.currentMsg)},on:{"input":function($event){if($event.target.composing){ return; }_vm.currentMsg=$event.target.value}}}),_vm._v(" "),_c('div',{staticClass:"web__msg-menu"},[_c('el-button',{staticClass:"web__msg-submit",attrs:{"type":"primary","size":"mini"},on:{"click":_vm.handleSend}},[_vm._v("发送")])],1)])}
var enterBoxvue_type_template_id_3183498c_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/enterBox.vue?vue&type=template&id=3183498c&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.trim.js
var es_string_trim = __webpack_require__("498a");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/enterBox.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var enterBoxvue_type_script_lang_js_ = ({
  name: 'JwChat_enterbox',
  props: {
    placeholder: {
      type: String,
      default: '请输入内容...'
    },
    value: {
      type: String,
      default: ''
    },
    insert: {
      type: String,
      default: ''
    }
  },
  data: function data() {
    return {
      currentMsg: ""
    };
  },
  watch: {
    value: {
      handler: function handler() {
        this.currentMsg = this.value;
      },
      immediate: true
    },
    currentMsg: {
      handler: function handler(newval) {
        var msg = newval.trim();
        this.$emit('input', msg);
      },
      immediate: true
    },
    insert: function insert(newval) {
      if (newval) {
        this.joinToMsg(newval);
      }
    }
  },
  methods: {
    //用户主动发送
    handleSend: function handleSend(e) {
      var _this = this;

      var shiftKey = e.shiftKey;
      if (shiftKey) return;
      this.$emit('submit', this.currentMsg);
      this.$nextTick(function () {
        _this.currentMsg = '';
      });
    },
    joinToMsg: function joinToMsg(str) {
      /* eslint-disable */
      var myField = this.$refs.msgBox;
      var afterMsg = this.currentMsg; //IE浏览器

      if (document.selection) {
        var sel = null;
        myField.focus();
        sel = document.selection.createRange();
        sel.text = str;
        sel.select();
      } //火狐/网景 浏览器
      else if (myField.selectionStart || myField.selectionStart == '0') {
          //得到光标前的位置
          var startPos = myField.selectionStart; //得到光标后的位置

          var endPos = myField.selectionEnd; // 在加入数据之前获得滚动条的高度

          var restoreTop = myField.scrollTop;
          afterMsg = afterMsg.substring(0, startPos) + str + afterMsg.substring(endPos, afterMsg.length); //如果滚动条高度大于0

          if (restoreTop > 0) {
            // 返回
            myField.scrollTop = restoreTop;
          }

          myField.focus();
          myField.selectionStart = startPos + str.length;
          myField.selectionEnd = startPos + str.length;
        } else {
          afterMsg += str;
          myField.focus();
        }

      this.currentMsg = afterMsg;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chat/enterBox.vue?vue&type=script&lang=js&
 /* harmony default export */ var Chat_enterBoxvue_type_script_lang_js_ = (enterBoxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/enterBox.vue?vue&type=style&index=0&id=3183498c&scoped=true&lang=scss&
var enterBoxvue_type_style_index_0_id_3183498c_scoped_true_lang_scss_ = __webpack_require__("6834");

// CONCATENATED MODULE: ./node_modules/vue-loader/lib/runtime/componentNormalizer.js
/* globals __VUE_SSR_CONTEXT__ */

// IMPORTANT: Do NOT use ES2015 features in this file (except for modules).
// This module is a runtime utility for cleaner component module output and will
// be included in the final webpack user bundle.

function normalizeComponent (
  scriptExports,
  render,
  staticRenderFns,
  functionalTemplate,
  injectStyles,
  scopeId,
  moduleIdentifier, /* server only */
  shadowMode /* vue-cli only */
) {
  // Vue.extend constructor export interop
  var options = typeof scriptExports === 'function'
    ? scriptExports.options
    : scriptExports

  // render functions
  if (render) {
    options.render = render
    options.staticRenderFns = staticRenderFns
    options._compiled = true
  }

  // functional template
  if (functionalTemplate) {
    options.functional = true
  }

  // scopedId
  if (scopeId) {
    options._scopeId = 'data-v-' + scopeId
  }

  var hook
  if (moduleIdentifier) { // server build
    hook = function (context) {
      // 2.3 injection
      context =
        context || // cached call
        (this.$vnode && this.$vnode.ssrContext) || // stateful
        (this.parent && this.parent.$vnode && this.parent.$vnode.ssrContext) // functional
      // 2.2 with runInNewContext: true
      if (!context && typeof __VUE_SSR_CONTEXT__ !== 'undefined') {
        context = __VUE_SSR_CONTEXT__
      }
      // inject component styles
      if (injectStyles) {
        injectStyles.call(this, context)
      }
      // register component module identifier for async chunk inferrence
      if (context && context._registeredComponents) {
        context._registeredComponents.add(moduleIdentifier)
      }
    }
    // used by ssr in case component is cached and beforeCreate
    // never gets called
    options._ssrRegister = hook
  } else if (injectStyles) {
    hook = shadowMode
      ? function () {
        injectStyles.call(
          this,
          (options.functional ? this.parent : this).$root.$options.shadowRoot
        )
      }
      : injectStyles
  }

  if (hook) {
    if (options.functional) {
      // for template-only hot-reload because in that case the render fn doesn't
      // go through the normalizer
      options._injectStyles = hook
      // register for functional component in vue file
      var originalRender = options.render
      options.render = function renderWithStyleInjection (h, context) {
        hook.call(context)
        return originalRender(h, context)
      }
    } else {
      // inject component registration as beforeCreate hook
      var existing = options.beforeCreate
      options.beforeCreate = existing
        ? [].concat(existing, hook)
        : [hook]
    }
  }

  return {
    exports: scriptExports,
    options: options
  }
}

// CONCATENATED MODULE: ./src/components/Chat/enterBox.vue






/* normalize component */

var component = normalizeComponent(
  Chat_enterBoxvue_type_script_lang_js_,
  enterBoxvue_type_template_id_3183498c_scoped_true_render,
  enterBoxvue_type_template_id_3183498c_scoped_true_staticRenderFns,
  false,
  null,
  "3183498c",
  null
  
)

/* harmony default export */ var enterBox = (component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/chatList.vue?vue&type=template&id=422b11e3&scoped=true&
var chatListvue_type_template_id_422b11e3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{ref:"scroller",staticClass:"wrapper",style:(_vm.boxSize)},[(_vm.historyConfig.show&&_vm.historyLoding)?_c('div',{on:{"click":_vm.handleHistory}},[_vm._v(" "+_vm._s(_vm.historyConfig.tip)+" ")]):_vm._e(),_c('div',{staticClass:"scroller"},[_c('div',{ref:"main",staticClass:"web__main"},_vm._l((_vm.list),function(item,k){return _c('div',{key:JSON.stringify(item)+k,staticClass:"web__main-item",class:{'web__main-item--mine':item.mine}},[_c('div',{staticClass:"web__main-user"},[_c('img',{attrs:{"src":item.img},on:{"click":function($event){return _vm.$emit('click', { type:'img', data:item })}}}),_c('cite',{on:{"click":function($event){return _vm.$emit('click', { type:'nickname', data:item })}}},[_vm._v(" "+_vm._s(item.name)+" "),_c('i',[_vm._v(_vm._s(item.date))])])]),_c('div',{staticClass:"web__main-text"},[_c('div',{staticClass:"web__main-arrow"}),(item.text.text)?_c('itemTalk',{attrs:{"text":item.text.text},on:{"systemEvent":_vm.taskEvent,"loadDone":_vm.loadDone}}):_vm._e(),(item.text.system)?_c('systemTalk',{attrs:{"text":item.text.system},on:{"systemEvent":_vm.systemEvent,"loadDone":_vm.loadDone}}):_vm._e(),(item.text.subLink)?_c('el-link',_vm._b({staticClass:"itemChild",on:{"click":function($event){return _vm.taskEvent(item.text)}}},'el-link',item.text.subLink.prop,false),[_vm._v(" "+_vm._s(item.text.subLink.text)+" ")]):_vm._e()],1)])}),0)]),(!(_vm.scroll && _vm.scroll.isBottom))?_c('div',{staticClass:"downBtn",on:{"click":_vm.scrollBottom}},[(_vm.unread)?_c('span',[_vm._v(_vm._s(_vm.unread))]):_vm._e()]):_vm._e()])}
var chatListvue_type_template_id_422b11e3_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/chatList.vue?vue&type=template&id=422b11e3&scoped=true&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/classCallCheck.js
function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createClass.js
function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/assertThisInitialized.js
function _assertThisInitialized(self) {
  if (self === void 0) {
    throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
  }

  return self;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/setPrototypeOf.js
function _setPrototypeOf(o, p) {
  _setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o, p) {
    o.__proto__ = p;
    return o;
  };

  return _setPrototypeOf(o, p);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/inherits.js

function _inherits(subClass, superClass) {
  if (typeof superClass !== "function" && superClass !== null) {
    throw new TypeError("Super expression must either be null or a function");
  }

  subClass.prototype = Object.create(superClass && superClass.prototype, {
    constructor: {
      value: subClass,
      writable: true,
      configurable: true
    }
  });
  if (superClass) _setPrototypeOf(subClass, superClass);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.reflect.construct.js
var es_reflect_construct = __webpack_require__("4ae1");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.get-prototype-of.js
var es_object_get_prototype_of = __webpack_require__("3410");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/getPrototypeOf.js

function _getPrototypeOf(o) {
  _getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o) {
    return o.__proto__ || Object.getPrototypeOf(o);
  };
  return _getPrototypeOf(o);
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.to-string.js
var es_object_to_string = __webpack_require__("d3b7");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.to-string.js
var es_regexp_to_string = __webpack_require__("25f0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/isNativeReflectConstruct.js



function _isNativeReflectConstruct() {
  if (typeof Reflect === "undefined" || !Reflect.construct) return false;
  if (Reflect.construct.sham) return false;
  if (typeof Proxy === "function") return true;

  try {
    Date.prototype.toString.call(Reflect.construct(Date, [], function () {}));
    return true;
  } catch (e) {
    return false;
  }
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.description.js
var es_symbol_description = __webpack_require__("e01a");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.symbol.iterator.js
var es_symbol_iterator = __webpack_require__("d28b");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.iterator.js
var es_array_iterator = __webpack_require__("e260");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.iterator.js
var es_string_iterator = __webpack_require__("3ca3");

// EXTERNAL MODULE: ./node_modules/core-js/modules/web.dom-collections.iterator.js
var web_dom_collections_iterator = __webpack_require__("ddb0");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/typeof.js







function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/possibleConstructorReturn.js


function _possibleConstructorReturn(self, call) {
  if (call && (_typeof(call) === "object" || typeof call === "function")) {
    return call;
  }

  return _assertThisInitialized(self);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/createSuper.js




function _createSuper(Derived) {
  var hasNativeReflectConstruct = _isNativeReflectConstruct();
  return function () {
    var Super = _getPrototypeOf(Derived),
        result;

    if (hasNativeReflectConstruct) {
      var NewTarget = _getPrototypeOf(this).constructor;
      result = Reflect.construct(Super, arguments, NewTarget);
    } else {
      result = Super.apply(this, arguments);
    }

    return _possibleConstructorReturn(this, result);
  };
}
// EXTERNAL MODULE: ./node_modules/iscroll/build/iscroll.js
var iscroll = __webpack_require__("8902");
var iscroll_default = /*#__PURE__*/__webpack_require__.n(iscroll);

// CONCATENATED MODULE: ./src/utils/scroll.js












var scroll_Scroll = /*#__PURE__*/function (_IScroll) {
  _inherits(Scroll, _IScroll);

  var _super = _createSuper(Scroll);

  function Scroll(node, options) {
    var _this;

    _classCallCheck(this, Scroll);

    _this = _super.call(this, node, options);

    _defineProperty(_assertThisInitialized(_this), "domPotision", []);

    _defineProperty(_assertThisInitialized(_this), "beforeNode", null);

    return _this;
  }
  /**
   * @description: 更新并保存数据
   * @param { nodes, dataList } params //传入要保存的节点和要保存的数据
   * @return {*}
   */


  _createClass(Scroll, [{
    key: "saveNodes",
    value: function saveNodes(params) {
      var _this2 = this;

      var nodes = params.nodes,
          dataList = params.dataList;
      var result = [];
      var previous = this.domPotision;
      nodes.forEach(function (node, index) {
        var top = node.offsetTop;
        var data = dataList[index];
        var dataStr = JSON.stringify(data);
        var item = {
          top: top,
          node: node,
          read: false,
          data: dataStr
        }; // 是否是存在的数据

        var resultKey = _this2.isBing(dataStr);

        if (resultKey > -1) {
          var _ref = previous[resultKey] || {},
              _ref$read = _ref.read,
              preRead = _ref$read === void 0 ? false : _ref$read;

          item.read = preRead;
        }

        result.push(item);
      });
      this.domPotision = result; // 找到最后一次保存的节点，并把节点之前的数据设置为已读

      if (!this.beforeNode) return;
      var data = this.beforeNode.data;
      var resultKey = this.isBing(data);
      this.read(resultKey);
    }
  }, {
    key: "isBing",
    value: function isBing(flag) {
      var result = -1;
      this.domPotision.forEach(function (i, k) {
        var data = i.data;
        if (data === flag) return result = k;
      });
      return result;
    }
  }, {
    key: "read",
    value: function read(index) {
      var key = index || this.scrollPositionDom();
      var bottom = this.isBottom;
      this.domPotision.forEach(function (i, j) {
        if (bottom || key > j) {
          i.read = true;
        }
      });
    }
  }, {
    key: "scrollPositionDom",

    /**
     * @description: 判断当前的滚动位置是处于哪个元素内
     * @param {*}
     * @return {*}
     */
    value: function scrollPositionDom() {
      var y = this.y;
      var currentTop = Math.abs(y);
      if (currentTop == 0) return 0;
      var doms = this.domPotision;
      var result = -1;
      doms.forEach(function (i, j) {
        var top = i.top;

        if (result === -1 || currentTop >= top) {
          result = j + 1;
        }
      });
      return result;
    }
  }, {
    key: "savePosition",
    value: function savePosition() {
      var nodeIndex = this.scrollPositionDom();
      this.beforeNode = this.domPotision[nodeIndex];
      this.read();
    }
  }, {
    key: "unread",
    get: function get() {
      var result = 0;
      this.domPotision.forEach(function (i) {
        var read = i.read;

        if (!read) {
          result += 1;
        }
      });
      return result;
    }
  }, {
    key: "isTop",
    get: function get() {
      var top = false;
      var y = this.y;
      if (y === 0) top = true;
      return top;
    }
  }, {
    key: "isBottom",
    get: function get() {
      var result = false;
      var y = this.y,
          maxScrollY = this.maxScrollY;
      result = Math.abs(y) >= Math.abs(maxScrollY);
      return result;
    }
  }]);

  return Scroll;
}(iscroll_default.a);

/* harmony default export */ var utils_scroll = (scroll_Scroll);
// CONCATENATED MODULE: ./src/utils/remind.js




/*
 * @Author: your name
 * @Date: 2021-02-05 16:44:07
 * @LastEditTime: 2021-02-08 09:03:12
 * @LastEditors: Please set LastEditors
 * @Description: 用于提醒新消息
 * @FilePath: \JChat\src\utils\changeTItle.js
 */
var remind_Remind = /*#__PURE__*/function () {
  function Remind() {
    _classCallCheck(this, Remind);

    _defineProperty(this, "beforeTitle", '');

    _defineProperty(this, "titleTimer", void 0);

    _defineProperty(this, "unread", 0);

    this.saveTitle();
  }

  _createClass(Remind, [{
    key: "saveTitle",
    value: function saveTitle() {
      var _document = document,
          title = _document.title;
      this.beforeTitle = title;
    }
  }, {
    key: "resetTitle",
    value: function resetTitle(title) {
      document.title = title || this.beforeTitle;
      clearTimeout(this.titleTimer);
    }
  }, {
    key: "changeTitle",
    value: function changeTitle(unread) {
      var that = this;
      this.unread = unread;
      var flage = 0;
      this.resetTitle(this.beforeTitle);
      change();
      Remind.showBrowser.call(this);

      function change() {
        var title = "【未读】";

        if (flage) {
          title = "【" + that.unread + "条】";
        }

        flage = !flage;
        that.titleTimer = setTimeout(function () {
          that.resetTitle(title + that.beforeTitle);
          change();
        }, 1000);
      }
    }
  }], [{
    key: "showBrowser",
    value: function showBrowser() {
      if (window.Notification && Notification.permission !== "denied") {
        var unread = this.unread;
        Notification.requestPermission(function (status) {
          if (status === "granted") new Notification('新消息', {
            body: "\u60A8\u603B\u5171\u6709".concat(unread, "\u6761\u6D88\u606F\u672A\u8BFB\u3002")
          });
        });
      }
    }
  }]);

  return Remind;
}();


// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/itemTalk.vue?vue&type=template&id=4e6c1e3a&scoped=true&
var itemTalkvue_type_template_id_4e6c1e3a_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('span',{staticClass:"item_msg",on:{"click":_vm.itemCallback}},[(_vm.getTag === 'span')?_c('span',{domProps:{"innerHTML":_vm._s(_vm.parseText())}}):_vm._e(),(_vm.getTag === 'img')?_c('img',{staticClass:"web__msg--img",attrs:{"src":_vm.getData.src,"alt":""},on:{"click":function($event){return _vm.showDialog({tag:'img'})},"load":function($event){return _vm.load('img')}}}):_vm._e(),(_vm.getTag === 'video')?_c('video',{staticClass:"web__msg--video",attrs:{"src":_vm.getData.src,"controls":"controls"},on:{"click":function($event){return _vm.showDialog({tag:'video'})},"canplaythrough":function($event){return _vm.load('video')}}}):_vm._e(),(_vm.getTag === 'audio')?_c('audio',{staticClass:"web__msg--audio",staticStyle:{"width":"20rem","height":"20px"},attrs:{"src":_vm.getData.src,"controls":"controls"},on:{"canplaythrough":function($event){return _vm.load('audio')}}}):_vm._e(),(['video','img'].includes(_vm.getTag))?_c('el-dialog',{staticClass:"web__dialog",attrs:{"visible":_vm.show,"width":"40%","append-to-body":"","before-close":_vm.handleClose},on:{"update:visible":function($event){_vm.show=$event}}},[(_vm.imgSrc)?_c('img',{staticStyle:{"width":"100%","object-fit":"cover"},attrs:{"src":_vm.imgSrc}}):_vm._e(),(_vm.videoSrc)?_c('video',{staticStyle:{"width":"100%","object-fit":"cover"},attrs:{"src":_vm.videoSrc,"controls":"controls"}}):_vm._e(),(_vm.audioSrc)?_c('audio',{staticStyle:{"width":"100%","object-fit":"cover"},attrs:{"src":_vm.audioSrc,"controls":"controls"}}):_vm._e()]):_vm._e()],1)}
var itemTalkvue_type_template_id_4e6c1e3a_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/itemTalk.vue?vue&type=template&id=4e6c1e3a&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.includes.js
var es_array_includes = __webpack_require__("caad");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.includes.js
var es_string_includes = __webpack_require__("2532");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.replace.js
var es_string_replace = __webpack_require__("5319");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.string.split.js
var es_string_split = __webpack_require__("1276");

// CONCATENATED MODULE: ./node_modules/wechat-emoji-parser/dist/emoji-parser.esm.js
function emoji_parser_esm_typeof(obj) {
  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    emoji_parser_esm_typeof = function (obj) {
      return typeof obj;
    };
  } else {
    emoji_parser_esm_typeof = function (obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return emoji_parser_esm_typeof(obj);
}

function emoji_parser_esm_classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function emoji_parser_esm_defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function emoji_parser_esm_createClass(Constructor, protoProps, staticProps) {
  if (protoProps) emoji_parser_esm_defineProperties(Constructor.prototype, protoProps);
  if (staticProps) emoji_parser_esm_defineProperties(Constructor, staticProps);
  return Constructor;
}

/**
 * 字符查找树
 * @constructor
 */
var Trie = /*#__PURE__*/function () {
  function Trie(keyArr) {
    emoji_parser_esm_classCallCheck(this, Trie);

    // 层级 0 代表顶层
    this.tier = 0; // 值为0代表没匹配到，为1表示匹配到了

    this.empty = 1; // 对应的哈希表中的索引

    this.index = 0;
    this.children = {};
    keyArr && this.build(keyArr);
  }

  emoji_parser_esm_createClass(Trie, [{
    key: "build",
    value: function build(arr) {
      var len = arr.length;

      for (var i = 0; i < len; i++) {
        this.insert(arr[i], 0, i);
      }
    }
  }, {
    key: "insert",
    value: function insert(str) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var idx = arguments.length > 2 ? arguments[2] : undefined;

      if (str.length === 0) {
        return;
      }

      var T = this;
      var s;
      var child;

      if (pos === str.length) {
        T.index = idx;
        return;
      }

      s = str[pos];

      if (T.children[s] === undefined) {
        T.children[s] = new Trie();
        T.empty = 0;
        T.children[s].tier = this.tier + 1;
      }

      child = T.children[s];
      child.insert(str, pos + 1, idx);
    }
  }, {
    key: "searchOne",
    value: function searchOne(str) {
      var pos = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
      var result = {};
      if (str.length === 0) return result;
      var T = this;
      var child;
      var s;
      result.arr = [];
      s = str[pos];
      child = T.children[s];

      if (child !== undefined && pos < str.length) {
        return child.searchOne(str, pos + 1);
      }

      if (child === undefined && T.empty === 0) return result;

      if (T.empty == 1) {
        result.arr[0] = pos - T.tier;
        result.arr[1] = T.index;
        result.tier = T.tier;
        return result;
      }

      return result;
    }
  }, {
    key: "search",
    value: function search(str) {
      if (this.empty == 1) return [];
      var len = str.length;
      var searchResult = [];
      var tmp;

      for (var i = 0; i < len - 1; i++) {
        tmp = this.searchOne(str, i);

        if (typeof tmp.arr !== 'undefined' && tmp.arr.length > 0) {
          searchResult.push(tmp.arr);
          i = i + tmp.tier - 1;
        }
      }

      return searchResult;
    }
  }]);

  return Trie;
}();

var emojiObj = {
	"/::)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/0.gif",
	"/::~": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/1.gif",
	"/::B": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/2.gif",
	"/::|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/3.gif",
	"/:8-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/4.gif",
	"/::<": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/5.gif",
	"/::$": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/6.gif",
	"/::X": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/7.gif",
	"/::Z": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/8.gif",
	"/::'(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/9.gif",
	"/::-|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/10.gif",
	"/::@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/11.gif",
	"/::P": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/12.gif",
	"/::D": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/13.gif",
	"/::O": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/14.gif",
	"/::(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/15.gif",
	"/::+": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/16.gif",
	"/:--b": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/17.gif",
	"/::Q": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/18.gif",
	"/::T": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/19.gif",
	"/:,@P": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/20.gif",
	"/:,@-D": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/21.gif",
	"/::d": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/22.gif",
	"/:,@o": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/23.gif",
	"/::g": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/24.gif",
	"/:|-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/25.gif",
	"/::!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/26.gif",
	"/::L": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/27.gif",
	"/::>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/28.gif",
	"/::,@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/29.gif",
	"/:,@f": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/30.gif",
	"/::-S": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/31.gif",
	"/:?": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/32.gif",
	"/:,@x": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/33.gif",
	"/:,@@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/34.gif",
	"/::8": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/35.gif",
	"/:,@!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/36.gif",
	"/:!!!": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/37.gif",
	"/:xx": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/38.gif",
	"/:bye": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/39.gif",
	"/:wipe": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/40.gif",
	"/:dig": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/41.gif",
	"/:handclap": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/42.gif",
	"/:&-(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/43.gif",
	"/:B-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/44.gif",
	"/:<@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/45.gif",
	"/:@>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/46.gif",
	"/::-O": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/47.gif",
	"/:>-|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/48.gif",
	"/:P-(": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/49.gif",
	"/::'|": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/50.gif",
	"/:X-)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/51.gif",
	"/::*": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/52.gif",
	"/:@x": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/53.gif",
	"/:8*": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/54.gif",
	"/:pd": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/55.gif",
	"/:<W>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/56.gif",
	"/:beer": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/57.gif",
	"/:basketb": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/58.gif",
	"/:oo": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/59.gif",
	"/:coffee": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/60.gif",
	"/:eat": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/61.gif",
	"/:pig": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/62.gif",
	"/:rose": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/63.gif",
	"/:fade": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/64.gif",
	"/:showlove": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/65.gif",
	"/:heart": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/66.gif",
	"/:break": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/67.gif",
	"/:cake": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/68.gif",
	"/:li": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/69.gif",
	"/:bome": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/70.gif",
	"/:kn": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/71.gif",
	"/:footb": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/72.gif",
	"/:ladybug": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/73.gif",
	"/:shit": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/74.gif",
	"/:moon": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/75.gif",
	"/:sun": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/76.gif",
	"/:gift": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/77.gif",
	"/:hug": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/78.gif",
	"/:strong": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/79.gif",
	"/:weak": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/80.gif",
	"/:share": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/81.gif",
	"/:v": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/82.gif",
	"/:@)": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/83.gif",
	"/:jj": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/84.gif",
	"/:@@": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/85.gif",
	"/:bad": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/86.gif",
	"/:lvu": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/87.gif",
	"/:no": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/88.gif",
	"/:ok": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/89.gif",
	"/:love": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/90.gif",
	"/:<L>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/91.gif",
	"/:jump": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/92.gif",
	"/:shake": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/93.gif",
	"/:<O>": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/94.gif",
	"/:circle": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/95.gif",
	"/:kotow": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/96.gif",
	"/:turn": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/97.gif",
	"/:skip": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/98.gif",
	"/:oY": "https://res.wx.qq.com/mpres/htmledition/images/icon/emotion/99.gif",
	":smile:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 3
	}
},
	":mask:": {
	panel: "b5bd1fe0",
	position: {
		col: 4,
		row: 1
	}
},
	":joy:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 2
	}
},
	":stuck_out_tongue_closed_eyes:": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 4
	}
},
	":flushed:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 8
	}
},
	":scream:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 7
	}
},
	":pensive:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 5
	}
},
	":unamused:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 4
	}
},
	"[Hey]": {
	panel: "b5bd1fe0",
	position: {
		col: 8,
		row: 7
	}
},
	"[Smirk]": {
	panel: "b5bd1fe0",
	position: {
		col: 2,
		row: 1
	}
},
	"[Smart]": {
	panel: "b5bd1fe0",
	position: {
		col: 2,
		row: 2
	}
},
	"[Concerned]": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 3
	}
},
	"[Yeah!]": {
	panel: "b5bd1fe0",
	position: {
		col: 3,
		row: 2
	}
},
	":ghost:": {
	panel: "b5bd1fe0",
	position: {
		col: 10,
		row: 10
	}
},
	":pray:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 9
	}
},
	":muscle:": {
	panel: "b5bd1fe0",
	position: {
		col: 11,
		row: 1
	}
},
	":tada:": {
	panel: "b5bd1fe0",
	position: {
		col: 9,
		row: 10
	}
},
	":gift:": {
	panel: "b5bd1fe0",
	position: {
		col: 8,
		row: 10
	}
},
	"[Packet]": {
	panel: "b5bd1fe0",
	position: {
		col: 3,
		row: 1
	}
},
	"[好的]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 5
	}
},
	"[加油]": {
	panel: "b5bd1fe0",
	position: {
		col: 4,
		row: 6
	}
},
	"[汗]": {
	panel: "b5bd1fe0",
	position: {
		col: 5,
		row: 6
	}
},
	"[天啊]": {
	panel: "b5bd1fe0",
	position: {
		col: 6,
		row: 6
	}
},
	"[Emm]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 1
	}
},
	"[社会社会]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 2
	}
},
	"[旺柴]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 3
	}
},
	"[加油加油]": {
	panel: "b5bd1fe0",
	position: {
		col: 4,
		row: 6
	}
},
	"[吃瓜]": {
	panel: "b5bd1fe0",
	position: {
		col: 3,
		row: 6
	}
},
	"[Facepalm]": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 2
	}
},
	"[哇]": {
	panel: "b5bd1fe0",
	position: {
		col: 1,
		row: 7
	}
},
	"[打脸]": {
	panel: "b5bd1fe0",
	position: {
		col: 7,
		row: 6
	}
},
	"[囧]": {
	panel: "b5bd1fe0",
	position: {
		col: 5,
		row: 1
	}
}
};

var b5bd1fe0 = {
	url: "https://res.wx.qq.com/wxdoc/dist/assets/img/emoji-sprite.b5bd1fe0.png",
	width: 724,
	height: 658,
	col: 11,
	row: 10,
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	gapCol: 6,
	gapRow: 6
};
var emojiPanel = {
	b5bd1fe0: b5bd1fe0,
	"6AfH8": {
	url: "https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/6AfH8-r.png",
	width: 480,
	height: 380,
	col: 15,
	row: 12,
	paddingTop: 0,
	paddingBottom: 0,
	paddingLeft: 0,
	paddingRight: 0,
	gapCol: 6,
	gapRow: 6
}
};

var emojiKeys = Object.keys(emojiObj);
var trie = new Trie(emojiKeys);
var emojiWidth = 24,
    emojiHeight = 24;
var panelInfoCache = {};

function splice(str, index, count, add) {
  return str.slice(0, index) + add + str.slice(index + count);
}

function calculatePanelInfo(panelId, panel) {
  var url = panel.url,
      width = panel.width,
      height = panel.height,
      col = panel.col,
      row = panel.row,
      paddingTop = panel.paddingTop,
      paddingBottom = panel.paddingBottom,
      paddingLeft = panel.paddingLeft,
      paddingRight = panel.paddingRight,
      gapCol = panel.gapCol,
      gapRow = panel.gapRow;
  if (!url) return ''; // 计算背景宽度应该缩放到多少
  // 原图的emojiWidth

  var imgEmojiWidth = (width - paddingLeft - paddingRight - gapCol * (col - 1)) / col; // bgWidth / width = emojiWidth / imgEmojiWidth 比例是相等的

  var scale = emojiWidth / imgEmojiWidth;
  var bgWidth = width * scale;
  panelInfoCache[panelId] = {
    scale: scale,
    bgWidth: bgWidth
  };
  return panelInfoCache[panelId];
}

function getPanelEmojiTemplate(title, position, panelId) {
  var panel = emojiPanel[panelId];
  var url = panel.url,
      gapCol = panel.gapCol,
      gapRow = panel.gapRow;
  if (!url) return '';

  var _ref = panelInfoCache[panelId] || calculatePanelInfo(panelId, panel),
      scale = _ref.scale,
      bgWidth = _ref.bgWidth;

  if (emoji_parser_esm_typeof(position) === 'object') {
    var _position = position,
        targetCol = _position.col,
        targetRow = _position.row;
    var left = -(targetCol - 1) * (emojiWidth + scale * gapCol);
    var top = -(targetRow - 1) * (emojiHeight + scale * gapRow);
    position = "".concat(left, "px ").concat(top, "px");
  }

  return "<a title=\"".concat(title, "\" style=\"display: inline-block;background: url(").concat(url, ") no-repeat;width: ").concat(emojiWidth, "px;\n    height: ").concat(emojiHeight, "px; background-position:").concat(position, "; background-size: ").concat(bgWidth, "px;\"></a>");
}

function emojiParser(str) {
  var matchedEmoji = trie.search(str);
  matchedEmoji.reverse().map(function (idx) {
    var pos = idx[0],
        emotion = emojiKeys[idx[1]],
        emotionValue = emojiObj[emotion];
    var img = emoji_parser_esm_typeof(emotionValue) === 'object' ? getPanelEmojiTemplate(emotion, emotionValue.position, emotionValue.panel) : emotionValue.indexOf('http') !== -1 ? '<img src="' + emotionValue + '" alt="' + emotion + '">' : emotionValue;
    str = splice(str, pos, emotion.length, img);
  });
  return str;
}

/* harmony default export */ var emoji_parser_esm = (emojiParser);

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/itemTalk.vue?vue&type=script&lang=js&






//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var itemTalkvue_type_script_lang_js_ = ({
  props: {
    text: String
  },
  data: function data() {
    return {
      tags: ['img', 'video', 'audio'],

      /* 查看文件详情 */
      show: false,
      imgSrc: '',
      videoSrc: '',
      audioSrc: '',
      loadState: false
    };
  },
  computed: {
    getTag: function getTag() {
      var str = this.text || "";
      console.log(this.text);
      var tag = "span";
      var type = "";
      var _str = "";

      if (str.match(/<\/?[^>]+>/)) {
        _str = str.match(/<\/?[^>]+>/)[0];
      }

      var isTag = _str.split(" ")[0].replace(/<|>/, "") || "";
      isTag && (type = isTag);

      if (this.tags.includes(type)) {
        tag = type;
      }

      return tag;
    },
    getData: function getData() {
      var str = this.text || "";
      var dom = document.createElement('div');
      dom.innerHTML = str;
      var target = dom.firstChild;
      var src = target.getAttribute('data-src');
      var controls = target.getAttribute('controls') || false;
      return {
        src: src,
        controls: controls
      };
    }
  },
  methods: {
    load: function load(type) {
      if (this.loadState) return;
      this.loadState = true;
      this.$emit('loadDone', {
        type: type,
        target: this.text
      });
    },
    handleClose: function handleClose(done) {
      this.imgSrc = undefined;
      this.videoSrc = undefined;
      this.audioSrc = undefined;
      done();
    },
    showDialog: function showDialog(_ref) {
      var _this = this;

      var tag = _ref.tag;
      var src = this.getData.src;

      var callback = function callback() {
        if (tag === 'img') {
          _this.imgSrc = src;
          _this.show = true;
        } else if (tag === 'video') {
          _this.videoSrc = src;
          _this.show = true;
        } else if (tag === 'audio') {
          _this.audioSrc = src;
          _this.show = true;
        } else if (tag === 'FILE') {
          window.open(src);
        }
      };

      if (typeof this.beforeOpen === 'function') {
        this.beforeOpen({
          tag: tag,
          src: src
        }, callback);
      } else {
        callback();
      }
    },
    itemCallback: function itemCallback() {
      this.$emit('systemEvent', this.text);
    },
    parseText: function parseText() {
      var text = this.text;
      if (!text) return;
      text = text.replace(/\n/g, '<br/>');
      var html = emoji_parser_esm(text).replace(/<img src/g, '<img data-class="iconBox" src');
      return html;
    } //处理排版

    /*  handleDetail (html = '') {
       let tag = 'span'
       let options = {}
       if (this.isObject(html)) {
         const { type, content } = html
         tag = type
         options = content
       } else {
         tag = this.getTag(html)
       }
          this.createdElement(tag, content)
          let result = html;
       result = emojiParser(result).replace(/(<img src)/g, '<img data-class="iconBox" data-src')
       setTimeout(() => {
         const list = this.$refs.content;
         list.forEach(ele => {
           for (let i = 0; i < ele.children.length; i++) {
             const child = ele.children[i];
             child.onload = this.childnodeLoad
             // console.log(child.parentNode)
             if (child.getAttribute('data-flag') != 0) {
               child.setAttribute('data-flag', 0)
               child.onclick = () => {
                 this.handleEvent(child)
               };
               if (child.tagName === 'IMG') {
                 child.className = 'web__msg--img'
                 const icon = child.getAttribute('data-class')
                 if (icon !== 'iconBox') child.type = "IMG"
                 child.src = child.getAttribute('data-src')
               } else if (child.tagName === 'VIDEO') {
                 child.type = "VIDEO"
                 child.className = 'web__msg--video'
                 child.src = child.getAttribute('data-src')
               } else if (child.tagName === 'AUDIO') {
                 child.type = "AUDIO"
                 child.className = 'web__msg--audio'
                 child.controls = 'controls';
                 child.src = child.getAttribute('data-src')
               } else if (child.tagName === 'FILE') {
                 child.type = "FILE"
                 child.className = 'web__msg--file'
                 child.innerHTML = `<h2>File</h2><span>${child.getAttribute('data-name')}</span>`
               } else if (child.tagName === 'MAP') {
                 child.type = "MAP"
                 child.className = 'web__msg--file web__msg--map'
                 child.innerHTML = `<h2>Map</h2><span>${child.getAttribute('data-longitude')} , ${child.getAttribute('data-latitude')}<br />${child.getAttribute('data-address')}</span>`
               }
             }
           }
         });
         console.log('n')
       }, 200)
       return result;
     }, */

  },
  mounted: function mounted() {
    var _this2 = this;

    var type = this.getTag;
    if (this.tags.includes(type)) return;
    this.$nextTick(function () {
      _this2.$emit('loadDone', {
        type: type,
        target: _this2.text
      });
    });
  }
});
// CONCATENATED MODULE: ./src/components/Chat/itemTalk.vue?vue&type=script&lang=js&
 /* harmony default export */ var Chat_itemTalkvue_type_script_lang_js_ = (itemTalkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/itemTalk.vue?vue&type=style&index=0&id=4e6c1e3a&lang=scss&scoped=true&
var itemTalkvue_type_style_index_0_id_4e6c1e3a_lang_scss_scoped_true_ = __webpack_require__("9e6d");

// CONCATENATED MODULE: ./src/components/Chat/itemTalk.vue






/* normalize component */

var itemTalk_component = normalizeComponent(
  Chat_itemTalkvue_type_script_lang_js_,
  itemTalkvue_type_template_id_4e6c1e3a_scoped_true_render,
  itemTalkvue_type_template_id_4e6c1e3a_scoped_true_staticRenderFns,
  false,
  null,
  "4e6c1e3a",
  null
  
)

/* harmony default export */ var itemTalk = (itemTalk_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/systemTalk.vue?vue&type=template&id=7a8b6269&scoped=true&
var systemTalkvue_type_template_id_7a8b6269_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"systemTalk"},[_c('div',{staticClass:"title"},[_vm._v(_vm._s(_vm.text.title))]),_c('div',{staticClass:"subtitle"},[_vm._v(_vm._s(_vm.text.subtitle))]),_vm._l((_vm.text.content),function(item){return _c('div',{key:JSON.stringify(item)},[_c('el-link',{attrs:{"type":"primary"},on:{"click":function($event){$event.stopPropagation();return _vm.itemCallback(item)}}},[_vm._v(_vm._s(item.text))])],1)})],2)}
var systemTalkvue_type_template_id_7a8b6269_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/systemTalk.vue?vue&type=template&id=7a8b6269&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/systemTalk.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var systemTalkvue_type_script_lang_js_ = ({
  props: {
    text: {
      type: Object,
      default: function _default() {
        return {};
      }
    }
  },
  methods: {
    itemCallback: function itemCallback(itemData) {
      this.$emit('systemEvent', itemData);
    }
  },
  mounted: function mounted() {
    var _this = this;

    this.$nextTick(function () {
      _this.$emit('loadDone', {
        type: 'system',
        target: _this.text
      });
    });
  }
});
// CONCATENATED MODULE: ./src/components/Chat/systemTalk.vue?vue&type=script&lang=js&
 /* harmony default export */ var Chat_systemTalkvue_type_script_lang_js_ = (systemTalkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/systemTalk.vue?vue&type=style&index=0&id=7a8b6269&lang=scss&scoped=true&
var systemTalkvue_type_style_index_0_id_7a8b6269_lang_scss_scoped_true_ = __webpack_require__("e88c");

// CONCATENATED MODULE: ./src/components/Chat/systemTalk.vue






/* normalize component */

var systemTalk_component = normalizeComponent(
  Chat_systemTalkvue_type_script_lang_js_,
  systemTalkvue_type_template_id_7a8b6269_scoped_true_render,
  systemTalkvue_type_template_id_7a8b6269_scoped_true_staticRenderFns,
  false,
  null,
  "7a8b6269",
  null
  
)

/* harmony default export */ var systemTalk = (systemTalk_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/chatList.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//



 // TODO: 提示功能单独拿出来 
// TODO: 历史模块 拿出来

/* harmony default export */ var chatListvue_type_script_lang_js_ = ({
  name: 'JwChat_list',
  components: {
    itemTalk: itemTalk,
    systemTalk: systemTalk
  },
  props: {
    pageConfig: {
      type: Object,
      default: function _default() {
        return {
          width: "100vw"
        };
      }
    },
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    config: {
      type: Object,
      default: function _default() {
        return {
          width: '525px',
          height: '382px'
        };
      }
    }
  },
  data: function data() {
    return {
      scroll: null,
      remind: null,
      // 消息提示
      scrollTop: false,
      historyLoding: false,
      stopScroll: false,
      stopScrollTimer: null
    };
  },
  watch: {
    list: function list(newval) {
      if (newval) {
        if (this.historyLoding) {
          this.stopScroll = true;
        }
      }
    },
    'config.scrollToButton': function configScrollToButton(newval) {
      if (newval) {
        this.scrollBottom();
      }
    },
    unread: function unread(newval) {
      newval && remind_Remind.showBrowser.call(this);
      if (!this.remind) return;

      if (newval) {
        this.remind.changeTitle(newval);
      } else {
        this.remind.resetTitle();
      }
    }
  },
  computed: {
    boxSize: function boxSize() {
      var _ref = this.config || {},
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? '382px' : _ref$height,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? '525px' : _ref$width;

      if ("".concat(height).match(/\d$/)) {
        height += 'px';
      }

      if ("".concat(width).match(/\d$/)) {
        width += 'px';
      }

      var style = {
        height: height,
        width: width
      };
      return style;
    },
    historyConfig: function historyConfig() {
      var _this$config$historyC = this.config.historyConfig;
      _this$config$historyC = _this$config$historyC === void 0 ? {} : _this$config$historyC;
      var _this$config$historyC2 = _this$config$historyC.tip,
          tip = _this$config$historyC2 === void 0 ? "历史消息" : _this$config$historyC2,
          _this$config$historyC3 = _this$config$historyC.show,
          show = _this$config$historyC3 === void 0 ? false : _this$config$historyC3;
      return {
        tip: tip,
        show: show
      };
    },
    scrollType: function scrollType() {
      var _this$config$scrollTy = this.config.scrollType,
          type = _this$config$scrollTy === void 0 ? "noroll" : _this$config$scrollTy;
      return type;
    },
    unread: function unread() {
      var _ref2 = this.scroll || {},
          _ref2$unread = _ref2.unread,
          unread = _ref2$unread === void 0 ? 0 : _ref2$unread;

      return unread;
    }
  },
  methods: {
    loadDone: function loadDone() {
      var callback = this.scrollBottom;

      if (this.scrollType === 'noroll') {
        this.stopScroll = true;
        callback = null;
      }

      this.scrollRefresh(callback);
      this.childnodeLoad();
    },
    scrollBottom: function scrollBottom() {
      var _this = this;

      var stop = this.stopScroll;
      clearTimeout(this.stopScrollTimer);
      if (stop || this.historyLoding) return this.stopScrollTimer = setTimeout(function () {
        _this.stopScroll = false;
      }, 500);

      if (this.scroll) {
        this.scroll.scrollTo(0, this.scroll.maxScrollY, 200);
      }
    },
    createScroll: function createScroll() {
      var that = this;
      var dom = this.$refs.scroller;
      this.scroll = new utils_scroll(dom, {
        click: true,
        scrollbars: true,
        mouseWheel: true,
        preventDefault: false,
        interactiveScrollbars: true,
        hijackInternalLinks: true // useTransform: false,

      }); // scroll done callback

      this.scroll.on('scrollEnd', function () {
        that.showHistoryBtn();
        if (that.historyLoding) return;
        that.scroll.savePosition(); // 保存当前滚动位置
      });
      var timer = null;
      this.scroll.on('scroll', function () {
        clearTimeout(timer);
        that.stopScroll = true;
        timer = setTimeout(function () {
          that.stopScroll = false;
        }, 500);
      });
    },
    showHistoryBtn: function showHistoryBtn() {
      var isTop = this.scroll.isTop; // 当前滚动条是否在顶端

      if (isTop) {
        if (this.scrollTop) {
          this.historyLoding = true;
        } else this.scrollTop = true;

        return;
      }

      this.resetHistoryFlag();
    },
    resetHistoryFlag: function resetHistoryFlag() {
      this.scrollTop = false;
      this.historyLoding = false;
    },
    childnodeLoad: function childnodeLoad() {
      if (this.scrollType !== 'noroll') return;
      var parent = this.$refs.main;
      if (!parent) return;
      var childs = parent.children;
      this.scroll.saveNodes({
        nodes: childs,
        dataList: this.list
      });
    },
    scrollRefresh: function scrollRefresh() {
      var callback = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      if (!this.scroll) return;
      this.scroll.refresh();
      callback && this.$nextTick(function () {
        callback();
      });
    },
    systemEvent: function systemEvent(itemData) {
      this.$emit('click', {
        type: 'systemItem',
        data: itemData
      });
    },
    taskEvent: function taskEvent(itemData) {
      this.$emit('click', {
        type: 'taskItem',
        data: itemData
      });
    },
    handleHistory: function handleHistory() {
      var _this2 = this;

      this.$emit('loadHistory');
      this.$nextTick(function () {
        _this2.resetHistoryFlag();
      });
    }
  },
  mounted: function mounted() {
    this.createScroll(); // this.remind = new Remind()
  }
});
// CONCATENATED MODULE: ./src/components/Chat/chatList.vue?vue&type=script&lang=js&
 /* harmony default export */ var Chat_chatListvue_type_script_lang_js_ = (chatListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/chatList.vue?vue&type=style&index=0&id=422b11e3&scoped=true&lang=scss&
var chatListvue_type_style_index_0_id_422b11e3_scoped_true_lang_scss_ = __webpack_require__("25f8");

// CONCATENATED MODULE: ./src/components/Chat/chatList.vue






/* normalize component */

var chatList_component = normalizeComponent(
  Chat_chatListvue_type_script_lang_js_,
  chatListvue_type_template_id_422b11e3_scoped_true_render,
  chatListvue_type_template_id_422b11e3_scoped_true_staticRenderFns,
  false,
  null,
  "422b11e3",
  null
  
)

/* harmony default export */ var chatList = (chatList_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/tools.vue?vue&type=template&id=252ec5ee&scoped=true&
var toolsvue_type_template_id_252ec5ee_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"toolsBox"},[(_vm.showEmoji)?[_c('el-popover',{ref:"popover",attrs:{"placement":"top-start","trigger":"click"}},[_c('ul',{staticClass:"emjioBox"},_vm._l((Object.keys(_vm.emoji)),function(item){return _c('li',{key:item,on:{"click":function($event){return _vm.selectEmit(item)}}},[(_vm.emoji[item]&&_vm.emoji[item].position)?_c('a',{style:(_vm.emojiStyle(item))}):(_vm.emoji[item].length<5)?_c('a',[_vm._v(_vm._s(_vm.emoji[item]))]):_c('img',{attrs:{"src":_vm.emoji[item]}})])}),0),_c('JwChat-icon',{attrs:{"slot":"reference","type":"icon-xiaolian","title":"表情"},slot:"reference"})],1)]:_vm._e(),_vm._l((_vm.showkeys),function(item,k){return [(_vm.toolConfig[item])?_c('span',{key:item},[_c('span',{on:{"click":function($event){return _vm.bindButton(item)}}},[_c('JwChat-icon',{attrs:{"type":_vm.toolConfig[item].icon,"title":_vm.iconTitle(item,k)}})],1)]):_c('i',{key:item,class:item,on:{"click":function($event){return _vm.bindButton(item)}}})]}),_vm._t("tools")],2)}
var toolsvue_type_template_id_252ec5ee_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/tools.vue?vue&type=template&id=252ec5ee&scoped=true&

// EXTERNAL MODULE: ./src/utils/emoji.json
var emoji = __webpack_require__("d11e");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/tools.vue?vue&type=script&lang=js&





//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var toolsvue_type_script_lang_js_ = ({
  name: "JwChat-tools",
  props: {
    tools: {
      type: Object,
      default: function _default() {
        return {
          show: ['file'],
          showEmoji: true,
          callback: function callback() {}
        };
      }
    }
  },
  data: function data() {
    return {
      emoji: emoji,
      toolConfig: {
        'file': {
          icon: 'icon-wenjian',
          title: '文件'
        },
        'video': {
          icon: 'icon-shipin',
          title: '视频'
        },
        'img': {
          icon: 'icon-xiangce',
          title: '图片'
        },
        'hongbao': {
          icon: 'icon-hongbao',
          title: '红包'
        },
        'history': {
          icon: 'icon-lishi',
          title: '历史'
        },
        'more': {
          icon: 'icon-gengduo',
          title: '更多'
        }
      },
      newTitle: null
    };
  },
  computed: {
    showEmoji: function showEmoji() {
      var _ref = this.tools || {},
          _ref$showEmoji = _ref.showEmoji,
          showEmoji = _ref$showEmoji === void 0 ? true : _ref$showEmoji;

      return showEmoji;
    },
    showkeys: function showkeys() {
      var _this = this;

      var keys = Object.keys(this.toolConfig);

      var _ref2 = this.tools || {},
          _ref2$show = _ref2.show,
          show = _ref2$show === void 0 ? [] : _ref2$show;

      var _key = [];

      if (show.length > 0) {
        show.forEach(function (i) {
          if (Array.isArray(i)) {
            _this.newTitle = i;
            return;
          }

          if (keys.includes(i)) _key.push(i);
        }); // keys = _key
      }

      return _key;
    }
  },
  methods: {
    iconTitle: function iconTitle(key, index) {
      var title = ''; // newTitle = ['自定义标题1', '自定义标题2']

      if (this.newTitle) {
        title = this.newTitle[index] || '';
      }

      if (!title) {
        title = this.toolConfig[key].title;
      }

      return title;
    },
    selectEmit: function selectEmit(type) {
      this.$emit('emoji', type);
      this.$refs.popover.doClose();
    },
    bindButton: function bindButton(type) {
      if (!this.tools.callback) return console.warn('callback not find');

      if (type === 'file') {
        this.openFile(type, this.tools.callback);
      } else {
        this.tools.callback(type);
      }
    },
    openFile: function openFile(type, callback) {
      var input = document.createElement("input");
      input.type = "file";
      input.multiple = 'multiple';
      input.click();

      input.onchange = function () {
        var file = input.files;
        callback(type, file);
      };
    },
    emojiStyle: function emojiStyle(item) {
      var emojiitem = this.emoji[item];
      if (!emojiitem) return {};
      return {
        display: 'inline-block',
        background: "url('https://res.wx.qq.com/a/wx_fed/webwx/res/static/img/6AfH8-r.png')  no-repeat",
        width: "28px",
        height: "28px",
        'background-position': emojiitem.position
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chat/tools.vue?vue&type=script&lang=js&
 /* harmony default export */ var Chat_toolsvue_type_script_lang_js_ = (toolsvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/tools.vue?vue&type=style&index=0&id=252ec5ee&lang=scss&scoped=true&
var toolsvue_type_style_index_0_id_252ec5ee_lang_scss_scoped_true_ = __webpack_require__("5740");

// CONCATENATED MODULE: ./src/components/Chat/tools.vue






/* normalize component */

var tools_component = normalizeComponent(
  Chat_toolsvue_type_script_lang_js_,
  toolsvue_type_template_id_252ec5ee_scoped_true_render,
  toolsvue_type_template_id_252ec5ee_scoped_true_staticRenderFns,
  false,
  null,
  "252ec5ee",
  null
  
)

/* harmony default export */ var tools = (tools_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/quickList.vue?vue&type=template&id=4a1bc502&scoped=true&
var quickListvue_type_template_id_4a1bc502_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return (_vm.showList.length)?_c('div',{ref:"quickListBox",staticClass:"quickListBox"},[_c('div',{staticClass:"quickList"},_vm._l((_vm.showList),function(i,k){return _c('div',{key:k,staticClass:"quickItem"},[_c('span',{domProps:{"innerHTML":_vm._s(i.showtext)}}),_c('i',{staticClass:"enterBtn el-icon-circle-check",attrs:{"title":"选择"},on:{"click":function($event){return _vm.submit(i)}}})])}),0)]):_vm._e()}
var quickListvue_type_template_id_4a1bc502_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Chat/quickList.vue?vue&type=template&id=4a1bc502&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.regexp.constructor.js
var es_regexp_constructor = __webpack_require__("4d63");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/quickList.vue?vue&type=script&lang=js&







//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var quickListvue_type_script_lang_js_ = ({
  components: {},
  data: function data() {
    return {
      scroll: null,
      complete: null
    };
  },
  props: {
    list: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    msg: {
      type: String,
      default: ''
    }
  },
  computed: {
    showList: function showList() {
      var msg = this.msg;
      if (!msg) return [];
      var originList = this.list;
      var reg = new RegExp(msg);
      var result = [];
      originList.forEach(function (i) {
        var text = i.text;

        if (reg.test(text)) {
          var str = text.replace(reg, "<b>".concat(msg, "</b>"));
          result.push(_objectSpread2(_objectSpread2({}, i), {}, {
            showtext: str
          }));
        }
      });
      return result;
    }
  },
  methods: {
    submit: function submit(target) {
      this.$emit('submit', target);
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chat/quickList.vue?vue&type=script&lang=js&
 /* harmony default export */ var Chat_quickListvue_type_script_lang_js_ = (quickListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/quickList.vue?vue&type=style&index=0&id=4a1bc502&lang=scss&scoped=true&
var quickListvue_type_style_index_0_id_4a1bc502_lang_scss_scoped_true_ = __webpack_require__("9916");

// CONCATENATED MODULE: ./src/components/Chat/quickList.vue






/* normalize component */

var quickList_component = normalizeComponent(
  Chat_quickListvue_type_script_lang_js_,
  quickListvue_type_template_id_4a1bc502_scoped_true_render,
  quickListvue_type_template_id_4a1bc502_scoped_true_staticRenderFns,
  false,
  null,
  "4a1bc502",
  null
  
)

/* harmony default export */ var quickList = (quickList_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Chat/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//




/* harmony default export */ var Chatvue_type_script_lang_js_ = ({
  name: "JwChat",
  components: {
    EnterBox: enterBox,
    chatList: chatList,
    tools: tools,
    quickList: quickList
  },
  props: {
    taleList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    scroll: {
      type: Number,
      default: -1
    },
    height: {
      default: '500px'
    },
    width: {
      default: '550px'
    },
    value: {
      default: ''
    },
    scrollType: {
      default: ''
    },
    toolConfig: {
      type: Object // default: () => ({
      //   show: [],
      //   showEmoji: true,
      //   callback: Function
      // })

    },
    config: {},
    quickList: {
      type: Array,
      default: function _default() {
        return [];
      }
    }
  },
  data: function data() {
    return {
      msg: '',
      insert: ''
    };
  },
  watch: {
    value: {
      handler: function handler() {
        this.msg = this.value;
      },
      immediate: true
    },
    msg: {
      handler: function handler() {
        this.$emit('input', this.msg);
      },
      immediate: true
    }
  },
  computed: {
    setStyle: function setStyle() {
      var height = this.height;
      var width = this.width;

      if ("".concat(height).match(/\d$/)) {
        height += 'px';
      }

      if ("".concat(width).match(/\d$/)) {
        width += 'px';
      }

      var style = {
        height: height,
        width: width
      };
      return style;
    },
    talkHeight: function talkHeight() {
      var height = this.height;

      if ("".concat(height).match(/\d$/)) {
        height -= 140;
      } else height = "calc(".concat(height, " - 140px)");

      return height;
    },
    chatListConfig: function chatListConfig() {
      var width = this.width,
          height = this.talkHeight,
          scrollToButton = this.scrollToButton,
          scrollType = this.scrollType,
          _this$config = this.config;
      _this$config = _this$config === void 0 ? {} : _this$config;
      var _this$config$historyC = _this$config.historyConfig,
          historyConfig = _this$config$historyC === void 0 ? {} : _this$config$historyC;
      return {
        width: width,
        height: height,
        scrollToButton: scrollToButton,
        scrollType: scrollType,
        historyConfig: historyConfig
      };
    }
  },
  methods: {
    bindEmoji: function bindEmoji(emoji) {
      var _this = this;

      this.insert = emoji;
      this.$nextTick(function () {
        _this.insert = "";
      });
    },
    loadHistoryHandler: function loadHistoryHandler() {
      var _this$chatListConfig$ = this.chatListConfig.historyConfig;
      _this$chatListConfig$ = _this$chatListConfig$ === void 0 ? {} : _this$chatListConfig$;
      var _this$chatListConfig$2 = _this$chatListConfig$.callback,
          callback = _this$chatListConfig$2 === void 0 ? null : _this$chatListConfig$2;
      callback && callback();
    },
    quickSubmit: function quickSubmit(target) {
      var _this2 = this;

      var text = target.text;
      this.msg = text;
      this.$nextTick(function () {
        _this2.$emit('enter', target);

        _this2.msg = '';
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/Chat/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Chatvue_type_script_lang_js_ = (Chatvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Chat/index.vue?vue&type=style&index=0&id=41d80346&lang=scss&scoped=true&
var Chatvue_type_style_index_0_id_41d80346_lang_scss_scoped_true_ = __webpack_require__("3452");

// CONCATENATED MODULE: ./src/components/Chat/index.vue






/* normalize component */

var Chat_component = normalizeComponent(
  components_Chatvue_type_script_lang_js_,
  render,
  staticRenderFns,
  false,
  null,
  "41d80346",
  null
  
)

/* harmony default export */ var Chat = (Chat_component.exports);
// CONCATENATED MODULE: ./src/components/Chat/index.js

// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

Chat.install = function (Vue) {
  Vue.component(Chat.name, Chat);
};

/* harmony default export */ var components_Chat = (Chat);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ChatInterface/index.vue?vue&type=template&id=561fedf6&scoped=true&
var ChatInterfacevue_type_template_id_561fedf6_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"ChatPage",style:(_vm.faceSize)},[(JSON.stringify(_vm.winBarConfig)!=='{}')?_c('WinBar',{staticClass:"winBar",attrs:{"config":_vm.winBarConfig},on:{"click":_vm.winBarClick}}):_vm._e(),_c('div',{staticClass:"header"},[_c('JwChat-item',{attrs:{"config":_vm.config},on:{"click":_vm.bindClick}}),_vm._t("header")],2),_c('div',{staticClass:"main"},[_c('div',{staticClass:"chatBox"},[_c('JwChat',{attrs:{"taleList":_vm.taleList,"toolConfig":_vm.toolConfig,"scrollType":_vm.scrollType,"width":_vm.realWidth,"height":_vm.chatHeight,"config":_vm.chatConfig,"quickList":_vm.quickList},on:{"enter":function($event){return _vm.$emit('enter', $event)},"clickTalk":function($event){return _vm.$emit('clickTalk',$event)}},model:{value:(_vm.msg),callback:function ($$v) {_vm.msg=$$v},expression:"msg"}},[_vm._t("tools",null,{"slot":"tools"})],2)],1),(_vm.showRightBox)?_c('div',{staticClass:"rightBox"},[_c('span',{on:{"click":function($event){_vm.switchBox = !_vm.switchBox}}},[_c('JwChat-icon',{staticClass:"switch",attrs:{"type":_vm.switchIcon}})],1),(_vm.switchBox)?_vm._t("default"):_vm._e()],2):_vm._e()])],1)}
var ChatInterfacevue_type_template_id_561fedf6_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ChatInterface/index.vue?vue&type=template&id=561fedf6&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ChatInterface/windowBar.vue?vue&type=template&id=6a43a66e&scoped=true&
var windowBarvue_type_template_id_6a43a66e_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"windowBar",style:(_vm.winBarStyle),on:{"mouseup":_vm.moveEnd}},[_c('div',{ref:"windowBar",staticClass:"winBarBox"},[_c('div',[_vm._l((_vm.winList),function(item){return _c('div',{key:item.id,ref:("winItem" + (item.id)),refInFor:true,class:{'winItem':true,'winActive': _vm.activeItem == item.id},style:(_vm.winItemStyle),on:{"click":function($event){$event.stopPropagation();return _vm.bindClick(item)},"mousedown":function($event){$event.stopPropagation();return _vm.moveStart($event,item)},"mousemove":function($event){_vm.moveObj.id == item.id?_vm.bindMove($event):''}}},[_c('JwChat-item',{attrs:{"config":item}}),_c('div',{staticClass:"itemOperation"},[_c('el-button',{attrs:{"size":"mini","type":"danger"},on:{"click":function($event){$event.stopPropagation();return _vm.bindOperation({ type: 'remove', target: item})}}},[_vm._v("删除")])],1)],1)}),(!_vm.winList.length)?[_c('JwChat-empty',{attrs:{"size":"8rem"}}),_c('el-divider',{staticStyle:{"padding":"0 5px"}},[_c('span',{staticStyle:{"font-size":"0.2rem"}},[_vm._v("暂无会话")])])]:_vm._e()],2)])])}
var windowBarvue_type_template_id_6a43a66e_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/ChatInterface/windowBar.vue?vue&type=template&id=6a43a66e&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ChatInterface/windowBar.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var windowBarvue_type_script_lang_js_ = ({
  props: {
    config: {
      typeof: Object,
      default: function _default() {
        return {
          list: [],
          active: null,
          width: '150px',
          listHeight: '60px'
        };
      }
    }
  },
  data: function data() {
    return {
      activeItem: 0,
      moveObj: {},
      scroll: null,
      complete: null,
      operationTimer: null
    };
  },
  computed: {
    winList: function winList() {
      var _this$config$list = this.config.list,
          list = _this$config$list === void 0 ? [] : _this$config$list;
      var winList = list;
      return winList;
    },
    winItemStyle: function winItemStyle() {
      var _this$config$listHeig = this.config.listHeight,
          height = _this$config$listHeig === void 0 ? '60px' : _this$config$listHeig;
      return {
        height: height
      };
    },
    winBarStyle: function winBarStyle() {
      var _this$config$width = this.config.width,
          width = _this$config$width === void 0 ? '150px' : _this$config$width;
      return {
        width: width
      };
    }
  },
  watch: {
    'config.active': {
      handler: function handler(newVal) {
        if (newVal) {
          this.activeItem = newVal;
        }
      },
      deep: true,
      immediate: true
    },
    'config.list': {
      handler: function handler(newVal) {
        if (newVal) {
          this.scrollRefresh();
        }
      },
      deep: true,
      immediate: true
    }
  },
  mounted: function mounted() {
    var dom = this.$refs.windowBar;
    this.scroll = new utils_scroll(dom, {
      click: true,
      scrollbars: true,
      mouseWheel: true,
      preventDefault: false,
      interactiveScrollbars: true,
      hijackInternalLinks: true,
      mouseWheelSpeed: 1
    });
  },
  methods: {
    bindClick: function bindClick(play) {
      var id = play.id;
      this.activeItem = id;
      this.$emit('click', {
        type: 'winBar',
        data: play
      });
    },
    bindOperation: function bindOperation(play) {
      this.doneMove(true);
      this.$emit('click', {
        type: 'winBtn',
        data: play
      });
    },
    moveStart: function moveStart(event, play) {
      this.doneMove(true);
      var id = play.id;
      var x = event.x,
          y = event.y;
      this.moveObj = {
        x: x,
        y: y,
        id: id,
        move: true,
        showOperation: false
      };
    },
    moveEnd: function moveEnd() {
      this.doneMove();
    },
    bindMove: function bindMove($event) {
      var _this$moveObj = this.moveObj,
          _this$moveObj$move = _this$moveObj.move,
          move = _this$moveObj$move === void 0 ? false : _this$moveObj$move,
          id = _this$moveObj.id,
          beforeX = _this$moveObj.x,
          showOperation = _this$moveObj.showOperation;

      if (move) {
        var x = $event.x;
        var movePosition = x - beforeX;
        this.$refs["winItem".concat(id)][0].style.transform = "translateX(".concat(movePosition, "px)");

        if (!showOperation && (movePosition < -20 || movePosition > 100)) {
          this.moveObj.showOperation = true;
          this.moveObj.moveLeft = movePosition > 0 ? false : true;
        }

        if (showOperation) {
          this.doneMove();
        }
      }
    },
    doneMove: function doneMove() {
      var _this = this;

      var immediate = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : false;
      var _this$moveObj2 = this.moveObj,
          id = _this$moveObj2.id,
          moveLeft = _this$moveObj2.moveLeft;
      this.moveObj.move = false;
      if (!id) return;

      var doneCallback = function doneCallback() {
        var result = 0;
        if (moveLeft) result = -70;
        if (immediate) result = 0;

        var dom = _this.$refs["winItem".concat(id)];

        if (!dom.length) return;
        dom[0].style.transform = "translateX(".concat(result, "px)");
      };

      clearTimeout(this.operationTimer);
      if (immediate) return doneCallback();
      this.operationTimer = setTimeout(doneCallback, 1000);
    },
    scrollRefresh: function scrollRefresh() {
      if (!this.scroll) return;
      var that = this;
      that.complete = setInterval(function () {
        // 判断文档和所有子资源(图片、音视频等)已完成加载
        if (document.readyState === 'complete') {
          window.clearInterval(that.complete);
          that.scroll.refresh();
        }
      }, 50);
    }
  }
});
// CONCATENATED MODULE: ./src/components/ChatInterface/windowBar.vue?vue&type=script&lang=js&
 /* harmony default export */ var ChatInterface_windowBarvue_type_script_lang_js_ = (windowBarvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ChatInterface/windowBar.vue?vue&type=style&index=0&id=6a43a66e&lang=scss&scoped=true&
var windowBarvue_type_style_index_0_id_6a43a66e_lang_scss_scoped_true_ = __webpack_require__("b6c8");

// CONCATENATED MODULE: ./src/components/ChatInterface/windowBar.vue






/* normalize component */

var windowBar_component = normalizeComponent(
  ChatInterface_windowBarvue_type_script_lang_js_,
  windowBarvue_type_template_id_6a43a66e_scoped_true_render,
  windowBarvue_type_template_id_6a43a66e_scoped_true_staticRenderFns,
  false,
  null,
  "6a43a66e",
  null
  
)

/* harmony default export */ var windowBar = (windowBar_component.exports);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/ChatInterface/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//

/* harmony default export */ var ChatInterfacevue_type_script_lang_js_ = ({
  name: "JwChat-index",
  components: {
    WinBar: windowBar
  },
  props: {
    config: {
      type: Object,
      default: function _default() {
        return {
          img: 'image/cover.png',
          name: 'JwChat',
          dept: '最简单、最便捷',
          callback: function callback() {}
        };
      }
    },
    showRightBox: {
      type: Boolean,
      default: true
    },
    taleList: {
      type: Array,
      default: function _default() {
        return [];
      }
    },
    height: {
      type: String,
      default: "570"
    },
    width: {
      default: "750"
    },
    value: {
      default: ''
    },
    toolConfig: {
      type: Object
    },
    winBarConfig: {
      type: Object,
      default: function _default() {
        return {};
      }
    },
    scrollType: {
      default: "noroll"
    }
  },
  data: function data() {
    return {
      chatHeight: '',
      msg: '',
      switchBox: true
    };
  },
  computed: {
    faceSize: function faceSize() {
      var height = this.height;
      var width = this.width + '';

      if (height.match(/\d$/)) {
        height += 'px';
      }

      if (width.match(/\d$/)) {
        width += 'px';
      }

      var style = {
        height: height,
        width: width
      };
      return style;
    },
    chatConfig: function chatConfig() {
      var _ref = this.config || {},
          _ref$historyConfig = _ref.historyConfig,
          historyConfig = _ref$historyConfig === void 0 ? {} : _ref$historyConfig;

      return {
        historyConfig: historyConfig
      };
    },
    switchIcon: function switchIcon() {
      var result = 'icon-jiantou-xiangzuo';
      if (this.switchBox) result = 'icon-jiantou-xiangyou';
      return result;
    },
    realWidth: function realWidth() {
      var width = this.width;
      var ratio = 1;
      if (this.showRightBox && this.switchBox) ratio = .7;
      return width * ratio + '';
    },
    quickList: function quickList() {
      var _this$config$quickLis = this.config.quickList,
          quickList = _this$config$quickLis === void 0 ? [] : _this$config$quickLis;
      return quickList;
    }
  },
  watch: {
    height: {
      handler: function handler() {
        this.chatHeight = this.height - 60 + '';
      },
      immediate: true
    },
    value: {
      handler: function handler() {
        this.msg = this.value;
      },
      immediate: true
    },
    msg: {
      handler: function handler() {
        this.$emit('input', this.msg);
      },
      immediate: true
    },
    showRightBox: {
      handler: function handler(newval) {
        if (typeof newval === 'boolean') this.switchBox = newval;
      },
      immediate: true
    }
  },
  methods: {
    bindClick: function bindClick(type) {
      var _ref2 = this.config || {},
          callback = _ref2.callback;

      if (callback) {
        callback(type);
      }
    },
    winBarClick: function winBarClick(play) {
      var _this$winBarConfig$ca = this.winBarConfig.callback,
          callback = _this$winBarConfig$ca === void 0 ? null : _this$winBarConfig$ca;

      if (callback) {
        callback(play);
      }
    }
  }
});
// CONCATENATED MODULE: ./src/components/ChatInterface/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_ChatInterfacevue_type_script_lang_js_ = (ChatInterfacevue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/ChatInterface/index.vue?vue&type=style&index=0&id=561fedf6&scoped=true&lang=scss&
var ChatInterfacevue_type_style_index_0_id_561fedf6_scoped_true_lang_scss_ = __webpack_require__("7dfa");

// CONCATENATED MODULE: ./src/components/ChatInterface/index.vue






/* normalize component */

var ChatInterface_component = normalizeComponent(
  components_ChatInterfacevue_type_script_lang_js_,
  ChatInterfacevue_type_template_id_561fedf6_scoped_true_render,
  ChatInterfacevue_type_template_id_561fedf6_scoped_true_staticRenderFns,
  false,
  null,
  "561fedf6",
  null
  
)

/* harmony default export */ var ChatInterface = (ChatInterface_component.exports);
// CONCATENATED MODULE: ./src/components/ChatInterface/index.js

// 导入组件，组件必须声明 name
 // 为组件添加 install 方法，用于按需引入

ChatInterface.install = function (Vue) {
  Vue.component(ChatInterface.name, ChatInterface);
};

/* harmony default export */ var components_ChatInterface = (ChatInterface);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icon/index.vue?vue&type=template&id=95707508&
var Iconvue_type_template_id_95707508_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('i',{class:_vm._class})}
var Iconvue_type_template_id_95707508_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Icon/index.vue?vue&type=template&id=95707508&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Icon/index.vue?vue&type=script&lang=js&

//
//
//
//
/* harmony default export */ var Iconvue_type_script_lang_js_ = ({
  name: 'JwChat-icon',
  props: {
    type: {
      type: String,
      required: true
    }
  },
  computed: {
    _class: function _class() {
      var _ref;

      return _ref = {}, _defineProperty(_ref, this.$style.iconfont, true), _defineProperty(_ref, this.$style[this.type], true), _ref;
    }
  }
});
// CONCATENATED MODULE: ./src/components/Icon/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Iconvue_type_script_lang_js_ = (Iconvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Icon/index.vue?vue&type=style&index=0&module=true&lang=css&
var Iconvue_type_style_index_0_module_true_lang_css_ = __webpack_require__("7b57");

// CONCATENATED MODULE: ./src/components/Icon/index.vue








function injectStyles (context) {
  
  this["$style"] = (Iconvue_type_style_index_0_module_true_lang_css_["default"].locals || Iconvue_type_style_index_0_module_true_lang_css_["default"])

}

/* normalize component */

var Icon_component = normalizeComponent(
  components_Iconvue_type_script_lang_js_,
  Iconvue_type_template_id_95707508_render,
  Iconvue_type_template_id_95707508_staticRenderFns,
  false,
  injectStyles,
  null,
  null
  
)

/* harmony default export */ var Icon = (Icon_component.exports);
// CONCATENATED MODULE: ./src/components/Icon/index.js



Icon.install = function (Vue) {
  Vue.component(Icon.name, Icon);
};

/* harmony default export */ var components_Icon = (Icon);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UserItem/index.vue?vue&type=template&id=a477b5c4&scoped=true&
var UserItemvue_type_template_id_a477b5c4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"item"},[_c('el-badge',{attrs:{"value":_vm.config.readNum}},[(_vm.config.img)?_c('img',{staticClass:"cover",style:(_vm.coverSize),attrs:{"src":_vm.config.img},on:{"click":function($event){return _vm.bindClick({ key:'cover', value: _vm.config })}}}):_vm._e()]),_c('div',{staticClass:"info"},[_c('p',{staticClass:"name",on:{"click":function($event){return _vm.bindClick({ key:'name', value: _vm.config })}}},[_vm._v(_vm._s(_vm.config.name))]),_c('p',{staticClass:"dept",on:{"click":function($event){return _vm.bindClick({ key:'dept', value: _vm.config })}}},[_vm._v(_vm._s(_vm.config.dept))])])],1)}
var UserItemvue_type_template_id_a477b5c4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UserItem/index.vue?vue&type=template&id=a477b5c4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UserItem/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var UserItemvue_type_script_lang_js_ = ({
  name: 'JwChat-item',
  props: {
    config: {
      type: Object,
      default: function _default() {
        return {
          img: '',
          name: 'JwChat',
          dept: ''
        };
      },
      required: true
    },
    size: {
      default: 35
    }
  },
  computed: {
    coverSize: function coverSize() {
      var size = this.size;

      if ("".concat(size).match(/\d$/)) {
        size += 'px';
      }

      return {
        width: size,
        height: size
      };
    }
  },
  methods: {
    bindClick: function bindClick(type) {
      var target = type;
      this.$emit('click', target);
    }
  }
});
// CONCATENATED MODULE: ./src/components/UserItem/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_UserItemvue_type_script_lang_js_ = (UserItemvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/UserItem/index.vue?vue&type=style&index=0&id=a477b5c4&lang=scss&scoped=true&
var UserItemvue_type_style_index_0_id_a477b5c4_lang_scss_scoped_true_ = __webpack_require__("33e0");

// CONCATENATED MODULE: ./src/components/UserItem/index.vue






/* normalize component */

var UserItem_component = normalizeComponent(
  components_UserItemvue_type_script_lang_js_,
  UserItemvue_type_template_id_a477b5c4_scoped_true_render,
  UserItemvue_type_template_id_a477b5c4_scoped_true_staticRenderFns,
  false,
  null,
  "a477b5c4",
  null
  
)

/* harmony default export */ var UserItem = (UserItem_component.exports);
// CONCATENATED MODULE: ./src/components/UserItem/index.js



UserItem.install = function (Vue) {
  Vue.component(UserItem.name, UserItem);
};

/* harmony default export */ var components_UserItem = (UserItem);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Empty/index.vue?vue&type=template&id=6cf286f3&scoped=true&
var Emptyvue_type_template_id_6cf286f3_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"empty",style:(_vm.sizeBox)},[_c('JwChat-icon',{style:(_vm.sizeStyle),attrs:{"type":"icon-empty"}})],1)}
var Emptyvue_type_template_id_6cf286f3_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Empty/index.vue?vue&type=template&id=6cf286f3&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Empty/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
/* harmony default export */ var Emptyvue_type_script_lang_js_ = ({
  name: 'JwChat-empty',
  props: {
    size: {
      default: '5rem'
    }
  },
  computed: {
    sizeBox: function sizeBox() {
      var size = this.size;

      if ("".concat(size).match(/\d$/)) {
        size += 'px';
      }

      return {
        width: size
      };
    },
    sizeStyle: function sizeStyle() {
      var size = this.size;

      if ("".concat(size).match(/\d$/)) {
        size += 'px';
      }

      return {
        fontSize: "calc(".concat(size, " / 2)")
      };
    }
  }
});
// CONCATENATED MODULE: ./src/components/Empty/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Emptyvue_type_script_lang_js_ = (Emptyvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Empty/index.vue?vue&type=style&index=0&id=6cf286f3&scoped=true&lang=scss&
var Emptyvue_type_style_index_0_id_6cf286f3_scoped_true_lang_scss_ = __webpack_require__("558e");

// CONCATENATED MODULE: ./src/components/Empty/index.vue






/* normalize component */

var Empty_component = normalizeComponent(
  components_Emptyvue_type_script_lang_js_,
  Emptyvue_type_template_id_6cf286f3_scoped_true_render,
  Emptyvue_type_template_id_6cf286f3_scoped_true_staticRenderFns,
  false,
  null,
  "6cf286f3",
  null
  
)

/* harmony default export */ var Empty = (Empty_component.exports);
// CONCATENATED MODULE: ./src/components/Empty/index.js



Empty.install = function (Vue) {
  Vue.component(Empty.name, Empty);
};

/* harmony default export */ var components_Empty = (Empty);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RightList/index.vue?vue&type=template&id=244b2bce&scoped=true&
var RightListvue_type_template_id_244b2bce_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrapper"},[_c('div',{staticClass:"notice",staticStyle:{}},[(!_vm.info.notice)?_c('JwChat-empty',{staticClass:"empty",attrs:{"size":"8rem"}}):_vm._e(),_c('P',{staticStyle:{"padding-left":"0.2rem"}},[_vm._v(_vm._s(_vm.info.tip))]),_c('p',{staticStyle:{"font-size":"0.8rem","margin-top":"0.5rem","padding":"0 .2rem"}},[_vm._v(_vm._s(_vm.info.notice))])],1),_c('div',{staticClass:"userList"},[_c('div',[_vm._v(_vm._s(_vm.info.listTip)+" ("+_vm._s(_vm.info.list.length)+")")]),_c('ul',_vm._l((_vm.info.list),function(item,k){return _c('li',{key:k},[_c('JwChat-item',{attrs:{"size":"25","config":item},on:{"click":_vm.bindClick}})],1)}),0)])])}
var RightListvue_type_template_id_244b2bce_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/RightList/index.vue?vue&type=template&id=244b2bce&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/RightList/index.vue?vue&type=script&lang=js&
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var RightListvue_type_script_lang_js_ = ({
  name: 'JwChat-rightbox',
  props: {
    config: Object
  },
  computed: {
    info: function info() {
      var config = this.config;
      var tip = '群公告:';
      var notice = '';
      var listTip = '组成员';
      var list = [];

      if (this.config) {
        config.tip && (tip = config.tip);
        config.notice && (notice = config.notice);
        config.listTip && (listTip = config.listTip);
        config.list && (list = config.list);
      }

      return {
        tip: tip,
        notice: notice,
        listTip: listTip,
        list: list
      };
    }
  },
  methods: {
    bindClick: function bindClick(type) {
      this.$emit('click', type);
    }
  }
});
// CONCATENATED MODULE: ./src/components/RightList/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_RightListvue_type_script_lang_js_ = (RightListvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/RightList/index.vue?vue&type=style&index=0&id=244b2bce&scoped=true&lang=scss&
var RightListvue_type_style_index_0_id_244b2bce_scoped_true_lang_scss_ = __webpack_require__("6de8");

// CONCATENATED MODULE: ./src/components/RightList/index.vue






/* normalize component */

var RightList_component = normalizeComponent(
  components_RightListvue_type_script_lang_js_,
  RightListvue_type_template_id_244b2bce_scoped_true_render,
  RightListvue_type_template_id_244b2bce_scoped_true_staticRenderFns,
  false,
  null,
  "244b2bce",
  null
  
)

/* harmony default export */ var RightList = (RightList_component.exports);
// CONCATENATED MODULE: ./src/components/RightList/index.js



RightList.install = function (Vue) {
  Vue.component(RightList.name, RightList);
};

/* harmony default export */ var components_RightList = (RightList);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QuickTalk/index.vue?vue&type=template&id=1c4106e7&scoped=true&
var QuickTalkvue_type_template_id_1c4106e7_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"wrapper"},[(_vm.showHeader)?_c('el-menu',{staticClass:"el-menu-demo",attrs:{"default-active":_vm.activeIndex,"mode":"horizontal"},on:{"select":_vm.handleSelect}},[_vm._l((_vm.showNav),function(item,key){return _c('el-menu-item',{key:item,attrs:{"index":("" + (key+1))}},[_vm._v(_vm._s(item))])}),_c('i',{staticClass:"addBtn el-icon-circle-plus-outline",style:(_vm.showAddBtn),attrs:{"title":"新增"},on:{"click":function($event){_vm.visible=true}}})],2):_vm._e(),(!_vm.Talelist.length)?_c('JwChat-empty'):_vm._e(),_c('ul',_vm._l((_vm.Talelist),function(i,k){return _c('li',{key:i},[_c('el-row',[_c('el-col',{attrs:{"span":(_vm.showDelete==false?19+2:19)}},[_c('p',[_vm._v(_vm._s(i))])]),_c('el-col',{staticStyle:{"text-algin":"right"},attrs:{"span":(_vm.showDelete==false?5-2:5)}},[_c('i',{staticClass:"el-icon-circle-check",attrs:{"title":"发送"},on:{"click":function($event){return _vm.emit({key:'select',value: i})}}}),(_vm.showDelete)?_c('i',{staticClass:"el-icon-circle-close",attrs:{"title":"删除"},on:{"click":function($event){return _vm.emit({key:'delIndex',value: k})}}}):_vm._e()])],1)],1)}),0),_c('el-dialog',{attrs:{"title":"新增快捷回复","visible":_vm.visible,"width":"36%","modal-append-to-body":false},on:{"update:visible":function($event){_vm.visible=$event}}},[_c('el-input',{attrs:{"rows":3,"show-word-limit":"","maxlength":_vm.maxlength,"placeholder":"请输入快捷回复语","type":"textarea"},model:{value:(_vm.itemQuick),callback:function ($$v) {_vm.itemQuick=$$v},expression:"itemQuick"}}),_c('div',{staticStyle:{"text-align":"right","margin":"0","margin-top":"10px"}},[_c('el-button',{attrs:{"size":"mini","type":"text"},on:{"click":function($event){_vm.visible = false}}},[_vm._v("取消")]),_c('el-button',{attrs:{"type":"primary","size":"mini"},on:{"click":_vm.AddQuickFn}},[_vm._v("确定")])],1)],1)],1)}
var QuickTalkvue_type_template_id_1c4106e7_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/QuickTalk/index.vue?vue&type=template&id=1c4106e7&scoped=true&

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayWithHoles.js
function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/iterableToArrayLimit.js







function _iterableToArrayLimit(arr, i) {
  if (typeof Symbol === "undefined" || !(Symbol.iterator in Object(arr))) return;
  var _arr = [];
  var _n = true;
  var _d = false;
  var _e = undefined;

  try {
    for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}
// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.from.js
var es_array_from = __webpack_require__("a630");

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.array.slice.js
var es_array_slice = __webpack_require__("fb6a");

// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/arrayLikeToArray.js
function _arrayLikeToArray(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/unsupportedIterableToArray.js







function _unsupportedIterableToArray(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/nonIterableRest.js
function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}
// CONCATENATED MODULE: ./node_modules/@babel/runtime/helpers/esm/slicedToArray.js




function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
}
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/QuickTalk/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var QuickTalkvue_type_script_lang_js_ = ({
  name: 'JwChat-talk',
  props: {
    Talelist: Array,
    config: Object
  },
  data: function data() {
    var _this$config$maxlengt = this.config.maxlength,
        maxlength = _this$config$maxlengt === void 0 ? 300 : _this$config$maxlengt;
    return {
      activeIndex: '1',
      visible: false,
      itemQuick: '',
      maxlength: maxlength
    };
  },
  computed: {
    showAddBtn: function showAddBtn() {
      var showBtn = true;
      var visible = 'visible';
      var _this$config$showAdd = this.config.showAdd,
          showAdd = _this$config$showAdd === void 0 ? true : _this$config$showAdd;
      showBtn = showAdd;

      if (!showBtn) {
        visible = 'hidden';
      }

      return {
        visibility: visible
      };
    },
    showNav: function showNav() {
      var navList = ['快捷回复'];
      var nav = this.config.nav;

      if (nav) {
        var _nav = _slicedToArray(nav, 2),
            a = _nav[0],
            b = _nav[1];

        navList = [a, b];
      }

      return navList;
    },
    showDelete: function showDelete() {
      var show = true;

      var _ref = this.config || {},
          showDeleteBtn = _ref.showDeleteBtn;

      if (showDeleteBtn === false) {
        show = false;
      }

      return show;
    }
  },
  methods: {
    showHeader: function showHeader() {
      var heder = true;

      var _ref2 = this.config || {},
          _ref2$showHeader = _ref2.showHeader,
          showHeader = _ref2$showHeader === void 0 ? true : _ref2$showHeader;

      if (showHeader === false) {
        heder = false;
      }

      return heder;
    },
    handleSelect: function handleSelect(index) {
      this.activeIndex = index;
      this.emit({
        key: 'navIndex',
        value: index
      });
    },
    AddQuickFn: function AddQuickFn() {
      var _this = this;

      this.emit({
        key: 'addTalk',
        value: this.itemQuick
      });
      this.visible = false;
      this.$nextTick(function () {
        _this.itemQuick = "";
      });
    },
    emit: function emit(play) {
      this.$emit('event', play);
    }
  }
});
// CONCATENATED MODULE: ./src/components/QuickTalk/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_QuickTalkvue_type_script_lang_js_ = (QuickTalkvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/QuickTalk/index.vue?vue&type=style&index=0&id=1c4106e7&scoped=true&lang=css&
var QuickTalkvue_type_style_index_0_id_1c4106e7_scoped_true_lang_css_ = __webpack_require__("1a3d");

// CONCATENATED MODULE: ./src/components/QuickTalk/index.vue






/* normalize component */

var QuickTalk_component = normalizeComponent(
  components_QuickTalkvue_type_script_lang_js_,
  QuickTalkvue_type_template_id_1c4106e7_scoped_true_render,
  QuickTalkvue_type_template_id_1c4106e7_scoped_true_staticRenderFns,
  false,
  null,
  "1c4106e7",
  null
  
)

/* harmony default export */ var QuickTalk = (QuickTalk_component.exports);
// CONCATENATED MODULE: ./src/components/QuickTalk/index.js



QuickTalk.install = function (Vue) {
  Vue.component(QuickTalk.name, QuickTalk);
};

/* harmony default export */ var components_QuickTalk = (QuickTalk);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Count/index.vue?vue&type=template&id=b98501ac&scoped=true&
var Countvue_type_template_id_b98501ac_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"jwchat-count",style:(_vm.style)},[(_vm.getTitle)?_c('span',{staticClass:"title"},[_vm._v(_vm._s(_vm.getTitle))]):_vm._e(),_c('div',{staticClass:"number",style:(_vm.numberStyle)},[_vm._v(_vm._s(_vm.count))]),(_vm.getUnit)?_c('div',{style:(_vm.unitStyle)},[_vm._v(_vm._s(_vm.getUnit))]):_vm._e()])}
var Countvue_type_template_id_b98501ac_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/Count/index.vue?vue&type=template&id=b98501ac&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/Count/index.vue?vue&type=script&lang=js&

//
//
//
//
//
//
//
//
/* harmony default export */ var Countvue_type_script_lang_js_ = ({
  size: Number,
  name: 'JwChat-count',
  props: {
    num: Number,
    config: {
      regulator: Number,
      time: Number,
      color: Array,
      unit: String,
      title: String,
      width: Array,
      height: String
    }
  },
  data: function data() {
    return {
      count: 0
    };
  },
  computed: {
    style: function style() {
      var _ref = this.config || {},
          _ref$color = _ref.color,
          color = _ref$color === void 0 ? [""] : _ref$color,
          _ref$size = _ref.size,
          size = _ref$size === void 0 ? ["2rem"] : _ref$size,
          _ref$width = _ref.width,
          width = _ref$width === void 0 ? "" : _ref$width,
          _ref$height = _ref.height,
          height = _ref$height === void 0 ? '' : _ref$height;

      return {
        color: color[0],
        fontSize: size[0],
        width: width,
        height: height,
        lineHeight: height
      };
    },
    getUnit: function getUnit() {
      var _ref2 = this.config || {},
          _ref2$unit = _ref2.unit,
          unit = _ref2$unit === void 0 ? "" : _ref2$unit;

      return unit;
    },
    numberStyle: function numberStyle() {
      var _ref3 = this.config || {},
          _ref3$color = _ref3.color,
          color = _ref3$color === void 0 ? [""] : _ref3$color,
          _ref3$size = _ref3.size,
          size = _ref3$size === void 0 ? [""] : _ref3$size;

      var obj = {
        textAlign: 'center'
      };
      if (color[1]) obj.color = color[1];
      if (size[1]) obj.fontSize = size[1];
      return obj;
    },
    unitStyle: function unitStyle() {
      var _ref4 = this.config || {},
          _ref4$color = _ref4.color,
          color = _ref4$color === void 0 ? [""] : _ref4$color,
          _ref4$size = _ref4.size,
          size = _ref4$size === void 0 ? [""] : _ref4$size;

      var obj = {};
      if (color[2]) obj.color = color[2];
      if (size[2]) obj.fontSize = size[2];
      return obj;
    },
    getTitle: function getTitle() {
      var _ref5 = this.config || {},
          _ref5$title = _ref5.title,
          title = _ref5$title === void 0 ? "" : _ref5$title;

      return title;
    }
  },
  watch: {
    num: function num() {
      this.NumAutoPlusAnimation();
    }
  },
  methods: {
    NumAutoPlusAnimation: function NumAutoPlusAnimation() {
      var that = this;
      var time = this.config && this.config.time || 1500; //总时间--毫秒为单位

      var finalNum = this.num; //要显示的真实数值

      var regulator = this.config && this.config.regulator || 100; //调速器，改变regulator的数值可以调节数字改变的速度

      var step = finalNum / (time / regulator);
      /*每30ms增加的数值--*/

      var count = 0; //计数器

      var initial = 0;
      var timer = setInterval(function () {
        count = count + step;

        if (count >= finalNum) {
          clearInterval(timer);
          count = finalNum;
        } //t未发生改变的话就直接返回
        //避免调用text函数，提高DOM性能


        var t = Math.floor(count);
        if (t == initial) return;
        initial = t;
        that.count = initial;
      }, 30);
    }
  },
  created: function created() {
    this.NumAutoPlusAnimation();
  }
});
// CONCATENATED MODULE: ./src/components/Count/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_Countvue_type_script_lang_js_ = (Countvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/Count/index.vue?vue&type=style&index=0&id=b98501ac&lang=scss&scoped=true&
var Countvue_type_style_index_0_id_b98501ac_lang_scss_scoped_true_ = __webpack_require__("9d39");

// CONCATENATED MODULE: ./src/components/Count/index.vue






/* normalize component */

var Count_component = normalizeComponent(
  components_Countvue_type_script_lang_js_,
  Countvue_type_template_id_b98501ac_scoped_true_render,
  Countvue_type_template_id_b98501ac_scoped_true_staticRenderFns,
  false,
  null,
  "b98501ac",
  null
  
)

/* harmony default export */ var Count = (Count_component.exports);
// CONCATENATED MODULE: ./src/components/Count/index.js



Count.install = function (Vue) {
  Vue.component(Count.name, Count);
};

/* harmony default export */ var components_Count = (Count);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UserCard/index.vue?vue&type=template&id=303b8c24&scoped=true&
var UserCardvue_type_template_id_303b8c24_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"userCard",style:(_vm.boxStyle)},[(_vm.cover)?_c('img',{staticClass:"cover",style:(_vm.coverStyle),attrs:{"src":_vm.cover,"alt":""}}):_vm._e(),_vm._l((_vm.data),function(item,k){return _c('div',{key:k,staticClass:"item"},[_c('span',{staticClass:"icon"},[(_vm.icon)?_c('i',{class:item.icon||_vm.icon}):_vm._e()]),_c('span',{staticClass:"label"},[_vm._v(_vm._s(item.label))]),_c('span',{staticClass:"content"},[_vm._v(_vm._s(item.value))])])})],2)}
var UserCardvue_type_template_id_303b8c24_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/UserCard/index.vue?vue&type=template&id=303b8c24&scoped=true&

// EXTERNAL MODULE: ./node_modules/core-js/modules/es.object.assign.js
var es_object_assign = __webpack_require__("cca6");

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/UserCard/index.vue?vue&type=script&lang=js&



//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var UserCardvue_type_script_lang_js_ = ({
  name: 'JwChat-card',
  props: {
    config: {
      type: Object
    },
    data: Array
  },
  data: function data() {
    return {
      icon: 'el-icon-star-off',
      cover: '/image/two.jpeg'
    };
  },
  watch: {
    config: function config(newValu) {
      var _ref = newValu || {},
          _ref$icon = _ref.icon,
          icon = _ref$icon === void 0 ? false : _ref$icon,
          _ref$cover = _ref.cover,
          cover = _ref$cover === void 0 ? false : _ref$cover;

      this.icon = icon;
      this.cover = cover;
    }
  },
  computed: {
    boxStyle: function boxStyle() {
      var width = "25vw";
      var height = '60vh';

      var _ref2 = this.config || {},
          w = _ref2.width,
          h = _ref2.height;

      if (w && "".concat(w).match(/\d$/)) {
        width = w + 'vw';
      }

      if (h && "".concat(h).match(/\d$/)) {
        height = h + 'vh';
      }

      return {
        width: width,
        height: height
      };
    },
    coverStyle: function coverStyle() {
      var width = '150px';

      var _ref3 = this.config || {},
          _ref3$coverStyle = _ref3.coverStyle,
          coverStyle = _ref3$coverStyle === void 0 ? {} : _ref3$coverStyle;

      return Object.assign({
        width: width
      }, coverStyle);
    }
  }
});
// CONCATENATED MODULE: ./src/components/UserCard/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_UserCardvue_type_script_lang_js_ = (UserCardvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/UserCard/index.vue?vue&type=style&index=0&id=303b8c24&scoped=true&lang=css&
var UserCardvue_type_style_index_0_id_303b8c24_scoped_true_lang_css_ = __webpack_require__("5dda");

// CONCATENATED MODULE: ./src/components/UserCard/index.vue






/* normalize component */

var UserCard_component = normalizeComponent(
  components_UserCardvue_type_script_lang_js_,
  UserCardvue_type_template_id_303b8c24_scoped_true_render,
  UserCardvue_type_template_id_303b8c24_scoped_true_staticRenderFns,
  false,
  null,
  "303b8c24",
  null
  
)

/* harmony default export */ var UserCard = (UserCard_component.exports);
// CONCATENATED MODULE: ./src/components/UserCard/index.js



UserCard.install = function (Vue) {
  Vue.component(UserCard.name, UserCard);
};

/* harmony default export */ var components_UserCard = (UserCard);
// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js?{"cacheDirectory":"node_modules/.cache/vue-loader","cacheIdentifier":"406ed5b0-vue-loader-template"}!./node_modules/vue-loader/lib/loaders/templateLoader.js??vue-loader-options!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoginBox/index.vue?vue&type=template&id=0cd7acd4&scoped=true&
var LoginBoxvue_type_template_id_0cd7acd4_scoped_true_render = function () {var _vm=this;var _h=_vm.$createElement;var _c=_vm._self._c||_h;return _c('div',{staticClass:"login-container",style:(_vm.boxStyle)},[_c('el-form',{ref:"loginForm",staticClass:"login-form",attrs:{"model":_vm.loginForm,"rules":_vm.config.rules,"auto-complete":"on","label-position":"left"}},[_c('el-form-item',{attrs:{"prop":"username"}},[_c('span',{staticClass:"svg-container"},[_c('i',{staticClass:"el-icon-user"})]),_c('el-input',{ref:"username",attrs:{"placeholder":"账号","name":"username","type":"text","tabindex":"1","auto-complete":"on"},model:{value:(_vm.loginForm.username),callback:function ($$v) {_vm.$set(_vm.loginForm, "username", $$v)},expression:"loginForm.username"}})],1),_c('el-form-item',{attrs:{"prop":"password"}},[_c('span',{staticClass:"svg-container"},[_c('i',{staticClass:"el-icon-lock"})]),_c('el-input',{key:_vm.passwordType,ref:"password",attrs:{"type":_vm.passwordType,"placeholder":"密码","name":"password","tabindex":"2","auto-complete":"on"},nativeOn:{"keyup":function($event){if(!$event.type.indexOf('key')&&_vm._k($event.keyCode,"enter",13,$event.key,"Enter")){ return null; }return _vm.handleLogin($event)}},model:{value:(_vm.loginForm.password),callback:function ($$v) {_vm.$set(_vm.loginForm, "password", $$v)},expression:"loginForm.password"}}),_c('span',{staticClass:"show-pwd",on:{"click":_vm.showPwd}},[_c('JwChat-icon',{attrs:{"type":_vm.passwordType === 'password'?'icon-zyj_unlooked':'icon-look'}})],1)],1),_c('el-button',{staticStyle:{"width":"100%"},attrs:{"type":"primary"},nativeOn:{"click":function($event){$event.preventDefault();return _vm.handleLogin($event)}}},[_vm._v("登录")])],1)],1)}
var LoginBoxvue_type_template_id_0cd7acd4_scoped_true_staticRenderFns = []


// CONCATENATED MODULE: ./src/components/LoginBox/index.vue?vue&type=template&id=0cd7acd4&scoped=true&

// CONCATENATED MODULE: ./node_modules/cache-loader/dist/cjs.js??ref--12-0!./node_modules/thread-loader/dist/cjs.js!./node_modules/@vue/cli-plugin-babel/node_modules/babel-loader/lib!./node_modules/cache-loader/dist/cjs.js??ref--0-0!./node_modules/vue-loader/lib??vue-loader-options!./src/components/LoginBox/index.vue?vue&type=script&lang=js&


//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
//
/* harmony default export */ var LoginBoxvue_type_script_lang_js_ = ({
  name: 'JwChat-login',
  props: {
    width: {
      type: String,
      default: '100vw'
    },
    config: {
      type: Object,
      default: function _default() {
        return {
          rules: {
            username: [{
              required: true,
              trigger: 'blur',
              validator: function validator(rule, value, callback) {
                if (!value) {
                  callback(new Error('请输入账号'));
                } else {
                  callback();
                }
              }
            }],
            password: [{
              required: true,
              trigger: 'blur',
              validator: function validator(rule, value, callback) {
                if (!value) {
                  callback(new Error('请输入密码'));
                } else {
                  callback();
                }
              }
            }]
          }
        };
      }
    }
  },
  data: function data() {
    return {
      loginForm: {},
      passwordType: 'password'
    };
  },
  computed: {
    boxStyle: function boxStyle() {
      var width = this.width;

      if ("".concat(width).match(/\d$/)) {
        width += 'px';
      }

      return {
        width: width
      };
    }
  },
  methods: {
    showPwd: function showPwd() {
      var _this = this;

      if (this.passwordType === 'password') {
        this.passwordType = '';
      } else {
        this.passwordType = 'password';
      }

      this.$nextTick(function () {
        _this.$refs.password.focus();
      });
    },
    handleLogin: function handleLogin() {
      var _this2 = this;

      this.$refs.loginForm.validate(function (valid) {
        if (valid) {
          _this2.$emit('submit', _this2.loginForm);
        } else {
          return false;
        }
      });
    }
  }
});
// CONCATENATED MODULE: ./src/components/LoginBox/index.vue?vue&type=script&lang=js&
 /* harmony default export */ var components_LoginBoxvue_type_script_lang_js_ = (LoginBoxvue_type_script_lang_js_); 
// EXTERNAL MODULE: ./src/components/LoginBox/index.vue?vue&type=style&index=0&id=0cd7acd4&lang=scss&scoped=true&
var LoginBoxvue_type_style_index_0_id_0cd7acd4_lang_scss_scoped_true_ = __webpack_require__("5798");

// CONCATENATED MODULE: ./src/components/LoginBox/index.vue






/* normalize component */

var LoginBox_component = normalizeComponent(
  components_LoginBoxvue_type_script_lang_js_,
  LoginBoxvue_type_template_id_0cd7acd4_scoped_true_render,
  LoginBoxvue_type_template_id_0cd7acd4_scoped_true_staticRenderFns,
  false,
  null,
  "0cd7acd4",
  null
  
)

/* harmony default export */ var LoginBox = (LoginBox_component.exports);
// CONCATENATED MODULE: ./src/components/LoginBox/index.js



LoginBox.install = function (Vue) {
  Vue.component(LoginBox.name, LoginBox);
};

/* harmony default export */ var components_LoginBox = (LoginBox);
// CONCATENATED MODULE: ./src/components/index.js



// 导入组件









 // 以数组结构保存组件，便于遍历

var components = [components_Chat, components_ChatInterface, components_Icon, components_UserItem, components_Empty, components_RightList, components_QuickTalk, components_Count, components_UserCard, components_LoginBox]; // 定义 install 方法

var install = function install(Vue) {
  if (install.installed) return;
  install.installed = true; // 遍历并注册全局组件

  components.map(function (component) {
    Vue.component(component.name, component);
  });
};

if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
}

/* harmony default export */ var src_components = (_objectSpread2({
  // 导出的对象必须具备一个 install 方法
  install: install
}, components));
// CONCATENATED MODULE: ./node_modules/@vue/cli-service/lib/commands/build/entry-lib.js


/* harmony default export */ var entry_lib = __webpack_exports__["default"] = (src_components);



/***/ }),

/***/ "fb6a":
/***/ (function(module, exports, __webpack_require__) {

"use strict";

var $ = __webpack_require__("23e7");
var isObject = __webpack_require__("861d");
var isArray = __webpack_require__("e8b5");
var toAbsoluteIndex = __webpack_require__("23cb");
var toLength = __webpack_require__("50c4");
var toIndexedObject = __webpack_require__("fc6a");
var createProperty = __webpack_require__("8418");
var wellKnownSymbol = __webpack_require__("b622");
var arrayMethodHasSpeciesSupport = __webpack_require__("1dde");
var arrayMethodUsesToLength = __webpack_require__("ae40");

var HAS_SPECIES_SUPPORT = arrayMethodHasSpeciesSupport('slice');
var USES_TO_LENGTH = arrayMethodUsesToLength('slice', { ACCESSORS: true, 0: 0, 1: 2 });

var SPECIES = wellKnownSymbol('species');
var nativeSlice = [].slice;
var max = Math.max;

// `Array.prototype.slice` method
// https://tc39.github.io/ecma262/#sec-array.prototype.slice
// fallback for not array-like ES3 strings and DOM objects
$({ target: 'Array', proto: true, forced: !HAS_SPECIES_SUPPORT || !USES_TO_LENGTH }, {
  slice: function slice(start, end) {
    var O = toIndexedObject(this);
    var length = toLength(O.length);
    var k = toAbsoluteIndex(start, length);
    var fin = toAbsoluteIndex(end === undefined ? length : end, length);
    // inline `ArraySpeciesCreate` for usage native `Array#slice` where it's possible
    var Constructor, result, n;
    if (isArray(O)) {
      Constructor = O.constructor;
      // cross-realm fallback
      if (typeof Constructor == 'function' && (Constructor === Array || isArray(Constructor.prototype))) {
        Constructor = undefined;
      } else if (isObject(Constructor)) {
        Constructor = Constructor[SPECIES];
        if (Constructor === null) Constructor = undefined;
      }
      if (Constructor === Array || Constructor === undefined) {
        return nativeSlice.call(O, k, fin);
      }
    }
    result = new (Constructor === undefined ? Array : Constructor)(max(fin - k, 0));
    for (n = 0; k < fin; k++, n++) if (k in O) createProperty(result, n, O[k]);
    result.length = n;
    return result;
  }
});


/***/ }),

/***/ "fc6a":
/***/ (function(module, exports, __webpack_require__) {

// toObject with fallback for non-array-like ES3 strings
var IndexedObject = __webpack_require__("44ad");
var requireObjectCoercible = __webpack_require__("1d80");

module.exports = function (it) {
  return IndexedObject(requireObjectCoercible(it));
};


/***/ }),

/***/ "fdbc":
/***/ (function(module, exports) {

// iterable DOM collections
// flag - `iterable` interface - 'entries', 'keys', 'values', 'forEach' methods
module.exports = {
  CSSRuleList: 0,
  CSSStyleDeclaration: 0,
  CSSValueList: 0,
  ClientRectList: 0,
  DOMRectList: 0,
  DOMStringList: 0,
  DOMTokenList: 1,
  DataTransferItemList: 0,
  FileList: 0,
  HTMLAllCollection: 0,
  HTMLCollection: 0,
  HTMLFormElement: 0,
  HTMLSelectElement: 0,
  MediaList: 0,
  MimeTypeArray: 0,
  NamedNodeMap: 0,
  NodeList: 1,
  PaintRequestList: 0,
  Plugin: 0,
  PluginArray: 0,
  SVGLengthList: 0,
  SVGNumberList: 0,
  SVGPathSegList: 0,
  SVGPointList: 0,
  SVGStringList: 0,
  SVGTransformList: 0,
  SourceBufferList: 0,
  StyleSheetList: 0,
  TextTrackCueList: 0,
  TextTrackList: 0,
  TouchList: 0
};


/***/ }),

/***/ "fdbf":
/***/ (function(module, exports, __webpack_require__) {

var NATIVE_SYMBOL = __webpack_require__("4930");

module.exports = NATIVE_SYMBOL
  // eslint-disable-next-line no-undef
  && !Symbol.sham
  // eslint-disable-next-line no-undef
  && typeof Symbol.iterator == 'symbol';


/***/ })

/******/ })["default"];
});
//# sourceMappingURL=JwChat.common.js.map