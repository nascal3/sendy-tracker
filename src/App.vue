<template>
  <v-app>
    <v-app-bar
      app
      color="secondary"
      dark
    >
      <v-img class="app-bar-logo" :src="require('@/assets/sendy-logo.png')"></v-img>
      <span class="app-bar-title">Sendy Tracker</span>
    </v-app-bar>

    <v-main>
      <v-container ma-0 pa-0 fluid>
        <router-view/>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style lang="scss" scoped>
  .app-bar-logo {
    max-width: 64px;
  }
  .app-bar-title {
    font-size: 25px;
    font-weight: 400;
  }
</style>
