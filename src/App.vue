<template>

    <Header />
    <router-view v-slot="{ Component }">
      <component :is="Component">
        <p>In Vue Router 3, I render inside the route component</p>
      </component>
    </router-view>
    <vsBody  />

    <Footer />
  
</template>
<script>
import { computed, defineComponent, reactive, ref } from "vue";
import { onMounted } from "@vue/runtime-core";
import { useStore } from "vuex";
import vsBody from "./components/Body.vue";
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

import Login from "./components/Login.vue";
export default defineComponent({
  components: {

    Header,
    vsBody,
    Login,
    Footer,
    Login,
  },
  setup() {

    const store = useStore();
    onMounted(() => {
    //  store.state.DataUser.lngNumIdTerc=0;
      //funciones a realiza al montar el componente(si lo requiere)
    });
    return { store };
  },
});
</script>
<style></style>
