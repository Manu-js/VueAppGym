<template>
<div>
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
            <v-list-item-title> 
            <RouterLink class="header__nav__link" :to="{ name: 'Main' }"
                >Citas</RouterLink>
               
            </v-list-item-title>
          </v-list-item>

          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
            <RouterLink class="header__nav__link" :to="{ name: 'Cosis' }"
                >Usuarios</RouterLink>
               <!-- <router-link to="/Cosis">Todos</router-link> -->
            </v-list-item-title>
          </v-list-item>
          <v-list-item>
            <v-list-item-icon>
              <v-icon>mdi-account</v-icon>
            </v-list-item-icon>
            <v-list-item-title>
            <RouterLink class="header__nav__link" :to="{ name: 'UserList' }"
                >Lista Usuarios</RouterLink>
               <!-- <router-link to="/Cosis">Todos</router-link> -->
            </v-list-item-title>
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
</div>
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
      },
      selectView(name) {
        this.$emit("selectView", name);
      }
    }
}

</script>

<style></style>
