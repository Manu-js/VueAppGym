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
          <tr v-for="(item, hourCalendar) in items" :key="hourCalendar">
            <td v-for="(header, dayCalendar) in headers" :key="dayCalendar">
              <v-edit-dialog
                large
                @save="save(hourCalendar, dayCalendar, item[dayCalendar])"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ item[dayCalendar] }}
                <template #input>
                  <modal :value="item[dayCalendar].length" />
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
import axios from 'axios';
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
      weekAux:[],
      
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
      let token = await this.$session.get('jwt')
      console.log(this.today)
      this.citas = (
        await axios.post('http://51.210.87.212:3000/citas/getweek',{

            fchIni: this.weekAux[0],
            fchFin: this.weekAux[6],
            servicio: "0",
            token: token
        },{
          headers: {
              'Content-Type': 'application/json',
          },
        })
      ).data;
      this.remapValues();
    },
    remapValues(){
      for (let index = 0; index < this.citas.length; index++) {
        const element = this.citas[index];
        let dayNumber = (moment.unix(element["fecha"]).isoWeekday())
        let hour =parseInt(moment.unix(element["fecha"]).format("hh"))
        let newValue = this.hours[hour][dayNumber] + 1
        this.$set(this.hours[hour],[dayNumber], newValue)
      }
    },
    resetHour(toReset){
      var m = toReset.utcOffset(0);
      m.set({hour:0,minute:0,second:0,millisecond:0})
      m.toISOString()
      m.format()
      return m
    },
    async save(hora, dia) {
      let token = await this.$session.get('jwt')
      
      let date = (this.resetHour(moment.unix(this.weekAux[dia]))) 
      console.log(date)
      date = date.add((hora+ 7), 'hours').format('x');
      
      this.citas = (
      await axios.post('http://51.210.87.212:3000/citas/addcita',{
            fecha: date/1000,
            servicio: "0",
            id_usuario: 2,
            id_empleado: 2,
            id_servicio: 0,
            id_producto: 0,
            es_media: 0,
            lugar: "w",
            token: token
        },{
          headers: {
              'Content-Type': 'application/json',
          },
        }).data)
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
      const auxToday2 = this.today.clone();
      this.weekAux.push(auxToday2.unix());
      this.weekAux.push(auxToday2.add(1, 'days').unix());
      this.weekAux.push(auxToday2.add(1, 'days').unix());
      this.weekAux.push(auxToday2.add(1, 'days').unix());
      this.weekAux.push(auxToday2.add(1, 'days').unix());
      this.weekAux.push(auxToday2.add(1, 'days').unix());
      this.weekAux.push(auxToday2.add(1, 'days').unix());
    },
    getDayName(dateStr, locale) {
      const date = new Date(dateStr);
      return date.toLocaleDateString(locale, { weekday: 'long' });
    },
    close() {
      console.log('Dialog closed');
    },
    next() {
      this.today = this.today.clone().add(7, 'days');
      this.getNow();
      this.refillData()
    },
    prev() {
      this.today = this.today.clone().subtract(7, 'days');
      this.getNow();
      this.refillData()
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
