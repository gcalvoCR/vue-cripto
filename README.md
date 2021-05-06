"# vue-cripto"

# Concepts

#### Directives (tool to manipulate the DOM)

- `v-bind:src="img"`
- `v-if="conditional"` removes the element from the DOM
- `v-show="conditional"` adds `display:none;`
- `v-for="item in items"` to render arrays
- `v-on:click="toggleShowPrices"`
- `v-bind:class={ }` for objects
- `v-bind:style={ background: color }`

#### Computed properties (computed functions that always return a value)

- Determined in real time
- They store data in cache

#### Watchers (functions that execute a piece of code)

- They have the same name of a property
- To trigger some code

#### 2-way-data-binding (v-model)

- to modify the value of a property inside data

#### Props (for comunication parent-child)

- Declare a directive with the information you want to send --> ` v-bind:coin="btc"`
- Receive the information declaring a props array --> `props:["coin"]`

#### Comunication child-parent is via Events

- In child emit and event --> `this.$emit('change-color')`
- In parent listen for the event --> `v-on:change-color="updateColor"`
- In child emit and event and pass params if needed--> `this.$emit('change-color', 'FF96C8')`

#### Slot

- To send html content from parent to child
- In child --> `<slot name="text"></slot>`
- In parent --> `<template v-slot:text></template>`

#### Lifecycle hooks (events)

-beforeCreate
-created (good to call information from API)
-beforeMount
-Mounted (You have access to the DOM)
-beforeUpdate
-updated
-beforeDestroy
-destroyed

Order

- Creation of parent component
- Creation of child component
- Mounting of child component
- Mounting of parent component

### Vue CLI

- A dev tool that allows as create the base structure of the project (the scaffolding)

### Router links

- `<router-link to="/home">Back</router-link>`
- `<router-link :to="{ name: 'name-of-router', params: {id: a.id }}">Back</router-link>`

### Dynamic Routes

- In route --> `path: '/coin/:id'`
- In component --> `const id = this.$route.params.id`

### Navegate programmatically

- ` this.$router.push({ name: 'coin-detail', params: { id: coin } })`

#### Why NodeJS

- Main engine of all tools we need to work with Vue
- It is needed to automate the tooling of the dev process

# Commands

- npm i -g @vue/cli
- vue create vue-cripto

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Lints and fixes files

```
npm run lint
```

## Create a Webserver

- `npm i -g serve`
  - Generates a web server

## Serve the application

- `serve -s dist`

### Concepts

- `Single file components` components written in files
  - files.vue

## Notes

- `tailwindcss` for CSS

## Tricks

- `@` is a trick to refere to the src folder
- `v-bind:alt` == `:alt`
- `v-on:click` == `@click`

## Dependencies

- `numeral` to format strings, numbers, etc (`npm i -S numeral`)
- `fetch` to interact with the API

### Third-party components

- https://github.com/greyby/vue-spinner
- https://github.com/ankane/vue-chartkick
- https://github.com/Saeris/vue-spinners

npm i -S @saeris/vue-spinners vue-chartkick

### Reactivity problems

- When there are things that were not created from the beginning
- not mapped into data()
- not there when the component was created by Vue
- Solution --> `this.$set(object, 'stringWithPropertuName', value)`
