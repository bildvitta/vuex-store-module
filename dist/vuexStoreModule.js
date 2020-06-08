(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? module.exports = factory() :
  typeof define === 'function' && define.amd ? define(factory) :
  (global = global || self, global.VuexStoreModule = factory());
}(this, (function () { 'use strict';

  function _classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) {
      throw new TypeError("Cannot call a class as a function");
    }
  }

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

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var _default = /*#__PURE__*/function () {
    function _default() {
      var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      _classCallCheck(this, _default);

      if (!options.apiService) {
        throw new Error('Please provide an API service.');
      } // set this.api config


      this.api = options.apiService;
    }

    _createClass(_default, [{
      key: "createStoreModule",
      value: function createStoreModule(resource) {
        var _this = this;

        var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

        if (!resource) {
          throw new Error('Resource name must be specified.');
        }

        function call(name) {
          if (typeof options[name] === 'function') {
            for (var _len = arguments.length, parameters = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              parameters[_key - 1] = arguments[_key];
            }

            options[name](parameters);
          }
        }

        var idAttribute = options.idAttribute || 'id';
        var perPage = options.perPage || 12;
        var methods = options.methods || ['CREATE', 'DESTROY', 'FETCH_FILTERS', 'FETCH_FORM', 'FETCH_LIST', 'FETCH_SINGLE', 'REPLACE', 'UPDATE'];
        var hasCreate = methods.includes('CREATE');
        var hasDestroy = methods.includes('DESTROY');
        var hasFetchFilters = methods.includes('FETCH_FILTERS');
        var hasFetchForm = methods.includes('FETCH_FORM');
        var hasFetchList = methods.includes('FETCH_LIST');
        var hasFetchSingle = methods.includes('FETCH_SINGLE');
        var hasReplace = methods.includes('REPLACE');
        var hasUpdate = methods.includes('UPDATE'); // States

        var stateData = {
          filters: {},
          list: [],
          totalPages: 0
        };

        if (hasCreate) {
          stateData.isFetchingSingle = false;
          stateData.fetchSingleError = null;
        }

        if (hasDestroy) {
          stateData.isDestroying = false;
          stateData.destroyError = null;
        }

        if (hasFetchFilters) {
          stateData.isFetchingFilters = false;
          stateData.fetchFiltersError = null;
        }

        if (hasFetchForm) {
          stateData.isFetchingForm = false;
          stateData.fetchFormError = null;
        }

        if (hasFetchList) {
          stateData.isFetchingList = false;
          stateData.fetchListError = null;
        }

        if (hasFetchSingle) {
          stateData.isFetchingSingle = false;
          stateData.fetchSingleError = null;
        }

        if (hasReplace) {
          stateData.isReplacing = false;
          stateData.replaceError = null;
        }

        if (hasUpdate) {
          stateData.isUpdating = false;
          stateData.updateError = null;
        }

        Object.assign(stateData, options.state || {}); // Getters

        var getters = {
          list: function list(state) {
            return state.list;
          },
          filters: function filters(state) {
            return state.filters;
          },
          totalPages: function totalPages(state) {
            return state.totalPages;
          },
          byId: function byId(state) {
            return function (id) {
              return state.list.find(function (item) {
                return item[idAttribute] === id;
              });
            };
          },
          isLoading: function isLoading(state) {
            return state.isCreating || state.isDestroying || state.isFetchingFilters || state.isFetchingList || state.isFetchingSingle || state.isReplacing || state.isUpdating;
          },
          hasErrors: function hasErrors(state) {
            return state.createError !== null || state.destroyError !== null || state.fetchFormError !== null || state.fetchFiltersError !== null || state.fetchListError !== null || state.fetchSingleError !== null || state.replaceError !== null || state.updateError !== null;
          }
        };
        Object.assign(getters, options.getters || {}); // Mutations

        var mutations = {};

        if (hasCreate) {
          mutations.createStart = function (state) {
            state.isCreating = true;
            call('onCreateStart', state);
          };

          mutations.createSuccess = function (state, response) {
            var data = response.data;

            if (data) {
              state.list.push(data);
            }

            state.createError = null;
            state.isCreating = false;
            call('onCreateSuccess', state, response);
          };

          mutations.createError = function (state, error) {
            state.createError = error;
            state.isCreating = false;
            call('onCreateError', state, error);
          };
        }

        if (hasDestroy) {
          mutations.destroyStart = function (state) {
            state.isDestroying = true;
            call('onDestroyStart', state);
          };

          mutations.destroySuccess = function (state, id) {
            var index = state.list.findIndex(function (item) {
              return item[idAttribute] === id;
            });

            if (~index) {
              Vue["delete"](state.list, index);
            }

            state.destroyError = null;
            state.isDestroying = false;
            call('onDestroySuccess', state, id);
          };

          mutations.destroyError = function (state, error) {
            state.destroyError = error;
            state.isDestroying = false;
            call('onDestroyError', state, error);
          };
        }

        if (hasFetchFilters) {
          mutations.fetchFiltersStart = function (state) {
            state.isFetchingFilters = true;
            call('onFetchFiltersStart', state);
          };

          mutations.fetchFiltersSuccess = function (state, response) {
            var fields = response.data.fields;
            state.filters = fields;
            state.fetchFiltersError = null;
            state.isFetchingFilters = false;
            call('onfetchFiltersSuccess', state, response);
          };

          mutations.fetchFiltersError = function (state, error) {
            state.fetchFiltersError = error;
            state.isFetchingFilters = false;
            call('onFetchFiltersError', state, error);
          };
        }

        if (hasFetchForm) {
          mutations.fetchFormStart = function (state) {
            state.isFetchingForm = true;
            call('onFetchFormStart', state);
          };

          mutations.fetchFormSuccess = function (state, _ref) {
            var errors = _ref.errors,
                fields = _ref.fields;
            state.fetchFormError = null;
            state.isFetchingForm = false;
            call('onfetchFormSuccess', state, response);
          };

          mutations.fetchFormError = function (state, error) {
            state.fetchFormError = error;
            state.isFetchingForm = false;
            call('onFetchFormError', state, error);
          };
        }

        if (hasFetchList) {
          mutations.fetchListStart = function (state) {
            state.isFetchingList = true;
            call('onFetchListStart', state);
          };

          mutations.fetchListSuccess = function (state) {
            var _state$list;

            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var response = payload.response,
                increment = payload.increment;
            var _response$data = response.data,
                results = _response$data.results,
                count = _response$data.count;
            increment ? (_state$list = state.list).push.apply(_state$list, _toConsumableArray(results)) : state.list = results || [];
            state.totalPages = Math.ceil(count / perPage);
            state.fetchListError = null;
            state.isFetchingList = false;
            call('onfetchListSuccess', state, response);
          };

          mutations.fetchListError = function (state) {
            var payload = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
            var error = payload.error,
                increment = payload.increment;

            if (!increment) {
              state.list = [];
            }

            state.fetchListError = error;
            state.isFetchingList = false;
            call('onFetchListError', state, error);
          };
        }

        if (hasFetchSingle) {
          mutations.fetchSingleStart = function (state) {
            state.isFetchingSingle = true;
            call('onFetchSingleStart', state);
          };

          mutations.fetchSingleSuccess = function (state, response) {
            var result = response.data.result;

            if (result) {
              var index = state.list.findIndex(function (item) {
                return item[idAttribute] === result[idAttribute];
              });
              ~index ? Vue.set(state.list, index, result) : state.list.push(result);
            }

            state.fetchSingleError = null;
            state.isFetchingSingle = false;
            call('onFetchSingleSuccess', state, response);
          };

          mutations.fetchSingleError = function (state, error) {
            state.fetchSingleError = error;
            state.isFetchingSingle = false;
            call('onFetchSingleError', state, error);
          };
        }

        if (hasReplace) {
          mutations.replaceStart = function (state) {
            state.isReplacing = true;
            call('onReplaceStart', state);
          };

          mutations.replaceSuccess = function (state, response) {
            var data = response.data;
            var index = state.list.findIndex(function (item) {
              return item[idAttribute] === data[idAttribute];
            });

            if (~index) {
              Vue.set(state.list, index, data);
            }

            state.replaceError = null;
            state.isReplacing = false;
            call('onReplaceSuccess', state, response);
          };

          mutations.replaceError = function (state, error) {
            state.replaceError = error;
            state.isReplacing = false;
            call('onReplaceError', state, error);
          };
        }

        if (hasUpdate) {
          mutations.updateStart = function (state) {
            state.isUpdating = true;
            call('onUpdateStart', state);
          };

          mutations.updateSuccess = function (state, response) {
            var data = response.data;

            for (var index in state.list) {
              var item = state.list[index];

              if (item[idAttribute] === data[idAttribute]) {
                Vue.set(state.list, index, _objectSpread2(_objectSpread2({}, item), data));
                break;
              }
            }

            state.updateError = null;
            state.isUpdating = false;
            call('onUpdateSuccess', state, response);
          };

          mutations.updateError = function (state, error) {
            state.updateError = error;
            state.isUpdating = false;
            call('onUpdateError', state, error);
          };
        }

        Object.assign(mutations, options.mutations || {}); // Actions

        var actions = {};

        if (hasCreate) {
          actions.create = function (_ref2) {
            var commit = _ref2.commit;

            var _ref3 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                payload = _ref3.payload,
                url = _ref3.url;

            commit('createStart');
            url = url || "/".concat(resource, "/");
            return _this.api.post(url, payload).then(function (response) {
              commit('createSuccess', response);
              return response;
            })["catch"](function (error) {
              commit('createError', error);
              return Promise.reject(error);
            });
          };
        }

        if (hasDestroy) {
          actions.destroy = function (_ref4) {
            var commit = _ref4.commit;

            var _ref5 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                id = _ref5.id,
                params = _ref5.params;

            commit('destroyStart');
            return _this.api["delete"]("/".concat(resource, "/").concat(id, "/"), {
              params: params
            }).then(function (response) {
              commit('destroySuccess', id);
              return response;
            })["catch"](function (error) {
              commit('destroyError', error);
              return Promise.reject(error);
            });
          };
        }

        if (hasFetchFilters) {
          actions.fetchFilters = function (_ref6) {
            var commit = _ref6.commit;

            var _ref7 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                params = _ref7.params,
                url = _ref7.url;

            commit('fetchFiltersStart');
            url = url || options.fetchFiltersURL || "/".concat(resource, "/filters/");
            return _this.api.get(url, {
              params: params
            }).then(function (response) {
              commit('fetchFiltersSuccess', response);
              return response;
            })["catch"](function (error) {
              commit('fetchFiltersError', error);
              return Promise.reject(error);
            });
          };
        }

        if (hasFetchForm) {
          actions.fetchForm = function (_ref8) {
            var commit = _ref8.commit;

            var _ref9 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                id = _ref9.id,
                params = _ref9.params,
                url = _ref9.url;

            commit('fetchFormStart');
            url = url || "/".concat(resource, "/").concat(id ? "edit/".concat(id) : 'new', "/");
            return _this.api.get(url, {
              params: params
            }).then(function (response) {
              commit('fetchFormSuccess', response);
              return response;
            })["catch"](function (error) {
              commit('fetchFormError', error);
              return Promise.reject(error);
            });
          };
        }

        if (hasFetchList) {
          actions.fetchList = function (_ref10) {
            var commit = _ref10.commit;

            var _ref11 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                _ref11$filters = _ref11.filters,
                filters = _ref11$filters === void 0 ? {} : _ref11$filters,
                increment = _ref11.increment,
                _ref11$ordering = _ref11.ordering,
                ordering = _ref11$ordering === void 0 ? [] : _ref11$ordering,
                _ref11$page = _ref11.page,
                page = _ref11$page === void 0 ? 1 : _ref11$page,
                limit = _ref11.limit,
                search = _ref11.search,
                url = _ref11.url;

            var params = _objectSpread2(_objectSpread2({}, filters), {}, {
              limit: limit || perPage,
              offset: (page - 1) * (limit || perPage),
              ordering: ordering.length ? ordering.join(',') : null,
              search: search
            });

            commit('fetchListStart');
            url = url || options.replaceURL || "/".concat(resource, "/");
            return _this.api.get(url, {
              params: params
            }).then(function (response) {
              commit('fetchListSuccess', {
                response: response,
                increment: increment
              });
              return response;
            })["catch"](function (error) {
              commit('fetchListError', {
                error: error,
                increment: increment
              });
              return Promise.reject(error);
            });
          };
        }

        if (hasFetchSingle) {
          actions.fetchSingle = function (_ref12) {
            var commit = _ref12.commit;

            var _ref13 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                form = _ref13.form,
                id = _ref13.id,
                params = _ref13.params,
                url = _ref13.url;

            commit('fetchSingleStart');
            url = url || (form ? "/".concat(resource, "/").concat(id ? "".concat(id, "/edit") : 'new', "/") : options.fetchSingleURL || "/".concat(resource, "/").concat(id, "/"));
            return _this.api.get(url, {
              params: params
            }).then(function (response) {
              commit('fetchSingleSuccess', response);
              return response;
            })["catch"](function (error) {
              commit('fetchSingleError', error);
              return Promise.reject(error);
            });
          };
        }

        if (hasReplace) {
          actions.replace = function (_ref14) {
            var commit = _ref14.commit;

            var _ref15 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                id = _ref15.id,
                payload = _ref15.payload,
                url = _ref15.url;

            commit('replaceStart');
            url = url || options.replaceURL || "/".concat(resource, "/").concat(id, "/");
            return _this.api.put(url, payload).then(function (response) {
              commit('replaceSuccess', response);
              return response;
            })["catch"](function (error) {
              commit('replaceError', error);
              return Promise.reject(error);
            });
          };
        }

        if (hasUpdate) {
          actions.update = function (_ref16) {
            var commit = _ref16.commit;

            var _ref17 = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {},
                id = _ref17.id,
                payload = _ref17.payload;

            commit('updateStart');
            return _this.api.patch("/".concat(resource, "/").concat(id), payload).then(function (response) {
              commit('updateSuccess', response);
              return response;
            })["catch"](function (error) {
              commit('updateError', error);
              return Promise.reject(error);
            });
          };
        }

        Object.assign(actions, options.actions || {});
        return {
          namespaced: true,
          state: stateData,
          getters: getters,
          mutations: mutations,
          actions: actions
        };
      }
    }]);

    return _default;
  }();

  return _default;

})));
