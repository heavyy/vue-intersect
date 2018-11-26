# Vue Intersect
**A Vue component to add intersection-observer to a Vue component or HTML element.**

[![npm version](https://badge.fury.io/js/vue-intersect.svg)](https://badge.fury.io/js/vue-intersect) [![Coverage Status](https://coveralls.io/repos/github/heavyy/vue-intersect/badge.svg)](https://coveralls.io/github/heavyy/vue-intersect) [![Build status](https://img.shields.io/travis/heavyy/vue-intersect.svg)](https://travis-ci.org/heavyy/vue-intersect)



## Table of content

* [Introduction](#introduction)
* [Demo](#demo)
* [Installation](#installation)
* [Usage](#usage)
* [Properties](#properties)
* [Events](#events)
* [Polyfill](#polyfill)

## Introduction

The [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API) is an amazing API which allows you to observe one or more HTMLElement for when it has entered or left the viewport.

This API has many use cases like, infinite-scroll, lazy-loading or animations when an element enters the viewport.



## Demo

We've made a basic demo of how you might want to use **vue-intersect**. The code is available in the [gh-pages branch](https://github.com/heavyy/vue-intersect/tree/gh-pages) and the part where **vue-intersect** is used [can be found here](https://github.com/heavyy/vue-intersect/blob/gh-pages/src/components/InfiniteScrollItem.vue#L33).

[Hackernews infinite scroll demo](https://heavyy.github.io/vue-intersect/)

> Please keep in mind that the demo is not production code. Use it as an inspiration.



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
  <intersect @enter="msg = 'Intersected'" @leave="msg = 'Not intersected'">
    <div>{{ msg }}</div>
  </intersect>
</template>

<script>
  import Intersect from 'vue-intersect'

  export default {
    components: { Intersect },
    data () {
      return {
        msg: 'I will change'
      }
    }
  }
</script>
```



## Properties

| Property   | Type        | Default           | Required | Description                              |
| ---------- | ----------- | ----------------- | -------- | ---------------------------------------- |
| threshold  | Array       | [0, 0.2]          | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| root       | HTMLElement | null              | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| rootMargin | String      | *0px 0px 0px 0px* | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |



## Events

| Name       | Arguments                                | Description                              |
| ---------- | ---------------------------------------- | ---------------------------------------- |
| **change** | [*IntersectionObserverEntry*](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) | Event fired on any inte.                 |
| **enter**  | [*IntersectionObserverEntry*](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) | Event fired when the element is intersected (visible on the screen) |
| **leave**  | [*IntersectionObserverEntry*](https://developer.mozilla.org/en-US/docs/Web/API/IntersectionObserverEntry) | Event fired when the element is *not* intersected (not visible on the screen) |



> The **enter** and **leave** event is sugar, for an often performed operation. You still have to set the threshold to e.g. [0, 0.2] (default). If you leave out "0", it will never call the **leave** event.



The events is compliant with Vue's [event modifiers](https://vuejs.org/v2/guide/events.html#Event-Modifiers). This means that you could add `.once` to the events to make sure you only trigger your event handler once.



## Polyfill

The IntersectionObserver API is not currently available in all browsers ([IE11, Safari and iOS Safari](http://caniuse.com/#feat=intersectionobserver)). If you intend to support these browsers, you'll need to add a poylfill to your bundle.

[WICG IntersectionObserver Polyfill](https://github.com/w3c/IntersectionObserver/tree/master/polyfill) is highly recommended.
