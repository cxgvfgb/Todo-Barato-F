import { useState } from "react";

const formatoNumero = (valor) => new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(Number(valor) || 0);

function MarcaForm({ onCrear, onActualizar, marcaEditando, onCancelar, loading }) {
    const [nombre, setNombre] = useState(marcaEditando?.nombre ?? "");
    const [precio, setPrecio] = useState(String(marcaEditando?.precio ?? ""));
    const [cantidad, setCantidad] = useState(String(marcaEditando?.cantidad ?? ""));
    const [error, setError] = useState("");
    const total = (Number(precio) || 0) * (Number(cantidad) || 0);

    const handleSubmit = async (event) => {
        event.preventDefault();
        setError("");
        const datos = { nombre, precio, cantidad, total };
        try {
            if (marcaEditando) {
                await onActualizar(marcaEditando.idmarca, { ...datos, estado: marcaEditando.estado });
                onCancelar();
            } else {
                await onCrear(datos);
                setNombre("");
                setPrecio("");
                setCantidad("");
            }
        } catch (err) {
            setError(err.message);
        }
    };

    if (marcaEditando) {
        return (
            <div className="modal-backdrop" onMouseDown={(event) => event.target === event.currentTarget && onCancelar()}>
                <form className="edit-modal" onSubmit={handleSubmit} role="dialog" aria-modal="true" aria-labelledby="edit-title">
                    <div className="modal-heading">
                        <div><h2 id="edit-title">Editar marca</h2><p>Actualiza los datos y guarda los cambios.</p></div>
                        <button className="modal-close" type="button" onClick={onCancelar} aria-label="Cerrar" disabled={loading}>×</button>
                    </div>
                    <div className="edit-fields">
                        <label htmlFor="edit-nombre">Nombre</label>
                        <input id="edit-nombre" type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} maxLength={200} autoFocus required />
                        <label htmlFor="edit-precio">Precio</label>
                        <input id="edit-precio" type="number" min="0.01" step="0.01" value={precio} onChange={(event) => setPrecio(event.target.value)} required />
                        <label htmlFor="edit-cantidad">Cantidad</label>
                        <input id="edit-cantidad" type="number" min="1" step="1" value={cantidad} onChange={(event) => setCantidad(event.target.value)} required />
                        <div className="total-preview"><span>Total (precio × cantidad)</span><strong>{formatoNumero(total)}</strong></div>
                    </div>
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
            <input id="nombre" type="text" value={nombre} onChange={(event) => setNombre(event.target.value)} placeholder="Ej: Toyota" maxLength={200} required />
            <div className="inventory-fields">
                <div><label htmlFor="precio">Precio</label><input id="precio" type="number" min="0.01" step="0.01" value={precio} onChange={(event) => setPrecio(event.target.value)} placeholder="0.00" required /></div>
                <div><label htmlFor="cantidad">Cantidad</label><input id="cantidad" type="number" min="1" step="1" value={cantidad} onChange={(event) => setCantidad(event.target.value)} placeholder="0" required /></div>
            </div>
            <div className="total-preview"><span>Total (precio × cantidad)</span><strong>{precio && cantidad ? formatoNumero(total) : "—"}</strong></div>
            {error && <p className="form-error">{error}</p>}
            <button type="submit" disabled={loading}>{loading ? "Guardando..." : "Crear marca"}</button>
        </form>
    );
}

export default MarcaForm;
