<template>
  <h1>Ahorros disponibles</h1>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, ref, watch } from "vue";
import GetDataServices from "../store/services/GetDataServices";
export default defineComponent({
  setup() {
    const store = useStore();
    onMounted(() => {
      //funciones a realiza al montar el componente(si lo requiere)
    });
    return {}; //retorna los elementos a utilizar en la vista
  },
});
</script>
