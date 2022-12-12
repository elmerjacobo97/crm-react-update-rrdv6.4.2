// obtener clientes
export async function obtenerClientes() {
    const respuesta = await fetch(import.meta.env.VITE_API_URL);
    return await respuesta.json(); // retornar el resultado
}

// añadir nuevos clientes
export async function agregarCliente(datos) {
    try {
        const respuesta = await fetch(import.meta.env.VITE_API_URL, {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (e) {
        console.log(e)
    }
}

// obtener cliente
export async function obtenerCliente(id) {
    const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`);
    return await respuesta.json(); // retornar el resultado
}

// actualizar cliente
export async function actualizarCliente(id, datos) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'PUT',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        })
    } catch (e) {
        console.log(e)
    }
}

// eliminar cliente
export async function eliminarCliente(id) {
    try {
        const respuesta = await fetch(`${import.meta.env.VITE_API_URL}/${id}`, {
            method: 'DELETE'
        })
    } catch (e) {
        console.log(e)
    }
}