<template>
    <section class="container">
        <div class="card text-right">
            <div class="card-body">
                <h5 class="card-title text-center"><a :href="getSingleRepo.html_url" target="_blank">{{getSingleRepo.name}}</a>
                </h5>
                <p class="card-text text-left">{{getSingleRepo.description}}
                    info.
                </p>

                <a href="#" class="card-link " @click="showIssues">show issues</a>
                <a href="#" class="card-link" @click="showChart ">chart</a>
            </div>
        </div>

        <Loading class="mt-5" v-if="!issues"/>

        <div v-if="issues">
            {{getIssues}}
        </div>
    </section>
</template>

<script>

    import Loading from '~/components/Loading'

    export default {
        components: {Loading},
        mounted() {
            this.$store.dispatch('singleRepo', this.repo) // get the repository data
            this.$store.dispatch('getIssues', this.repo)  // get the issues for the repo on the load of page
        },
        data() {
            return {
                issues: false,
                charts: false,
                repo: this.$route.params.fullname
            }
        },
        computed: {
            getSingleRepo() {
                return this.$store.getters.getSingleRepo
            },
            loading() {
                return this.$store.getters.loading
            },
            getIssues() {

                return this.$store.getters.getIssues
            }
        },
        methods: {
            showIssues() {
                this.loading = false

                this.issues = !this.issues

            },
            showChart() {

            }
        }
    }
</script>