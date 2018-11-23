<template>
  <section class="container">
    <div class="card text-right">
      <div class="card-body">
        <h5 class="card-title text-center">Find a user on Github</h5>
        <p class="card-text text-left">Enter a Github username below and click the button to display user info.
        </p>
        <div class="form-group">
          <input type="text" @keyup.enter="search()" v-model="username" class="form-control" id="user"
                 placeholder="Username">
        </div>
        <button class="btn btn-link" @click="clearForm">Clear</button>
        <button class="btn btn-link" :disabled="!formIsValid" @click="search">Search</button>
      </div>
    </div>
    <hr>
    <Loading class="mt-5" v-if="loading"/>
    <div v-if="!loading && user.name" class="card text-right">
      <div class="card-body">
        <h5 class="card-title text-center">{{user.name}}</h5>
        <div class="card-text text-left">
          <img :src="user.avatar_url" alt="">
          <span class="pl-3">
              <a :href="user.html_url">{{user.login}}</a>
          </span>
          <p class="ml-5 pl-2 pb-2">
            Followers: {{user.followers}} - Following {{user.following}} - Repos: {{repos.length}}
          </p>

        </div>
        <hr>
        <div class="card-text text-left">
          <h3>Repos by the user:</h3>
          <div class="row">
            <div class="col" v-for="repo in repos">
              <a :href="repo.html_url" class=" btn btn-primary"> {{repo.name}}</a>

            </div>
          </div>

        </div>

      </div>
    </div>
  </section>
</template>

<script>
  import Loading from '~/components/Loading'

  export default {
    components: {Loading},
    data() {
      return {
        username: '',
      }
    },
    computed: {
      formIsValid() {
        return this.username
      },
      user() {
        return this.$store.getters.getUser
      },
      repos() {
        return this.$store.getters.getRepos
      },
      loading() {
        return this.$store.getters.loading
      }
    },
    methods: {
      search() {
        this.$store.dispatch('getUser', this.username)
      },
      clearForm() {
        this.$store.state.loadedRepos = []
        this.username = ''
      }
    }
  }
</script>

<style scoped lang="css">

  img {
    border-radius: 50%;
    height: 40px;
    width: 40px;
  }

  .layout-column {
    -webkit-box-orient: vertical;
    -webkit-box-direction: normal;
    -webkit-flex-direction: column;
    flex-direction: column;
  }

</style>
