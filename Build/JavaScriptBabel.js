"use strict";

function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

var selectArea = document.getElementById('selectArea');
var btnArea = document.getElementById('btnArea');
var listTitle = document.querySelector('#listTitle');
var list = document.querySelector('#list');
var data = [];

function getData() {
  var url = 'https://raw.githubusercontent.com/hexschool/KCGTravel/master/datastore_search.json';
  axios.get(url).then(function (res) {
    var cacheData = JSON.parse(res.request.response);
    data = cacheData.result.records;
    selectFilter(data);
  });
}

function selectFilter(data) {
  var cacheArr = data.map(function (item) {
    return item.Zone;
  });
  var set = new Set(cacheArr);

  var select = _toConsumableArray(set);

  select.forEach(function (item) {
    var option = document.createElement('option');
    option.appendChild(document.createTextNode(item));
    selectArea.append(option);
  });
}

function render(event) {
  listTitle.textContent = event.target.value;
  var str = '';
  data.forEach(function (item) {
    if (item.Zone !== event.target.value) return;
    str += "<div class=\"col-md-6 py-2 px-1\">\n      <div class=\"card\">\n        <div class=\"card bg-dark text-white text-left\">\n          <img class=\"card-img-top bg-cover\" height=\"155px\" src=\"".concat(item.Picture1, "\">\n          <div class=\"card-img-overlay d-flex justify-content-between align-items-end p-0 px-3\" style=\"background-color: rgba(0, 0, 0, .2)\">\n            <h5 class=\"card-img-title-lg\">").concat(item.Name, "</h5>\n            <h5 class=\"card-img-title-sm\">").concat(item.Zone, "</h5>\n            </div>\n          </div>\n          <div class=\"card-body text-left\">\n            <p class=\"card-p-text\">\n              <i class=\"far fa-clock fa-clock-time\"></i>&nbsp;").concat(item.Opentime, "</p>\n            <p class=\"card-p-text\">\n            <i class=\"fas fa-map-marker-alt fa-map-gps\"></i>&nbsp;").concat(item.Add, "</p>\n          <div class=\"d-flex justify-content-between align-items-end\">\n              <p class=\"card-p-text\">\n              <i class=\"fas fa-mobile-alt fa-mobile\"></i>&nbsp;").concat(item.Tel, "</p>\n              <p class=\"card-p-text\"><i class=\"fas fa-tags text-warning\"></i>&nbsp;").concat(item.Ticketinfo, "</p>\n          </div>\n        </div>\n      </div>\n    </div>");
  });
  list.innerHTML = str;
}

getData();
selectArea.addEventListener('change', render);
btnArea.addEventListener('click', render);