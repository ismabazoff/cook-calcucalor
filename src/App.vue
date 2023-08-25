<template>
  <Navbar />
  <RouterView />
</template>

<script>
import Navbar from "@/components/UI/Navbar.vue";
import { RouterLink, RouterView } from "vue-router";
export default {
  setup() {
    return {
      RouterLink,
      RouterView,
    };
  },
  components: {
    Navbar,
  },
};
</script>

<style>
#app {
  padding: 0 35px;
}

::-webkit-scrollbar {
  display: none;
}
</style>
