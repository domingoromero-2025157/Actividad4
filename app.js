const fs = require("fs/promises");

const API_URL = "https://jsonplaceholder.typicode.com/users";

async function guardarJSON(datos) {
    await fs.writeFile(
        "usuarios.json",
        JSON.stringify(datos, null, 4),
        "utf8"
    );
}

async function consumirAPI() {

    console.log("Inicio del programa");

    console.time("Tiempo total");

    try {

        console.time("Petición API");

        const response = await fetch(API_URL);

        console.timeEnd("Petición API");

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        const usuarios = await response.json();

        const datos = usuarios.map(usuario => ({
            id: usuario.id,
            nombre: usuario.name,
            usuario: usuario.username,
            correo: usuario.email,
            ciudad: usuario.address.city,
            empresa: usuario.company.name
        }));

        console.time("Guardar archivo");

        await guardarJSON(datos);

        console.timeEnd("Guardar archivo");

        console.log("Archivo creado correctamente.");

    } catch (error) {

        console.log("Ocurrió un error.");
        console.log("Tipo:", error.name);
        console.log("Mensaje:", error.message);

    } finally {

        console.timeEnd("Tiempo total");

    }

}

consumirAPI();