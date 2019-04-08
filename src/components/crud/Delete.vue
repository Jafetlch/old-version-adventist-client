<template>
  <CustomCard :title="title">
    <v-card flat>
      <v-container fluid grid-list-md>
        <v-layout row wrap>
          <v-flex>
            <v-flex>
              <p class="subheading"><span class="font-weight-medium">Nombre: </span>{{ this.data.name }}</p>
              <p class="subheading" v-show="isFeather && haveBelongs"><span class="font-weight-medium">Pertenece: </span>{{ this.belongsTo.name}}</p>
              <p class="subheading"><span class="font-weight-medium">Email: </span>{{ this.user.email}}</p>
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
    belongsTo: []
  }),
  created () {
    showData(this.show, getId(this.go)).then((response) => {
      this.data = response
      this.user = response.user
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
      deleteData(this.go, this.data.id).then((res) => {
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
