export class Marca {
    constructor ({ idmarca = null,
        nombre = "",
        estado = true,
        precio = "",
        cantidad = "",
        total = "",
        created_at = null,
        updated_at = null } = {}){
            this.idmarca = idmarca;
            this.nombre = nombre;
            this.estado = estado;
            this.precio = precio;
            this.cantidad = cantidad;
            this.total = total;
            this.created_at = created_at;
            this.updated_at = updated_at;
        }
    static fromResponse(data){
        return new Marca(data);
    }

    toRequestPayload() {
        return {
            nombre: this.nombre,
            estado: this.estado,
            precio: Number(this.precio),
            cantidad: Number(this.cantidad),
            total: Number(this.total),
        };
    }

    isValid() {
        return typeof this.nombre == "string" && this.nombre.trim().length > 0 && this.nombre.length <= 200;
    }

    isValidInventory() {
        return Number.isFinite(Number(this.precio)) && Number(this.precio) > 0
            && Number.isInteger(Number(this.cantidad)) && Number(this.cantidad) >= 1
            && Number.isFinite(Number(this.total)) && Number(this.total) >= 0;
    }

}
