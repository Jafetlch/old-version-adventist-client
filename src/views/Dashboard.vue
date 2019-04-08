<template>
  <v-container class="px-0 py-0">
    <v-card flat color="bg">
      <v-btn color="error" @click="featherTest">Test</v-btn>
    </v-card>
  </v-container>
</template>

<script>
import { getDataFrom } from '@/helper/snnipets'

// import Axios from '@/plugins/axios'
// import { createData } from '@/helper/data_getters'

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
      // createData('unions', {
      //     'name': 'this.$data.data.name',
      //     'email': 'this.$data.data.email',
      //     'password': 'this.$data.pwd',
      //     'role': 1,
      //     'current_user_id': 1,
      //     'belongs_to_id': null
      //   }).then((res) => {
      //     console.log(res)
      //   })
      // Axios.post(`/api/unions`, {
      //   'name': 'test'
      // })
      // .then((response) => {
      //   if (response.data.response) {
      //     res('Se ha creado satisfactoriamente.')
      //   }
      // }).catch((error) => {
      //   rej('Lastimosamente no se pudo crear.')
      // })
      // console.log(this.$store.getters.getDepartments)
    }
  }
}
</script>
