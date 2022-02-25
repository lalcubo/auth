<template>
  <v-container class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card class="elevation-12">
        <v-toolbar color="primary" dark flat>
          <v-toolbar-title>Registrar Usuario</v-toolbar-title>
          <v-spacer></v-spacer>
        </v-toolbar>
        <v-card-text>
          <v-form ref="form" v-model="valido">
            <v-text-field
              v-model="nombre"
              :rules="nombreRules"
              label="Nombre"
              required
            ></v-text-field>

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

            <v-text-field
              v-model="clave2"
              :rules="claveRules"
              :append-icon="mostrarPass ? 'mdi-eye' : 'mdi-eye-off'"
              :type="mostrarPass ? 'text' : 'password'"
              label="repita la clave"
              required
              @click:append="mostrarPass = !mostrarPass"
            ></v-text-field>

            <v-select :items="tipo" label="Standard" dense> </v-select>
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
            Registrar
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-row>
    <v-snackbar
      :timeout="2500"
      v-model="snackbar"
      absolute
      :color="color"
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
      tipo: ["Admin", "Usuario"],
      mensaje: "",
      user: {},
      nombre: "Pedro",
      correo: "algo@algo.com",
      mostrarPass: false,
      clave: "12345678",
      clave2: "12345678",
      correoRules: [
        (v) => !!v || "Usuario es requerido",
        (v) => v.length >= 5 || "El usuario es minimo 5 caracteres",
        (v) => {
          const pattern =
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
          return pattern.test(v) || "correo no valido";
        },
      ],
      nombreRules: [
        (v) => !!v || "Usuario es requerido",
        (v) => v.length >= 3 || "El usuario es minimo 3 caracteres",
      ],
      claveRules: [
        (v) => !!v || "E-mail is required",
        (v) => v.length >= 6 || "La clave debe tener minimo 6 caracteres",
      ],
    };
  },
  methods: {
    validar() {
      var datos = {
        name: this.nombre,
        email: this.correo,
        password: this.clave,
        Password_confirmation: this.clave2,
        //tipo: this.tipo,
      };
      if (this.clave === this.clave2) {
        axios
          .post("./registrar", datos)
          .then((res) => {
            this.color = "success";
            this.mensaje = res.data.message;
            this.snackbar = true;
            window.location.reload();
          })
          .catch((er) => {
            this.color = "red accent-2";
            this.mensaje = "El correo ya existe";
            this.snackbar = true;
          });
      } else {
        this.color = "red accent-2";
        this.mensaje = "La clave deben ser iguales";
        this.snackbar = true;
      }

      this.$refs.form.validate();
    },
  },
};
</script>