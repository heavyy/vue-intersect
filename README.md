# Vue Intersect
**A Vue component to add intersection observe a Vue component or HTML element.**

[![npm version](https://badge.fury.io/js/vue-intersect.svg)](https://badge.fury.io/js/vue-intersect) [![Coverage Status](https://coveralls.io/repos/github/heavyy/vue-intersect/badge.svg)](https://coveralls.io/github/heavyy/vue-intersect)



## Table of content

* [Introduction](#introduction)
* [Installation](#installation)
* [Usage](#usage)
* [Properties](#properties)
* [Events](#events)
* [Polyfill](#polyfill)

## Introduction

The [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is an amazing API which allows you to observe one or more HTMLElement for when it has enterede or left the viewport.

This API has many use cases like, infinite-scroll, lazy-loading or animations when an element enters the viewport.



## Installation

Simply install using your favorite package manager 🔥

#### NPM

```bash
npm install vue-intersect --save
```

#### Yarn
```bash
yarn add vue-intersect
```



## Usage

The package acts as an abstract component, much like what you may know from [keep-alive](https://vuejs.org/v2/api/#keep-alive) or [transition](https://vuejs.org/v2/api/#transition).

This means that it's basically a "decorator". A component which does not output any markup to the DOM, but adds the functionality under the hood 😱.

#### .vue

```html
<template>
  <intersect @intersected="msg = 'Intersected!'">
    <div>{{ msg }}</div>
  </intersect>
</template>

<script>
  import Intersect from 'vue-intersect'

  export default {
    components: { Intersect },
    data () {
      return {
        msg: 'Not intersected.'
      }
    },
    methods: {
      onIntersected () {
        alert('Element has intersected.')
      }
    }
  }
</script>
```



## Properties

| Property   | Type        | Default           | Required | Description                              |
| ---------- | ----------- | ----------------- | -------- | ---------------------------------------- |
| threshold  | Array       | [0.2]             | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| root       | HTMLElement | null              | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| rootMargin | String      | *0px 0px 0px 0px* | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |



## Events

| Name            | Arguments | Description                 |
| --------------- | --------- | --------------------------- |
| **intersected** | *none*    | Event fired on intersected. |



## Polyfill

The IntersectionObserver API is not currently available in all browsers ([IE11, Safari and iOS Safari](http://caniuse.com/#feat=intersectionobserver)). If you intend to support these browsers, you'll need to add a poylfill to your bundle.

[WICG IntersectionObserver Polyfill](https://github.com/WICG/IntersectionObserver/tree/gh-pages/polyfill) is higly recommended.
