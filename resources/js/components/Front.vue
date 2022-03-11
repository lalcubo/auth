<template>
  <v-app id="inspire">
    <v-app id="inspire">
      <v-navigation-drawer v-model="drawer" app>
        <v-list-item>
          <v-list-item-avatar>
            <v-img src="https://randomuser.me/api/portraits/men/78.jpg"></v-img>
          </v-list-item-avatar>

          <v-list-item-content>
            <v-list-item-title>John Leider</v-list-item-title>
          </v-list-item-content>
        </v-list-item>

        <v-divider></v-divider>

        <v-list dense>
          <v-list-item v-for="item in items" :key="item.title" link>
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>
                <router-link :to="{ name: item.url }">{{
                  item.title
                }}</router-link>
              </v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </v-list>
      </v-navigation-drawer>
      <v-app-bar app color="primary" dark>
        <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
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
    return {
      drawer: false,
      items: [
        { title: "usuarios", icon: "mdi-view-dashboard", url: "users" },
        { title: "About", icon: "mdi-forum", url: "#" },
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
      this.$router.push({ name: "principal" });
    },
    iniciar() {
      this.$router.push("principal");
    },
  },
};
</script>