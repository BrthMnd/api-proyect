# Notas de Brandon

PD: no tocar la carpeta ImgForMd que con ella se muestran las imágenes de ejemplo

---

## La Estructura

### Actual

![estructura distinta](/ImgForMd/ejemplo1.png)

### La que maneja el proyecto

![estructura del proyecto](/ImgForMd/ejemplo2.png)
![estructura del proyecto](/ImgForMd/ejemplo3.png)

---

Es importante que la estructura sea la misma, teniendo en cuenta que tienes alguna que otra carpeta de mas, no debería ser un problema, solo tienes que colocar todo dentro de la carpeta src.

> teniendo en cuenta que en el .gitignore tienes archivos que buscan la raíz del proyecto también deberías cambiarlo.

---

## los Path / direcciones

![dirección en conflicto](/ImgForMd/ejemplo4.png)

---

las direcciones entran en conflicto con la estructura del proyecto ya preestablecida por el grupo, si no sigue las normas o la metodología que nosotros utilizamos cuando juntemos en la main y en the cloud no servirá.

---

## Utilizo la api pero no me busca ni me autentica ningún usuario.

## ![falta usuarios](/ImgForMd/ejemplo5.png)

Busco usuarios en POSTMAN pero no me funciona, al revisar sale al hacer las búsquedas en la base de datos crea la colección user, pero no la busca ni crea nuevos usuarios (documentos) debido que no tiene manera de manipular, el control de esto se debe hacer en la carpeta routes/usuarios.

## Buenas Practicas - BD

![falta usuarios](/ImgForMd/ejemplo6.png)
![falta usuarios](/ImgForMd/ejemplo7.png)

---

Mongodb es una base de datos no relacional, y mucho de su estructura no tiene orden, por lo tanto hacemos lo de las anteriores imágenes para que tengan un sentido, para que sepas hacerlo revisa nuestros models.

---

# Notas de Dufainer

# Notas Cristian

# Errores

-

## Instalación

Para instalar las dependencias del proyecto, ejecuta el siguiente comando:

```shell
npm install
```

## Configuración

Para configurar el proyecto, necesitas crear un archivo llamado `.env` en la raíz de tu proyecto y añadir las siguientes variables de entorno:

```dotenv
PORT= El puerto donde se ejecutará tu aplicación (por ejemplo, 3000)
MG_DATABASE_LINK= La cadena de conexión a tu base de datos MongoDB (por ejemplo, mongodb://localhost/testname)
GOOGLE_ACC_USER=el correo desde el cual la app enviara correos.
GOOGLE_ACC_PASWORD=la contraseña de app de la cuenta.
```

## Uso

Para iniciar la aplicación, ejecuta el siguiente comando:

```shell
npm start
```

Esto iniciará el servidor en el puerto especificado y se conectará a la base de datos MongoDB.

Para iniciar la aplicación en modo de prueba (usando nodemon), ejecuta el siguiente comando:

```shell
npm start-dev
```

Esto iniciará el servidor en el puerto especificado y se conectará a la base de datos, se volverá a ejecutar el servidor si algun archivo cambia

Para poblar la base de datos con algunos datos de prueba, ejecuta el siguiente comando:

```shell
npm run db:seed
```

Esto ejecutará el script `db/seed.js` que creará algunas colecciones y documentos en tu base de datos.

## Controladores y Rutas

A continuación se presenta una lista de controladores y las rutas correspondientes en la aplicación:

### Controlador: countriesController

Países

- `GET /countries/country-names-codes`: Obtener nombres de países y sus códigos de llamada.
- `GET /countries`: Obtener la lista de todos los países.
- `GET /countries/:alpha3Code`: Obtener información sobre un país específico mediante su código alfa3.
- `GET /countries/search/:searchTerm`: Buscar países por nombre.
- `GET /countries/region/:regionName`: Obtener una lista de países dentro de una región específica.
- `GET /countries/:alpha3Code/summary`: Obtener un resumen de información sobre un país mediante su código alfa3.

### Controlador: rolController

Roles y Permisos

- `GET /admin-rol/roles`: Obtener todos los roles.
- `GET /admin-rol/role/:id`: Obtener un rol mediante su id.
- `PUT /admin-rol/role/:id`: Edita un rol mediante su id.
- `GET /admin-rol/permisos`: Obtener todos los permisos.
- `GET /admin-rol/permision/:id`: Obtener un permiso mediante su id.
- `PUT /admin-rol/permision/:id`: Edita un permiso mediante su id.
- `GET /admin-rol//permision/:id/users`: Obtener usuarios por permiso.
- `GET /admin-rol/lista-roles-usuarios`: Obtener una lista de roles y los usuarios asociados.
- `GET /admin-rol/lista-permisos-usuarios`: Obtener una lista de permisos y los usuarios que los tienen.
- `POST /admin-rol/roles`: Crear un nuevo rol.
- `POST /admin-rol/permisos`: Crear un nuevo permiso.
- `POST /admin-rol/usuarios/:id_usuario/permisos/:id_permiso`: Asignar un permiso a un usuario.
- `DELETE /admin-rol/usuarios/:userId/permisos/:permisoId`: Revocar un permiso de un usuario.
- `POST /admin-rol/usuarios/:id_usuario/roles/:roleId`: Asignar un rol a un usuario.
- `DELETE /admin-rol/usuarios/:userId/roles`: Revocar un rol de un usuario.
- `GET /admin-rol/usuarios/:userId/permisos`: Obtener todos los permisos de un usuario.
- `DELETE /admin-rol/role/:id`: Eliminar un rol por su ID.
- `DELETE /admin-rol/permiso/:id`: Eliminar un permiso por su ID.

### Controlador: sesionController

#### Usuarios

- `POST /users`: Crear un nuevo usuario (rol por defecto).
- `POST /users/:rol`: Crear un nuevo usuario con un rol especifico.
- `GET /users`: Obtener todos los usuarios.
- `GET /users/all`: Obtener todos los usuarios (incluyendo contraseñas).
- `GET /users/email/:correo`: Obtener un usuario por su correo electrónico.
- `POST /users/login`: Iniciar sesión de usuario.
- `GET /users/id/:id`: Obtener un usuario por su ID.
- `PUT /users/:id`: Actualizar un usuario por su ID.
- `PUT /users/password/:correo`: Actualizar la contraseña de usuario por su correo.
- `DELETE /users/:id`: Eliminar un usuario por su ID.

### Otras Rutas

- `GET /`: Inicio o presentación de la API.
- `POST /send-message`: Enviar mensajes a WhatsApp.
- `POST /send-email`: Enviar mensajes al correo.
- `404`: Ruta no encontrada (Página no encontrada).

#### Rutas para Encargado, Propietario e Inmueble

##### Encargado

- `GET /api/inmuebles/encargado/`: Obtener todos los encargados.
- `GET /api/inmuebles/encargado/:id`: Obtener un encargado por su ID.
- `POST /api/inmuebles/encargado/`: Crear un nuevo encargado.
- `PUT /api/inmuebles/encargado/:id`: Actualizar un encargado por su ID.
- `DELETE /api/inmuebles/encargado/:id`: Eliminar un encargado por su ID.

##### Propietario

- `GET /api/inmuebles/propietario/`: Obtener todos los propietarios.
- `GET /api/inmuebles/propietario/:id`: Obtener un propietario por su ID.
- `POST /api/inmuebles/propietario/`: Crear un nuevo propietario.
- `PUT /api/inmuebles/propietario/:id`: Actualizar un propietario por su ID.
- `DELETE /api/inmuebles/propietario/:id`: Eliminar un propietario por su ID.

##### Inmueble

- `GET /api/inmuebles/inmueble/`: Obtener todos los inmuebles.
- `GET /api/inmuebles/inmueble/:id`: Obtener un inmueble por su ID.
- `POST /api/inmuebles/inmueble/`: Crear un nuevo inmueble.
- `PUT /api/inmuebles/inmueble/:id`: Actualizar un inmueble por su ID.
- `DELETE /api/inmuebles/inmueble/:id`: Eliminar un inmueble por su ID.

#### Rutas para Ofertas

##### Oferta

- `GET /api/ofertas/oferta/`: Obtener todas las ofertas.
- `GET /api/ofertas/oferta/:id`: Obtener una oferta por su ID.
- `POST /api/ofertas/oferta/`: Crear una nueva oferta.
- `PUT /api/ofertas/oferta/:id`: Actualizar una oferta por su ID.
- `DELETE /api/ofertas/oferta/:id`: Eliminar una oferta por su ID.

##### Estado de Candidato

- `GET /api/ofertas/estado_candidato/`: Obtener todos los estados de candidato.
- `GET /api/ofertas/estado_candidato/:id`: Obtener un estado de candidato por su ID.
- `POST /api/ofertas/estado_candidato/`: Crear un nuevo estado de candidato.
- `PUT /api/ofertas/estado_candidato/:id`: Actualizar un estado de candidato por su ID.
- `DELETE /api/ofertas/estado_candidato/:id`: Eliminar un estado de candidato por su ID.

##### Estado de Contrato

- `GET /api/ofertas/estado_contrato/`: Obtener todos los estados de contrato.
- `GET /api/ofertas/estado_contrato/:id`: Obtener un estado de contrato por su ID.
- `POST /api/ofertas/estado_contrato/`: Crear un nuevo estado de contrato.
- `PUT /api/ofertas/estado_contrato/:id`: Actualizar un estado de contrato por su ID.
- `DELETE /api/ofertas/estado_contrato/:id`: Eliminar un estado de contrato por su ID.

##### Candidato

- `GET /api/ofertas/candidato/`: Obtener todos los candidatos.
- `GET /api/ofertas/candidato/:id`: Obtener un candidato por su ID.
- `GET /api/ofertas/candidato/oferta/:id`: Obtener candidatos por oferta.
- `POST /api/ofertas/candidato/`: Crear un nuevo candidato.
- `PUT /api/ofertas/candidato/:id`: Actualizar un candidato por su ID.
- `PUT /api/ofertas/candidato/add/:id`: Agregar un nuevo candidato.
- `PUT /api/ofertas/candidato/delete/:id`: Eliminar un candidato.
- `DELETE /api/ofertas/candidato/:id`: Eliminar un candidato por su ID.

##### Contrato

- `GET /api/ofertas/contrato/`: Obtener todos los contratos.
- `GET /api/ofertas/contrato/:id`: Obtener un contrato por su ID.
- `POST /api/ofertas/contrato/`: Crear un nuevo contrato.
- `PUT /api/ofertas/contrato/:id`: Actualizar un contrato por su ID.
- `DELETE /api/ofertas/contrato/:id`: Eliminar un contrato por su ID.

#### Rutas para Proveedores

##### Calificación

- `GET /api/proveedores/calificacion/`: Obtener todas las calificaciones.
- `GET /api/proveedores/calificacion/:id`: Obtener una calificación por su ID.
- `POST /api/proveedores/calificacion/`: Crear una nueva calificación.
- `PUT /api/proveedores/calificacion/:id`: Actualizar una calificación por su ID.
- `DELETE /api/proveedores/calificacion/:id`: Eliminar una calificación por su ID.

##### Categoría

- `GET /api/proveedores/categoria/`: Obtener todas las categorías.
- `GET /api/proveedores/categoria/:id`: Obtener una categoría por su ID.
- `POST /api/proveedores/categoria/`: Crear una nueva categoría.
- `PUT /api/proveedores/categoria/:id`: Actualizar una categoría por su ID.
- `DELETE /api/proveedores/categoria/:id`: Eliminar una categoría por su ID.

##### Proveedor

- `GET /api/proveedores/proveedor/`: Obtener todos los proveedores.
- `GET /api/proveedores/proveedor/:id`: Obtener un proveedor por su ID.
- `POST /api/proveedores/proveedor/`: Crear un nuevo proveedor.
- `PUT /api/proveedores/proveedor/:id`: Actualizar un proveedor por su ID.
- `DELETE /api/proveedores/proveedor/:id`: Eliminar un proveedor por su ID.

##### Servicios

- `GET /api/proveedores/servicios/`: Obtener todos los servicios.
- `GET /api/proveedores/servicios/:id`: Obtener un servicio por su ID.
- `POST /api/proveedores/servicios/`: Crear un nuevo servicio.
- `PUT /api/proveedores/servicios/:id`: Actualizar un servicio por su ID.
- `DELETE /api/proveedores/servicios/:id`: Eliminar un servicio por su ID.

## Autor

Este proyecto fue creado por Santiago.

## Licencia

Este proyecto está licenciado bajo la licencia ISC.
