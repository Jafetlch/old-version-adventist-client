<template>
  <CustomHeader :title="title">
    <CustomCard title="Usuario">
      <v-card >
        <v-layout row wrap>
          <v-flex xs12 md8 lg6>
            <v-card-text>
              <v-form v-model="valid" ref="formUsername" lazy-validation>
                <span class="subheading">Cambiar nombre de usuario</span>
                <v-text-field
                  v-model="dataForm.name"
                  label="Nombre"
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
    <CustomCard title="Beta">
      <v-card>
        <v-card-text>
        </v-card-text>
      </v-card>
    </CustomCard>
  </CustomHeader>
</template>

<script>
import formRulesMixin from '@/mixins/mixin_rules'
import CustomHeader from '@/components/CustomHeader'
import CustomCard from '@/components/CustomCard'

export default {
  name: 'Settings',
  mixins: [
    formRulesMixin
  ],
  components: {
    CustomHeader,
    CustomCard
  },
  data: () => ({
    title: 'Settings',
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
    showPwd: false
  }),
  methods: {
    saveData (type) {
      if (type === 'username') {
        //
      } else if (type === 'email') {
        //
      } else {
        //
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
    }
  }
}
</script>
