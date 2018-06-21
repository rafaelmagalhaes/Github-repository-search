<template>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">

        <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse"
                aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarCollapse">
            <ul class="navbar-nav mr-auto">
                <li class="nav-item active">
                    <nuxt-link class="nav-link" to="/">Home</nuxt-link>
                </li>
                <li class="nav-item">
                    <nuxt-link class="nav-link" to="/username">find by username</nuxt-link>
                </li>

            </ul>

        </div>
    </nav>
</template>

<style>

</style>
