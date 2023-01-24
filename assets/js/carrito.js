

let cupones = [
    {
        nombre: "CUPON30",
        descuento: 30
    },
    {
        nombre: "CUPON20",
        descuento: 20
    }
];

let productosCarro = JSON.parse(localStorage.getItem("carrito")) || [];
actualizarCarro(productosCarro);
console.log(JSON.parse(localStorage.getItem("carrito")));

function actualizarCarro(listadoProductos) {
    localStorage.setItem("carrito", JSON.stringify(listadoProductos));

    const valorInicial = 0;
    const sumaProductos = listadoProductos.reduce(
        (accumulator, producto) => accumulator + producto.cantidad,
        valorInicial
    );
    document.querySelector("#cantidad-productos").innerText = sumaProductos;
}

let precioTotalCompra = 0;

cargarTablaProductos();
function cargarTablaProductos() {
    let acumuladorFilas = "";

    precioTotalCompra = 0;
    productosCarro.forEach((producto) => {
        let totalProducto = producto.cantidad * producto.precio;
        precioTotalCompra += totalProducto;
        let template = `
              <tr>
                  <td>${producto.id}</td>
                  <td>${producto.nombre}</td>
                  <td>${producto.precio}</td>
                  <td>
                  <button class="btn" onclick="restar(${producto.id})">-</button>
                  ${producto.cantidad}
                  <button class="btn" onclick="sumar(${producto.id})">+</button>
                  </td>
                  <td>${totalProducto}</td>
                  <td><button class="btn btn-dark"
                  onclick="eliminarProducto('${producto.id}')">X</button>
                  </td>
              </tr>
      `;
        acumuladorFilas += template;
    });

    document.querySelector("#productos-carrito tbody").innerHTML =
        acumuladorFilas;
    document.querySelector(
        "#precio-total"
    ).innerHTML = `El precio total de la compra es: <strong>$${precioTotalCompra}</strong>`;
}


//Funcion de vaciar carrito
document.getElementById("btn-vaciar").addEventListener("click", function (event) {
    event.preventDefault();
    localStorage.setItem("carrito", "[]");
    location.reload();
});

//Funcion de cupones
document.getElementById("btn-descuento").addEventListener("click", function (event) {
    let cuponIngresado = document.getElementById("input-cupon").value;
    let cuponEncontrado = false;
    let descuento = 0;
    cupones.forEach((cupon) => {
        if (cuponIngresado == cupon.nombre) {
            cuponEncontrado = true;
            descuento = cupon.descuento;
        }
    });

    if (cuponEncontrado) {
        alert("cupón encontrado.");
        precioTotalCompra =
            precioTotalCompra -
            (precioTotalCompra * descuento) / 100;
        document.querySelector(
            "#precio-total"
        ).innerHTML = `El precio total de la compra con descuento es: <strong>$${precioTotalCompra}</strong>`;
    }
    else {
        alert("Cupón no encontrado.");
    }
});

function productincart(id) {
    return productosCarro.find(
        (producto) => producto.id == id
    )
};

//Eliminar un producto del carrito
function eliminarProducto(id) {
    let product = productincart(id);
    productosCarro = productosCarro.filter((carritoid) => {
        return carritoid != product;
    });
    actualizarCarro(productosCarro);
    cargarTablaProductos();
};

function sumar(id) {
    productosCarro.forEach((producto) => {
        if (producto.id == id) {
            producto.cantidad++;
            actualizarCarro(productosCarro);
            cargarTablaProductos();
        };

    });

};

function restar(id) {
    productosCarro.forEach((producto) => {
        if (producto.id == id) {
            if (producto.cantidad != 1) {
                producto.cantidad--;
                actualizarCarro(productosCarro);
                cargarTablaProductos();
            }
        };

    });


}