const dolarOficial = `
  El valor del dólar establecido por el Banco Central de Argentina, 
  utilizado en operaciones de comercio exterior y otras transacciones legales.
  `;

const dolarBlue = `
  El valor del dólar en el mercado informal, donde se compran y venden dólares 
  sin la intervención del Banco Central.
  `;

const dolarMEP = `
  El valor del dólar que surge de la compra y venta de bonos como el AL30 y el GD30, 
  que cotizan en pesos y dólares.
  `;

const dolarCCL = `
  El valor del dólar que resulta de transferir activos financieros al exterior, 
  comprando bonos o acciones en el mercado local y vendiéndolos en el extranjero.
  `;

const dolarTarjeta = `
  El valor del dólar utilizado para ahorro o turismo en el exterior. 
  Incluye el impuesto PAIS del 30%, la percepción del 100% a cuenta de Ganancias y 25% Bienes Personales.
  `;

const dolarMayorista = `
  El valor del dólar para operaciones de grandes volúmenes entre bancos, 
  empresas e instituciones financieras, realizadas en el Mercado Único y Libre de Cambios (MULC).
  `;


/**************************************************/
/**** DESCRIPCIONES SOBRE LOS TIPOS DE CAMBIO ****/
/************************************************/
export function obtenerDescripciones() {
  const descripciones = {
    oficial: dolarOficial,
    blue: dolarBlue,
    bolsa: dolarMEP,
    contadoconliqui: dolarCCL,
    tarjeta: dolarTarjeta,
    mayorista: dolarMayorista,
  };
  return descripciones;
}
