export async function getTiposCambio() {
  const res = await fetch("https://dolarapi.com/v1/dolares");
  const data = await res.json();

  // Procesar los datos y crear un objeto con la estructura deseada
  const tiposCambio = {};
  data.forEach((item) => {
    tiposCambio[item.casa.toLowerCase()] = item.compra
      ? item.compra
      : item.venta;
  });

  return tiposCambio;
}

export async function getTiposCambioAll() {
  const res = await fetch("https://dolarapi.com/v1/dolares");
  const data = await res.json();

  // Procesar los datos y crear un objeto con la estructura deseada
  const tiposCambio = {};
  data.forEach((item) => {
    tiposCambio[item.casa.toLowerCase()] = {
      compra: item.compra,
      venta: item.venta,
    };
  });

  return tiposCambio;
}
