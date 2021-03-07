<template>
  <div>
    <v-card flat>
      <v-card-text>
        <v-container fluid>
          <v-col cols="12" sm="6" md="3">
            <v-select
              label="Estado Usuario"
              :items="status"
              v-model="client.estado"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Nombre de usuario"
              :placeholder="client.nombreCompleto"
              v-model="client.nombreCompleto"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Email"
              :placeholder="client.email"
              v-model="client.email"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="DNI"
              :placeholder="client.DNI"
              v-model="client.DNI"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-text-field
              label="Telefono"
              :placeholder="client.telefono"
              v-model="client.telefono"
            ></v-text-field>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-select
              :items="sex"
              label="Sexo"
              v-model="client.sexo"
            ></v-select>
          </v-col>
          <v-col cols="12" sm="6" md="3">
            <v-menu
              ref="menu"
              v-model="menu"
              :close-on-content-click="false"
              transition="scale-transition"
              offset-y
              min-width="auto"
            >
              <template v-slot:activator="{ on, attrs }">
                <v-text-field
                  v-model="calenarDateAux"
                  label="Cumpleaños"
                  prepend-icon="mdi-calendar"
                  readonly
                  v-bind="attrs"
                  v-on="on"
                ></v-text-field>
              </template>
              <v-date-picker
                ref="picker"
                v-model="calenarDateAux"
                :max="new Date().toISOString().substr(0, 10)"
                min="1950-01-01"
                @change="save"
              ></v-date-picker>
            </v-menu>
          </v-col>
        </v-container>
      </v-card-text>
    </v-card>
    <v-btn @click="saveUser"> Guardar </v-btn>
  </div>
</template>

<script>
import axios from 'axios';
import moment from 'moment';

export default {
  data() {
    return {
      client: {
        estado: "",
        nombreCompleto: "",
        email: "",
        telefono: "",
        sexo: 1,
        fechaNac: null,
        DNI: "",
        rutaProteccionDatos: "-",
        rutaJustificanteMed: "-",
        idMadre: null,
      },
      status: ["Alta", "Baja temporal", "Baja permanente"],
      sex: [0, 1],
      menu: false,
      calenarDateAux: null
    };
  },
  watch: {
    menu(val) {
      val && setTimeout(() => (this.$refs.picker.activePicker = "YEAR"));
    },
  },
  methods: {
    save(date) {
      this.$refs.menu.save(date);
    },
    async saveUser(){

       this.client.fechaNac = moment(this.calenarDateAux).unix()
       let token = await this.$session.get('jwt')
         await axios.post('http://51.210.87.212:3000/clientes/addClient',{
                    Client: this.client,
                    token: token,
                headers: {
                    'Content-Type': 'application/json'
                }
                })

    }
  },
};
</script>
