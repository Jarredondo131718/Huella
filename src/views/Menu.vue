<template>
  <a-select
    v-model:value="SelectedAplication"
    label-in-value
    size="large"
    :options="optionAplications"
    placeholder="Seleccione Una Aplicación"
    @change="handleChangeAplcation"
  >
  </a-select>

  <a-tree
    :tree-data="MenuTree"
    v-model:expandedKeys="expandedKeys"
    v-model:selectedKeys="selectedKeys"
    v-model:checkedKeys="checkedKeys"
  >
    <template #title0010><span style="color: #1890ff">sss</span></template>
  </a-tree>
  <pre></pre>
</template>
<script>
import { useStore } from "vuex";
import { defineComponent, ref, watch } from "vue";

import Swal from "sweetalert2";
import GetDataServices from "../store/services/GetDataServices";
import router from "../router/index";

export default defineComponent({
  name: "VSMneu",
  setup() {
    const store = useStore();
    const RouterLink = async (pRouter) => {
      //router.getRoutes(): obtiene una matriz con todos los
      try {
        console.log("RouterLink router 1", pRouter);
        mpath = pRouter.path;
      } catch (error) {
        console.log("que gueva catch", error);
      }
      // pa mañana https://next.router.vuejs.org/guide/advanced/dynamic-routing.html#adding-routes
      console.log("RouterLink router mpath ", mpath);

      await router.push(mpath);

      console.log("RouterLink", {
        Option: pRouter.intId,
        Parent: pRouter.intPadre,
        Label: pRouter.strCaption,
        path: pRouter.path,
      });
      console.log("actualizar object ",
      {
        Option: pRouter.intId,
        Parent: pRouter.intPadre,
        Label: pRouter.strCaption,
      })
      store.dispatch("ActFormulario", {
        Option: pRouter.intId,
        Parent: pRouter.intPadre,
        Label: pRouter.strCaption,
      });
    };
    const handleChangeAplcation = (value) => {
      // store.dispatch("ActApp", value.value);
      getMenu(value.value);

      console.log(
        "handleChangeAplcation ",
        value.value,
        " SelectedAplication aqui es",
        SelectedAplication.value
      );
    };
    // const optionAplications = ref(store.state.optionAplications); //Jk
    const optionAplications = computed(() => store.state.optionAplications);
    const SelectedAplication = ref(0);

    const MenuTree = ref([]);
    const expandedKeys = ref();
    const selectedKeys = ref();
    const checkedKeys = ref(MenuTree[0], MenuTree[(0, 0)]);
    watch(expandedKeys, () => {
      console.log("expandedKeysjose", expandedKeys);
    });
    watch(selectedKeys, () => {
      try {
        console.log("selectedKeys 0 ", selectedKeys);
        console.log("selectedKeys 1 ", Object.values(selectedKeys));
        console.log(" selectedKeys 2 ", Object.values(selectedKeys)[3]);
        let OptionLink = Object.values(selectedKeys)[3][0];
        console.log(" selectedKeys 2 ", treeMenu);

        let OptionSelected = treeMenu.OpcionesMenu.filter(
          (element) => element.intId == OptionLink
        );
        //reduce object.value(objeto).reduce((acc,{varasumar}) =>(acc+varasumar))
        console.log(
          "Miremos si lo encontro",
          OptionLink,
          "encontró ?",
          treeMenu.OpcionesMenu.hasOwnProperty(OptionLink)
        );
        console.log(
          "gter ",
          store.getters.getFormulario,
          " usuario ",
          store.getters.GetUSER,
          " OptionSelected ",
          OptionSelected
        );
        if (OptionSelected.length > 0) RouterLink(OptionSelected[0]);
      } catch (error) {
        return Swal.fire({
          icon: "error",
          title: "Error",
          text: error,
        });
      }
    });
    watch(checkedKeys, () => {
      console.log("checkedKeys chequjjj", checkedKeys);
    });

    let treeMenu = ref([]);
    const getMenu = async (idApp) => {
      const ObtenerHijos = (Opciones) => {
        let mMenuTree = [];
        Opciones.forEach((element) => {
          mMenuTree.push({
            title: element.strCaption,
            key: element.intId,
            path: element.path,
          });
        });
        return mMenuTree;
      };

      treeMenu = await GetDataServices(
        "AdmonSystem",
        {
          idUser: 23,
          intUsuario: 23,
          intIdApp: idApp,
          Transaction: "LoadParametros",
          ExecuteQuery: "ObtenerMenuAplicacion",
        },
        false
      );
      // treeMenu = await mtreeMenu;
      MenuTree.value = [];
      if (treeMenu == undefined) return;
      let Opciones = [];
      treeMenu.Menu.forEach((elementPadre) => {
        Opciones = treeMenu.OpcionesMenu.filter(
          (element) => element.intPadre == elementPadre.intId
        );

        MenuTree.value.push({
          title: elementPadre.strCaption,
          key: elementPadre.intId,
          children: ObtenerHijos(Opciones),
        });
      });
    };
    return {
      store,
      handleChangeAplcation,
      SelectedAplication,
      optionAplications,

      treeMenu,
      MenuTree,
      // getMenu,
      expandedKeys,
      selectedKeys,
      checkedKeys,
      // store solo se devuelve lo que se va a utilizar en la vista
    };
  },
});
</script>
