<template>
  <v-container fluid fill-height>
    <v-layout justify-center align-center>
      <v-flex xs10 sm8 lg4>
        <v-img
          :src="require(`@/assets/images/svg/undraw_feeling_blue_4b7q.svg`)"
          :lazy-src="require(`@/assets/images/svg/undraw_feeling_blue_4b7q.svg`)">
          <v-layout
            slot="placeholder"
            fill-height
            align-center
            justify-center
            ma-0>
            <slot></slot>
          </v-layout>
        </v-img>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'Page_404'
}
</script>
