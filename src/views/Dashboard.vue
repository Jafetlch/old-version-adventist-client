<template>
  <v-container class="px-0 py-0">
    <v-card flat color="bg">
      <v-btn color="error" @click="featherTest">Test</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { getDataFrom } from '@/helper/snnipets'
export default {
  name: 'Dashboard',
  mounted () {
    if (this.getData.length) {
      return
    }
    getDataFrom(this.$store.getters.getCurrentUser.role_id, 'getDataDepartments', 'getDataDepartmentsWithParams')
  },
  methods: {
    getData () {
      return this.$store.getters.getDepartments
    },
    featherTest () {
      console.log(this.$store.getters.getDepartments)
    }
  }
}
</script>
