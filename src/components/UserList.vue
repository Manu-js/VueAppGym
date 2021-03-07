<template>
<v-card>
    <v-card-title>
      Clientes
      <v-spacer></v-spacer>
      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search"
        single-line
        hide-details
      ></v-text-field>
    </v-card-title>
  <v-data-table
    :headers="headers"
    :items="users"
    :items-per-page="5"
    class="elevation-1"
    :search="search"
  >
  <template v-slot:item.estado="{ item }">
        {{ item.estado }}
    </template>
  </v-data-table>
</v-card>
</template>

<script>
import axios from 'axios';

export default {
  mounted() {
      this.getUsers()
  },
  data() {
    return {
              search: '',
    headers: [
          {
            text: 'Id usuario',
            value: 'idUsuario',
          },
          { text: 'Estado', value: 'estado' },
          { text: 'Nombre compleot', value: 'nombreCompleto' },
          { text: 'Email', value: 'email' },
          { text: 'Telefono', value: 'telefono' },
          { text: 'Sexo', value: 'sexo' },
          { text: 'Fecha nacimiento', value: 'fechaNac' },
          { text: 'DNI', value: 'DNI' },
          { text: 'Protección de datos', value: 'rutaProteccionDatos' },
          { text: 'Justificante medico', value: 'rutaJustificanteMed' },
          { text: 'Id Madre', value: 'idMadre' },

        ],
      users: []
    };
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    async getUsers(){
       let token = await this.$session.get('jwt')
       this.users = (
         await axios.post('http://51.210.87.212:3000/clientes/getClients',{
                    token: token,
                headers: {
                    'Content-Type': 'application/json'
                }
                })).data

    }
  },
};
</script>
