import Vue from 'vue';

var warn = function warn(msg) {
  if (!Vue.config.silent) {
    console.warn(msg);
  }
};

export default {
  name: 'intersect',
  abstract: true,
  props: {
    threshold: {
      type: Array,
      required: false,
      default: function _default() {
        return [0.2];
      }
    },
    root: {
      type: HTMLElement,
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
  created: function created() {
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
  },
  mounted: function mounted() {
    var _this2 = this;

    this.$nextTick(function () {
      if (_this2.$slots.default && _this2.$slots.default.length > 1) {
        warn('[VueIntersect] You may only wrap one element in a <intersect> component.');
      } else if (!_this2.$slots.default || _this2.$slots.default.length < 1) {
        warn('[VueIntersect] You must have one child inside a <intersect> component.');
        return;
      }

      _this2.observer.observe(_this2.$slots.default[0].elm);
    });
  },
  destroyed: function destroyed() {
    this.observer.disconnect();
  },
  render: function render() {
    return this.$slots.default ? this.$slots.default[0] : null;
  }
};