import Vue from 'vue/dist/vue.js'
import IntersectionObserver from '../__mocks__/intersection-observer.js'
import Intersect from '../src'

// Mock
global.IntersectionObserver = IntersectionObserver


test('It should be a function', () => {
  expect(typeof Intersect.created).toBe('function')
})

test('It should create a instance of IntersectionObserver', async () => {
  global.console.warn = jest.fn()
  const vm = new Vue(Intersect).$mount()
  expect(vm.observer).toBeInstanceOf(IntersectionObserver)

  await vm.$nextTick

  expect(global.console.warn).toHaveBeenCalledTimes(1)
})

test('It should mount correctly and add the item to the observers list', async () => {
  const mockedIntersect = Object.assign({}, Intersect)

  const spy = {
    created: jest.spyOn(mockedIntersect, 'created'),
    mounted: jest.spyOn(mockedIntersect, 'mounted')
  }

  const vm = new Vue({
    template: `<intersect><div ref="intersect">this is my component</div></intersect>`,
    components: {Intersect: mockedIntersect}
  }).$mount()

  await Vue.nextTick()

  expect(vm._vnode.componentInstance.observer.observables.length).toBe(1)

  expect(spy.created).toHaveBeenCalledTimes(1)
  expect(spy.mounted).toHaveBeenCalledTimes(1)

  expect(vm.$el.outerHTML).toBe(`<div>this is my component</div>`)
  expect(vm.$el.textContent).toBe('this is my component')
})

test('It should emit "intersected" event when the component is intersected', async () => {
  const mockedIntersect = Object.assign({}, Intersect)
  const spy = jest.fn()

  const vm = new Vue({
    template: `<intersect @intersected="intersected"><div></div></intersect>`,
    components: {Intersect: mockedIntersect},
    methods: {
      intersected: spy
    }
  }).$mount()

  await vm.$nextTick()

  vm._vnode.componentInstance.observer.cb([{
    isIntersecting: true
  }])

  expect(spy).toHaveBeenCalledTimes(1)
})

test('It should be possible to set the threshold in a property', async () => {
  const mockedIntersect = Object.assign({}, Intersect)
  const vm = new Vue({
    template: `<intersect :threshold="[0, 0.5]"><div></div></intersect>`,
    components: {Intersect: mockedIntersect}
  }).$mount()

  await vm.$nextTick()

  expect(vm._vnode.componentInstance.$options.propsData.threshold).toEqual([0, 0.5])
})

test('It should disconnect the IntersectionObserver when the component is destroyed', async () => {
  const mockedIntersect = Object.assign({}, Intersect)

  const spy = {
    destroyed: jest.spyOn(mockedIntersect, 'destroyed'),
    disconnect: jest.spyOn(global.IntersectionObserver.prototype, 'disconnect')
  }

  const vm = new Vue({
    template: `<intersect><div></div></intersect>`,
    components: {Intersect: mockedIntersect}
  }).$mount()

  await vm.$nextTick()

  vm.$destroy()
  expect(spy.destroyed).toHaveBeenCalledTimes(1)
  expect(spy.disconnect).toHaveBeenCalledTimes(1)
})

test('It should warn when no child component is defined', async () => {
  global.console.warn = jest.fn()

  const vm = new Vue({
    template: `<intersect></intersect>`,
    components: {Intersect}
  }).$mount()

  await vm.$nextTick()

  expect(global.console.warn).toHaveBeenCalledTimes(1)
  expect(vm._vnode.componentInstance.observer.observables.length).toBe(0)
})

test('It should warn if more than one child component is defined', async () => {
  global.console.warn = jest.fn()
  const vm = new Vue({
    template: `<intersect><div></div><div></div></intersect>`,
    components: {Intersect}
  }).$mount()

  await vm.$nextTick()

  expect(global.console.warn).toHaveBeenCalledTimes(1)
  expect(vm._vnode.componentInstance.observer.observables.length).toBe(1)
})
