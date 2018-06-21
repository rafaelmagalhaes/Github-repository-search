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
                    <input type="text" class="form-control" v-model="repository" placeholder="repository">
                </div>
                <button class="btn btn-link" @click="clearForm">Clear</button>
                <button class="btn btn-link" :disabled="!formIsValid" @click="searchForRepo">Search</button>
            </div>

        </div>

        <Loading class="mt-5" v-if="loading"/>
        <div v-if="results ===  true" class="list-group mt-5">

            <a href="#" class="list-group-item list-group-item-action">Dapibus ac facilisis in</a>
        </div>
    </section>
</template>

<script>
    import Loading from '~/components/Loading'

    export default {
        components: {Loading},
        data() {
            return {
                repository: '',
                results: false,
                loading: false,

            }
        },
        computed: {
            formIsValid() {
                //keep search button disabled until repository field has a value
                return this.repository
            }
        },
        methods: {
            async searchForRepo() {


            },
            clearForm() {
                this.results = false

                this.repository = ''
            }
        }


    }
</script>
