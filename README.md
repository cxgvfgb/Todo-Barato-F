# Todo Barato — Frontend

Aplicación web para consultar y registrar marcas. Está construida con React y Vite, y consume una API REST mediante Axios.

## Requisitos

- Node.js y npm.
- API backend disponible. En desarrollo, Vite reenvía las peticiones `/api` a `http://localhost:8080` (el puerto local predeterminado de Spring Boot).

Si PowerShell no reconoce `npm`, prueba con la ruta completa de npm que está incluida en el entorno de desarrollo de JetBrains:

```powershell
& "$env:LOCALAPPDATA\JetBrains\IntelliJIdea2026.2\acp-agents\.runtimes\node\24.19.0\npm.cmd" run dev
```

Si esa ruta no existe en tu equipo, instala Node.js y reinicia la terminal para actualizar el `PATH`.

Si la página muestra `No se pudo cargar la lista de marcas` o `No se pudo crear la marca`, comprueba que el backend esté iniciado y escuchando en el puerto `8080`. Puedes verificarlo abriendo `http://localhost:8080/api/v1/marcas`; el frontend por sí solo no guarda datos.

## Puesta en marcha

```bash
npm install
npm run dev
```

Abre la URL que Vite muestre en la terminal (normalmente `http://localhost:5173`). La página principal redirige a `/marcas`.

### URL de la API

Por defecto, el frontend usa `/api/v1` como base y el proxy de Vite lo envía al backend local. Para usar otra base URL, crea un archivo `.env.local` en la raíz:

```env
VITE_API_BASE_URL=http://localhost:8081/api/v1
```

Reinicia el servidor de desarrollo después de cambiar variables `VITE_*`. En una compilación de producción, configura `VITE_API_BASE_URL` con la URL accesible desde el navegador; el proxy de Vite solo se aplica durante desarrollo.

## Funcionalidad

- Lista marcas mostrando ID, nombre, estado, fecha de creación y acciones.
- Registra y edita marcas con un nombre obligatorio de hasta 200 caracteres.
- Elimina marcas después de pedir confirmación.
- Muestra mensajes de carga y errores de consulta o modificación.

La API debe proporcionar estos endpoints bajo la base URL configurada:

| Método | Ruta | Uso |
| --- | --- | --- |
| `GET` | `/marcas` | Obtener la lista de marcas. |
| `POST` | `/marcas` | Crear una marca enviando nombre, estado, precio, cantidad y total. |
| `PUT` | `/marcas/{idmarca}` | Actualizar nombre, estado, precio, cantidad y total. |
| `DELETE` | `/marcas/{idmarca}` | Eliminar una marca por su ID. |

## Comandos

```bash
npm run dev      # servidor de desarrollo
npm run build    # compilación de producción en dist/
npm run preview  # vista previa local de la compilación
npm run lint     # revisión estática con Oxlint
```

## Organización del código

```text
src/
├── config/       # configuración de la API
├── controllers/  # lógica de consulta y validación de marcas
├── models/       # modelo y conversión de datos de Marca
├── routes/       # rutas de la aplicación
├── services/     # cliente HTTP y llamadas a la API
└── views/        # página y componentes de interfaz
```
