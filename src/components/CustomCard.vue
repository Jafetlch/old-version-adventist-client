<template>
  <v-layout justify-center>
    <v-flex xs12>
      <v-toolbar color="primary" flat dark>
        <template v-show="showMin">
          <v-toolbar-title v-text="min ? title : secondTitle"></v-toolbar-title>
          <v-spacer></v-spacer>
          <v-icon
            v-if="min"
            @click="min = !min">
            keyboard_arrow_down
          </v-icon>
          <v-icon
            v-else
            @click="min = !min">
            keyboard_arrow_up
          </v-icon>
        </template>
      </v-toolbar>
      <v-flex v-show="min" class="mb-4">
        <slot></slot>
      </v-flex>
    </v-flex>
  </v-layout>
</template>

<script>
export default {
  name: 'CustomCard',
  props: {
    title: {
      type: String,
      default: ''
    },
    secondTitle: {
      type: String,
      default: ''
    },
    showMin: {
      type: Boolean,
      default: false
    }
  },
  data: () => ({
    min: true
  })
}
</script>
