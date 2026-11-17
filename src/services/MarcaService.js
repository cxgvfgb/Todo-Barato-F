import httpClient from "./httpClient";

const RESOURCE = "/marcas";

const MarcaService = {
    listar: () => httpClient.get(RESOURCE),
    crear: (payload) => httpClient.post(RESOURCE, payload),
    actualizar: (id, payload) => httpClient.put(`${RESOURCE}/${id}`, payload),
    eliminar: (id) => httpClient.delete(`${RESOURCE}/${id}`),
};

export default MarcaService;
