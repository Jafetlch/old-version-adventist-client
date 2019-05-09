<template>
  <v-container :class="{'px-0 py-0':padding}">
    <v-layout justify-center>
      <v-flex xs12>
        <v-card>
          <v-text-field
            name="name"
            label="label"
            id="id"
          ></v-text-field>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
  <!-- <HelloWorld /> -->
</template>

<script>
// import HelloWorld from '../components/HelloWorld'

export default {
  components: {
    // HelloWorld
  }
}
</script>
