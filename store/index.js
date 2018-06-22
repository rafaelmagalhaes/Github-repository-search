import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        state: {
            loading: false,
            loadedRepos: [],
            API: 'https://api.github.com/'
        },
        getters: {
            getRepos(state) {
                return state.loadedRepos
            },
            loading(state) {
                return state.loading
            }
        },
        mutations: {
            setLoading(state, payload) {
                state.loading = payload
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
            }
        }
    })
}

export default store