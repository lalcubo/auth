<template>
  <v-cointainer class="fill-height" fluid>
    <v-row align="center" justify="center">
      <v-card class="mt-12 mx-auto">
        <div class="text-right">
          <v-btn outlined color="indigo" @click="onButtonClick()">
            <v-icon dense>mdi-plus</v-icon>
            Registrar
          </v-btn>
        </div>
        <v-data-table
          dense
          :headers="headers"
          :items="datos"
          item-key="name"
          class="elevation-1"
        >
          <template v-slot:item="row">
            <tr>
              <td>{{ row.item.id }}</td>
              <td>{{ row.item.name }}</td>
              <td>{{ row.item.email }}</td>
              <td>
                <v-btn v-if="row.item.editar" icon @click="editar(row.item.id)">
                  <v-icon>mdi-lead-pencil</v-icon>
                </v-btn>
                <v-btn
                  v-if="row.item.eliminar"
                  icon
                  @click="eliminar(row.item.id)"
                >
                  <v-icon>mdi-delete</v-icon>
                </v-btn>
              </td>
            </tr>
          </template>
        </v-data-table>
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
      </v-card>
    </v-row>
  </v-cointainer>
</template>
<script>
export default {
  data: () => ({
    snackbar: false,
    mensaje: "",
    datos: [],
    headers: [
      {
        text: "ID",
        align: "start",
        sortable: false,
        value: "id",
      },
      { text: "Nombre", value: "name" },
      { text: "Correo", value: "email" },
      { text: "Acciones", value: "" },
    ],
  }),
  mounted() {
    axios
      .get("./users")
      .then((res) => {
        //this.datos = res.data;
        this.datos = res.data.usuarios.map((usu) => {
          const edit = res.data.permisosuser.find(
            (el) => el.name === "admin.user.edit"
          );
          const eliminar = res.data.permisosuser.find(
            (el) => el.name === "admin.user.destroy"
          );
          return {
            id: usu.id,
            name: usu.name,
            email: usu.email,
            editar: edit ? true : false,
            eliminar: eliminar ? true : false,
          };
        });
        //window.location.reload();
      })
      .catch((er) => {
        this.color = "red accent-2";
        this.mensaje = er;
        this.snackbar = true;
      });
  },
  methods: {
    editar(id) {
      this.$router.push({ name: "usersedit", params: { id: id } });
    },
    eliminar(id) {
      axios
        .delete(`./users/${id}`)
        .then((res) => {
          this.color = "success";
          this.mensaje = res.data.mensaje;
          this.snackbar = true;
          this.cargar();
        })
        .catch((er) => {
          this.color = "red accent-2";
          this.mensaje = er;
          this.snackbar = true;
        });
    },
    cargar() {
      axios
        .get("./users")
        .then((res) => {
          //this.datos = res.data;
          this.datos = res.data.usuarios.map((usu) => {
            const edit = res.data.permisosuser.find(
              (el) => el.name === "admin.user.edit"
            );
            const eliminar = res.data.permisosuser.find(
              (el) => el.name === "admin.user.destroy"
            );
            return {
              id: usu.id,
              name: usu.name,
              email: usu.email,
              editar: edit ? true : false,
              eliminar: eliminar ? true : false,
            };
          });
          //window.location.reload();
        })
        .catch((er) => {
          this.color = "red accent-2";
          this.mensaje = er;
          this.snackbar = true;
        });
    },
  },
};
</script>