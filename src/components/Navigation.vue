<template>
  <nav>
    <v-toolbar color="white" height="64" app flat clipped-left>
      <v-toolbar-side-icon @click="drawer = !drawer"></v-toolbar-side-icon>
      <v-toolbar-title><span class="font-weight-light">Adventist</span>News</v-toolbar-title>
      <v-spacer></v-spacer>
      <span class="mr-4 hidden-xs-only">{{ this.$store.getters.getCurrentUser.name }}</span>
      <v-icon
        class="black--text"
        size="20"
        @click="logout">
        logout
      </v-icon>
    </v-toolbar>

    <v-navigation-drawer app clipped v-model="drawer" class="secondary">
      <v-list v-for="(item, index) in items" :key="index">
        <v-toolbar flat>
          <v-list class="secondary">
            <v-list-tile class="pl-3 pt-4">
              <v-list-tile-title class="mb-2 text--primary font-weight-regular text-uppercase">
                {{item.header}}
              </v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-toolbar>
        <v-list dense>
          <template v-for="(content, i) in item.content">
            <div :key="i" v-show="content.show">
              <v-list-tile color="accent" router :to="content.route">
                <v-list-tile-action class="pl-3">
                  <v-icon color="accent">{{ content.icon }}</v-icon>
                </v-list-tile-action>
                <v-list-tile-content>
                  <v-list-tile-title>{{ content.text }}</v-list-tile-title>
                </v-list-tile-content>
              </v-list-tile>
            </div>
          </template>
        </v-list>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
import currentUserMixing from '@/mixins/mixin_current_user'
import { menuItems } from '@/helper/menu_items'

export default {
  name: 'Top_Navigation',
  mixins: [ currentUserMixing ],
  data: () => ({
    drawer: null,
    items: []
  }),
  created () {
    this.initItems()
  },
  methods: {
    initItems () {
      this.items = menuItems(this.currentUserRoleId)
      return this.items
    },
    logout () {
      this.$store.dispatch('logout')
      this.$router.push({ name: 'login' })
      location.reload()
    }
  }
}
</script>
