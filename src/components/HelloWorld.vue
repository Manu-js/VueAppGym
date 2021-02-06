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
      hide-default-footer
      hide-default-header
    >
      <template #body="{ items, headers }">
        <tbody>
          <tr v-for="(item, idx) in items" :key="idx">
            <td v-for="(header, key) in headers" :key="key">
              <v-edit-dialog
                large
                @save="save(idx, header, item[header.value])"
                @cancel="cancel"
                @open="open"
                @close="close"
              >
                {{ item[header.value] }}
                <template #input>
                  <modal :value="item[header.value]" />
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
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
        {
          lunes: 0,
          martes: 0,
          miercoles: 0,
          jueves: 0,
          viernes: 0,
          sabado: 0,
          domingo: 0,
        },
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
      today: moment(),
      offset: 0,
    };
  },
  mounted() {
    this.getNow(true);
  },
   beforeCreate: function () {
     console.log(this.$session.exists())
  },
  methods: {
    async refilldata() {
      this.test = (
        await axios.get('https://jsonplaceholder.typicode.com/todos/')
      ).data;
      this.remapValues();
    },
    save(vart, vert, value) {
      this.hours[vart][vert.value] = value + 1;
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
