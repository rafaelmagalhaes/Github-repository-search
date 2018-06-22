<template>
    <section class="container">
        <div class="card text-right">
            <div class="card-body">
                <h5 class="card-title text-center">Find a repository on Github
                </h5>
                <p class="card-text text-left">Enter a repository name below and click the button to display profile
                    info.
                </p>
                <div class="form-group">
                    <input type="text" class="form-control" v-model="search" placeholder="repository">
                </div>
                <button class="btn btn-link" @click="clearForm">Clear</button>
                <button class="btn btn-link" :disabled="!formIsValid" @click="searchForRepo">Search</button>
            </div>
        </div>

        <Loading class="mt-5" v-if="loading"/>
        <div v-if="!loading" class="list-group mt-5">

            <nuxt-link :to="{name: 'username-fullname', params:{fullname:repository.full_name}}"
                       v-for="repository in loadedRepos"
                       class="list-group-item list-group-item-action">
                <h3>
                    <img :src="repository.owner.avatar_url" class="avatar img-responsive">
                    {{repository.full_name}}
                </h3>
                <span class=text-center>{{repository.description}}</span>
            </nuxt-link>
        </div>
    </section>
</template>

<script>
    import Loading from '~/components/Loading'

    export default {
        components: {Loading},
        data() {
            return {
                repository: [],
                search: '',
            }
        },
        computed: {
            formIsValid() {
                //keep search button disabled until repository field has a value
                return this.search
            },
            loadedRepos() {
                return this.$store.getters.getRepos
            },
            loading() {
                return this.$store.getters.loading
            }
        },
        methods: {
            searchForRepo() {
                this.$store.dispatch('loadedRepos', this.search)
            },
            clearForm() {
                this.$store.state.loadedRepos = []
                this.search = ''
            }
        }


    }


</script>
