<script>
  import Intersect from 'vue-intersect'

  export default {
    components: { Intersect },
    props: {
        index: {
            type: Number,
            required: true
        }
    },
    data: () => ({
        hasIntersected: false
    }),
    methods: {
        onEnter (entry) {
            // Since we can't use `.once` in render function,
            // we'll need to do that check ourselfs.
            if (!this.hasIntersected) {
                this.$emit('load')
                this.hasIntersected = true
            }
        }
    },
    render (h) {
        const listItem = h('li', this.$slots.default)

        // Because index is zero based, we'll need add +1
        const INDEX = this.index + 1

        // Every 20th should be an IntersectionObserver
        if (INDEX % 20 === 0) {
            return h('intersect', {
                on: {enter: this.onEnter}
            }, [listItem])
        }

        return listItem
    }
  }
</script>