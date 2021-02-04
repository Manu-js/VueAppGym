<template>
   <v-app id="app">
      <template v-if="!$route.path.includes('login')">
         <v-navigation-drawer v-model="drawer" fixed app>
            <v-list dense>
               <div @click="drawer = false" to="/login">
                  <div>login</div>
               </div>
               <div @click="drawer = false"> contact </div>
               <div @click="drawer = false"> Cosis </div>
            </v-list>
         </v-navigation-drawer>
         <div @click.stop="drawer = !drawer;"></div>
      </template>
      <v-content>
         <keep-alive :include="['Login']">
            <router-view></router-view>
         </keep-alive>
      </v-content>
   </v-app>
</template>

<script>
export default {
   data: () => ({
      drawer: false,
   }),
   props: {
      source: String,
   },
};
</script>

<script>
export default {
   name: 'App',
   data() {
      return {
         drawer: false,
      };
   },
};
</script>

<style></style>
