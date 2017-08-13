export default class IntersectionObserver {
  constructor (cb, options) {
    this.cb = cb
    this.options = options
    this.observables = []
  }

  observe (el) {
    this.observables.push(el)
  }

  disconnect () {
    return true
  }
}
