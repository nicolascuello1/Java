//SALUDO DE BIENVENIDA

// var edad = parseInt(prompt("Queremos conocerte un poquito... ¿Cuantos años tenés?"));
// if (edad < 18) {
    // alert("Bienvenido niño gamer! :)");
// }else if (edad < 41) {
    // alert("Soltero vs Gamers? ;)");
// }else {
    // alert("Para viciar no hay edad! Una alegría tenerte en nuestra web! :D");
// }


//Carrito de compras!

/* Selectores */
const listaProductos = document.querySelector('#lista-productos');
const tableCarrito = document.querySelector("#lista-carrito tbody");
const btnVaciarCarrito = document.querySelector('#vaciar-carrito');
let carrito = [];

/* Listeners */
listaProductos.addEventListener('click', agregarProducto);
tableCarrito.addEventListener('click', borrarProducto);
btnVaciarCarrito.addEventListener('click', vaciarCarrito);
document.addEventListener('DOMContentLoaded', () => {

    if (JSON.parse(localStorage.getItem('carrito'))) {
        carrito = JSON.parse(localStorage.getItem('carrito'));
        insertarCarritoHTML();
    }
});

function vaciarCarrito() {
    carrito = [];
    insertarCarritoHTML();
}


function borrarProducto(e) {
    e.preventDefault();

    if (e.target.classList.contains("borrar-producto")) {
        
        const productoId = e.target.getAttribute('data-id');
        carrito = carrito.filter(producto => producto.id !== productoId);
        insertarCarritoHTML();
    }
}

function agregarProducto(e) {
    e.preventDefault();

    if(e.target.classList.contains("agregar-carrito")){ 
        const cardProducto = e.target.parentElement.parentElement;
        
        obtenerDatosProducto(cardProducto);
    }
}

function obtenerDatosProducto(cardProducto) {

    const productoAgregado = {
        imagen: cardProducto.querySelector('img').src,
        nombre: cardProducto.querySelector('h5').textContent,
        precio: cardProducto.querySelector('.precio').textContent,
        cantidad: 1,
        id: cardProducto.querySelector('a').getAttribute('data-id')
    }
   
    const existe = carrito.some(producto => producto.id === productoAgregado.id);

    if (existe) {
        const productos = carrito.map(producto => {
            if (producto.id === productoAgregado.id) {
                producto.cantidad++;
                producto.precio = `$${Number(productoAgregado.precio.slice(1)) * producto.cantidad}`
            } else {
            }
            return producto;
        });
        carrito = [...productos];
    } else {
        carrito = [...carrito, productoAgregado];
    }

   insertarCarritoHTML();
}

function insertarCarritoHTML() {

    borrarCarritoHTML();

    carrito.forEach(producto => {
        /* Destructuring de objetos */
        const { imagen, nombre, precio, cantidad, id } = producto;

        const row = document.createElement('tr');
        row.innerHTML = `
        <td>
            <img src="${imagen}" width='100%'>
        </td>
        <td>${nombre}</td>
        <td>${precio}</td>
        <td>${cantidad}</td>
        <td>
            <a href="#" class="borrar-producto" data-id="${id}">X</a>
        </td>
        `
        tableCarrito.appendChild(row);
    });
    guardarCarritoStorage();
}

function borrarCarritoHTML() {

    while (tableCarrito.firstChild) {
        tableCarrito.removeChild(tableCarrito.firstChild);
    }
}

function guardarCarritoStorage() {
    localStorage.setItem('carrito', JSON.stringify(carrito));
}





//TABLA DE DESCUENTOS

const productos = [{ id: 1, nombre: "FIFA 21", precio: "15% OFF" },
    { id: 2, nombre: "NBA 2k21", precio: "20% OFF" },
    { id: 3, nombre: "Resident Evil VILLAGE", precio: "10% OFF" },
    { id: 4, nombre: "Call Of Duty WarZone", precio: "15% OFF" },
    { id: 5, nombre: "Joystick PS5", precio: "10% OFF" }
];

let mi_tabla = document.createElement("table");
mi_tabla.setAttribute("class", "table table-dark");
let mi_tabla_body = document.createElement("tbody");

for (const producto of productos) {
    let mi_fila = document.createElement("tr");
    let mi_celda = document.createElement("td");
    mi_celda.innerText = producto.id;
    mi_fila.appendChild(mi_celda);
    let mi_celda2 = document.createElement("td");
    mi_celda2.innerText = producto.nombre;
    mi_fila.appendChild(mi_celda2);
    let mi_celda3 = document.createElement("td");
    mi_celda3.innerHTML = `<b>$ ${producto.precio}</b>`;
    mi_fila.appendChild(mi_celda3);
    mi_tabla_body.appendChild(mi_fila);
}

mi_tabla.appendChild(mi_tabla_body);
document.getElementById("tablaJuegos").appendChild(mi_tabla);


//FORMULARIO

let miFormulario      = document.getElementById("formularioContacto");
miFormulario.addEventListener("submit", validarFormulario);

function validarFormulario(e){
    e.preventDefault();
    alert("Formulario enviado con éxito!");    
}


//jQuery como Codigos de Descuento

const misJueguitos = [{ id: 1, descuento: "25%" },
    { id: 2, descuento: "33%" },
    { id: 3, descuento: "45%" },
    { id: 4, descuento: "25%" }
];

let carrito = [];

for (const producto of misJueguitos) {
    $("#app").append(`<div>
                        <h4>  Descuento: ${producto.descuento}</h4>
                        <button class="btn btn-danger" id="btn${producto.id}">Obtener Descuento</button>
                        </div>`);
    $(`#btn${producto.id}`).on('click', function() {
        alert(`Obtuviste un descuento del: ${producto.descuento}`);
        carrito.push(misJueguitos[producto.id - 1]);
        console.log(carrito);
    });
}

//Animacion para aparecer titulo (probablemente no estén en la página)

$("#slideImagen").click( () =>{
    $("#title").slideDown("slow");
})

$("#slideImagenUp").click(() => {
    $("#title").slideUp("slow");
});


// AJAX 

function agregarDatos() {
    let objetoJson = {
        "userId": 1,
        "id": 455,
        "title": "prueba",
        "body": "Usuario Nuevo"
    }

    $.post("https://jsonplaceholder.typicode.com/posts", objetoJson).done(function(data, estado) {
        console.log("Estado que retorna POST jsonplaceholder: " + estado);
        console.log(data);
        console.log("Data de retorno: " + JSON.stringify(data));
    });
}

agregarDatos();



