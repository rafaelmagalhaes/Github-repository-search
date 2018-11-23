import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
  return new Vuex.Store({
    state: {
      loading: false,
      loadedRepos: [],
      singleRepo: [],
      user: {},
      issues: [],
      API: 'https://api.github.com/'
    },
    getters: {
      getRepos(state) {
        return state.loadedRepos
      },
      getSingleRepo(state) {
        return state.singleRepo
      },
      getIssues(state) {
        return state.issues
      },
      loading(state) {
        return state.loading
      },
      getUser: state => state.user
    },
    mutations: {
      setLoading(state, payload) {
        state.loading = payload
      },
      setSingleRepo(state, payload) {
        state.singleRepo = payload
      },
      setIssues(state, payload) {
        state.issues = payload
      },
      setLoadedRepos(state, payload) {
        state.loadedRepos = payload
      },
      setUser(state, payload) {
        state.user = payload
      }
    },
    actions: {
      loadedRepos({commit, state}, payload) {
        commit('setLoading', true)
        this.$axios.$get(state.API + 'search/repositories?q=' + payload).then((res) => {
          commit('setLoadedRepos', res.items)
          commit('setLoading', false)

        }).catch((err) => {
          console.log(err)
        })
      },
      singleRepo({commit, state}, payload) {
        commit('setLoading', true)
        this.$axios.$get(state.API + 'repos/' + payload).then((res) => {
          commit('setSingleRepo', res)
          commit('setLoading', false)
        }).catch((err) => {
          console.log(err)
        })
      },
      getIssues({commit, state}, payload) {
        commit('setLoading', true)
        this.$axios.$get(state.API + 'search/issues?q=repo:' + payload + '+state:open').then((res) => {
          commit('setIssues', res.items)
          commit('setLoading', false)
        }).catch((err) => {
          console.log(err)
        })
      },
      getUser({commit, state}, payload) {
        commit('setLoading', true)
        this.$axios.get(state.API + 'users/' + payload).then((res) => {
          commit('setUser', res.data)
          this.$axios.get(state.API + 'users/' + payload + '/repos').then((res) => {
            commit('setLoadedRepos', res.data)
            commit('setLoading', false)
          })
        })

      }
    }

  })
}

export default store
