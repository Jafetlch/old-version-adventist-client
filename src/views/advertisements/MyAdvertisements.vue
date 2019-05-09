<template>
  <CustomHeader :title="title">
    <CustomCard title="Lista" second-title="Vista">
      <v-card>
        <v-card-title>
          {{ title }}
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="getData"
          :search="search"
          :pagination.sync="pagination">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td class="text-sm-left">{{ props.item.code }}</td>
            <td class="text-sm-left" :class="{'red--text': props.item.published !== 1}">{{ props.item.published === 1 ? 'Si' : 'No' }}</td>
            <template v-if="!isFeather">
              <td class="text-sm-left">{{ props.item.publicationDate }}</td>
            </template>
            <template v-else>
              <td class="text-sm-left">{{ props.item.department.user.name }}</td>
              <td class="text-sm-left">{{ props.item.created_at }}</td>
              <td class="text-sm-left">{{ props.item.updated_at }}</td>
            </template>
            <td v-if="!isEditDelete">
              <v-icon
                small
                class="mr-2"
                @click="editItem(props.item.id)">
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item.id)">
                delete
              </v-icon>
            </td>
            <td v-if="!isEditDelete">
              <v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
                <template v-slot:activator="{ on }">
                  <v-icon
                    small
                    v-on="on"
                    @click="viewItem(props.item)">
                    visibility
                  </v-icon>
                </template>
                <v-card v-if="viewData">
                  <v-toolbar dark color="primary">
                    <v-btn dark flat @click="{ dialog = false, editItem(props.item.id) }">Editar</v-btn>
                    <v-toolbar-title class="subheading" :class="{ 'red--text': viewData.published == 0, 'green--text': viewData.published == 1 }">#{{ viewData.code }}</v-toolbar-title>
                    <v-spacer></v-spacer>
                    <v-toolbar-items>
                      <v-btn icon dark @click="dialog = false">
                        <v-icon>close</v-icon>
                      </v-btn>
                    </v-toolbar-items>
                  </v-toolbar>

                  <v-list v-if="viewData" three-line subheader>
                    <v-img
                        :src="getCurrentURL(viewData.image.path)"
                        :lazy-src="getCurrentURL(viewData.image.path)"
                        aspect-ratio="0"
                        height="400px"
                        class="grey lighten-4">
                      </v-img>
                    <v-list-tile avatar>
                      <h4 class="display-1 primary--text">{{ viewData.title }}</h4>
                    </v-list-tile>

                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="subheading">Pertenece: <span class="primary--text">{{ viewData.department.user.name }}</span></v-list-tile-sub-title>
                        <v-list-tile-sub-title class="subheading">Departamento: <span class="primary--text">{{ viewData.department.name }}</span></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="subheading">Fecha de publicación: <span class="primary--text">{{ viewData.publicationDate }}</span></v-list-tile-sub-title>
                        <v-list-tile-sub-title class="subheading">Lugar: <span class="primary--text">{{ viewData.place }}</span></v-list-tile-sub-title>
                        <v-list-tile-sub-title class="subheading">Hora: <span class="primary--text">{{ viewData.time }}</span></v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>

                    <v-list-tile avatar>
                      <v-list-tile-content>
                        <v-list-tile-sub-title class="subheading">Invitados:</v-list-tile-sub-title>
                        <v-list-tile-sub-title>
                          <ul class="primary--text" v-for="(guest, index) in viewData.guest.split(',')" :key="index">
                            <li class="subheading">{{ guest }}</li>
                          </ul>
                        </v-list-tile-sub-title>
                      </v-list-tile-content>
                    </v-list-tile>
                  </v-list>
                  <v-card-text>
                    <span class="grey--text subheading">Fragmento:</span>
                    <p class="subheading">
                      {{ viewData.fragment }}
                    </p>
                  </v-card-text>
                  <v-card-text>
                    <span class="grey--text subheading">Descripción:</span>
                    <p class="subheading">
                      {{ viewData.description }}
                    </p>
                  </v-card-text>
                  <v-divider></v-divider>
                  <v-list three-line subheader>
                    <v-toolbar flat color="white grey--text">
                      <v-toolbar-items>
                        Creado: {{ viewData.created_at }}
                      </v-toolbar-items>
                      <v-spacer></v-spacer>
                      <v-toolbar-items>
                        Actualizado: {{ viewData.updated_at }}
                      </v-toolbar-items>
                    </v-toolbar>
                  </v-list>
                </v-card>
              </v-dialog>
            </td>
            <td v-else>
              <v-icon
                small
                class="mr-2"
                @click="cancelItem">
                block
              </v-icon>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning" >
            {{ displayErrorSearch }}
          </v-alert>
        </v-data-table>
      </v-card>
    </CustomCard>
  </CustomHeader>
</template>

<script>
import formRulesMixin from '@/mixins/mixin_rules'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'

export default {
  name: 'MyAdvertisements',
  mixins: [
    formRulesMixin
  ],
  components: {
    CustomHeader,
    CustomCard
  },
  data: () => ({
    title: 'Mis publicaciones',
    search: '',
    pagination: {
      descending: true,
      page: 1,
      rowsPerPage: 10,
      sortBy: 'fat',
      totalItems: 0,
      rowsPerPageItems: [10, 20, 40, 80, 100]
    },
    viewData: null,

    dialog: false,
    notifications: false,
    sound: true,
    widgets: false
  }),
  created () {
    this.initHeaders()
  },
  mounted () {
    this.getAllAdvertisements()
  },
  computed: {
    displayErrorSearch () {
      return `Tu busqueda por ${this.search ? this.search : ''} no obtivo resultados.`
    },
    getData () {
      return this.$store.getters.getAdvertisements
    },
    isEditDelete () {
      return !!(this.$store.getters.getEditAdvertisements || this.$store.getters.getDeleteAdvertisements)
    },
    isFeather () {
      return this.$store.getters.getCurrentUser.role_id === 1
    }
  },
  methods: {
    getCurrentURL (path) {
      return `${this.$store.getters.getFeatherUrl}images-advertisements/${path}`
    },
    getAllAdvertisements () {
      this.$store.dispatch('getAdvertisements')
    },
    editItem (item) {
      this.$store.commit('setIdAdvertisements', item)
      this.$store.commit('setEditAdvertisements', true)
      this.$router.push({ name: 'advertisements' })
    },

    deleteItem (item) {
      this.$store.commit('setIdAdvertisements', item)
      this.$store.commit('setDeleteAdvertisements', true)
      this.$router.push({ name: 'advertisements' })
    },
    viewItem (item) {
      this.$data.viewData = item
      // var guest = item.guest.split(',')
      // this.$data.viewData.guest = guest
      // console.log(this.$data.viewData.guest)
    },

    cancelItem () {
      this.$store.commit('setEditAdvertisements', false)
      this.$store.commit('setDeleteAdvertisements', false)
    },
    initHeaders () {
      if (this.isFeather) {
        this.headers = [
          { text: 'Nombre', align: 'left', value: 'name' },
          { text: 'Código', align: 'left', value: 'code' },
          { text: 'Publicado', value: 'published', sortable: false },
          { text: 'Dueño', value: 'department.user.name', sortable: true },
          { text: 'Creado', value: 'created_at' },
          { text: 'Actualizado', value: 'updated_at' },
          { text: 'Actions', sortable: false },
          { text: 'Ver', sortable: false }
        ]
      } else {
        this.headers = [
          { text: 'Nombre', align: 'left', value: 'name' },
          { text: 'Código', align: 'left', value: 'code' },
          { text: 'Publicado', value: 'published', sortable: true },
          { text: 'Creado', value: 'publicationDate', sortable: true },
          { text: 'Actions', sortable: false },
          { text: 'Ver', sortable: false }
        ]
        return this.headers
      }
    }
  }
}
</script>
