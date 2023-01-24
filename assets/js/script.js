let productosCarro = JSON.parse(localStorage.getItem("carrito")) || [];

if (productosCarro) {
    console.log(productosCarro);
    actualizarCarro(productosCarro);
}


//Muestra los productos en el index.html
let contenedorProductos = document.getElementById("productos");
products.forEach((producto) => {

    let content = document.createElement("div");
    content.className = "col";
    content.innerHTML = `
                <div class="card">
                    <a href="producto.html">
                       <img src="${producto.imagen}"  class="card-img-top" > 
                    </a>
                    <div class="card-body d-grid mx-auto">
                        <h5 class="card-title">${producto.nombre}</h5>
                        <p class="card-text">Precio: $${producto.precio}</p>
                        <button class="btn btn-dark data-id="${producto.id}"
                          onclick="addToCart('${producto.id}')">Agregar al carro</button>
                    </div>
                </div>
            
          `;
    contenedorProductos.append(content);
});

function productincart(id){
 return productosCarro.find(
    (producto) => producto.id == id
)
};

//añade producto al localStorage

function addToCart(id) {

    let productInCart = productincart(id);

    if (productInCart) {
        productInCart.cantidad++;
    } else {
        let productoEncontrado = products.find(
            (producto) => producto.id == id
        );
        let newProduct = {
            id: id,
            nombre: productoEncontrado.nombre,
            precio: productoEncontrado.precio,
            cantidad: 1
        };

        productosCarro.push(newProduct);
    }

    actualizarCarro(productosCarro);
};


function actualizarCarro(listadoProductos) {
    localStorage.setItem("carrito", JSON.stringify(listadoProductos));

    const valorInicial = 0;
    const sumaProductos = listadoProductos.reduce(
        (accumulator, producto) => accumulator + producto.cantidad,
        valorInicial
    );
    document.querySelector("#cantidad-productos").innerText = sumaProductos;
}




