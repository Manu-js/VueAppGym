<template>
  <div>
    <div class="flex justify-center">
      <div class="" @click="prev">prev</div>
      <div class="" @click="next">next</div>
    </div>
    <div
      v-for="(day, index) in Object.entries(week)"
      :key="index"
      style="display: inline-block; font-size: 0.75rem; width: calc(100% / 7)"
    >
      {{ day }}
    </div>
    <v-data-table
      :headers="headers"
      :items="hours"
      :items-per-page="20" 
      hide-default-footer
      hide-default-header
    >
      <template #body="{ items, headers }">
        <tbody>
          <tr v-for="(item, idx) in items" :key="idx">
            <td v-for="(header, key) in headers" :key="key">
              <v-edit-dialog
                large
                @save="save(idx, key, item[key])"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ item[key] }}
                <template #input>
                  <modal :value="item[key]" />
                </template>
              </v-edit-dialog>
            </td>
          </tr>
        </tbody>
      </template>
    </v-data-table>
  </div>
</template>
<script>
//import axios from 'axios';
import moment from 'moment';
import Modal from './Modal.vue';

export default {
  components: { Modal },
  data() {
    return {
      timestamp: '',
      headers: [
        { text: 'Lunes',sortable: false,value: 'lunes'},
        { text: 'Martes', sortable: false, value: 'martes' },
        { text: 'Miercoles',sortable: false,value: 'miercoles'},
        { text: 'Jueves', sortable: false, value: 'jueves' },
        { text: 'Viernes', sortable: false, value: 'viernes' },
        { text: 'Sabado', sortable: false, value: 'sabado' },
        { text: 'Domingo', sortable: false, value: 'domingo' },
      ],
      hours: [
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0],
       [0,0,0,0,0,0,0]
      ],
      week: {
        lunes: '',
        martes: '',
        miercoles: '',
        jueves: '',
        viernes: '',
        sabado: '',
        domingo: '',
      },
      citas: [
    {
        "id_cita": 1,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha": 1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 2,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 3,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 4,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 5,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 6,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 7,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 8,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 9,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    },
    {
        "id_cita": 10,
        "id_usuario": 1,
        "id_empleado": 0,
        "id_servicio": 0,
        "id_producto": 0,
        "fecha":  1614249686,
        "es_media": 0,
        "lugar": "test",
        "nombre_completo": "cliente1"
    }
],
      today: moment(),
      offset: 0,
    };
  },
  mounted() {
    this.getNow(true);
    this.refillData()
  },
   beforeCreate: function () {
     console.log(this.$session.exists())
     
  },
  methods: {
    async refillData() {
      /*let token = await this.$session.get('jwt')
      console.log(token)
      this.test = (
        await axios.post('http://51.210.87.212:3000/citas/getweek',{

            fchIni: this.today,
            fchFin: this.week.domingo,
            servicio: "0",
        },{
          headers: {
              'Content-Type': 'application/json',
              'Authoritation': 'Bearer ' + token
          },
        })
      ).data;*/
      this.remapValues();
    },
    remapValues(){
      for (let index = 0; index < this.citas.length; index++) {
        const element = this.citas[index];
        let dayNumber = (moment.unix(element["fecha"]).isoWeekday())
        let hour = ((moment.unix(element["fecha"]).format("hh")))
        let newValue = this.hours[hour][dayNumber] + 1
        this.$set(this.hours[hour], dayNumber, newValue)
        
      }
    },
    save(vart, vert, value) {
      let newValue = this.hours[vart][vert] = value + 1;
      this.$set(this.hours[vart], vert, newValue)
      /*this.citas = (
      await axios.post('http://51.210.87.212:3000/citas/saveCita',{

            fchIni: this.today,
            fchFin: this.week.domingo,
            servicio: "0",
        },{
          headers: {
              'Content-Type': 'application/json',
              'Authoritation': 'Bearer ' + token
          },
        }).data)*/
    },
    cancel() {
      this.snack = true;
      this.snackColor = 'error';
      this.snackText = 'Canceled';
    },
    open() {
      this.snack = true;
      this.snackColor = 'info';
      this.snackText = 'Dialog opened';
    },
    getNow(change) {
      const today = new Date(
        new Date().getFullYear(),
        new Date().getMonth(),
        new Date().getDate()
      );
      const date = `${today.getFullYear()}-${
        today.getMonth() + 1
      }-${today.getDate()}`;
      const time = `${today.getHours()}:${today.getMinutes()}:${today.getSeconds()}`;
      const dateTime = `${date} ${time}`;
      this.timestamp = dateTime;
      this.refactorWeek(this.getDayName(this.timestamp), change);
    },
    refactorWeek(day, change) {
      this.offset = 0;
      if (!change) {
        this.offset = 0;
      } else if (day === 'lunes') {
        this.offset = 0;
      } else if (day === 'martes') {
        this.offset = 1;
      } else if (day === 'miercoles') {
        this.offset = 2;
      } else if (day === 'jueves') {
        this.offset = 3;
      } else if (day === 'viernes') {
        this.offset = 4;
      } else if (day === 'sabado') {
        this.offset = 5;
      } else if (day === 'domingo') {
        this.offset = 6;
      }

      this.today = this.today.subtract(this.offset, 'days');
      const auxToday = this.today.clone();
      this.week.lunes = auxToday.format('DD-MM');
      this.week.martes = auxToday.add(1, 'days').format('DD-MM');
      this.week.miercoles = auxToday.add(1, 'days').format('DD-MM');
      this.week.jueves = auxToday.add(1, 'days').format('DD-MM');
      this.week.viernes = auxToday.add(1, 'days').format('DD-MM');
      this.week.sabado = auxToday.add(1, 'days').format('DD-MM');
      this.week.domingo = auxToday.add(1, 'days').format('DD-MM');
    },
    getDayName(dateStr, locale) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });
    },
    close() {
      console.log('Dialog closed');
    },
    next() {
      console.log(this.today.format('DD-MM'));
      this.today = this.today.clone().add(7, 'days');
      console.log(this.today.format('DD-MM'));
      this.getNow();
    },
    prev() {
      this.today = this.today.clone().subtract(7, 'days');
      console.log(this.today);
      this.getNow();
    },
  },
};
</script>
<style scoped lang="scss">
.v-event-timed {
  user-select: none;
  -webkit-user-select: none;
}
</style>
