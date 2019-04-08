<template>
  <v-container>
    <section>
      <h1 class="display-1 primary--text mb-3">
        {{ title }}
      </h1>
    </section>
    <Delete
      v-if="this.$store.getters.getDeleteDepartments"
      title="Eliminar"
      go="departments"
      show="department">
    </Delete>
    <template v-else>
      <!-- Edit  -->
      <CreateEdit
        v-if="this.$store.getters.getEditDepartments"
        :title="title"
        :action="!this.$store.getters.getEditDepartments"
        go="departments"
        show="department">
      </CreateEdit>
      <!-- Create -->
      <CreateEdit
        v-else
        :title="title"
        go="departments"
        show="department">
      </CreateEdit>
      <!-- List -->
      <v-card>
        <v-card-title primary-title>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            label="Busqueda"
            prepend-icon="search"
            clearable
          ></v-text-field>
        </v-card-title>
        <v-data-table
          :headers="headers"
          :items="getData"
          :search="search">
          <template slot="items" slot-scope="props">
            <td>{{ props.item.name }}</td>
            <template v-if="isFeather">
              <td class="text-sm-left">{{ props.item.user.name }}</td>
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
            <td v-else>
              <v-icon
                small
                class="mr-2">
                block
              </v-icon>
            </td>
          </template>
          <v-alert slot="no-results" :value="true" color="error" icon="warning" >{{ displayErrorSearch }}</v-alert>
        </v-data-table>
      </v-card>
    </template>
  </v-container>
</template>

<script>
import featherMixing from '@/mixins/mixin_feather'
import Delete from '@/components/crud/Delete'
import CreateEdit from '@/components/crud/CreateEditDepartment'
import { getDataFrom } from '@/helper/snnipets'

export default {
  name: 'DepartmentMain',
  components: {
    Delete,
    CreateEdit
  },
  data: () => ({
    title: 'Departamentos',
    search: '',
    headers: []
  }),
  mixins: [ featherMixing ],
  created () {
    this.initHeaders()
  },
  mounted () {
    if (this.getData.length) {
      return
    }
    getDataFrom(this.$store.getters.getCurrentUser.role_id, 'getDataDepartments', 'getDataDepartmentsWithParams')
  },
  computed: {
    displayErrorSearch () {
      return `Tu busqueda por ${this.search ? this.search : ''} no obtivo resultados.`
    },
    getData () {
      return this.$store.getters.getDepartments
    },
    isEditDelete () {
      return !!(this.$store.getters.getEditDepartments || this.$store.getters.getDeleteDepartments)
    }
  },
  methods: {
    initHeaders () {
      if (this.isFeather) {
        this.headers = [
          { text: 'Nombre', align: 'left', value: 'name' },
          { text: 'Pertenece', value: 'union' },
          { text: 'Creado', value: 'created_at' },
          { text: 'Actualizado', value: 'updated_at' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
        return this.headers
      } else {
        this.headers = [
          { text: 'Nombre', align: 'left', value: 'name' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
        return this.headers
      }
    },
    editItem (id) {
      this.$store.commit('setIdDepartments', id)
      this.$store.commit('setEditDepartments', true)
    },
    deleteItem (id) {
      this.$store.commit('setIdDepartments', id)
      this.$store.commit('setDeleteDepartments', true)
    }
  }
}
</script>
