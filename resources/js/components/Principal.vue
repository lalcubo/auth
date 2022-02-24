<template>
  <v-card class="mx-auto my-auto" max-width="700">
    <v-form ref="form" v-model="valido">
      <v-container>
        <v-row>
          <v-col cols="12" md="6">
            <v-text-field
              v-model="usuario"
              :rules="usuarioRules"
              label="Usuario"
              required
            ></v-text-field>
          </v-col>

          <v-col cols="12" md="6">
            <v-text-field
              v-model="clave"
              :rules="claveRules"
              :append-icon="mostrarPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrarPass ? 'text' : 'password'"
              label="Clave"
              required
              @click:append="mostrarPass = !mostrarPass"
            ></v-text-field>
          </v-col>
        </v-row>
        <v-btn
          v-if="!user.name"
          :disabled="!valido"
          color="primary"
          class="mr-4"
          @click="validar"
        >
          Inicar
        </v-btn>
        <v-btn v-if="user.name" color="primary" @click="me">logout</v-btn>
        <br />
        <router-link to="/registrar">Crear Cuenta</router-link>
      </v-container>
    </v-form>
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
  </v-card>
</template>
<script>
import axios from "axios";
axios.defaults.withCredentials = true;
export default {
  data() {
    return {
      valido: false,
      snackbar: false,
      mensaje: "",
      user: {},
      usuario: "kenny@gmail.com",
      mostrarPass: false,
      clave: "12345678",
      usuarioRules: [
        (v) => !!v || "Usuario es requerido",
        (v) => v.length >= 5 || "El usuario es minimo 5 caracteres",
      ],
      claveRules: [
        (v) => !!v || "E-mail is required",
        (v) => v.length >= 6 || "La clave debe tener minimo 6 caracteres",
      ],
    };
  },
  methods: {
    me() {
      /* axios.post("api/user").then((res) => {
        this.user = res.data;
      }); */
      axios.post("logout").then((res) => {
        this.user = {};
      });
    },
    validar() {
      var datos = {
        email: this.usuario,
        password: this.clave,
      };
      axios.get("./sanctum/csrf-cookie").then(() => {
        axios
          .post("./login", datos)
          .then((res) => {
            this.user = res.data;
          })
          .catch((er) => {
            this.mensaje = "Usuario o contraseña incorrecta";
            this.snackbar = true;
          });
      });

      //this.$refs.form.validate();
    },
  },
};
</script>