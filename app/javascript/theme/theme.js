"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

/* -------------------------------------------------------------------------- */

/*                                    Utils                                   */

/* -------------------------------------------------------------------------- */
var docReady = function docReady(fn) {
  // see if DOM is already available
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', fn);
  } else {
    setTimeout(fn, 1);
  }
};

var resize = function resize(fn) {
  return window.addEventListener('resize', fn);
};

var isIterableArray = function isIterableArray(array) {
  return Array.isArray(array) && !!array.length;
};

var camelize = function camelize(str) {
  var text = str.replace(/[-_\s.]+(.)?/g, function (_, c) {
    return c ? c.toUpperCase() : '';
  });
  return "".concat(text.substr(0, 1).toLowerCase()).concat(text.substr(1));
};

var getData = function getData(el, data) {
  try {
    return JSON.parse(el.dataset[camelize(data)]);
  } catch (e) {
    return el.dataset[camelize(data)];
  }
};
/* ----------------------------- Colors function ---------------------------- */


var hexToRgb = function hexToRgb(hexValue) {
  var hex;
  hexValue.indexOf('#') === 0 ? hex = hexValue.substring(1) : hex = hexValue; // Expand shorthand form (e.g. "03F") to full form (e.g. "0033FF")

  var shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i;
  var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex.replace(shorthandRegex, function (m, r, g, b) {
    return r + r + g + g + b + b;
  }));
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : null;
};

var rgbaColor = function rgbaColor() {
  var color = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : '#fff';
  var alpha = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0.5;
  return "rgba(".concat(hexToRgb(color), ", ").concat(alpha, ")");
};
/* --------------------------------- Colors --------------------------------- */


var colors = {
  primary: '#0057FF',
  secondary: '#748194',
  success: '#00d27a',
  info: '#27bcfd',
  warning: '#f5803e',
  danger: '#e63757',
  light: '#f9fafd',
  dark: '#000'
};
var grays = {
  white: '#fff',
  100: '#f9fafd',
  200: '#edf2f9',
  300: '#d8e2ef',
  400: '#b6c1d2',
  500: '#9da9bb',
  600: '#748194',
  700: '#5e6e82',
  800: '#4d5969',
  900: '#344050',
  1000: '#232e3c',
  1100: '#0b1727',
  black: '#000'
};

var hasClass = function hasClass(el, className) {
  !el && false;
  return el.classList.value.includes(className);
};

var addClass = function addClass(el, className) {
  el.classList.add(className);
};

var getOffset = function getOffset(el) {
  var rect = el.getBoundingClientRect();
  var scrollLeft = window.pageXOffset || document.documentElement.scrollLeft;
  var scrollTop = window.pageYOffset || document.documentElement.scrollTop;
  return {
    top: rect.top + scrollTop,
    left: rect.left + scrollLeft
  };
};

var isScrolledIntoView = function isScrolledIntoView(el) {
  var top = el.offsetTop;
  var left = el.offsetLeft;
  var width = el.offsetWidth;
  var height = el.offsetHeight;

  while (el.offsetParent) {
    // eslint-disable-next-line no-param-reassign
    el = el.offsetParent;
    top += el.offsetTop;
    left += el.offsetLeft;
  }

  return {
    all: top >= window.pageYOffset && left >= window.pageXOffset && top + height <= window.pageYOffset + window.innerHeight && left + width <= window.pageXOffset + window.innerWidth,
    partial: top < window.pageYOffset + window.innerHeight && left < window.pageXOffset + window.innerWidth && top + height > window.pageYOffset && left + width > window.pageXOffset
  };
};

var breakpoints = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1540
};

var getBreakpoint = function getBreakpoint(el) {
  var classes = el && el.classList.value;
  var breakpoint;

  if (classes) {
    breakpoint = breakpoints[classes.split(' ').filter(function (cls) {
      return cls.includes('navbar-expand-');
    }).pop().split('-').pop()];
  }

  return breakpoint;
};
/* --------------------------------- Cookie --------------------------------- */


var setCookie = function setCookie(name, value, expire) {
  var expires = new Date();
  expires.setTime(expires.getTime() + expire);
  document.cookie = "".concat(name, "=").concat(value, ";expires=").concat(expires.toUTCString());
};

var getCookie = function getCookie(name) {
  var keyValue = document.cookie.match("(^|;) ?".concat(name, "=([^;]*)(;|$)"));
  return keyValue ? keyValue[2] : keyValue;
};

var settings = {
  tinymce: {
    theme: 'oxide'
  },
  chart: {
    borderColor: 'rgba(255, 255, 255, 0.8)'
  }
};
/* -------------------------- Chart Initialization -------------------------- */

var newChart = function newChart(chart, config) {
  var ctx = chart.getContext('2d');
  return new window.Chart(ctx, config);
};
/* ---------------------------------- Store --------------------------------- */


var getItemFromStore = function getItemFromStore(key, defaultValue) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;

  try {
    return JSON.parse(store.getItem(key)) || defaultValue;
  } catch (_unused) {
    return store.getItem(key) || defaultValue;
  }
};

var setItemToStore = function setItemToStore(key, payload) {
  var store = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : localStorage;
  return store.setItem(key, payload);
};

var getStoreSpace = function getStoreSpace() {
  var store = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : localStorage;
  return parseFloat((escape(encodeURIComponent(JSON.stringify(store))).length / (1024 * 1024)).toFixed(2));
};

var utils = {
  docReady: docReady,
  resize: resize,
  isIterableArray: isIterableArray,
  camelize: camelize,
  getData: getData,
  hasClass: hasClass,
  addClass: addClass,
  hexToRgb: hexToRgb,
  rgbaColor: rgbaColor,
  colors: colors,
  grays: grays,
  getOffset: getOffset,
  isScrolledIntoView: isScrolledIntoView,
  getBreakpoint: getBreakpoint,
  setCookie: setCookie,
  getCookie: getCookie,
  newChart: newChart,
  settings: settings,
  getItemFromStore: getItemFromStore,
  setItemToStore: setItemToStore,
  getStoreSpace: getStoreSpace
};


/* -------------------------------------------------------------------------- */

/*                                Form submit                               */

/* -------------------------------------------------------------------------- */

// function submitContactForm(event) {
//   event.preventDefault();
//   grecaptcha.execute();
// };

// function handleValidSubmit() {
//   var form = document.getElementById("contact-form");
//   var contactCard = document.getElementById("contact-card");
//   var spinner = document.getElementById("spinner");
//   var preSubmitContent = document.querySelectorAll(".pre-contact-submit");
//   var postSubmitContent = document.querySelectorAll(".post-contact-submit");
//
//   // Hide the form
//   form.classList.add("fade");
//   form.classList.add("d-none");
//   // Show the spinner
//   spinner.classList.remove("d-none");
//   spinner.classList.add("fade-in");
//
//   var formData = new FormData(form);
//   var data = {};
//   formData.forEach(function(value, key) {
//     data[key] = value;
//   });
//   console.log(data);
//
//   var isLocal = window.location.hostname === "localhost";
//   var protocol = isLocal ? "http" : "https"
//   var domain = isLocal ? "localhost:3000" : "api.outwesttech.com";
//   var url = `${protocol}://${domain}/api/contacts`;
//
//   fetch(url, {
//     method: 'POST',
//     headers: {'Content-Type': 'application/json', 'X-Public-Token': 'WH4HFjLkpKR07KXk8BJGoQ'},
//     body: JSON.stringify(data)
// })
//     .then(response => response.json())
//     .then(data => {
//         spinner.classList.add("fade");
//
//         postSubmitContent.forEach(function (el) {
//             el.classList.remove("d-none");
//             el.classList.add("fade-in");
//         });
//     }).catch((error) => {
//     alert("Whoops. Something went wrong, try reloading the page.")
// });
// }

// var watchContactSubmit = function watchContactSubmit() {
//   document.getElementById('contact-form').addEventListener('submit', submitContactForm);
// }
//
// docReady(watchContactSubmit);
//# sourceMappingURL=theme.js.map
