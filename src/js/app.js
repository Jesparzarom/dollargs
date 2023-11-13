const { createApp } = Vue;
import { getTiposCambio, getTiposCambioAll } from "./money_converter.js";

createApp({
  data() {
    return {
      cardTitle: "",
      pesos: 0,
      dolares: 0,
      tipo: "oficial",
      tipos: {},
      cotizaciones: {},
      moneda: "",
    };
  },
  // methods
  methods: {
    cambiarTipo() {
      if (this.moneda) {
        if (this.moneda === "usd") {
          this.dolaresXPesos();
        } else {
          this.pesosXDolares();
        }
      } else {
        this.refreshVals();
      }
    },

    refreshVals() {
      this.dolares = 1;
      this.pesos = this.tipos[this.tipo];
      this.moneda = "";
    },

    pesosXDolares() {
        const tipoCambio = this.tipos[this.tipo];
        const dolares = this.pesos / tipoCambio;
        this.dolares = dolares;
        this.moneda = "ars";
    },


    dolaresXPesos() {

        const tipoCambio = this.tipos[this.tipo];
        const pesos = this.dolares * tipoCambio;
        this.pesos = pesos;
        this.moneda = "usd";
    },
  },

  //on Mounted
  mounted() {
    getTiposCambio().then(
      (tiposCambio) => ((this.tipos = tiposCambio), this.refreshVals())
    );

    getTiposCambioAll().then(
      (tiposCambioAll) => (this.cotizaciones = tiposCambioAll)
    );
  },
}).mount("#app");
