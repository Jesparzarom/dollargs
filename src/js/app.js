const { createApp } = Vue;
import { getTiposCambio, getTiposCambioAll } from "./money_converter.js";

createApp({
  data() {
    return {
      cardTitle: "Conversor de Dólares a Pesos Argentinos",
      pesos: 0,
      dolares: 0,
      tipo: "oficial",
      tipos: {},
      cotizaciones: {},
      moneda: "",
      descripcion: "",
      descripciones: {
        oficial:
          "El valor del dólar establecido por el Banco Central de Argentina, utilizado en operaciones de comercio exterior y otras transacciones legales.",
        blue: "El valor del dólar en el mercado informal, donde se compran y venden dólares sin la intervención del Banco Central.",
        bolsa:
          "El valor del dólar que surge de la compra y venta de bonos como el AL30 y el GD30, que cotizan en pesos y dólares.",
        contadoconliqui:
          "El valor del dólar que resulta de transferir activos financieros al exterior, comprando bonos o acciones en el mercado local y vendiéndolos en el extranjero.",
        solidario:
          "El valor del dólar utilizado para ahorro o turismo en el exterior. Incluye el impuesto PAIS del 30% y la percepción del 35% a cuenta de Ganancias y Bienes Personales.",
        mayorista:
          "El valor del dólar para operaciones de grandes volúmenes entre bancos, empresas e instituciones financieras, realizadas en el Mercado Único y Libre de Cambios (MULC).",
      },
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
      this.cardTitle = "Conversor de Dólares a Pesos Argentinos";
      this.descripcion = this.descripciones[this.tipo];
    },

    pesosXDolares() {
      const tipoCambio = this.tipos[this.tipo];
      const dolares = this.pesos / tipoCambio;
      this.dolares = dolares;
      this.moneda = "ars";
      this.cardTitle = "Conversor de Pesos Argentinos a Dólares";
      this.descripcion = this.descripciones[this.tipo];
    },

    dolaresXPesos() {
      const tipoCambio = this.tipos[this.tipo];
      const pesos = this.dolares * tipoCambio;
      this.pesos = pesos;
      this.moneda = "usd";
      this.cardTitle = "Conversor de Dólares a Pesos Argentinos";
      this.descripcion = this.descripciones[this.tipo];
    },
  },

  //on Mounted
  mounted() {
    getTiposCambio().then((tiposCambio) => {
      this.tipos = tiposCambio;
      this.refreshVals();
    });

    getTiposCambioAll().then((tiposCambioAll) => {
      this.cotizaciones = tiposCambioAll;
    });
  }
}).mount("#app");
