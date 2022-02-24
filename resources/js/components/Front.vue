<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app v-if="getShowMenu">
        <Menu :menus="menu"></Menu>
      </v-navigation-drawer>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon
          v-if="getShowMenu"
          @click.stop="drawer = !drawer"
        ></v-app-bar-nav-icon>
        <v-toolbar-title>OPT</v-toolbar-title>
        <v-row v-if="$store.state.auth">
          <v-col class="text-right" @click="logout">
            {{ $store.state.user.name }} <v-btn text small>Cerrar</v-btn>
          </v-col>
        </v-row>
        <v-row v-if="!$store.state.auth">
          <v-col class="text-right" @click="iniciar">
            <v-btn text small>Iniciar sesión</v-btn>
          </v-col>
        </v-row>
      </v-app-bar>
      <v-main>
        <router-view></router-view>
      </v-main>
      <v-footer color="primary" app>
        <span class="white--text">&copy; 2022</span>
      </v-footer>
    </v-app>
  </v-app>
</template>
<script>
export default {
  data() {
    return {};
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    iniciar() {
      this.$router.push("principal");
    },
  },
};
</script>