import MarcaService from "../services/MarcaService";
import { Marca } from "../models/Marca";

const MarcaController = {
    async listarMarcas() {
        const { data } = await MarcaService.listar();
        return data.map((item) => Marca.fromResponse(item))
    },
    async crearMarca(datos) {
        const marca = new Marca(datos);
        if (!marca.isValid() || !marca.isValidInventory()) {
            throw new Error("El nombre de la marca es obligatorio y deber tener máximo 200 caracteres");
        }
        try{
            const { data } = await MarcaService.crear(marca.toRequestPayload());
            return Marca.fromResponse(data);
        }catch(err){
            const mensajeBackend = err.response?.data?.message;
            throw new Error(mensajeBackend || "No se pudo crear la marca");
        }
    },
    async actualizarMarca(id, datos) {
        const marca = new Marca({ idmarca: id, ...datos });
        if (!marca.isValid() || !marca.isValidInventory()) {
            throw new Error("El nombre de la marca es obligatorio y debe tener máximo 200 caracteres");
        }
        try {
            const { data } = await MarcaService.actualizar(id, marca.toRequestPayload());
            return data ? Marca.fromResponse(data) : marca;
        } catch (err) {
            throw new Error(err.response?.data?.message || "No se pudo actualizar la marca");
        }
    },
    async eliminarMarca(id) {
        try {
            await MarcaService.eliminar(id);
        } catch (err) {
            throw new Error(err.response?.data?.message || "No se pudo eliminar la marca");
        }
    },

};

export default MarcaController;
