<template>
  <v-container>
    <section>
      <h1 class="display-1 primary--text">{{title}}</h1>
    </section>
    <slot></slot>
  </v-container>
</template>

<script>
export default {
  name: 'CustomHeader',
  props: {
    title: {
      type: String,
      default: ''
    }
  }
}
</script>
