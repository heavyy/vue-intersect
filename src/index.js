import Vue from 'vue'

const warn = (msg) => {
  if (!Vue.config.silent) {
    console.warn(msg)
  }
}

export default {
  name: 'intersect',
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: () => [0.2]
    }
  },
  created () {
    this.observer = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        this.$emit('intersected')
        this.observer.disconnect()
      }
    }, {threshold: this.threshold})
  },
  mounted () {
    this.$nextTick(() => {
      if (this.$slots.default && this.$slots.default.length > 1) {
        warn('[VueIntersect] You may only wrap one element in a <intersect> component.')
      } else if (!this.$slots.default || this.$slots.default.length < 1) {
        warn('[VueIntersect] You must have one child inside a <intersect> component.')
        return
      }

      this.observer.observe(this.$slots.default[0].elm)
    })
  },
  destroyed () {
    this.observer.disconnect()
  },
  render () {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
