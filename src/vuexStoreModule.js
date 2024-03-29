export default class {
  constructor (options = {}) {
    if (!options.apiService) {
      throw new Error('Please provide an API service.')
    }

    // set this.api config
    this.api = options.apiService
    this.idKey = options.idKey
  }

  createStoreModule (resource, options = {}) {
    if (!resource) {
      throw new Error('Resource name must be specified.')
    }

    function call (name, ...parameters) {
      if (typeof options[name] === 'function') {
        options[name](parameters)
      }
    }

    function run (fn, ...parameters) {
      return typeof fn === 'function' ? fn(...parameters) : fn
    }

    const idKey = options.idKey || this.idKey || 'id'
    const perPage = options.perPage || 12

    const methods = options.methods || [
      'CREATE',
      'DESTROY',
      'FETCH_FIELD_OPTIONS',
      'FETCH_FILTERS',
      'FETCH_FORM',
      'FETCH_LIST',
      'FETCH_SINGLE',
      'REPLACE',
      'UPDATE'
    ]

    const hasCreate = methods.includes('CREATE')
    const hasDestroy = methods.includes('DESTROY')
    const hasFetchFieldOptions = methods.includes('FETCH_FIELD_OPTIONS')
    const hasFetchFilters = methods.includes('FETCH_FILTERS')
    const hasFetchForm = methods.includes('FETCH_FORM')
    const hasFetchList = methods.includes('FETCH_LIST')
    const hasFetchSingle = methods.includes('FETCH_SINGLE')
    const hasReplace = methods.includes('REPLACE')
    const hasUpdate = methods.includes('UPDATE')

    // States
    const stateData = {
      filters: {},
      list: [],
      totalPages: 0
    }

    if (hasCreate) {
      stateData.isFetchingSingle = false
      stateData.fetchSingleError = null
    }

    if (hasDestroy) {
      stateData.isDestroying = false
      stateData.destroyError = null
    }

    if (hasFetchFieldOptions) {
      stateData.isFetchingFieldOptions = false
      stateData.fetchFieldOptionsError = null
    }

    if (hasFetchFilters) {
      stateData.isFetchingFilters = false
      stateData.fetchFiltersError = null
    }

    if (hasFetchForm) {
      stateData.isFetchingForm = false
      stateData.fetchFormError = null
    }

    if (hasFetchList) {
      stateData.isFetchingList = false
      stateData.fetchListError = null
    }

    if (hasFetchSingle) {
      stateData.isFetchingSingle = false
      stateData.fetchSingleError = null
    }

    if (hasReplace) {
      stateData.isReplacing = false
      stateData.replaceError = null
    }

    if (hasUpdate) {
      stateData.isUpdating = false
      stateData.updateError = null
    }

    Object.assign(stateData, options.state || {})

    // Getters
    const getters = {
      list: state => state.list,

      filters: state => state.filters,

      totalPages: state => state.totalPages,

      byId: state => id => state.list.find(item => item[idKey] === id),

      isLoading: state => (
        state.isCreating ||
        state.isDestroying ||
        state.isFetchingFieldOptions ||
        state.isFetchingFilters ||
        state.isFetchingList ||
        state.isFetchingSingle ||
        state.isReplacing ||
        state.isUpdating
      ),

      hasErrors: state => (
        state.createError !== null ||
        state.destroyError !== null ||
        state.fetchFormError !== null ||
        state.fetchFieldOptionsError !== null ||
        state.fetchFiltersError !== null ||
        state.fetchListError !== null ||
        state.fetchSingleError !== null ||
        state.replaceError !== null ||
        state.updateError !== null
      )
    }

    Object.assign(getters, options.getters || {})

    // Mutations
    const mutations = {}

    if (hasCreate) {
      mutations.createStart = state => {
        state.isCreating = true
        call('onCreateStart', state)
      }

      mutations.createSuccess = (state, response) => {
        const { data } = response

        if (data) {
          state.list.push(data)
        }

        state.createError = null
        state.isCreating = false
        call('onCreateSuccess', state, response)
      }

      mutations.createError = (state, error) => {
        state.createError = error
        state.isCreating = false
        call('onCreateError', state, error)
      }
    }

    if (hasDestroy) {
      mutations.destroyStart = state => {
        state.isDestroying = true
        call('onDestroyStart', state)
      }

      mutations.destroySuccess = (state, id) => {
        const index = state.list.findIndex(item => item[idKey] === id)

        if (~index) {
          state.list.splice(index, 1)
        }

        state.destroyError = null
        state.isDestroying = false
        call('onDestroySuccess', state, id)
      }

      mutations.destroyError = (state, error) => {
        state.destroyError = error
        state.isDestroying = false
        call('onDestroyError', state, error)
      }
    }

    if (hasFetchFieldOptions) {
      mutations.fetchFieldOptionsStart = state => {
        state.isFetchingFieldOptions = true
        call('onFetchFieldOptionsStart', state)
      }

      mutations.fetchFieldOptionsSuccess = (state, response) => {
        state.fetchFieldOptionsError = null
        state.isFetchingFieldOptions = false
        call('onFetchFieldOptionsSuccess', state, response)
      }

      mutations.fetchFieldOptionsError = (state, error) => {
        state.fetchFieldOptionsError = error
        state.isFetchingFieldOptions = false
        call('onFetchFieldOptionsError', state, error)
      }
    }

    if (hasFetchFilters) {
      mutations.fetchFiltersStart = state => {
        state.isFetchingFilters = true
        call('onFetchFiltersStart', state)
      }

      mutations.fetchFiltersSuccess = (state, response) => {
        const { fields } = response.data
        state.filters = fields

        state.fetchFiltersError = null
        state.isFetchingFilters = false
        call('onFetchFiltersSuccess', state, response)
      }

      mutations.fetchFiltersError = (state, error) => {
        state.fetchFiltersError = error
        state.isFetchingFilters = false
        call('onFetchFiltersError', state, error)
      }
    }

    if (hasFetchForm) {
      mutations.fetchFormStart = state => {
        state.isFetchingForm = true
        call('onFetchFormStart', state)
      }

      mutations.fetchFormSuccess = (state, response) => {
        state.fetchFormError = null
        state.isFetchingForm = false
        call('onfetchFormSuccess', state, response)
      }

      mutations.fetchFormError = (state, error) => {
        state.fetchFormError = error
        state.isFetchingForm = false
        call('onFetchFormError', state, error)
      }
    }

    if (hasFetchList) {
      mutations.fetchListStart = state => {
        state.isFetchingList = true
        call('onFetchListStart', state)
      }

      mutations.fetchListSuccess = (state, payload = {}) => {
        const { response, increment, page } = payload
        const { results, count } = response.data

        increment && page > 1
          ? state.list.push(...results)
          : state.list = results || []

        state.totalPages = Math.ceil(count / perPage)
        state.fetchListError = null
        state.isFetchingList = false
        call('onfetchListSuccess', state, response)
      }

      mutations.fetchListError = (state, payload = {}) => {
        const { error, increment } = payload

        if (!increment) {
          state.list = []
        }

        state.fetchListError = error
        state.isFetchingList = false
        call('onFetchListError', state, error)
      }
    }

    if (hasFetchSingle) {
      mutations.fetchSingleStart = state => {
        state.isFetchingSingle = true
        call('onFetchSingleStart', state)
      }

      mutations.fetchSingleSuccess = (state, response) => {
        const { result } = response.data

        if (result) {
          const index = state.list.findIndex(
            item => item[idKey] === result[idKey]
          )

          if (~index) {
            state.list.splice(index, 1, result)
            return
          }

          state.list.push(result)
        }

        state.fetchSingleError = null
        state.isFetchingSingle = false
        call('onFetchSingleSuccess', state, response)
      }

      mutations.fetchSingleError = (state, error) => {
        state.fetchSingleError = error
        state.isFetchingSingle = false
        call('onFetchSingleError', state, error)
      }
    }

    if (hasReplace) {
      mutations.replaceStart = state => {
        state.isReplacing = true
        call('onReplaceStart', state)
      }

      mutations.replaceSuccess = (state, response) => {
        const { result } = response.data

        const index = state.list.findIndex(
          item => item[idKey] === result[idKey]
        )

        if (~index) {
          state.list.splice(index, 1, result)
        }

        state.replaceError = null
        state.isReplacing = false
        call('onReplaceSuccess', state, response)
      }

      mutations.replaceError = (state, error) => {
        state.replaceError = error
        state.isReplacing = false
        call('onReplaceError', state, error)
      }
    }

    if (hasUpdate) {
      mutations.updateStart = state => {
        state.isUpdating = true
        call('onUpdateStart', state)
      }

      mutations.updateSuccess = (state, response) => {
        const { result } = response.data

        for (const index in state.list) {
          const item = state.list[index]

          if (item[idKey] === result[idKey]) {
            state.list.splice(index, 1, { ...item, ...result })
            break
          }
        }

        state.updateError = null
        state.isUpdating = false
        call('onUpdateSuccess', state, response)
      }

      mutations.updateError = (state, error) => {
        state.updateError = error
        state.isUpdating = false
        call('onUpdateError', state, error)
      }
    }

    Object.assign(mutations, options.mutations || {})

    // Actions
    const actions = {}

    if (hasCreate) {
      actions.create = ({ commit }, { payload, url } = {}) => {
        commit('createStart')
        url = url || options.createURL || `/${resource}/`

        return this.api.post(url, payload).then(response => {
          commit('createSuccess', response)
          return response
        }).catch(error => {
          commit('createError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasDestroy) {
      actions.destroy = ({ commit }, { id, params, url } = {}) => {
        commit('destroyStart')
        url = run(url || options.destroyURL, { id }) || `/${resource}/${id}/`

        return this.api.delete(url, { params }).then(response => {
          commit('destroySuccess', id)
          return response
        }).catch(error => {
          commit('destroyError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasFetchFieldOptions) {
      actions.fetchFieldOptions = ({ commit }, { field, params, url } = {}) => {
        commit('fetchFieldOptionsStart')
        url = url || `/${resource}/options/${field}`

        return this.api.get(url, { params }).then(response => {
          commit('fetchFieldOptionsSuccess', response)
          return response
        }).catch(error => {
          commit('fetchFieldOptionsError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasFetchFilters) {
      actions.fetchFilters = ({ commit }, { params, url } = {}) => {
        commit('fetchFiltersStart')
        url = url || options.fetchFiltersURL || `/${resource}/filters/`

        return this.api.get(url, { params }).then(response => {
          commit('fetchFiltersSuccess', response)
          return response
        }).catch(error => {
          commit('fetchFiltersError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasFetchForm) {
      actions.fetchForm = ({ commit }, { id, params, url } = {}) => {
        commit('fetchFormStart')
        url = run(url || options.fetchFormURL, { id }) || `/${resource}/${id ? `edit/${id}` : 'new'}/`

        return this.api.get(url, { params }).then(response => {
          commit('fetchFormSuccess', response)
          return response
        }).catch(error => {
          commit('fetchFormError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasFetchList) {
      actions.fetchList = (
        { commit },
        { filters = {}, increment, ordering = [], page = 1, limit, search, url } = {}
      ) => {
        const params = {
          ...filters,
          limit: limit || perPage,
          offset: (page - 1) * (limit || perPage),
          ordering: ordering.length ? ordering.join(',') : null,
          search
        }

        commit('fetchListStart')
        url = url || options.fetchListURL || `/${resource}/`

        return this.api.get(url, { params }).then(response => {
          commit('fetchListSuccess', { response, increment, page })
          return response
        }).catch(error => {
          commit('fetchListError', { error, increment })
          return Promise.reject(error)
        })
      }
    }

    if (hasFetchSingle) {
      actions.fetchSingle = ({ commit }, { form, id, params, url } = {}) => {
        commit('fetchSingleStart')

        url = run(url || options.fetchSingleURL, { form, id }) || (form
          ? `/${resource}/${id ? `${id}/edit` : 'new'}/`
          : `/${resource}/${id}/`)

        return this.api.get(url, { params }).then(response => {
          commit('fetchSingleSuccess', response)
          return response
        }).catch(error => {
          commit('fetchSingleError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasReplace) {
      actions.replace = ({ commit }, { id, payload, url } = {}) => {
        commit('replaceStart')
        url = run(url || options.replaceURL, { id }) || `/${resource}/${id}/`

        return this.api.put(url, payload).then(response => {
          commit('replaceSuccess', response)
          return response
        }).catch(error => {
          commit('replaceError', error)
          return Promise.reject(error)
        })
      }
    }

    if (hasUpdate) {
      actions.update = ({ commit }, { id, payload, url } = {}) => {
        commit('updateStart')
        url = run(url || options.updateURL, { id }) || `/${resource}/${id}/`

        return this.api.patch(url, payload).then(response => {
          commit('updateSuccess', response)
          return response
        }).catch(error => {
          commit('updateError', error)
          return Promise.reject(error)
        })
      }
    }

    Object.assign(actions, options.actions || {})

    return {
      namespaced: true,

      state: stateData,
      getters,
      mutations,
      actions
    }
  }
}
