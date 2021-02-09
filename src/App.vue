<template>
   <v-app id="app" class="mx-auto overflow-hidden">
    <AppHeader />
    <transition name="fade" @after-leave="$root.$emit('triggerScroll')">
      <RouterView />
    </transition>
   </v-app>
</template>

<script>
import AppHeader from "./components/Menu";

export default {
   name: 'App',
 components: {
    AppHeader
  },
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
