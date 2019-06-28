<template>
  <CustomHeader :title="title" second-title="Comentarios">
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
    <CustomCard title="Usuario" :showMin="false">
      <v-card flat v-if="circular_progress">
        <v-layout row wrap align-center justify-center pa-5>
          <v-progress-circular size="45" indeterminate color="primary"></v-progress-circular>
        </v-layout>
      </v-card>
      <v-card flat v-else>
        <v-layout row wrap>
          <v-flex xs12>
            <v-card-text>
              <span class="headers primary--text">* Importante</span>
              <v-spacer></v-spacer>
              <span>Para poder cambiar el nombre de usuario se requiere hablar con el <em>superior</em> de esta cuenta.</span>
            </v-card-text>
          </v-flex>
           <!-- // ! se a ocultado poder cambiar de nombre de usuario por medidas de seguridad y orden -->
          <v-flex xs12 md6 xl4 v-if="false">
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
                  :append-icon="showPwdUsername ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwdUsername ? 'text' : 'password'"
                  @click:append="showPwdUsername = !showPwdUsername"
                  @keyup.enter="authenticate"
                  clearable
                  required
                ></v-text-field>
                <v-btn color="primary" @click="saveUsarname">
                  Guardar
                </v-btn>
                <v-btn flat @click="cancel('username')">
                  Cancel
                </v-btn>
              </v-form>
            </v-card-text>
          </v-flex>
          <v-flex xs12 md6 xl4>
            <v-card-text>
              <v-form v-model="valid" ref="formEmail" lazy-validation>
                <span class="subheading">Cambiar correo <span class="caption primary--text">(Beta)</span></span>
                <v-text-field
                  disabled
                  v-model="dataForm.email"
                  label="E-mail"
                  :rules="nameRule"
                  :counter="counter.name"
                  required>
                </v-text-field>
                <v-text-field
                  disabled
                  label="password"
                  v-model="dataForm.emailPwd"
                  :append-icon="showPwdEmail ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwdEmail ? 'text' : 'password'"
                  @click:append="showPwdEmail = !showPwdEmail"
                  clearable
                  required
                  @keyup.enter="authenticate"
                ></v-text-field>
              </v-form>
              <v-btn disabled color="primary" @click="saveEmail">
                Guardar
              </v-btn>
              <v-btn disabled flat @click="cancel('email')">
                Cancel
              </v-btn>
            </v-card-text>
          </v-flex>
          <v-flex xs12 md6 xl4>
            <v-card-text>
              <v-form v-model="valid" ref="formPwd" lazy-validation>
                <span class="subheading">Cambiar contraseña</span>
                <v-text-field
                  label="Contraseña actual"
                  v-model="dataForm.pwdOld"
                  :append-icon="showPwdOld ? 'visibility_off' : 'visibility'"
                  :rules="requiredRule"
                  :type="showPwdOld ? 'text' : 'password'"
                  @click:append="showPwdOld = !showPwdOld"
                  clearable
                  required
                ></v-text-field>
                <v-text-field
                  label="Contraseña nueva"
                  v-model="dataForm.pwdNew"
                  :append-icon="showPwdNew ? 'visibility_off' : 'visibility'"
                  :rules="pwdRule"
                  :type="showPwdNew ? 'text' : 'password'"
                  @click:append="showPwdNew = !showPwdNew"
                  clearable
                  required
                ></v-text-field>
                <v-text-field
                  v-show="dataForm.pwdNew && dataForm.pwdOld"
                  label="Verificar Contraseña"
                  v-model="dataForm.pdwCompare"
                  :append-icon="showPwdCompare ? 'visibility_off' : 'visibility'"
                  :rules="pwdRule"
                  :type="showPwdCompare ? 'text' : 'password'"
                  @click:append="showPwdCompare = !showPwdCompare"
                  clearable
                  required
                  @keyup.enter="authenticate"
                ></v-text-field>
                <v-btn :disabled="pwdBtnDisable" color="primary" @click="savePassword">
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
    <v-card flat>
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
        <v-layout row wrap my-3>
          <v-flex xs12>
            <span>Todos los comentarios o dudas son bienvenidas.</span>
            <v-spacer></v-spacer>
            <span class="caption grey--text">Atentamente el administrados.</span>
          </v-flex>
        </v-layout>
        <v-layout v-if="circular_progress_comment" row wrap align-center justify-center pa-5>
          <v-progress-circular size="45" indeterminate color="success"></v-progress-circular>
        </v-layout>
        <v-layout v-else row wrap>
          <v-flex xs12>
            <vue-editor v-model="content"></vue-editor>
            <v-btn :disabled="!this.content" block color="success" @click="saveComment">Enviar</v-btn>
          </v-flex>
        </v-layout>
      </v-card-text>
      <v-flex xs12>
          <v-card-text>
            <v-layout row justify-end align-end>
              <span class="grey--text">{{ this.$store.getters.getCurrentVersion }}</span>
            </v-layout>
          </v-card-text>
      </v-flex>
    </v-card>
  </CustomHeader>
</template>

<script>
import { getData, createDataV2 } from '@/helper/data_getters'

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
      pwdNew: '',
      pdwCompare: ''
    },
    dataComment: null,
    content: '',

    showPwdEmail: false,
    showPwdOld: false,
    showPwdNew: false,
    showPwdCompare: false,

    snackbar: false,
    snackbar_message: 'Hola!',
    snackbar_color: 'primary',
    circular_progress: false,
    circular_progress_comment: false
  }),
  created () {
    this.initHeaders()
  },
  mounted () {
    this.getData()
  },
  computed: {
    pwdBtnDisable () {
      if (this.dataForm.pwdNew === this.dataForm.pdwCompare && !!this.dataForm.pdwCompare) {
        return false
      }
      return true
    }
  },
  methods: {
    getData () {
      if (this.$store.getters.getCurrentUser.role_id.toString() === '1') { //* on beta
        getData('comments/list').then(response => {
          // console.log(res)
          this.dataComment = response
          return response
        })
      } else {
        return null
      }
    },
    saveUsarname () {
      this.circular_progress = true
      createDataV2('settings/change/username', {
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
    },
    saveEmail () {
      this.circular_progress = true
      createDataV2('settings/change/email', {
        'email': this.dataForm.email,
        'pwd': this.dataForm.emailPwd
      }).then(res => {
        if (res === true) {
          this.snackbar = true
          this.snackbar_message = 'Se ha cambiado el nombre el correo exitosamente!'
          this.cancel('email')
        } else {
          this.snackbar = true
          this.snackbar_message = 'La contraseña no es la indicada.'
        }
      })
    },
    savePassword () {
      this.circular_progress = true
      createDataV2('settings/change/password', {
        'pwd_old': this.dataForm.pwdOld,
        'pwd_new': this.dataForm.pwdNew
      }).then(response => {
        this.snackbar = true
        if (response.data.response === true) {
          this.snackbar_color = 'success'
          this.snackbar_message = 'Se ha cambiado la contraseña exitosamente!'
          this.circular_progress = false
        } else {
          this.snackbar_color = 'warning'
          this.snackbar_message = 'La contraseña no es la indicada.'
          this.circular_progress = false
        }
        this.dataForm.pwdOld = ''
        this.dataForm.pwdNew = ''
        this.dataForm.pdwCompare = ''
        // this.snackbar = true
        // this.snackbar_color = 'success'
        // this.snackbar_message = 'Se ha cambiado la contraseña exitosamente!'
        // this.cancel('pwd')
        // this.circular_progress = false
      })
      // .catch(() => {
      //   this.snackbar = true
      //   this.snackbar_color = 'warning'
      //   this.snackbar_message = 'La contraseña no es la indicada.'
      //   this.circular_progress = false
      // })
    },
    saveComment () {
      this.circular_progress_comment = true
      createDataV2('comments/store', {
        'comment': this.content
      }).then(res => {
        this.snackbar = true
        this.snackbar_color = 'success'
        this.snackbar_message = 'Gracias su comentario, será revisado!'
        this.content = ''
        this.circular_progress_comment = false
      }).catch(() => {
        this.snackbar = true
        this.snackbar_color = 'warning'
        this.snackbar_message = 'Hubó un error, lo lamentamos.'
        this.circular_progress_comment = false
      })
    },
    cancel (type) {
      if (type === 'username') {
        this.$refs.formUsername.reset()
      } else if (type === 'email') {
        this.$refs.formEmail.reset()
      } else if (type === 'pwd') {
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
