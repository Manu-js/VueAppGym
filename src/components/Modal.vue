<template>
  <div class="grid">
    <div class>
      <ul>
        <li v-for="(item, index) in filtrado()" :key="index" >
          <span>{{item.idCita}}</span> ---
          <span>{{item.nombreCompleto}}</span>
          <v-btn @click="removeCita(item.idCita)">Borrar</v-btn>
        </li>
      </ul>
    </div>
    <div>
    <v-select
      v-model="select"
      :items="users"
      item-text="nombreCompleto"
      item-value="abbr"
      label="Select"
      persistent-hint
      return-object
      single-line
    >
    </v-select>
    </div>
  </div>
</template>
<script>
import axios from 'axios';
export default {
  props: {
    citas: Array,
    auxSearch: String
  },
  data() {  
    return {
      select: [],
      citasActivas: [],
      users:[],
    };
  },
  watch: {
      select: {
        deep: true,
         handler() {
           this.$emit('updateSelect', this.select)
         },
      },
	},
  mounted() {
    this.getUsers()
  },
    methods: {
  filtrado() {
     return this.citas.filter(element => element.position === this.auxSearch)
   },
   async getCitas() {
           /* this.citasActivas = (
                await axios.post('http://51.210.87.212:3000/login',{
                    id: "pepe2@test.com",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
            ).data;
      if (this.citasActivas){

      }*/
    },
    async removeCita(idCita){
            let token = await this.$session.get('jwt')
                this.citasActivas = (
                await axios.post('http://51.210.87.212:3000/citas/deleteCita',{
                    id: idCita,
                    token: token,
                headers: {
                    'Content-Type': 'application/json'
                }
                })
            ).data;
            
    },
    async getUsers(){
        let token = await this.$session.get('jwt')
         this.users = (
              await axios.post('http://51.210.87.212:3000/clientes/getClients',{
                  token: token,
                  headers: {
                    'Content-Type': 'application/json'
                }
                })
            ).data;
            
    }
}
}

</script>
