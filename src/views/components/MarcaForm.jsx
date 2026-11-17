import { useState } from "react";

function MarcaForm({onCrear, onActualizar, marcaEditando, onCancelar, loading}){
    const [nombre, setNombre] = useState(marcaEditando?.nombre ?? "");
    const [error, setError] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError("");
        try {
            if (marcaEditando) {
                await onActualizar(marcaEditando.idmarca, { nombre, estado: marcaEditando.estado });
                onCancelar();
            } else {
                await onCrear({ nombre });
                setNombre("");
            }
        }catch(err){
            setError(err.message)
        }
    };

    if (marcaEditando) {
        return (
            <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancelar()}>
                <form className="edit-modal" onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="edit-title">
                    <div className="modal-heading">
                        <div>
                            <h2 id="edit-title">Editar marca</h2>
                            <p>Actualiza el nombre de la marca y guarda los cambios.</p>
                        </div>
                        <button className="modal-close" type="button" onClick={onCancelar} aria-label="Cerrar" disabled={loading}>×</button>
                    </div>
                    <label htmlFor="nombre">Nombre</label>
                    <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} maxLength={200} autoFocus />
                    {error && <p className="form-error">{error}</p>}
                    <div className="modal-actions">
                        <button className="cancel-button" type="button" onClick={onCancelar} disabled={loading}>Cancelar</button>
                        <button className="save-button" type="submit" disabled={loading}>{loading ? "Guardando..." : "Guardar cambios"}</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <form className="marca-form" onSubmit={handleSubmit}>
            <h2>Nueva Marca</h2>
            <label htmlFor="nombre">Nombre</label>
            <input id="nombre" type="text" value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Ej: Toyota" maxLength={200} />
            {error && <p className="form-error">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Crear marca"}</button>
        </form>
    );
}

export default MarcaForm;
