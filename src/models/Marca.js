export class Marca {
    constructor({ idmarca = null, nombre = "", estado = true, precio = 0, cantidad = 0, created_at = null, updated_at = null } = {}) {
        this.idmarca = idmarca;
        this.nombre = nombre;
        this.estado = estado;
        this.precio = Number(precio) || 0;
        this.cantidad = Number(cantidad) || 0;
        this.total = this.precio * this.cantidad;
        this.created_at = created_at;
        this.updated_at = updated_at;
    }

    static fromResponse(data) {
        return new Marca(data);
    }

    toRequestPayload() {
        return {
            nombre: this.nombre,
            estado: this.estado,
            precio: this.precio,
            cantidad: this.cantidad,
            total: this.total,
        };
    }

    isValid() {
        return typeof this.nombre === "string"
            && this.nombre.trim().length > 0
            && this.nombre.length <= 200
            && Number.isFinite(this.precio)
            && this.precio > 0
            && Number.isInteger(this.cantidad)
            && this.cantidad >= 1;
    }
}
