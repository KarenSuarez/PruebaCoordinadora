const { Given, When, Then, Before, After } = require("@cucumber/cucumber");
const { request } = require("@playwright/test");
const assert = require("assert");

let response;
let requestData = {
  tipoEnvio: "1",
  tipoProducto: "4",
  indicativo: "57",
  tipoDocumento: "13",
  email: "ana@gmail.com",
  personaEntrega: "1",
  indicativoEntrega: "57",
  medidasAproximadas: [
    {
      id: 2,
      tipoPaq: "Par de zapatos",
      nombrePaq: "Par de za...",
      cantidad: 1,
    },
  ],
  ciudad: "Envigado (Ant)",
  via: "",
  numero: "",
  detalle: "PARQUE SAN JOSE BOD 14",
  tipoVia: 16,
  nombres: "prueba",
  apellidos: "prueba1",
  documento: "863325689",
  celular: "3005777777",
  ciudadDetalle: {
    nombre_terminal_operativa: "Medellin",
    tipo_servicio: "A",
    dane_ciudad: "05266",
    dane_actual: "05266000",
    ciudad_tarifa: "05266000",
    sms: true,
    cubre_mqp: true,
    codigo_postal: "055428",
    terminal_operativa: 2,
    cubre_me: true,
    area_telefono: 4,
    observaciones2: "FCE- RD- FD- RCE",
    codigo: "05266000",
    tipo_poblacion: "D",
    activo: true,
    codigo_terminal: 2,
    codigo_interno: 204,
    mensajeria: true,
    cubre_mm: false,
    departamento: "05",
    cubre_cm: false,
    nombre: "Envigado (Ant)",
    abreviado: "ENVIGADO",
    nombre_terminal: "Medellin",
    observaciones: "",
  },
  direccion: "Cra 23 # 232",
  fechaRecogida: "2024-11-03",
  nombreEntrega: "prueba",
  apellidosEntrega: "prueba1",
  celularEntrega: "3045677777",
  emailUsuario: "anar.7@gmail.com",
  descripcionTipoVia: "Kilómetro",
  aplicativo: "envios",
};

let apiRequestContext;

Before(async () => {
  apiRequestContext = await request.newContext();
});

After(async () => {
  await apiRequestContext.dispose();
});

Given("la solicitud de recogida tiene la fecha {string}", async (fecha) => {
  requestData.fechaRecogida = fecha;
});

Given(
  "una solicitud existente con la dirección {string} y fecha de recogida {string}",
  async (direccion, fecha) => {
    requestData = {
      ...requestData,
      direccion: direccion,
      fechaRecogida: fecha,
    };
    await sendRequest();
  }
);

When("se envía la solicitud", async () => {
  response = await sendRequest();
  console.log(`Estado de respuesta: ${response.status()}`);
  console.log(
    `Cuerpo de la respuesta: ${JSON.stringify(await response.json(), null, 2)}`
  );
});

Then("el código de respuesta debe ser {string}", async (expectedStatusCode) => {
  assert.strictEqual(response.status(), parseInt(expectedStatusCode));
});

Then("el mensaje debe indicar {string}", async (expectedMessage) => {
    const responseBody = await response.json();
    console.log(`Mensaje recibido: ${responseBody.data.id_recogida.message}`);
    assert.strictEqual(responseBody.data.id_recogida.message, expectedMessage);
  });
  
  

async function sendRequest() {
  return await apiRequestContext.post(
    "https://apiv2-test.coordinadora.com/recogidas/cm-solicitud-recogidas-ms/solicitud-recogida",
    {
      data: requestData,
    }
  );
}
