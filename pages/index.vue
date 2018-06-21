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
        <div v-if="results" class="list-group mt-5">

            <a href="#" v-for="repository in loadedRepos" class="list-group-item list-group-item-action">
                {{repository.full_name}}</a>
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
                results: false,
                loading: false,

            }
        },
        computed: {
            formIsValid() {
                //keep search button disabled until repository field has a value
                return this.search
            },
            loadedRepos() {
                setTimeout(() =>{
                    this.loading =  true
                },1000)
                return this.$store.getters.getRepos
            }

        },
        methods: {
            searchForRepo() {

                this.results = true
                this.$store.dispatch('loadedRepos', this.search)
            },
            clearForm() {
                this.results = false

                this.search = ''
            }
        }


    }
</script>
