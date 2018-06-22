<template>
    <div>
        {{$route.params.fullname}}
    </div>
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