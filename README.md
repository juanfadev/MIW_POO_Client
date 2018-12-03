# MIW_POO_Client
JS Client
URL: https://juanfpo96.github.io/MIW_POO_Client/

Desplegado usando Github Pages.

Características a tener en cuenta:
* Uso de ASYNC/AWAIT
* Uso de promesas
* Uso de modulos siguiendo el estandar ES6 (Actualmente implementado en Safari 10.1. Chrome 61. Firefox 60. Edge 16. o superiores)
* Validación en el cliente usando el servicio de validación de Google a través de un nuevo endpoint solo disponible en el servidor NodeJS (por cuestiones de tiempo no se pudo realizar en todos los servidores, por lo que siempre valida contra la ruta relativa /validate del servidor NodeJS)
* Cambio de servidor usando un dropdown

El cliente obtiene los datos en JSON y manda los datos en JSON.

En la pantalla de entities se ven un ejemplo de entidad y se puede crear a partir de ella, modificando el textarea.
En la pantalla de cada entidad se muestra una lista con todos los JSON disponibles de esa entidad. Se puede actualizar o eliminar. Y sale un alert de confirmación.

