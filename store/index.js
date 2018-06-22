import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        state: {
            loading: false,
            loadedRepos: [],
            singleRepo: [],
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
            }
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
                this.$axios.$get(state.API + 'repos' + payload).then((res) => {
                    console.log(res)
                    commit('setSingleRepo', res)
                    commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                })
            },
            getIssues({commit, state}, payload) {
                commit('setLoading', true)
                this.$axios.$get(state.API + 'search/issues?q=repo:' + payload).then((res) => {
                    console.log(res)
                    commit('setIssues', res)
                    commit('setLoading', false)
                }).catch((err) => {
                    console.log(err)
                })
            }
        }

    })
}

export default store