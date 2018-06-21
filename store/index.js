import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const store = () => {
    return new Vuex.Store({
        state: {
            loadedRepos: [],
            API: 'https://api.github.com/'
        },
        getters: {
            getRepos(state) {
                return state.loadedRepos
            }
        },
        mutations: {
            setLoadedRepos(state, payload) {
                state.loadedRepos = payload
            }
        },
        actions: {
            loadedRepos({commit, state}, payload) {
                this.$axios.$get(state.API + 'search/repositories?q=' + payload).then((res) => {


                    commit('setLoadedRepos', res.items)

                }).catch((err) => {
                    console.log(err)
                })
            }
        }
    })
}

export default store