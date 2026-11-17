import MarcaService from "../services/MarcaService";
import { Marca } from "../models/Marca";

const validarMarca = (datos) => {
    const marca = new Marca(datos);
    if (!marca.isValid()) {
        throw new Error("Ingresa un nombre válido, un precio mayor que cero y una cantidad entera de al menos 1.");
    }
    return marca;
};

const MarcaController = {
    async listarMarcas() {
        const { data } = await MarcaService.listar();
        return data.map((item) => Marca.fromResponse(item));
    },
    async crearMarca(datos) {
        const marca = validarMarca(datos);
        try {
            const { data } = await MarcaService.crear(marca.toRequestPayload());
            return Marca.fromResponse(data);
        } catch (err) {
            throw new Error(err.response?.data?.message || "No se pudo crear la marca");
        }
    },
    async actualizarMarca(id, datos) {
        const marca = validarMarca({ ...datos, idmarca: id });
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
