<template>
  <v-card class="mx-auto" max-width="600">
    <v-form v-model="valido">
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
          :disabled="!valido"
          color="primary"
          class="mr-4"
          @click="validar"
        >
          Inicar
        </v-btn>
        <br />
        <router-link to="/registrar">Crear Cuenta</router-link>
      </v-container>
    </v-form>
  </v-card>
</template>
<script>
export default {
  data: () => ({
    valido: false,
    usuario: "",
    mostrarPass: false,
    clave: "",
    usuarioRules: [
      (v) => !!v || "Usuario es requerido",
      (v) => v.length >= 5 || "El usuario es minimo 5 caracteres",
    ],
    claveRules: [
      (v) => !!v || "E-mail is required",
      (v) => v.length >= 6 || "La clave debe tener minimo 6 caracteres",
    ],
  }),
  methods: {
    validar() {
      this.$refs.form.validate();
    },
  },
};
</script>