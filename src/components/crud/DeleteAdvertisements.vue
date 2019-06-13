<template>
  <CustomCard :title="'Eliminar: ' + data.code">
    <v-snackbar
      v-model="snackbar"
      :timeout="6000"
      :color="snackbar_color"
      :top="true"
      :right="true">
      {{ snackbar_message }}
      <v-btn
        flat
        @click="snackbar = false">
        Close
      </v-btn>
    </v-snackbar>
    <v-layout v-if="circular_progress" row wrap align-center justify-center pa-5>
      <v-progress-circular size="45" indeterminate color="primary"></v-progress-circular>
    </v-layout>
    <!-- {{ data }} -->
    <v-card flat v-else>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap mb-1>
              <span :class="['headline', {'red--text': data.published.toString() === '0'}, {'green--text': data.published.toString() === '1'},]">{{ data.title }}</span>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <!-- <p :class="[{'red--text': data.published === '0'}, {'green--text': data.published === '1'},]">{{ data.code }}</p> -->
                <span>{{ data.department.name }}</span>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <span v-html="data.description"></span>
              </v-flex>
            </v-layout>
            <v-layout row wrap mt-3>
              <v-btn color="primary" @click="deleteItem">Eliminar</v-btn>
              <v-btn flat @click="cancel">Cancel</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </CustomCard>
</template>

<script>
import CustomCard from '@/components/CustomCard'
import Axios from '@/plugins/axios'

export default {
  name: 'DeleteAdvertisement',
  components: {
    CustomCard
  },
  data: () => ({
    data: [],
    circular_progress: false,
    snackbar: false,
    snackbar_message: 'Hola!',
    snackbar_color: 'primary'
  }),
  created () {
    this.data = this.$store.getters.getIdAdvertisements
  },
  methods: {
    deleteItem () {
      this.circular_progress = true
      Axios.delete(`/api/adventist-adv/delete/${this.data.id.toString()}`).then(response => {
        this.snackbar = true
        this.$store.dispatch('getAdvertisements')
        this.snackbar_color = 'primary'
        this.snackbar_message = 'Se ha eliminado correctamente.'
        this.circular_progress = false
        this.$router.push({ name: 'my-advertisements' })
        this.$store.commit('setIdAdvertisements', null)
        this.$store.commit('setDeleteAdvertisements', false)
      }).catch(() => {
        this.snackbar = true
        this.snackbar_color = 'warning'
        this.snackbar_message = 'Hubo un error!'
        this.circular_progress = false
      })
    },
    cancel () {
      this.$router.push({ name: 'my-advertisements' })
      this.$store.commit('setIdAdvertisements', null)
      this.$store.commit('setDeleteAdvertisements', false)
    }
  }
}
</script>
