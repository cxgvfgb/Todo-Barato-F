import { useEffect, useState } from "react";
import MarcaController from "../../controllers/MarcaController";
import MarcaForm from "../components/MarcaForm";
import MarcaList from "../components/MarcaList";

function MarcasPage(){
    const [marcas, setMarcas] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");
    const [marcaEditando, setMarcaEditando] = useState(null);

    const cargarMarcas = async () => {
        setLoading(true);
        setError("");
        try{
            const data = await MarcaController.listarMarcas();
            setMarcas(data);
        }catch{
            setError("No se pudo cargar la lista de marcas");
        }finally{
            setLoading(false);
        }
    };

    useEffect(() => {
        let vigente = true;
        MarcaController.listarMarcas()
            .then((data) => {
                if (vigente) setMarcas(data);
            })
            .catch(() => {
                if (vigente) setError("No se pudo cargar la lista de marcas");
            })
            .finally(() => {
                if (vigente) setLoading(false);
            });
        return () => { vigente = false; };
    }, []);

    const handleCrear = async (form) => {
        setLoading(true);
        try{
            await MarcaController.crearMarca(form);
            await cargarMarcas();
        }finally{
            setLoading(false);
        }
    };

    const handleActualizar = async (id, form) => {
        setLoading(true);
        setError("");
        try {
            await MarcaController.actualizarMarca(id, form);
            setMarcaEditando(null);
            await cargarMarcas();
        } finally {
            setLoading(false);
        }
    };

    const handleEliminar = async (marca) => {
        if (!window.confirm(`¿Eliminar la marca "${marca.nombre}"?`)) return;
        setLoading(true);
        setError("");
        try {
            await MarcaController.eliminarMarca(marca.idmarca);
            if (marcaEditando?.idmarca === marca.idmarca) setMarcaEditando(null);
            await cargarMarcas();
        } catch (err) {
            setError(err.message || "No se pudo eliminar la marca");
        } finally {
            setLoading(false);
        }
    };

    return(
        <div className="marcas-page">
            <h1>Marcas - Todo Barato</h1>
            <MarcaForm key={marcaEditando?.idmarca ?? "nueva"} onCrear={handleCrear} onActualizar={handleActualizar} marcaEditando={marcaEditando} onCancelar={() => setMarcaEditando(null)} loading={loading}/>
            {error && <p className="page-error">{error}</p>}
            {loading && marcas.length === 0 ? <p>Cargando marcas...</p> : <MarcaList marcas={marcas} onEditar={setMarcaEditando} onEliminar={handleEliminar} loading={loading}/>}
        </div>
    );

}

export default MarcasPage;
