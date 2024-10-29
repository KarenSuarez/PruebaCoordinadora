Feature: Validaciones de la API de solicitud de recogida

  Scenario Outline: Validar la fecha de recogida
    Given la solicitud de recogida tiene la fecha "<fecha>"
    When se envía la solicitud
    Then el código de respuesta debe ser "<codigoRespuesta>"
    Then el mensaje debe indicar "<mensaje>"

  Examples:
    | fecha         | codigoRespuesta | mensaje                                                            |
    | 2024-10-31    | 200             | "Solicitud recogida programada exitosamente"                       |

  Scenario: Validar solicitud duplicada
    Given una solicitud existente con la dirección "Cra 23 # 232" y fecha de recogida "2024-11-03"
    When se envía la solicitud
    Then el código de respuesta debe ser "200"
    Then el mensaje debe indicar "Error, Ya existe una recogida programada para hoy"

  Scenario: Validar caracteres alfanuméricos en la dirección
    Given la solicitud de recogida tiene la fecha "2024-10-31"
    And la dirección contiene caracteres no permitidos Cra 23 # 232 !@#
    When se envía la solicitud
    Then el código de respuesta debe ser "400"
    Then el mensaje debe indicar "La dirección contiene caracteres no permitidos."