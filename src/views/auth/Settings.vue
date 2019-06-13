<template>
  <CustomHeader :title="title" second-title="Comentarios">
    <CustomCard title="Usuario" :showMin="false">
      <v-card >
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <p>Message</p>
            </v-card-text>
          </v-flex>
          <v-flex xs12 md8 lg6>
            <v-card-text>
              <v-form v-model="valid" ref="formUsername" lazy-validation>
                <span class="subheading">Cambiar nombre de usuario</span>
                <v-text-field
                  v-model="dataForm.name"
                  label="Nuevo nombre de usuario"
                  :rules="nameRule"
                  :counter="counter.name"
                  required>
                </v-text-field>
                <v-text-field
                  label="Verificar contraseña"
                  v-model="dataForm.usernamePwd"
                  :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwd ? 'text' : 'password'"
                  @click:append="showPwd = !showPwd"
                  @keyup.enter="authenticate"
                  clearable
                  required
                ></v-text-field>
                <v-btn color="primary" @click="saveData('username')">
                  Guardar
                </v-btn>
                <v-btn flat @click="cancel('username')">
                  Cancel
                </v-btn>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
        <v-layout row wrap>
          <v-flex xs12 md8 lg6>
            <v-card-text>
              <v-form v-model="valid" ref="formEmail" lazy-validation>
                <span class="subheading">Cambiar correo <span class="caption primary--text">(Beta)</span></span>
                <v-text-field
                  disabled
                  v-model="dataForm.email"
                  label="Nombre"
                  :rules="nameRule"
                  :counter="counter.name"
                  required>
                </v-text-field>
                <v-text-field
                  disabled
                  label="password"
                  v-model="dataForm.emailPwd"
                  :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwd ? 'text' : 'password'"
                  @click:append="showPwd = !showPwd"
                  clearable
                  required
                  @keyup.enter="authenticate"
                ></v-text-field>
              </v-form>
              <v-btn disabled color="primary" @click="saveData('email')">
                Guardar
              </v-btn>
              <v-btn disabled flat @click="cancel('email')">
                Cancel
              </v-btn>
            </v-card-text>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>

        <v-layout row wrap>
          <v-flex xs12 md8 lg6>
            <v-card-text>
              <v-form v-model="valid" ref="formPwd" lazy-validation>
                <span class="subheading">Cambiar correo</span>
                <v-text-field
                  label="Vieja Contraseña"
                  v-model="dataForm.oldPwd"
                  :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwd ? 'text' : 'password'"
                  @click:append="showPwd = !showPwd"
                  clearable
                  required
                  @keyup.enter="authenticate"
                ></v-text-field>
                <v-text-field
                  label="Contraseña nueva"
                  v-model="dataForm.pdwNew"
                  :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwd ? 'text' : 'password'"
                  @click:append="showPwd = !showPwd"
                  clearable
                  required
                  @keyup.enter="authenticate"
                ></v-text-field>
                <v-text-field
                  label="Verificar Contraseña"
                  v-model="dataForm.pdwCompare"
                  :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwd ? 'text' : 'password'"
                  @click:append="showPwd = !showPwd"
                  clearable
                  required
                  @keyup.enter="authenticate"
                ></v-text-field>
                <v-btn color="primary" @click="saveData('pwd')">
                  Guardar
                </v-btn>
                <v-btn flat @click="cancel('pwd')">
                  Cancel
                </v-btn>
              </v-form>
            </v-card-text>
          </v-flex>
        </v-layout>
      </v-card>
    </CustomCard>
   <v-card>
     <!-- //* On Beta -->
      <v-card-text v-if="this.$store.getters.getCurrentUser.role_id.toString() === '1'">
        <span class="title">Comentarios:</span>
        <v-expansion-panel>
          <v-expansion-panel-content
            v-for="(item,i) in dataComment"
            :key="i">
            <template v-slot:header>
              <div>#{{ i }} - {{ item.created_at }}</div>
            </template>
          <v-card-text v-html="item.comment"></v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
      </v-card-text>
      <v-divider></v-divider>
      <!-- //* On Beta -->
      <v-card-text v-if="this.$store.getters.getCurrentUser.role_id.toString() !== '1'">
        <vue-editor v-model="content"></vue-editor>
        <v-flex xs12>
          <v-btn block color="success" @click="saveData('comment')">Enviar</v-btn>
        </v-flex>
      </v-card-text>
    </v-card>
    <v-snackbar
      v-model="snackbar"
      color="error"
      :timeout="5000"
      top>
      {{ snackbarMessage }}
      <v-btn dark flat color="white" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </CustomHeader>
</template>

<script>
import { getData, createData } from '@/helper/data_getters'

import formRulesMixin from '@/mixins/mixin_rules'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'

import { VueEditor } from 'vue2-editor'
// import tinymce from 'vue-tinymce-editor'

export default {
  name: 'Settings',
  mixins: [
    formRulesMixin
  ],
  components: {
    CustomHeader,
    CustomCard,
    VueEditor
  },
  data: () => ({
    title: 'Settings',
    search: '',
    headers: [],
    counter: {
      name: 100
    },
    dataForm: {
      name: '',
      email: '',
      usernamePwd: '',
      emailPwd: '',
      pwdOld: '',
      pdwNew: '',
      pdwCompare: ''
    },
    dataComment: null,
    content: '',
    // options: {
    //   // language_url: esLang
    // },
    editorOption: {},
    showPwd: false,
    snackbar: false,
    snackbarMessage: 'null'
  }),
  created () {
    this.initHeaders()
  },
  mounted () {
    this.getData()
  },
  methods: {
    getData () {
      if (this.$store.getters.getCurrentUser.role_id.toString() === '1') { //* on beta
        getData('beta/comments').then(res => {
          // console.log(res)
          this.dataComment = res
          return res
        })
      } else {
        getData('beta/comments/user').then(res => {
          // console.log(res.data)
          this.dataComment = res
          return res
        })
      }
    },
    saveData (type) {
      if (type === 'username') {
        createData('user/change/username', {
          'name': this.dataForm.name,
          'pwd': this.dataForm.usernamePwd
        }).then(res => {
          if (res === true) {
            this.snackbar = true
            this.snackbarMessage = 'Se ha cambiado el nombre de usuario exitosamente!'
            this.cancel('username')
          } else {
            this.snackbar = true
            this.snackbarMessage = 'La contraseña no es la indicada.'
          }
        })
      } else if (type === 'email') {
        createData('user/change/email', {
          'email': this.dataForm.email,
          'pwd': this.dataForm.emailPwd
        }).then(res => {
          if (res === true) {
            this.snackbar = true
            this.snackbarMessage = 'Se ha cambiado el nombre el correo exitosamente!'
            this.cancel('email')
          } else {
            this.snackbar = true
            this.snackbarMessage = 'La contraseña no es la indicada.'
          }
        })
      } else if (type === 'comment') {
        createData('beta/comments/', {
          'comment': this.content
        }).then(res => {
          if (res === true) {
            this.snackbar = true
            this.snackbarMessage = 'Gracias su comentario será revisado!'
            this.content = ''
          } else {
            this.snackbar = true
            this.snackbarMessage = 'Hubó un error, lo lamentamos.'
          }
        })
      } else if (type === 'pwd') {
        createData('user/change/password', {
          'pwd_old': this.dataForm.pwdOld,
          'pwd_new': this.dataForm.pdwNew
        }).then(res => {
          if (res === true) {
            this.snackbar = true
            this.snackbarMessage = 'Se ha cambiado la contraseña exitosamente!'
            this.cancel('pwd')
          } else {
            this.snackbar = true
            this.snackbarMessage = 'La contraseña no es la indicada.'
          }
        })
      }
    },
    cancel (type) {
      if (type === 'username') {
        this.$refs.formUsername.reset()
      } else if (type === 'email') {
        this.$refs.formEmail.reset()
      } else {
        this.$refs.formPwd.reset()
      }
    },
    initHeaders () {
      if (this.isFeather) {
        this.headers = [
          { text: 'Comment', align: 'left', value: 'comment' }, // sortable: false,
          // { text: 'Email', value: 'email', sortable: false },
          // { text: 'Pertenece', value: 'union' },
          // { text: 'Creado', value: 'created_at' },
          // { text: 'Actualizado', value: 'updated_at' },
          { text: 'Actions', value: 'name', sortable: false }
        ]
        return this.headers
      } else {
        this.headers = [
          { text: 'Comment', align: 'left', value: 'comment' },
          // { text: 'Email', value: 'email', sortable: false },
          { text: 'Actions', value: 'name', sortable: false }
        ]
        return this.headers
      }
    }
  }
}
</script>
