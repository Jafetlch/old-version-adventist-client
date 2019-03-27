<template>
  <v-app class="bg">
    <!-- TODO -->
    <template v-if="!currentUser">
      <router-view></router-view>
    </template>
    <template v-else>
      <Navigation/>
      <v-content>
        <router-view></router-view>
      </v-content>
    </template>
    <v-footer color="white" class="grey--text">
      <v-spacer></v-spacer>
      <span>&copy; 2019  &nbsp;</span>
      <a href="https://f34th3r.io" style="text-decoration: none" target="_blank" class="grey--text">
        <span>F34th3R.io &nbsp; &nbsp;</span>
      </a>
    </v-footer>
  </v-app>
</template>

<script>
import currentUserMixing from '@/mixins/mixin_current_user'
import { consoleHelloMessage } from '@/helper/console_message.js'

import Navigation from '@/components/Navigation'

export default {
  name: 'App',
  mixins: [ currentUserMixing ],
  components: {
    Navigation
  },
  created () {
    consoleHelloMessage()
  }
}
</script>
