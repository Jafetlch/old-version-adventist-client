<template>
  <CustomCard :title="title">
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
            <v-flex>
              <p class="subheading"><span class="font-weight-medium">Nombre: </span>{{ this.data.name }}</p>
              <p class="subheading" v-show="isFeather && haveBelongs"><span class="font-weight-medium">Pertenece: </span>{{ this.belongsTo.name}}</p>
              <p v-show="show != 'department'" class="subheading"><span class="font-weight-medium">Email: </span>{{ this.user.email}}</p>
            </v-flex>
            <v-btn color="primary" @click="deleteValue">Eliminar</v-btn>
            <v-btn flat @click="cancel">Cancel</v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card>
  </CustomCard>
</template>

<script>
import CustomCard from '@/components/CustomCard'
import { deleteData, showData } from '@/helper/data_getters'
import { getCommitDelete, getDispatch, getId } from '@/helper/snnipets'
export default {
  name: 'Delete',
  components: {
    CustomCard
  },
  props: {
    title: {
      type: String,
      default: ''
    },
    go: {
      type: String,
      required: true
    },
    show: {
      type: String,
      required: true
    },
    haveBelongs: {
      default: false
    }
  },
  data: () => ({
    data: [],
    user: [],
    belongsTo: [],
    circular_progress: false,
    snackbar: false,
    snackbar_message: 'Hola!',
    snackbar_color: 'primary'
  }),
  created () {
    this.circular_progress = true
    showData(this.show, getId(this.go)).then((response) => {
      this.data = response
      this.user = response.user
      this.circular_progress = false
      if (this.haveBelongs) {
        switch (this.go) {
          case 'groups':
            this.belongsTo = response.union
            break
          case 'churches':
            this.belongsTo = response.group
            break
        }
      }
    })
  },
  computed: {
    isFeather () {
      return this.$store.getters.getCurrentUser.role_id === 1
    }
  },
  methods: {
    deleteValue () {
      this.circular_progress = true
      deleteData(this.go, this.data.id).then((res) => {
        this.snackbar = true
        this.snackbar_color = 'primary'
        this.snackbar_message = 'Se ha eliminado correctamente.'
        this.circular_progress = false
        getDispatch(this.go)
        this.cancel()
      })
    },
    cancel () {
      getCommitDelete(this.go, false)
    }
  }
}
</script>
