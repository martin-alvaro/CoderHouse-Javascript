const nombre = document.getElementById('nombre')
const direc = document.getElementById('email')
const tel = document.getElementById('tel')
const form = document.getElementById('formulario')
const casa = document.getElementById('casa')
const gracias = document.getElementById('gracias')
const precio = document.querySelector('#precio-total')
//------------------------------------------------------------------------------------------------------------------------------



if (localStorage.getItem("precioTotal") === null) {
    precio.remove()
    form.remove()
    casa.innerHTML = `<i class="bi bi-house-fill">No hay productos en el carrito, por favor vuelva al inicio</i>`

} else {
    precio.innerHTML = `Total a Pagar: $ ${JSON.parse(localStorage.getItem("precioTotal"))}`

}
//------------------------------------------------------------------------------------------------------------------------------



function fin() {
    //operador ternario
    ((nombre.value === "") || (direc.value === "") || (tel.value === "")) ? (

        //cuando no se llenan los campos tire error 
        Swal.fire({
            icon: 'error',
            title: 'Error!',
            text: "DEBE COMPLETAR TODOS LO CAMPOS",
            confirmButtonColor: 'green'
        })
    ) : ( //cuando se llenan los campos
        Swal.fire({
            icon: 'success',
            title: 'Compra exitosa!',
            text: `Muchas gracias por tu compra ${nombre.value}, estaremos enviando tu pedido a:  ${direc.value}, en los proximos dias`,
            confirmButtonColor: 'green',
        }),
        precio.remove(),
        localStorage.clear(),
        form.remove(),
        gracias.innerHTML = "Gracias por su compra, regrese  pronto!!",
        casa.innerHTML = `<i class="bi bi-house-fill">Vuelva al inicio si deseas comprar mas productos</i>`

    )
}