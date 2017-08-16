<template>
  <div class="infinite-scroll-list">
    <ul>
      <infinite-scroll-item @load="$emit('load')" v-for="(item, index) in items" :key="item.title" :index="index">
        <h2>
          <a target="_blank" :href="item.url || `https://news.ycombinator.com/item?id=${item.id}`">
            {{ item.title }} <small v-if="item.url">({{ item.url | host }})</small>
          </a>
        </h2>
        <span>{{ item.score }} points by <a target="_blank" :href="`https://news.ycombinator.com/user?id=${item.by}`">{{item.by}}</a> {{ item.time | timeAgo }} ago | <a :href="`https://news.ycombinator.com/item?id=${item.id}`">{{ item.descendants }} comments</a></span>
      </infinite-scroll-item>
    </ul>
  </div>
</template>

<script>
  import InfiniteScrollItem from './InfiniteScrollItem.vue'
  import { timeAgo, host } from '../utils'

  export default {
    components: { InfiniteScrollItem },
    filters: {timeAgo, host},
    props: {
      items: {
        type: Array,
        required: true
      }
    }
  }
</script>

<style scoped>
  ul {
    list-style: none;
    margin: 0;
    padding: 15px 0 0 0;
    background: #f6f6ef;
  }

  li {
    min-height: 30px;
    margin-bottom: 5px;
    padding: 0 10px;
    display: flex;
    align-items: flex-start;
    justify-content: center;
    flex-direction: column;
  }

  h2 {
    color: #000;
    margin: 0;
    font-weight: normal;
  }

  li, h2 {
    font-size: 10pt;
  }

  li:nth-child(20n) {
    background-color: rgba(241, 169, 28, 0.3);
  }

  small {
    font-size: 8pt;
    font-weight: normal;
    color: #828282;
  }

  span {
    color: #828282;
    font-size: 7pt;
  }

  a {
    text-decoration: none;
  }

  a:hover {
    text-decoration: underline;
  }
</style>