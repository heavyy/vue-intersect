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
      default: () => [0, 0.2]
    },
    root: {
      type: HTMLElement,
      required: false,
      default: () => null
    },
    rootMargin: {
      type: String,
      required: false,
      default: () => '0px 0px 0px 0px'
    }
  },
  created () {
    this.isIntersectionObserver = typeof IntersectionObserver !== 'undefined'
    if (!this.isIntersectionObserver) {
      console.warn('[vue-intersect] IntersectionObserver API is not available in your browser. Please install this polyfill: https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill')
      return
    }

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
  },
  mounted () {
    if (!this.isIntersectionObserver) return
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
    if (!this.isIntersectionObserver) return
    this.observer.disconnect()
  },
  render () {
    return this.$slots.default ? this.$slots.default[0] : null
  }
}
