<template>
  <CustomCard :title="action ? 'Crear' : 'Editar'" second-title="Lista" show-min>
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
    <v-card v-if="circular_progress">
      <v-layout row wrap align-center justify-center pa-5>
        <v-progress-circular size="45" indeterminate color="primary"></v-progress-circular>
      </v-layout>
    </v-card>
    <!-- Create | Area -->
    <CustomStepper v-show="!circular_progress" v-if="action" :title="title" :stepper="stepper">
      <v-form v-model="valid" slot="step-one" ref="form" lazy-validation>
        <v-text-field
          v-model="data.name"
          label="Nombre"
          :rules="nameRule"
          :counter="nameCounter"
          required>
        </v-text-field>
        <v-text-field
          v-model="data.email"
          label="e-mail"
          :rules="emailRule"
          required
        ></v-text-field>
        <template v-if="isSelectable && isFeather">
          <v-combobox
            v-model="selected"
            label="Pertenece"
            :items="getSelectedData"
            item-value="getSelectada.id"
            item-text="name"
            :rules="requiredRule"
            required>
          </v-combobox>
        </template>
        <v-btn color="primary" depressed :disabled="!valid" @click="verificationSubmit">
          Continuar
        </v-btn>
        <v-btn depressed @click="clear">
          Cancelar
        </v-btn>
      </v-form>
      <v-flex slot="step-two">
        <v-flex>
          <p class="subheading">
            <span class="font-weight-medium">Nombre: </span>{{ this.data.name }}
          </p>
          <p class="subheading">
            <span class="font-weight-medium">Email: </span>{{ this.data.email}}
          </p>
          <p class="subheading" v-if="isSelectable && isFeather">
            <span class="font-weight-medium">Pertenece: </span>{{ this.selected ? this.selected.name : '' }}
          </p>
          <p class="subheading">
            <span class="font-weight-medium">Password: </span>{{ this.pwd }}
          </p>
          <v-btn v-text="action ? 'Crear' : 'Editar'" color="primary" @click="saveData"></v-btn>
          <v-btn flat @click="stepper = 1">
            Cancel
          </v-btn>
        </v-flex>
      </v-flex>
    </CustomStepper>
    <!-- Edit | Area -->
    <v-card v-show="!circular_progress" v-else>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          <!--run edit method-->
          {{ edit }}
          <v-text-field
            v-model="data.name"
            label="Nombre"
            :rules="nameRule"
            :counter="nameCounter"
            required>
          </v-text-field>
          <v-text-field
            v-model="data.email"
            label="e-mail"
            :rules="emailRule"
            required
          ></v-text-field>
          <template v-if="isSelectable && isFeather">
            <v-combobox
              v-model="selected"
              label="Pertenece"
              :items="getSelectedData"
              item-value="getSelectada.id"
              item-text="name"
              :rules="requiredRule"
              required>
            </v-combobox>
          </template>
          <v-btn color="primary" depressed :disabled="!valid" @click="saveData">
            Continuar
          </v-btn>
          <v-btn depressed @click="clear">
            Cancelar
          </v-btn>
        </v-form>
      </v-card-text>
    </v-card>
  </CustomCard>
</template>

<script>
import formRulesMixin from '@/mixins/mixin_rules'
import CustomCard from '@/components/CustomCard'
import CustomStepper from '@/components/CustomStepper'

import { createData, editData, showData } from '@/helper/data_getters'
import { getCommitEdit, getDispatch, getId, passGenerator } from '@/helper/snnipets'

export default {
  name: 'CreateOrEdit',
  mixins: [
    formRulesMixin
  ],
  props: {
    title: {
      type: String,
      default: ''
    },
    action: {
      type: Boolean,
      default: true
    },
    go: {
      type: String,
      required: true
    },
    role: {
      type: String,
      required: true
    },
    belongsTo: {
      type: String,
      required: false
    },
    isSelectable: {
      type: Boolean,
      default: false
    },
    show: {
      type: String,
      required: true
    }
  },
  components: {
    CustomCard,
    CustomStepper
  },
  data: () => ({
    pwd: '',
    data: {
      id: '',
      name: '',
      email: ''
    },
    stepper: 1,
    nameCounter: 50,
    selected: null,

    circular_progress: false,
    snackbar: false,
    snackbar_message: 'Hola!',
    snackbar_color: 'primary'
  }),
  mounted () {
    this.pwd = passGenerator()
    if (this.getSelectedData.length) {
      return null
    } else if (this.isFeather) {
      //! Get data to the selected component
      getDispatch(this.belongsTo)
    }
  },
  computed: {
    getSelectedData () {
      if (this.isFeather && this.isSelectable) {
        switch (this.belongsTo) {
          case 'unions' || 'union':
            return this.$store.getters.getUnions
          case 'groups' || 'group':
            return this.$store.getters.getGroups
          case 'churches' || 'church':
            return this.$store.getters.getChurches
          case 'user' || 'user':
            return this.$store.getters.getUsers
        }
      }
      return []
    },
    /* eslint-disable */
    edit () {
      if (!this.action) {
        showData(this.show, getId(this.go)).then((response) => {
          this.data.id = response.id
          this.data.name = response.name
          this.data.email = response.user.email
          this.data.user_id = response.user.id
          switch (this.belongsTo) {
            case 'unions':
              this.selected = response.union
              break
            case 'groups':
              this.selected = response.group
              break
            case 'churches':
              this.selected = response.church
              break
          }
        })
      }
    },
    isFeather () {
      return this.$store.getters.getCurrentUser.role_id === '1'
    }
  },
  methods: {
    verificationSubmit () {
      if (this.$refs.form.validate()) {
        this.stepper = 2;
      }
    },
    clear () {
      if (this.action) {
        this.pwd = passGenerator();
      }
      else {
        getCommitEdit(this.go, false);
      }
      this.stepper = 1;
      this.$refs.form.reset();
    },
    saveData (){
      this.circular_progress = true
      if (this.action) {
        createData(this.go, {
          'name': this.$data.data.name,
          'email': this.$data.data.email,
          'password': this.$data.pwd,
          'role': this.role,
          'current_user_id': this.$store.getters.getCurrentUser.id,
          'belongs_to_id': this.selected === null ? null : this.selected.id
        }).then((res) => {
          getDispatch(this.go)
          this.clear()
          this.snackbar = true
          this.snackbar_color = 'primary'
          this.snackbar_message = 'Se ha creado correctamente.'
          this.circular_progress = false
        })
      } else {
        editData(this.go, this.$data.data.id, {
          'name': this.$data.data.name,
          'email': this.$data.data.email,
          'user_id': this.$data.data.user_id,
          'current_user_id': this.$store.getters.getCurrentUser.id,
          'belongs_to_id': this.selected === null ? null : this.selected.id
        }).then((res) => {
          getCommitEdit(this.go, false)
          getDispatch(this.go)
          this.clear()
          this.snackbar = true
          this.snackbar_color = 'primary'
          this.snackbar_message = 'Se ha editado correctamente.'
          this.circular_progress = false
        })
      }
    },
  }
}
</script>
