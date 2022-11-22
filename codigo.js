//constantes
const items = document.getElementById('items')
const footer = document.getElementById('footer')
const cartas = document.getElementById('cards')
const templatePie = document.getElementById('template-footer').content
const templateCarta = document.getElementById('template-cards').content
const templateCarrito = document.getElementById('template-carrito').content
const enlace1 = document.getElementById('enlace')
const enlace2 = document.getElementById('enlace2')
const fragmento = document.createDocumentFragment()

// sweet alert
const Toast = Swal.mixin({
    toast: true,
    position: 'top-end',
    showConfirmButton: false,
    timer: 1900,
    timerProgressBar: true,
    didOpen: (toast) => {
        toast.addEventListener('mouseenter', Swal.stopTimer)
        toast.addEventListener('mouseleave', Swal.resumeTimer)
    }
})



let carrito = {}
//------------------------------------------------------------------------------------------------------------------------------



// cuando el DOM termine de cargar y se encuentre listo realiza las acciones
document.addEventListener('DOMContentLoaded', () => {
    fetchProd()

    //para guardar los productos en el localStorage
    if (localStorage.getItem('carrito')) {
        carrito = JSON.parse(localStorage.getItem('carrito'))
        pintarCarrito()
    }
})
//------------------------------------------------------------------------------------------------------------------------------



//Animacion para el titulo
const caja = document.getElementById('titulo')
let write = srt => {
    let array = srt.split('')
    let i = 0
    let print = setInterval(() => {
        if (array[i] === ' ') {
            caja.innerHTML += array[i]
            caja.innerHTML += array[i + 1]
            i += 2

        } else {
            caja.innerHTML += array[i]
            i++
        }
        if (i === array.length)
            clearInterval(print)
        caja

    }, 120)
}
write("COMPLEJO 22")
//------------------------------------------------------------------------------------------------------------------------------



cartas.addEventListener('click', evento => {
    agregarACarrito(evento)
})


items.addEventListener('click', evento => {
    botonAccion(evento)
})
//------------------------------------------------------------------------------------------------------------------------------



//accedo al contenido de el archivo de JSON con fetch
const fetchProd = async () => {
    try {
        const res = await fetch('productos.json')
        const data = await res.json()
        pintarCartas(data)
    } catch (error) {
        console.log(error)
    }
}
//------------------------------------------------------------------------------------------------------------------------------



//creo las cards
const pintarCartas = data => {
    data.forEach(producto => {
        templateCarta.querySelector('h4').textContent = producto.nombre
        templateCarta.querySelector('h5').textContent = producto.precio
        templateCarta.querySelector('img').setAttribute("src", producto.img)
        templateCarta.querySelector('.btn-agregar').dataset.id = producto.id
        //las clono
        const clonar = templateCarta.cloneNode(true)
        fragmento.appendChild(clonar)
    });
    cartas.appendChild(fragmento)
}
//------------------------------------------------------------------------------------------------------------------------------



//agregar al carrito
const agregarACarrito = event => {
    if (event.target.classList.contains('btn-agregar')) {
        carro(event.target.parentElement.parentElement)
        Toast.fire({
            icon: 'success',
            title: 'Producto agregado al carrito'
        })

    }
    //el evento se terminará en ese punto
    event.stopPropagation()
}
//------------------------------------------------------------------------------------------------------------------------------



const carro = objeto => {
    const producto = {
        id: objeto.querySelector('.btn-agregar').dataset.id,
        nombre: objeto.querySelector('h4').textContent,
        img: objeto.querySelector('img').getAttribute("src"),
        precio: objeto.querySelector('h5').textContent,
        cantidad: 1
    }

    //cuando se repite el elemento
    // se verifica si el objeto tiene la propiedad especificada
    if (carrito.hasOwnProperty(producto.id)) {
        producto.cantidad = carrito[producto.id].cantidad + 1
    }

    carrito[producto.id] = {
        ...producto
    }
    pintarCarrito()
}
//------------------------------------------------------------------------------------------------------------------------------



// vista del carrito
const pintarCarrito = () => {
    items.innerHTML = ''
    Object.values(carrito).forEach(producto => {
        //img
        templateCarrito.querySelector('img').setAttribute('src', producto.img)

        //nombre
        templateCarrito.querySelectorAll('td')[1].textContent = producto.nombre

        //cantidad
        templateCarrito.querySelectorAll('td')[2].textContent = producto.cantidad

        //boton mas
        templateCarrito.querySelector('.btn-mas').dataset.id = producto.id

        //boton menos
        templateCarrito.querySelector('.btn-menos').dataset.id = producto.id

        //total del producto
        templateCarrito.querySelector('span').textContent = producto.cantidad * producto.precio

        const clonar = templateCarrito.cloneNode(true)
        fragmento.appendChild(clonar)
    })

    items.appendChild(fragmento)

    pintarFooter()

    //mando los productos al localStorage
    localStorage.setItem('carrito', JSON.stringify(carrito))
}
//------------------------------------------------------------------------------------------------------------------------------



//vista del footer del carrito
const pintarFooter = () => {
    footer.innerHTML = ''

    //cuando no hay ningun producto en el carrito
    if (Object.keys(carrito).length == 00) {
        footer.innerHTML = `
        <th scope="row" colspan="4">Carrito vacío - comience a comprar!</th>
        `
        return
    }

    //cantidad de productos totales
    const sumaCantidad = Object.values(carrito).reduce((acc, {
        cantidad
    }) => acc + cantidad, 0)


    //precio final
    const precioFinal = Object.values(carrito).reduce((acc, {
        cantidad,
        precio
    }) => acc + cantidad * precio, 0)


    //mando el precio final al localStorage
    localStorage.setItem("precioTotal", JSON.stringify(precioFinal));



    templatePie.querySelectorAll('td')[0].textContent = sumaCantidad
    templatePie.querySelector('span').textContent = precioFinal


    const clonar = templatePie.cloneNode(true)
    fragmento.appendChild(clonar)
    footer.appendChild(fragmento)


    //boton vaciar
    const botonVaciar = document.getElementById('vaciar-carrito')
    botonVaciar.addEventListener('click', () => {
        carrito = {}
        pintarCarrito()
    })

}
//------------------------------------------------------------------------------------------------------------------------------



// evento para el boton "+" y "-"
const botonAccion = event => {
    if (event.target.classList.contains('btn-mas')) {

        //aumenta la catidad
        const producto = carrito[event.target.dataset.id]
        producto.cantidad++
        carrito[event.target.dataset.id] = {
            ...producto
        }
        pintarCarrito()


    }

    if (event.target.classList.contains('btn-menos')) {
        //disminuye la cantidad
        const producto = carrito[event.target.dataset.id]
        producto.cantidad--
        //cuando el producto llega a 0 se elimina
        if (producto.cantidad === 0) {
            delete carrito[event.target.dataset.id]
        }
        pintarCarrito()
    }

    //el evento se terminará en este punto
    event.stopPropagation()
}
//------------------------------------------------------------------------------------------------------------------------------



//cambiar estilos de los enlaces
color()
function color() {
    //enlace 1
    enlace1.addEventListener('mouseover', function handleMouseOver() {
        enlace1.style.color = '#8479E1',
            enlace1.style.transition = "500ms",
            enlace1.style.borderBottom = "2px solid #8479E1"
    });

    enlace1.addEventListener('mouseout', function handleMouseOut() {
        enlace1.style.color = '#FCF8E8',
        enlace1.style.borderBottom = ''
        
    });
    //enlace 2
    enlace2.addEventListener('mouseover', function handleMouseOver() {
        enlace2.style.color = '#8479E1',
            enlace2.style.transition = "500ms",
            enlace2.style.borderBottom = "2px solid #8479E1"          
    });

    enlace2.addEventListener('mouseout', function handleMouseOut() {
        enlace2.style.color = '#FCF8E8'
        enlace2.style.borderBottom = ''
    });
}
