# Vue Intersect
**A Vue component to add intersection observe a Vue component or HTML element.**

[![npm version](https://badge.fury.io/js/vue-intersect.svg)](https://badge.fury.io/js/vue-intersect)

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

| Property         | Type     | Default | Required | Description                              |
| ---------------- | -------- | ------- | -------- | ---------------------------------------- |
| threshold        | Array    | [0.2]   | *no*     | [MDN docs](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API#Intersection_observer_options) |
| v-on:intersected | Function | null    | *no*     | Event fired on intersected               |



