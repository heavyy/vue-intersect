export default {
  name: 'intersect',
  props: {
    threshold: {
      type: Array,
      required: false,
      default: () => [0, 0.2]
    },
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      required: false,
      default: () => null
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px'
    }
  },
  emits: [ 'destroyed', 'enter', 'change', 'leave' ],
  mounted () {
    this.observer = new IntersectionObserver((entries) => {
      if (!entries[0].isIntersecting) {
        this.$emit('leave', [entries[0]])
      } else {
        this.$emit('enter', [entries[0]])
      }

      this.$emit('change', [entries[0]])
    }, {
      threshold: this.threshold,
      root: this.root,
      rootMargin: this.rootMargin
    })

    const slot = this.$slots.default()

    this.$nextTick(() => {
      if (!slot || slot.length < 1) {
        console.warn('[VueIntersect] You must have one child inside a <intersect> component.')
        return
      }

      slot.filter(node => node.el).forEach(node => {
        this.observer.observe(node.el)
      })
    })
  },
  unmounted () {
    this.$emit('destroyed')
    this.observer.disconnect()
  },
  render () {
    const slot = this.$slots.default()
    return slot || null
  }
}
