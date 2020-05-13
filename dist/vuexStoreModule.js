parcelRequire=function(e,r,t,n){var i,o="function"==typeof parcelRequire&&parcelRequire,u="function"==typeof require&&require;function f(t,n){if(!r[t]){if(!e[t]){var i="function"==typeof parcelRequire&&parcelRequire;if(!n&&i)return i(t,!0);if(o)return o(t,!0);if(u&&"string"==typeof t)return u(t);var c=new Error("Cannot find module '"+t+"'");throw c.code="MODULE_NOT_FOUND",c}p.resolve=function(r){return e[t][1][r]||r},p.cache={};var l=r[t]=new f.Module(t);e[t][0].call(l.exports,p,l,l.exports,this)}return r[t].exports;function p(e){return f(p.resolve(e))}}f.isParcelRequire=!0,f.Module=function(e){this.id=e,this.bundle=f,this.exports={}},f.modules=e,f.cache=r,f.parent=o,f.register=function(r,t){e[r]=[function(e,r){r.exports=t},{}]};for(var c=0;c<t.length;c++)try{f(t[c])}catch(e){i||(i=e)}if(t.length){var l=f(t[t.length-1]);"object"==typeof exports&&"undefined"!=typeof module?module.exports=l:"function"==typeof define&&define.amd?define(function(){return l}):n&&(this[n]=l)}if(parcelRequire=f,i)throw i;return f}({"l6fb":[function(require,module,exports) {
"use strict";function t(t,r){var e=Object.keys(t);if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(t);r&&(n=n.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),e.push.apply(e,n)}return e}function r(r){for(var n=1;n<arguments.length;n++){var i=null!=arguments[n]?arguments[n]:{};n%2?t(Object(i),!0).forEach(function(t){e(r,t,i[t])}):Object.getOwnPropertyDescriptors?Object.defineProperties(r,Object.getOwnPropertyDescriptors(i)):t(Object(i)).forEach(function(t){Object.defineProperty(r,t,Object.getOwnPropertyDescriptor(i,t))})}return r}function e(t,r,e){return r in t?Object.defineProperty(t,r,{value:e,enumerable:!0,configurable:!0,writable:!0}):t[r]=e,t}function n(t){return s(t)||o(t)||c(t)||i()}function i(){throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function c(t,r){if(t){if("string"==typeof t)return a(t,r);var e=Object.prototype.toString.call(t).slice(8,-1);return"Object"===e&&t.constructor&&(e=t.constructor.name),"Map"===e||"Set"===e?Array.from(t):"Arguments"===e||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(e)?a(t,r):void 0}}function o(t){if("undefined"!=typeof Symbol&&Symbol.iterator in Object(t))return Array.from(t)}function s(t){if(Array.isArray(t))return a(t)}function a(t,r){(null==r||r>t.length)&&(r=t.length);for(var e=0,n=new Array(r);e<r;e++)n[e]=t[e];return n}function u(t,r){if(!(t instanceof r))throw new TypeError("Cannot call a class as a function")}function l(t,r){for(var e=0;e<r.length;e++){var n=r[e];n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(t,n.key,n)}}function f(t,r,e){return r&&l(t.prototype,r),e&&l(t,e),t}Object.defineProperty(exports,"__esModule",{value:!0}),exports.default=void 0;var h=function(){function t(){var r=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{};if(u(this,t),!r.apiService)throw new Error("Please provide an API service.");this.api=r.apiService}return f(t,[{key:"createStoreModule",value:function(t){var e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{};if(!t)throw new Error("Resource name must be specified.");function i(t){if("function"==typeof e[t]){for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i];e[t](n)}}var c=e.idAttribute||"id",o=e.perPage||12,s=e.methods||["CREATE","DESTROY","FETCH_FILTERS","FETCH_FORM","FETCH_LIST","FETCH_SINGLE","REPLACE","UPDATE"],a=s.includes("CREATE"),u=s.includes("DESTROY"),l=s.includes("FETCH_FILTERS"),f=s.includes("FETCH_FORM"),h=s.includes("FETCH_LIST"),p=s.includes("FETCH_SINGLE"),g=s.includes("REPLACE"),d=s.includes("UPDATE"),S={filters:{},list:[],totalPages:0};a&&(S.isFetchingSingle=!1,S.fetchSingleError=null),u&&(S.isDestroying=!1,S.destroyError=null),l&&(S.isFetchingFilters=!1,S.fetchFiltersError=null),f&&(S.isFetchingForm=!1,S.fetchFormError=null),h&&(S.isFetchingList=!1,S.fetchListError=null),p&&(S.isFetchingSingle=!1,S.fetchSingleError=null),g&&(S.isReplacing=!1,S.replaceError=null),d&&(S.isUpdating=!1,S.updateError=null),Object.assign(S,e.state||{});var E={list:function(t){return t.list},filters:function(t){return t.filters},totalPages:function(t){return t.totalPages},byId:function(t){return function(r){return t.list.find(function(t){return t[c]===r})}},isLoading:function(t){return t.isCreating||t.isDestroying||t.isFetchingFilters||t.isFetchingList||t.isFetchingSingle||t.isReplacing||t.isUpdating},hasErrors:function(t){return null!==t.createError||null!==t.destroyError||null!==t.fetchFormError||null!==t.fetchFiltersError||null!==t.fetchListError||null!==t.fetchSingleError||null!==t.replaceError||null!==t.updateError}};Object.assign(E,e.getters||{});var m={};a&&(m.createStart=function(t){t.isCreating=!0,i("onCreateStart",t)},m.createSuccess=function(t,r){var e=r.data;e&&t.list.push(e),t.createError=null,t.isCreating=!1,i("onCreateSuccess",t,r)},m.createError=function(t,r){t.createError=r,t.isCreating=!1,i("onCreateError",t,r)}),u&&(m.destroyStart=function(t){t.isDestroying=!0,i("onDestroyStart",t)},m.destroySuccess=function(t,r){var e=t.list.findIndex(function(t){return t[c]===r});~e&&Vue.delete(t.list,e),t.destroyError=null,t.isDestroying=!1,i("onDestroySuccess",t,r)},m.destroyError=function(t,r){t.destroyError=r,t.isDestroying=!1,i("onDestroyError",t,r)}),l&&(m.fetchFiltersStart=function(t){t.isFetchingFilters=!0,i("onFetchFiltersStart",t)},m.fetchFiltersSuccess=function(t,r){var e=r.data.fields;t.filters=e,t.fetchFiltersError=null,t.isFetchingFilters=!1,i("onfetchFiltersSuccess",t,r)},m.fetchFiltersError=function(t,r){t.fetchFiltersError=r,t.isFetchingFilters=!1,i("onFetchFiltersError",t,r)}),f&&(m.fetchFormStart=function(t){t.isFetchingForm=!0,i("onFetchFormStart",t)},m.fetchFormSuccess=function(t,r){r.errors,r.fields;t.fetchFormError=null,t.isFetchingForm=!1,i("onfetchFormSuccess",t,response)},m.fetchFormError=function(t,r){t.fetchFormError=r,t.isFetchingForm=!1,i("onFetchFormError",t,r)}),h&&(m.fetchListStart=function(t){t.isFetchingList=!0,i("onFetchListStart",t)},m.fetchListSuccess=function(t){var r,e=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=e.response,s=e.increment,a=c.data,u=a.results,l=a.count;s?(r=t.list).push.apply(r,n(u)):t.list=u||[],t.totalPages=Math.ceil(l/o),t.fetchListError=null,t.isFetchingList=!1,i("onfetchListSuccess",t,c)},m.fetchListError=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},e=r.error;r.increment||(t.list=[]),t.fetchListError=e,t.isFetchingList=!1,i("onFetchListError",t,e)}),p&&(m.fetchSingleStart=function(t){t.isFetchingSingle=!0,i("onFetchSingleStart",t)},m.fetchSingleSuccess=function(t,r){var e=r.data.result;if(e){var n=t.list.findIndex(function(t){return t[c]===e[c]});~n?Vue.set(t.list,n,e):t.list.push(e)}t.fetchSingleError=null,t.isFetchingSingle=!1,i("onFetchSingleSuccess",t,r)},m.fetchSingleError=function(t,r){t.fetchSingleError=r,t.isFetchingSingle=!1,i("onFetchSingleError",t,r)}),g&&(m.replaceStart=function(t){t.isReplacing=!0,i("onReplaceStart",t)},m.replaceSuccess=function(t,r){var e=r.data,n=t.list.findIndex(function(t){return t[c]===e[c]});~n&&Vue.set(t.list,n,e),t.replaceError=null,t.isReplacing=!1,i("onReplaceSuccess",t,r)},m.replaceError=function(t,r){t.replaceError=r,t.isReplacing=!1,i("onReplaceError",t,r)}),d&&(m.updateStart=function(t){t.isUpdating=!0,i("onUpdateStart",t)},m.updateSuccess=function(t,e){var n=e.data;for(var o in t.list){var s=t.list[o];if(s[c]===n[c]){Vue.set(t.list,o,r(r({},s),n));break}}t.updateError=null,t.isUpdating=!1,i("onUpdateSuccess",t,e)},m.updateError=function(t,r){t.updateError=r,t.isUpdating=!1,i("onUpdateError",t,r)}),Object.assign(m,e.mutations||{});var F={};return a&&(F.create=function(r){var e=r.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.payload,c=n.url;return e("createStart"),c=c||"/".concat(t,"/"),api.post(c,i).then(function(t){return e("createSuccess",t),t}).catch(function(t){return e("createError",t),Promise.reject(t)})}),u&&(F.destroy=function(r){var e=r.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.id,c=n.params;return e("destroyStart"),api.delete("/".concat(t,"/").concat(i,"/"),{params:c}).then(function(t){return e("destroySuccess",i),t}).catch(function(t){return e("destroyError",t),Promise.reject(t)})}),l&&(F.fetchFilters=function(r){var n=r.commit,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=i.params,o=i.url;return n("fetchFiltersStart"),o=o||e.fetchFiltersURL||"/".concat(t,"/filters/"),api.get(o,{params:c}).then(function(t){return n("fetchFiltersSuccess",t),t}).catch(function(t){return n("fetchFiltersError",t),Promise.reject(t)})}),f&&(F.fetchForm=function(r){var e=r.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.id,c=n.params,o=n.url;return e("fetchFormStart"),o=o||"/".concat(t,"/").concat(i?"edit/".concat(i):"new","/"),api.get(o,{params:c}).then(function(t){return e("fetchFormSuccess",t),t}).catch(function(t){return e("fetchFormError",t),Promise.reject(t)})}),h&&(F.fetchList=function(n){var i=n.commit,c=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},s=c.filters,a=void 0===s?{}:s,u=c.increment,l=c.ordering,f=void 0===l?[]:l,h=c.page,p=void 0===h?1:h,g=c.limit,d=c.search,S=c.url,E=r(r({},a),{},{limit:g||o,offset:(p-1)*(g||o),ordering:f.length?f.join(","):null,search:d});return i("fetchListStart"),S=S||e.replaceURL||"/".concat(t,"/"),api.get(S,{params:E}).then(function(t){return i("fetchListSuccess",{response:t,increment:u}),t}).catch(function(t){return i("fetchListError",{error:t,increment:u}),Promise.reject(t)})}),p&&(F.fetchSingle=function(r){var n=r.commit,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=i.form,o=i.id,s=i.params,a=i.url;return n("fetchSingleStart"),a=a||(c?"/".concat(t,"/").concat(o?"".concat(o,"/edit"):"new","/"):e.fetchSingleURL||"/".concat(t,"/").concat(o,"/")),api.get(a,{params:s}).then(function(t){return n("fetchSingleSuccess",t),t}).catch(function(t){return n("fetchSingleError",t),Promise.reject(t)})}),g&&(F.replace=function(r){var n=r.commit,i=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},c=i.id,o=i.payload,s=i.url;return n("replaceStart"),s=s||e.replaceURL||"/".concat(t,"/").concat(c,"/"),api.put(s,o).then(function(t){return n("replaceSuccess",t),t}).catch(function(t){return n("replaceError",t),Promise.reject(t)})}),d&&(F.update=function(r){var e=r.commit,n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},i=n.id,c=n.payload;return e("updateStart"),api.patch("/".concat(t,"/").concat(i),c).then(function(t){return e("updateSuccess",t),t}).catch(function(t){return e("updateError",t),Promise.reject(t)})}),Object.assign(F,e.actions||{}),{namespaced:!0,state:S,getters:E,mutations:m,actions:F}}}]),t}();exports.default=h;
},{}]},{},["l6fb"], null)
//# sourceMappingURL=/vuexStoreModule.js.map