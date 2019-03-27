<template>
  <v-container xs12>
    <v-flex xs12 sm6 offset-sx1 offset-sm3>
      <v-card flat v-show="!loading">
        <v-img
          contain
          height="auto"
          :src="require(`@/assets/images/login_banner.png`)"
          :lazy-src="require(`@/assets/images/login_banner.png`)">
        </v-img>
        <v-card-title primary-title>
          Login
        </v-card-title>
        <v-card-text>
          <v-content>
            <v-form>
              <v-text-field
                label="e-mail"
                v-model="form.email"
                :rules="emailRule"
                clearable
                required
                @keyup.enter="authenticate"
              ></v-text-field>
              <v-text-field
                label="password"
                v-model="form.pdw"
                :append-icon="showPwd ? 'visibility_off' : 'visibility'"
                :rules="requiredRule"
                :type="showPwd ? 'text' : 'password'"
                @click:append="showPwd = !showPwd"
                clearable
                required
                @keyup.enter="authenticate"
              ></v-text-field>
              <v-content class="text-xs-center align-center">
                <v-btn color="primary" flat :depressed="!valid" @click="authenticate">
                  Sing In
                </v-btn>
              </v-content>
            </v-form>
          </v-content>
        </v-card-text>
      </v-card>
      <v-layout
        v-show="loading"
        align-center
        justify-center
        ma-0>
        <v-progress-circular
          :size="50"
          :width="5"
          height="250px"
          indeterminate
          color="primary">
        </v-progress-circular>
      </v-layout>
    </v-flex>
    <v-snackbar
      v-model="snackbar"
      color="error"
      :timeout="5000"
      top>
      Datos incorrectos
      <v-btn dark flat color="white" @click.native="snackbar = false">Close</v-btn>
    </v-snackbar>
  </v-container>
</template>

<script>
import { login } from '@/helper/auth'
import { credentials } from '@/helper/passport'
import formRulesMixin from '@/mixins/mixin_rules'

export default {
  name: 'Login',
  mixins: [ formRulesMixin ],
  data: () => ({
    form: {
      email: 'f@f.com',
      pdw: 'secret'
    },
    loading: false,
    showPwd: false,
    snackbar: false
  }),
  methods: {
    authenticate () {
      this.loading = !this.loading
      login(
        credentials(this.form.email, this.form.pdw)
      ).then((response) => {
        this.loading = !this.loading
        this.$store.commit('setLoginSuccess', response)
        this.$router.push({ name: 'dashboard' })
      }).catch((error) => {
        this.loading = !this.loading
        this.snackbar = true
        console.log(error)
      })
    }
  }
}
</script>
