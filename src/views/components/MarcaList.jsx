import DataTable from "react-data-table-component";

const formatoNumero = (valor) => new Intl.NumberFormat("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
}).format(Number(valor) || 0);

const columns = [
    { name : "ID", selector: (row) => row.idmarca, sortable: true},
    { name : "Nombre", selector: (row) => row.nombre, sortable: true},
    { name : "Precio", selector: (row) => row.precio ?? "-", sortable: true},
    { name : "Cantidad", selector: (row) => row.cantidad ?? "-", sortable: true},
    { name : "Total", selector: (row) => row.total ?? "-", sortable: true},
    {
        name: "Estado",
        selector: (row) => row.estado,
        cell: (row) => (
            <span className={row.estado ? "badge badge-active": "badge badge-inactive"}>
                {row.estado ? "Activo" : "Inactivo"}
            </span>
        ),
    },
    { name: "Precio", selector: (row) => Number(row.precio) || 0, sortable: true, cell: (row) => formatoNumero(row.precio) },
    { name: "Cantidad", selector: (row) => Number(row.cantidad) || 0, sortable: true },
    { name: "Total", selector: (row) => (Number(row.precio) || 0) * (Number(row.cantidad) || 0), sortable: true, cell: (row) => formatoNumero((Number(row.precio) || 0) * (Number(row.cantidad) || 0)) },
];

function MarcaList({marcas, onEditar, onEliminar, loading}){
    const tableColumns = [...columns, {
        name: "Acciones",
        button: true,
        cell: (row) => (
            <div className="marca-actions">
                <button className="action-button edit-button" type="button" aria-label={`Editar ${row.nombre}`} title={`Editar ${row.nombre}`} onClick={() => onEditar(row)} disabled={loading}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 20h9"/><path d="M16.5 3.5a2.1 2.1 0 0 1 3 3L8 18l-4 1 1-4Z"/></svg>
                </button>
                <button className="action-button delete-button" type="button" aria-label={`Eliminar ${row.nombre}`} title={`Eliminar ${row.nombre}`} onClick={() => onEliminar(row)} disabled={loading}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M3 6h18"/><path d="M8 6V4h8v2"/><path d="m19 6-1 14H6L5 6"/><path d="M10 11v5M14 11v5"/></svg>
                </button>
            </div>
        ),
    }];
    return(
        <DataTable
        columns={tableColumns}
        data={marcas}
        pagination={false}
        noDataComponent="No hay marcas para mostrar"
        />
    );
}

export default MarcaList;
