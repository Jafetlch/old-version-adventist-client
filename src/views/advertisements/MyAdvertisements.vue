<template>
  <CustomHeader :title="title">
    <DisplayAdvertisements v-if="isDisplayEnable"/>
    <DeleteAdvertisements v-show="!isDisplayEnable" v-if="this.$store.getters.getDeleteAdvertisements"/>
    <CustomCard v-show="!isDisplayEnable" v-else title="Lista" second-title="Vista">
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
          :pagination.sync="pagination"
          :loading="circular_progress">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.title }}</td>
            <td
              :class="['text-sm-left', {'red--text': props.item.published.toString() === '0'}, {'green--text': props.item.published.toString() === '1'}]">
              {{ props.item.code }}
            </td>
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
                @click="editItem(props.item)">
                edit
              </v-icon>
              <v-icon
                small
                @click="deleteItem(props.item)">
                delete
              </v-icon>
            </td>
            <td v-if="!isEditDelete">
              <v-icon
                small
                @click="viewItem(props.item)">
                visibility
              </v-icon>
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
import DeleteAdvertisements from '@/components/crud/DeleteAdvertisements'
import DisplayAdvertisements from '@/components/crud/DisplayAdvertisements'

export default {
  name: 'MyAdvertisements',
  mixins: [
    formRulesMixin
  ],
  components: {
    CustomHeader,
    CustomCard,
    DeleteAdvertisements,
    DisplayAdvertisements
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

    dialog: false,
    notifications: false,
    sound: true,
    widgets: false,
    circular_progress: false
  }),
  created () {
    this.initHeaders()
  },
  mounted () {
    this.getAllAdvertisements()
  },
  computed: {
    isDisplayEnable () {
      if (this.$store.getters.getDisplayAd) {
        return true
      }
      return false
    },
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
    },
    viewItem (item) {
      this.$store.commit('setDisplayAd', item)
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
