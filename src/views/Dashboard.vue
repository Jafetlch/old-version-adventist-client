<template>
  <v-container class="px-0 py-0">
    <v-card flat color="bg">
      <v-btn color="error" @click="featherTest">Test</v-btn>
      <p>{{ data }}</p>
    </v-card>
  </v-container>
</template>

<script>
/* eslint-disable */

import { getData, showData } from '@/helper/data_getters'

import Axios from '@/plugins/axios'
// import { createData } from '@/helper/data_getters'

export default {
  name: 'Dashboard',
  data: () => ({
    data: ''
  }),
  mounted () {
    // if (this.getData.length) {
    //   return
    // }
    // this.$store.dispatch('getAdvertisements')
  },
  methods: {
    // getData () {
    //   return this.$store.getters.getAdvertisments
    // },
    featherTest () {
      // getData('advertisements').then((res) => {
      //   console.log(res)
      // })
      // showData('department', { 'id': '1002'}).then(res => console.log(res))
      // Axios.post('api/advertisement', { 'id': '1002'}).then(res => {
      //   console.log(res.data.data[0].code)
      // })
      // Axios.put('api/churches/10', {
      //   'title': 'test'
      // }).then(res => {
      //   console.log('hola')
      // })
      // Axios.put('api/test/ad/update/10', {
      //   'title': 'test 01'
      // }).then(res => {
      //   console.log('hola')
      // })
      console.log(this.$store.getters.getCurrentUser.code)
    }
  }
}
</script>
