async function postData(obj, endpoint) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        return peticion.json()
    } catch (error) {
        console.error(error);
    }
}

async function getData(endpoint) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}`)
        const data = await peticion.json()
        return data
    } catch (error) {
        console.error(error);
    }
}

async function patchData(endpoint, obj, id) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: "PATCH",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify(obj)
        })
        const data = await peticion.json()
        return data
    } catch (error) {
        console.error(error);
    }
}

async function deleteData(endpoint, id) {
    try {
        const peticion = await fetch(`http://localhost:3001/${endpoint}/${id}`, {
            method: "DELETE",
        });
        const respuesta = await peticion.json()
        console.log(respuesta);

    } catch (error) {
        console.error("Error al eliminar el proyecto:", error);
    }
}

export { postData, getData, patchData, deleteData }
