const URL_BASE = "https://dolarapi.com/v1/dolares/";

/**** OBTENER DATOS SOBRE LOS TIPOS DE CAMBIO ****/
// Obtiene los tipos de cambio de la API
export async function getTiposCambio() {
  // Realiza una solicitud a la API
  const res = await fetch(URL_BASE);
  // Espera a que la respuesta se convierta en JSON
  const data = await res.json();

  // Crea un objeto vacío para almacenar los tipos de cambio
  const tiposCambio = {};
  // Itera sobre cada elemento en los datos
  data.forEach((item) => {
    // Si el tipo de cambio no es "solidario"
    if (item.casa != "solidario") {
      // Agrega el tipo de cambio al objeto, convirtiendo el nombre a minúsculas
      // Utiliza el valor de compra si está disponible, de lo contrario utiliza el valor de venta
      tiposCambio[item.casa.toLowerCase()] = item.compra
        ? item.compra
        : item.venta;
    }
  });
  // Devuelve el objeto con los tipos de cambio
  return tiposCambio;
}

/****** OBTENER DATOS SOBRE DOLAR TARJETA ******/

// Esta función asincrónica obtiene el valor del dólar tarjeta de la API
export async function dolarTarjeta() {
  // Realiza una solicitud a la API
  const response = await fetch(URL_BASE + "tarjeta");
  // Espera a que la respuesta se convierta en JSON
  const data = await response.json();
  // Crea un objeto con el tipo de cambio "tarjeta" y su valor
  // Utiliza el valor de compra si está disponible, de lo contrario utiliza el valor de venta
  const dt = {
    [data.casa.toLowerCase()]: data.compra ? data.compra : data.venta,
  };
  // Devuelve el objeto con el valor del dólar tarjeta
  return dt;
}
