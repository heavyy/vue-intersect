<template>
  <div id="infinite-scroll">
    <div class="info">
      <span v-bind:data-count="items.length">Items in list</span>
      <span>Intersection Observer</span>
    </div>

    <div class="header"><span class="logo">Y</span> <strong>Hacker News</strong> <span>Top Stories</span> <span>|</span> <a href="https://github.com/heavyy/vue-intersect">Infinite scroll demo of Vue-Intersect</a></div>
    <InfiniteScrollList @load="loadMore" :items="items"></InfiniteScrollList>
  </div>
</template>

<script>
  import Firebase from 'firebase/app'
  import 'firebase/database'

  import InfiniteScrollList from '../components/InfiniteScrollList.vue'

  Firebase.initializeApp({databaseURL: 'https://hacker-news.firebaseio.com'})
  const HN = Firebase.database().ref('/v0')

  export default {
    components: {InfiniteScrollList},
    async mounted () {
      await this.loadMore()
    },
    data: () => ({
      ids: [],
      items: []
    }),
    methods: {
      async loadMore () {
        const items = await this.generateItems()
        this.items = await this.items.concat(items)
      },
      async generateItems (count = 30) {
        if (!this.ids.length && !this.items.length) {
          this.ids = await this.Ids()
        }

        const chunk = this.ids.splice(0, count)

        return Promise.all(chunk.map(id => {
          return HN.child(`item/${id}`).once('value').then(snap => snap.val())
        }))
      },
      Ids () {
        return HN.child('topstories').once('value').then(snap => snap.val())
      }
    }
  }
</script>

<style scoped>
  #infinite-scroll {
    font-family: Verdana;
    font-size: 10pt;
    width: 85vw;
    max-width: 1280px;
    margin: 10px auto;
  }

  .header {
    height: 26px;
    background-color: #ff6600;
    display: flex;
    align-items: center;
    justify-content: flex-start;
    padding: 0 2px;
  }

  .header > * {
    margin-right: 5px;
  }

  .header a {
    text-decoration: none;
  }

  .header a:hover {
    text-decoration: underline;
  }

  .logo {
    color: #fff;
    font-weight: bold;
    border: 1px solid #fff;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .info {
    position: fixed;
    top: 0;
    right: 0;

    box-shadow: 0px 0px 40px rgba(0,0,0,0.25);

    background-color: #303230;
    color: #fff;

    font-weight: bold;

    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: flex-start;
  }

  .info span {
    box-sizing: border-box;
    display: flex;
    height: 40px;
    position: relative;
    padding-right: 20px;
    align-items: center;
    border-bottom: 1px solid rgba(0,0,0,0.1);
  }

  .info span:before {
    content: attr(data-count);
    display: flex;
    width: 40px;
    height: 40px;
    margin-right: 10px;
    align-items: center;
    justify-content: center;
    font-size: 0.9rem;
    font-family: monospace;
    color: #161716;
  }

  .info span:first-child:before {
    background-color: #C7C3C6;
  }

  .info span:last-child:before {
    background-color: #f5dfaf;
  }
</style>