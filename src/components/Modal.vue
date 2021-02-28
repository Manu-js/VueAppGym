<template>
  <div class="grid">
    <div class>Aqui van a venir las citas ya cogidas
      <ul>
        <li v-for="(item, index) in citasActivas" :key="index" >
          <span>{{item}}</span>
          <v-btn @click="removeCita(item.id)">Borrar</v-btn>
        </li>
      </ul>
    </div>
    <div>
    <v-select
      v-model="select"
      :items="users"
      item-text="state"
      item-value="abbr"
      label="Select"
      persistent-hint
      return-object
      single-line
    ></v-select>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: Number,
  },
  data() {
    return {
      select: { state: 'Florida', abbr: 'FL' },
      citasActivas: [],
      users:[],
      items: [
        { state: '123', abbr: 'FL' },
        { state: '1234', abbr: 'GA' },
        { state: '125', abbr: 'NE' },
        { state: '126', abbr: 'CA' },
        { state: 'New 61', abbr: 'NY' },
      ],
    };
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
    async removeCita(){
                 /* this.citasActivas = (
                await axios.post('http://51.210.87.212:3000/citas/deleteCita',{
                    id: "pepe2@test.com",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
            ).data;
            */
    },
    async getUsers(){
        /* this.users = (
              await axios.post('http://51.210.87.212:3000/usuarios/getUsers',{
                    id: "pepe2@test.com",
                headers: {
                    'Content-Type': 'application/json'
                }
                })
            ).data;
            */
    }
};

</script>
