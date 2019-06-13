<template>
  <CustomCard :title="'Vista Previa de: ' + data.code">
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
    <v-card flat v-else>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-layout row wrap>
              <v-img
                :src="getCurrentURL(data.image.path)"
                :lazy="getCurrentURL(data.image.path)"
                aspect-ratio="0"
                height="400px"
                class="grey lighten-4">
                <template v-slot:placeholder>
                  <v-layout
                    fill-height
                    align-center
                    justify-center
                    ma-0>
                    <v-progress-circular indeterminate color="primary"></v-progress-circular>
                  </v-layout>
                </template>
              </v-img>
            </v-layout>
            <v-layout row wrap mt-3 mb-1>
              <span class="headline">{{ data.title }}</span>
              <v-spacer></v-spacer>
              <span
                :class="[{'red--text': data.published.toString() === '0'}, {'green--text': data.published.toString() === '1'},]">
                {{ data.published.toString() === '1' ? 'Publicado' : 'Sin publicar' }}
              </span>
            </v-layout>
            <v-layout row wrap>
              <v-flex xs12>
                <span>{{ data.department.name }}</span>
                <v-spacer></v-spacer>
                <span class="grey--text">Publicado: </span>
                <span v-html="data.publicationDate"></span>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <span class="grey--text">Fecha: </span>
                <span>{{ data.eventDate }}</span>
                <v-spacer></v-spacer>

                <template v-if="!!data.time">
                  <span class="grey--text">Hora: </span>
                  <span>{{ data.time }}</span>
                  <v-spacer></v-spacer>
                </template>

                <template v-if="!!data.place">
                  <span class="grey--text">Lugar: </span>
                  <span>{{ data.place }}</span>
                  <v-spacer></v-spacer>
                </template>

                <template v-if="!!data.guest">
                  <span class="grey--text">Invitados: </span>
                  <ul v-for="(guest, index) in data.guest.split(',')" :key="index">
                    <li>{{ guest }}</li>
                  </ul>
                </template>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                  <p class="grey--text">Fragmento:</p>
                  <span v-html="data.fragment"></span>
              </v-flex>
              <v-flex xs12>
                <v-divider></v-divider>
              </v-flex>
              <v-flex xs12>
                <p class="grey--text">Descripción:</p>
                <span v-html="data.description"></span>
              </v-flex>
            </v-layout>
            <v-layout row wrap mt-3 justify-center>
              <v-btn depressed block color="primary" @click="cancel">Salir</v-btn>
            </v-layout>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </CustomCard>
</template>

<script>
import CustomCard from '@/components/CustomCard'
export default {
  name: 'DisplayAdvertisements',
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
    this.data = this.$store.getters.getDisplayAd
  },
  methods: {
    getCurrentURL (path) {
      return `${this.$store.getters.getFeatherUrl}storage/images-advertisements/${path}`
    },
    cancel () {
      this.$store.commit('setDisplayAd', null)
    }
  }
}
</script>
