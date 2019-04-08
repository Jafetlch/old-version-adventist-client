<template>
  <CustomCard :title="action ? 'Crear' : 'Editar'" second-title="Lista" show-min>
    <CustomStepper v-if="action" :title="title" :stepper="stepper" :show-second-stepper="false">
      <v-form v-model="valid" slot="step-one" ref="form" lazy-validation>
        <v-text-field
          v-model="data.name"
          label="Nombre"
          :rules="nameRule"
          :counter="nameCounter"
          required>
        </v-text-field>
        <template v-if="isFeather">
          <v-radio-group v-model="selectRadio" row class="">
            <v-radio label="Uniones" value="unions"></v-radio>
            <v-radio label="Grupos" value="groups"></v-radio>
            <v-radio label="Iglesias" value="churches"></v-radio>
          </v-radio-group>
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
    </CustomStepper>
    <v-card v-else>
      <v-card-text>
        <v-form v-model="valid" ref="form" lazy-validation>
          {{ edit }}
          <v-text-field
            v-model="data.name"
            label="Nombre"
            :rules="nameRule"
            :counter="nameCounter"
            required>
          </v-text-field>
          <template v-if="isFeather">
            <v-radio-group v-model="selectRadio" row class="">
              <v-radio label="Uniones" value="unions"></v-radio>
              <v-radio label="Grupos" value="groups"></v-radio>
              <v-radio label="Iglesias" value="churches"></v-radio>
            </v-radio-group>
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
      </v-card-text>
    </v-card>
  </CustomCard>
</template>

<script>
import formRulesMixin from '@/mixins/mixin_rules'
import CustomCard from '@/components/CustomCard'
import CustomStepper from '@/components/CustomStepper'

import { createData, editData, showData } from '@/helper/data_getters'
import { getCommitEdit, getDispatch, getId } from '@/helper/snnipets'

export default {
  name: 'CreatEditDepartment',
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
    stepper: 1,
    data: {
      id: '',
      name: ''
    },
    nameCounter: 50,
    selected: null,
    selectRadio: 'unions'
  }),
  mounted () {
    if (this.getSelectedData.length) {
      return null
    } else if (this.isFeather) {
      this.$store.dispatch('getDataUnions')
      this.$store.dispatch('getDataGroups')
      this.$store.dispatch('getDataChurches')
    }
  },
  computed: {
    getSelectedData () {
      if (this.isFeather) {
        switch (this.selectRadio) {
          case 'unions':
            return this.$store.getters.getUnions
          case 'groups':
            return this.$store.getters.getGroups
          case 'churches':
            return this.$store.getters.getChurches
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
      return this.$store.getters.getCurrentUser.role_id === 1
    }
  },
  methods: {
    verificationSubmit () {
      if (this.$refs.form.validate()) {
        if (this.action) {
          createData(this.go, {
            'name': this.$data.data.name,
            'current_user_id': this.$store.getters.currentUser.id,
            'user_id': this.selected === null ? null : this.selected
          }).then((res) => {
            getDispatch(this.$store, this.go)
            this.clear()
          })
        } else {
          editData(this.go, this.$data.data.id, {
            'name': this.$data.data.name,
            'current_user_id': this.$store.getters.currentUser.id,
            'user_id': this.selected === null ? null : this.selected
          }).then((res) => {
            getCommitEdit(this.$store, this.go, false)
            getDispatch(this.$store, this.go)
            this.clear()
          })
        }
      }
    },
    clear () {
      getCommitEdit(this.go, false)
      this.stepper = 1
      this.$refs.form.reset()
      this.selectRadio = 'unions'
    }
  }
}
</script>
