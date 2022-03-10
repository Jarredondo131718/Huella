<template>
  <a-modal
    v-model:visible="ShowViewModal"
    :maskClosable="false"
    :closable="false"
    width="100%"
    wrap-class-name="full-modal"
    style="top: 20px"
    title="Utilidades Google Maps"
    :ok-button-props="{ disabled: true }"
    :cancel-button-props="{ disabled: false }"
    @ok="handleOk"
  >
    <a-card title="" class="VSCarNivel1">
      <a-form :laba-col="labelCol" :wrapper-col="wrapperCol" layout="vertical">
        <a-row :gutter="2" type="flex" justify="start">
          <a-col :span="12">
            <a-form-item label="Dirección">
              <GMapAutocomplete
                ref="myMapRef"
                class="VSAutoComplemento"
                placeholder="Ingrese Dirección A Buscar"
                @place_changed="setPlace"
                :options="autocompleteOptions"
              >
              </GMapAutocomplete>
            </a-form-item>
          </a-col>
          <a-col :span="12">
            <a-form-item label="Complemento">
              <a-input
                style="width: 450px"
                show-count
                :maxlength="100"
                v-model:value="frmDirection.Complemento"
                placeholder="Ingrese Complemento"
                allow-clear
              />
            </a-form-item>
          </a-col>
        </a-row>
        <a-row
          :gutter="2"
          type="flex"
          justify="start"
          v-if="frmDirection.Direccion.length > 0"
        >
          <a-col :span="12">
            <a-input
              v-model:value="MDireccion"
              v-if="ShowDireccionTrabajo"
              style="width: 500px"
              :disabled="true"
              title="Pais"
            ></a-input>
          </a-col>
        </a-row>
        <template v-if="ShowDetalleDireccion">
          <a-row :gutter="2" type="flex" justify="start">
            <a-col :span="8">
              <a-form-item label="Pais">
                <a-input
                  v-model:value="frmDirection.Pais"
                  style="width: 200px"
                  :disabled="true"
                  title="Pais"
                ></a-input>
              </a-form-item>
            </a-col>
            <a-col :span="8">
              <div class="grid-content">
                <a-form-item label="Depto">
                  <a-input
                    v-model:value="frmDirection.Depto"
                    style="width: 200px"
                    :disabled="true"
                    title="Depto"
                  ></a-input>
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="8">
              <div class="grid-content">
                <a-form-item label="Ciudad">
                  <a-input
                    v-model:value="frmDirection.Ciudad"
                    style="width: 200px"
                    :disabled="true"
                    title="Ciudad"
                  ></a-input>
                </a-form-item>
              </div>
            </a-col>
          </a-row>
          <a-row :gutter="2">
            <a-col :span="6">
              <div class="grid-content">
                <a-form-item label="Localidad">
                  <a-input
                    v-model:value="frmDirection.Localidad"
                    style="width: 200px"
                    :disabled="true"
                    title="Localidad"
                  ></a-input>
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="grid-content">
                <a-form-item label="Ruta">
                  <a-input
                    v-model:value="frmDirection.Ruta"
                    style="width: 200px"
                    :disabled="true"
                    title="Ruta"
                  ></a-input>
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="6">
              <div class="grid-content">
                <a-form-item label="Sector">
                  <a-input
                    v-model:value="frmDirection.Sector"
                    style="width: 200px"
                    :disabled="true"
                    title="Sector"
                  ></a-input>
                </a-form-item>
              </div>
            </a-col>
            <a-col :span="6">
              <a-form-item label="CodPos">
                <a-input
                  v-model:value="frmDirection.CodPos"
                  style="width: 200px"
                  :disabled="true"
                  title="CodPos"
                ></a-input>
              </a-form-item>
            </a-col>
          </a-row>
        </template>
      </a-form>
      <template #extra>
        <el-button
          title="No Guardar Cambios"
          size="mini"
          circle
          @click="RetornarCliente"
          type="danger"
          icon="el-icon-circle-close"
        ></el-button>
        <el-button
          type="success"
          icon="el-icon-s-comment"
          size="mini"
          @click.prevent="SaveRecord"
          title="Guardar Cambios"
          v-if="frmDirection.Direccion.length > 0"
          circle
        ></el-button>

        <el-button
          v-if="frmDirection.Direccion.length > 0"
          circle
          size="mini"
          type="primary"
          icon="el-icon-view"
          @click="ShowDetalleDireccion = !ShowDetalleDireccion"
          title="Show Address Detail"
        ></el-button>
        <el-button
          v-if="frmDirection.Direccion.length > 0"
          type="primary"
          circle
          size="mini"
          icon="el-icon-location-outline"
          @click="ShowViewMap = !ShowViewMap"
          title="Ver en el Mapa"
        ></el-button>
      </template>
      <template v-if="ShowViewMap">
        <GMapMap
          :center="PointCenter"
          :zoom="7"
          ref="myMapRefGMap"
          map-type-id="terrain"
          style="width: 100vw; height: 900px"
          :options="{
            zoomControl: true,
            mapTypeControl: false,
            scaleControl: false,
            streetViewControl: false,
            rotateControl: false,
            fullscreenControl: true,
            disableDefaultUi: true,
          }"
        >
          <GMapCluster>
            <GMapMarker
              :key="index"
              v-for="(m, index) in markers"
              :position="m.position"
              :clickable="true"
              :draggable="true"
              @click="openMarker(m.id)"
            >
              <GMapInfoWindow
                :closeclick="true"
                @closeclick="openMarker(null)"
                :opened="openedMarkerID === m.id"
              >
                <!-- <div> {{InfoWindows(frmDirection) }} </div> -->
                <div v-html="InfoWindows(frmDirection)"></div>
                <!-- <div>{{frmDirection.Direccion}}</div> -->
              </GMapInfoWindow>
            </GMapMarker>
          </GMapCluster>
        </GMapMap>
      </template>
    </a-card>
  </a-modal>
</template>

<script>
import { ref, defineComponent, computed } from "vue";
import { useStore } from "vuex";
import Swal from "sweetalert2";
export default defineComponent({
  name: "VSAppGooleMap",
  // props: ['TypeDireccion'],
  setup(context, props) {
    const frmDirection = computed(() => props.attrs.DirPara);
    const MDireccion = ref("");

    const ShowDireccionTrabajo = ref(false);

    // console.log("DirParameter 1", frmDirection, " MDireccion ", MDireccion);
    const store = useStore();

    const openedMarkerID = ref(null);
    const autocompleteOptions = {
      componentRestrictions: {
        country: "co",
      },
    };
    const InfoWindows = (pInfo) => {
      let x1 =
        "<div>" + pInfo.Direccion == ""
          ? null
          : "Dirección: " + pInfo.Direccion + "</br>";
      if (pInfo.Pais != "" || pInfo.Pais != undefined) x1 += pInfo.Pais + ", ";
      if (pInfo.Depto != "" || pInfo.Depto != undefined)
        x1 += pInfo.Depto + ", ";
      if (pInfo.Ciudad != "" || pInfo.Ciudad != undefined)
        x1 += pInfo.Ciudad + "</br>";
      if (pInfo.Sector != "" || pInfo.Sector != undefined)
        x1 += pInfo.Sector + "</br>";
      if (pInfo.CodPos != "" || pInfo.CodPos != undefined)
        x1 += "Código Postal: " + pInfo.CodPos + "</br>";
      if (pInfo.Point != "" || pInfo.Point != undefined)
        x1 += "PDI: " + pInfo.Point.lat + "," + pInfo.Point.lng + "</br>";
      x1 += `<h3><a href=${pInfo.UrlPlace} target="_blank">Visitar Sitio</a>`;
      x1 += "</div>";
      return x1;
    };
    const PointCenter = ref({
      lat: 6.180759,
      lng: -75.587653,
    });
    const labelCol = ref({
      span: 10,
    });
    const wrapperCol = ref({
      span: 3,
    });

    const markers = ref([
      {
        id: 0,
        position: {
          lat: 6.180759,
          lng: -75.587653,
        },
      },
    ]);
    const ShowViewMap = ref(false);
    const ShowViewModal = ref(true);
    const ShowViewDireccion = ref(true);
    const ShowDetalleDireccion = ref(false);
    const SaveRecord = () => {
      console.log("a salvar record", frmDirection.value);
      // store.dispatch("ActDirection", null);      
      store.dispatch("ActDirection", frmDirection.value);
      ShowViewModal.value = false;
    };
    const RetornarCliente = () => {
      ShowViewModal.value = false;
      store.dispatch("ActDirection", { Destino: "NoOk" });
    };

    return {
      store,
      ShowDireccionTrabajo,
      MDireccion,
      InfoWindows,
      autocompleteOptions,
      openedMarkerID,
      PointCenter,
      markers,
      labelCol,
      wrapperCol,
      ShowViewModal,
      ShowViewDireccion,
      ShowDetalleDireccion,
      ShowViewMap,
      frmDirection,
      SaveRecord,
      RetornarCliente,
    };
  },

  mounted() {
    this.ClearDirection();
  },
  methods: {
    setPlace(ObjPlace) {
      console.log("setplace ObjPlace ",ObjPlace)
      // let ObjPlace = {};
      this.ClearDirection();
      
      try {

        this.frmDirection.Direccion = ObjPlace.formatted_address;
        for (let i = 0; i < ObjPlace.address_components.length; i++) {
          switch (ObjPlace.address_components[i].types[0]) {
            case "street_number":
            case "route":
              this.frmDirection.Ruta =
                ObjPlace.address_components[i].long_name || null;
              break;
            case "neighborhood":
            case "sublocality_level_1":
            case "sublocality":
              this.frmDirection.Sector =
                ObjPlace.address_components[i].long_name;
              break;
            case "locality":
              this.frmDirection.Localidad =
                ObjPlace.address_components[i].long_name;
              break;
            case "administrative_area_level_2":
              this.frmDirection.Ciudad =
                ObjPlace.address_components[i].long_name;
              break;
            case "administrative_area_level_1":
              this.frmDirection.Depto =
                ObjPlace.address_components[i].long_name;
              break;
            case "country":
              this.frmDirection.Pais = ObjPlace.address_components[i].long_name;
              break;
            case "postal_code":
              this.frmDirection.CodPos =
                ObjPlace.address_components[i].long_name;
              break;
            default:
              break;
          }
        }
        if (!this.frmDirection.Ciudad)
          this.frmDirection.Ciudad = this.frmDirection.Localidad;
        if (!this.frmDirection.Sector)
          this.frmDirection.Sector = this.frmDirection.Localidad;
        this.frmDirection.UrlPlace = ObjPlace.url;
        this.frmDirection.Point.lng = ObjPlace.geometry.viewport.Ra.g;
        this.frmDirection.Point.lat = ObjPlace.geometry.viewport.Ab.g;
        this.markers = [
          {
            id: 1,
            position: {
              lat: this.frmDirection.Point.lat,
              lng: this.frmDirection.Point.lng,
            },
          },
        ];
        this.PointCenter = {
          lat: this.frmDirection.Point.lat,
          lng: this.frmDirection.Point.lng,
        };
        console.log("tres frm ", this.frmDirection);
      } catch (error) {
        return Swal.fire({
          icon: "error",
          title: "Servicios Google Maps",
          text: "Error: " + error,
        });
      }
    },
    openMarker(id) {
      this.openedMarkerID = id;
    },
    ClearDirection() {
      this.ShowDetalleDireccion = false;
      this.frmDirection.Direccion = "";

      this.frmDirection.Ruta = "";
      this.frmDirection.Sector = "";
      this.frmDirection.Localidad = "";
      this.frmDirection.Ciudad = "";
      this.frmDirection.Depto = "";

      this.frmDirection.Ciudad = "";
      this.frmDirection.Sector = "";
      this.frmDirection.UrlPlace = "";
      this.frmDirection.Point.lng = 0;
      this.frmDirection.Point.lat = 0;
      this.frmDirection.IncrementChange=0;
      this.MDireccion = this.frmDirection.Direccion;
      this.ShowDireccionTrabajo = this.MDireccion.length > 0;
      setTimeout(() => {
        this.ShowDireccionTrabajo = false;
      }, 3000);
    },

    handleOk() {
      console.log("handleOk ");
      this.ShowViewModal = false;
    },
  },
});
</script>
<style>
#map {
  height: 100%;
}

/* Optional: Makes the sample page fill the window. */
html,
body {
  height: 100%;
  margin: 0;
  padding: 0;
}
.VSAutoComplemento {
  width: 450px;
  height: 31px;
}
.VSCarNivel1 {
  width: 1150px;
  height: 100%;
}
</style>
