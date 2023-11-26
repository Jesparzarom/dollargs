const { createApp } = Vue;
import { getTiposCambio, dolarTarjeta } from "./money_converter.js";
import { obtenerDescripciones } from "./descripciones.js";

// Creación de la aplicación Vue
createApp({
  // Definición de los datos de la instancia Vue
  data() {
    return {
      cardTitle: "Conversor de Dólares a Pesos Argentinos", // Título de la tarjeta
      tipo: "oficial", // Tipo de cambio a utilizar
      descripcion: "", // Descripción del tipo de cambio
      moneda: "", // Moneda seleccionada
      dolares: 0, // Cantidad de dólares
      pesos: 0, // Cantidad de pesos
      cotizaciones: {}, // Cotizaciones de las monedas
      descripciones: {}, // Descripciones de los tipos de cambio
      tipos: {}, // Tipos de cambio
    };
  },

  // Definición de los métodos de la instancia Vue
  methods: {
    // Método para cambiar el tipo de cambio
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

    // Método para actualizar los valores de las monedas
    refreshVals() {
      this.dolares = 1;
      this.pesos = this.tipos[this.tipo];
      this.moneda = "";
      this.cardTitle = "Conversor de Dólares a Pesos Argentinos";
      this.descripcion = this.descripciones[this.tipo];
    },

    // Método para convertir pesos a dólares
    pesosXDolares() {
      const tipoCambio = this.tipos[this.tipo];
      const dolares = this.pesos / tipoCambio;
      this.dolares = dolares;
      this.moneda = "ars";
      this.cardTitle = "Conversor de Pesos Argentinos a Dólares";
      this.descripcion = this.descripciones[this.tipo];
    },

    // Método para convertir dólares a pesos
    dolaresXPesos() {
      const tipoCambio = this.tipos[this.tipo];
      const pesos = this.dolares * tipoCambio;
      this.pesos = pesos;
      this.moneda = "usd";
      this.cardTitle = "Conversor de Dólares a Pesos Argentinos";
      this.descripcion = this.descripciones[this.tipo];
    },
  },

  // Método que se ejecuta cuando la instancia Vue se monta
  mounted() {
    // Obtención de los tipos de cambio
    getTiposCambio()
      .then((tiposCambio) => {
        this.tipos = tiposCambio;
        // Obtención del valor del dólar tarjeta
        dolarTarjeta()
          .then((dolar) => {
            this.tipos.tarjeta = dolar.tarjeta;
            console.log(this.tipos);
            this.refreshVals();
          })
          // Manejo de errores al obtener el valor del dólar tarjeta
          .catch((error) => {
            console.error(
              "Error obteniendo el valor del dólar tarjeta: ",
              error
            );
          });
      })
      // Manejo de errores al obtener los tipos de cambio
      .catch((error) => {
        console.error("Error obteniendo los tipos de cambio: ", error);
      });

    // Obtención de las descripciones de los tipos de cambio
    this.descripciones = obtenerDescripciones();
  },
}).mount("#app"); // Montaje de la aplicación Vue en el elemento con el ID "app"
