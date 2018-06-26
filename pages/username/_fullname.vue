<template>
    <section class="container">
        <div class="card text-right">
            <div class="card-body col-lg-12">
                <h5 class="card-title text-center"><a :href="getSingleRepo.html_url" target="_blank">{{getSingleRepo.name}}</a>
                </h5>
                <div class=" card-text text-left">{{getSingleRepo.description}}


                    <div class="row col-lg-12">
                        <div class="col-lg-4">
                            Open Issues : {{getSingleRepo.open_issues_count}}
                        </div>
                        <div class="col-lg-4">
                            Forks: {{getSingleRepo.forks}}

                        </div>
                        <div class="col-lg-4">
                            Size: {{getSingleRepo.size}}
                        </div>
                    </div>
                    <div class="row col-lg-12">
                        <div class="col-lg-4">
                            Stargazers: {{getSingleRepo.stargazers_count}}
                        </div>
                        <div class="col-lg-4">
                            Watchers: {{getSingleRepo.watchers_count}}
                        </div>
                        <div class="col-lg-4">
                            Language: {{getSingleRepo.language}}
                        </div>
                    </div>
                    <div class="row col-lg-12">
                        <div class="col-lg-4">
                            Default: {{getSingleRepo.default_branch}}
                        </div>
                        <div class="col-lg-4">
                            Network: {{getSingleRepo.network_count}}
                        </div>
                        <div class="col-lg-4">
                            subscribers: {{getSingleRepo.subscribers_count}}
                        </div>
                    </div>

                </div>


                <a href="#" class="card-link " @click="showIssues">show issues</a>
                <a href="#" class="card-link" @click="showChart ">chart</a>
            </div>
        </div>
        <Loading class="mt-5" v-if="loading"/>

        <div class="form-group mt-5" v-if="!loading && issues">
            <label class="text-muted">Limit number of issues to show (default is 3 )</label><br/>
            <input type="number" v-model="limit" class="form-group"/>
        </div>


        <div v-if="!loading && issues" class="list-group mt-5">
            <span class="text-muted">{{openIssues.length}} Open issues</span>
            <a :href="issue.html_url"
               v-for="issue in openIssues.slice(0, limit)"
               class="list-group-item list-group-item-action">
                <h3>
                    <img :src="issue.user.avatar_url" class="avatar img-responsive">
                    User: {{ issue.user.login }}
                </h3>
                <span>Title: {{ issue.title }}</span><Br/>
                <span>State: {{issue.state}}</span>
            </a>
        </div>
    </section>
</template>

<script>

    import Loading from '~/components/Loading'

    export default {
        components: {Loading},
        mounted() {
            this.$store.dispatch('singleRepo', this.repo) // get the repository data
        },
        data() {
            return {
                issues: false,
                limit: 3,
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
            },
            openIssues() {
                return this.getIssues.filter(function (state) {
                    return state.state === 'open'
                })
            }
        },
        methods: {
            showIssues() {
                this.issues = !this.issues
                if (this.issues === true) {
                    this.$store.dispatch('getIssues', this.repo)
                } else {

                }
            },
            showChart() {

            }
        }
    }
</script>