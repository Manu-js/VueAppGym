<template>
   <v-app id="app" class="mx-auto overflow-hidden">
       <template v-if="!$route.path.includes('login')">
    <v-app-bar
      color="deep-purple"
      dark
    >
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>

      <v-toolbar-title>Title</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      absolute
      temporary
    >
      <v-list
        nav
        dense
      >
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title> <router-link to="/main">About</router-link></v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title><router-link to="/Cosis">Todos</router-link></v-list-item-title>
          </v-list-item>
            <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title @click="logout()">Salir</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>
      </template>
      <v-main>
         <keep-alive :include="['Login']">
            <router-view></router-view>
         </keep-alive>
      </v-main>
   </v-app>
</template>

<script>
export default {
   name: 'App',
   data() {
      return {
         drawer: false,
      };
   },
    methods: {
      logout(){
         this.drawer = false
         this.$session.destroy()
         this.$router.push('/login')
      }
    }
}

</script>

<style></style>
