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

    this.observe()
  },
  destroyed () {
    this.$emit('destroyed')
    this.observer.disconnect()
  },
  render () {
    return this.$slots.default ? this.$slots.default[0] : null
  },
  methods: {
    observe() {
      this.$nextTick(() => {
        const slot = this.$slots.default

        if (slot && slot.length > 1) {
          warn('[VueIntersect] You may only wrap one element in a <intersect> component.')
        } else if (!slot || slot.length < 1) {
          warn('[VueIntersect] You must have one child inside a <intersect> component.')
          return
        }

        const vNode = slot[0]

        if (vNode.asyncFactory && !vNode.asyncFactory.resolved) {
          vNode.asyncFactory().then(() => {
            this.observe()
          })
        } else {
          const { elm } = vNode
          this.observer.observe(elm)
        }
      })
    }
  }
}
