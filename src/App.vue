<template>
  <div id="app">
    <infinite-scroll-view></infinite-scroll-view>
  </div>
</template>

<script>
import InfiniteScrollView from './views/InfiniteScroll.vue'

export default {
  name: 'app',
  components: { InfiniteScrollView }
}
</script>

<style>
body, html {
    margin: 0;
    padding: 0;
    background-color: #F1F1F1;
}

#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

#app, a {
    color: #2c3e50;
}
</style>
