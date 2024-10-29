Feature: Validaciones de la API de solicitud de recogida

  Scenario Outline: Validar la fecha de recogida
    Given la solicitud de recogida tiene la fecha "<fecha>"
    When se envía la solicitud
    Then el código de respuesta debe ser "<codigoRespuesta>"
    Then el mensaje debe ser "<mensaje>"

  Examples:
    | fecha         | codigoRespuesta | mensaje                                                           |
    | 2024-10-31    | 200             | Solicitud recogida programada exitosamente                        |
    | 2023-10-31    | 200             | El campo fecha: 31-10-2023, no debe ser menor a la fecha actual.  |

  Scenario: Validar solicitud duplicada
    Given una solicitud existente con la dirección "Cra 23 # 232" y fecha de recogida "2024-10-31"
    When se envía la solicitud
    Then el código de respuesta debe ser "200"
    Then el mensaje debe indicar "Error, Ya existe una recogida programada para hoy"


  Scenario: Validar caracteres alfanuméricos en la dirección
    Given la solicitud de recogida tiene la fecha "10-29-2024"
    When se envía la solicitud
    Then el código de respuesta debe ser "200"
    Then el mensaje debe indicar "El campo fecha debe ser diferente de vacio y debe tener un formato valido."