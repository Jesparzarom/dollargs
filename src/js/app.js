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
      descripcion : "",
      descripciones: {
        oficial:
          "Es el tipo de cambio que fija el Banco Central de la República Argentina y que se aplica para las operaciones de comercio exterior y otras transacciones legales.",
        blue: "Es el tipo de cambio que se negocia en el mercado informal o paralelo, donde se compran y venden dólares sin la intervención del Banco Central ni el cumplimiento de las normas cambiarias.",
        bolsa:
          "Es el tipo de cambio que surge de la compra y venta de bonos o acciones que cotizan en pesos y en dólares, tanto en el mercado local como en el extranjero. También se conoce como dólar MEP o dólar bolsa.",
        contadoconliqui:
          "Es el tipo de cambio que surge de la transferencia de activos financieros al exterior, mediante la compra de bonos o acciones en el mercado local y su posterior venta en el mercado extranjero. También se conoce como dólar CCL.",
        solidario:
          "Es el tipo de cambio que se aplica para las operaciones de ahorro o turismo en el exterior, que incluye el impuesto PAIS del 30% y la percepción del 35% a cuenta de Ganancias y Bienes Personales. También se conoce como dólar tarjeta.",
        mayorista:
          "Es el tipo de cambio que se utiliza para las operaciones de grandes volúmenes entre bancos, empresas e instituciones financieras, que se realizan en el Mercado Único y Libre de Cambios (MULC).",
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
  },
}).mount("#app");
