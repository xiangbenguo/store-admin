<template>
  <div id="app">
    <router-view/>
  </div>
</template>

<script>
export default {
  name: 'App',
  beforeCreate () {
    if (window.localStorage.isLogin) {
      this.$store.commit('login')
    }
    if (this.$store.state.isLogin) {
      this.$router.replace('/home')
    }
  }
}
</script>

<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: left;
  color: #2c3e50
}
body {
  margin: 0
}
</style>
