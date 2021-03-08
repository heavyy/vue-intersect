export default {
  name: 'intersect',
  props: {
    threshold: {
      type: Array,
      required: false,
      default: function _default() {
        return [0, 0.2];
      }
    },
    root: {
      type: typeof HTMLElement !== 'undefined' ? HTMLElement : Object,
      required: false,
      default: function _default() {
        return null;
      }
    },
    rootMargin: {
      type: String,
      required: false,
      default: function _default() {
        return '0px 0px 0px 0px';
      }
    }
  },
  emits: ['destroyed', 'enter', 'change', 'leave'],
  mounted: function mounted() {
    var _this = this;

    this.observer = new IntersectionObserver(function (entries) {
      if (!entries[0].isIntersecting) {
        _this.$emit('leave', [entries[0]]);
      } else {
        _this.$emit('enter', [entries[0]]);
      }

      _this.$emit('change', [entries[0]]);
    }, {
      threshold: this.threshold,
      root: this.root,
      rootMargin: this.rootMargin
    });

    var slot = this.$slots.default();

    this.$nextTick(function () {
      if (!slot || slot.length < 1) {
        console.warn('[VueIntersect] You must have one child inside a <intersect> component.');
        return;
      }

      slot.filter(function (node) {
        return node.el;
      }).forEach(function (node) {
        _this.observer.observe(node.el);
      });
    });
  },
  unmounted: function unmounted() {
    this.$emit('destroyed');
    this.observer.disconnect();
  },
  render: function render() {
    var slot = this.$slots.default();
    return slot || null;
  }
};