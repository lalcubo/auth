<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card class="elevation-12" v-if="!$store.state.auth">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Iniciar Sesión</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valido">
            <v-text-field
              v-model="correo"
              :rules="correoRules"
              label="Correo"
              required
            ></v-text-field>

            <v-text-field
              v-model="clave"
              :rules="claveRules"
              :append-icon="mostrarPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrarPass ? 'text' : 'password'"
              label="Clave"
              required
              @click:append="mostrarPass = !mostrarPass"
            ></v-text-field>
          </v-form>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            v-if="!$store.state.auth"
            :disabled="!valido"
            color="primary"
            class="mr-4"
            @click="validar"
          >
            Inicar
          </v-btn>
        </v-card-actions>
        <div align="center">
          <router-link to="/registrar">Crear Cuenta</router-link>
        </div>
        <div align="center">
          <router-link to="/users">listar</router-link>
        </div>
      </v-card>
    </v-row>
    <v-snackbar
      :timeout="2500"
      v-model="snackbar"
      absolute
      color="red accent-2"
      rounded="pill"
      right
    >
      {{ this.mensaje }}
    </v-snackbar>
  </v-container>
</template>
<script>
export default {
  data() {
    return {
      valido: false,
      snackbar: false,
      mensaje: "",
      user: {},
      correo: "admin@admin.com",
      mostrarPass: false,
      clave: "admin123",
      correoRules: [
        (v) => !!v || "Correo es requerido",
        (v) => v.length >= 5 || "El usuario es minimo 5 caracteres",
        (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "correo no valido";
        },
      ],
      claveRules: [
        (v) => !!v || "La clave es requeria",
        (v) => v.length >= 8 || "La clave debe tener minimo 8 caracteres",
      ],
    };
  },
  methods: {
    logout() {
      this.$store.dispatch("logout");
    },
    validar() {
      var datos = {
        email: this.correo,
        password: this.clave,
      };
      this.$store.dispatch("login", datos).catch((er) => {
        this.mensaje = "Correo o contraseña incorrecta";
        this.snackbar = true;
      });

      this.$refs.form.validate();
    },
  },
};
</script>