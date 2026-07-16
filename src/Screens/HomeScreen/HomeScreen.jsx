import { useContext } from "react"
import Header from "../../Components/Header/Header"
import WhatsappSidebar from "../../Components/WhatsappSidebar/WhatsappSidebar"
import { ContactContext } from "../../Context/ContactContext"

function HomeScreen (){

    /* const products = [
        {id: 1, price: 200, title: "tv samsung"},
        {id: 2, price: 250, title: "tv noblex"}
    ] */

   
    return (
        <div>
            <WhatsappSidebar/>
            {/* <h1>Productos</h1>
            {
                products.map(product => {
                    return (
                        <div key={product.id}>
                            <h2>{product.title}</h2>
                            <span>Precio: ${product.price}</span>
                            <a href={`/products/${product.id}`}>Ver detalle</a>
                        </div>
                    )
                })
            } */}
        </div>
    )
}

export default HomeScreen


/* 
Ejemplo de lista de contactos: 
    const contacts = [
        {
            id,
            nombre,
            fecha_ult_conexion: 'hace 2 dias',
            mensajes_sin_ver: 2
        }
    ]

Crear el componente 
    WhatsappSidebar que debera renderizar la lista de contactos (Con datos aleatorios, almenos 3 conctactos)
    Al dar click en un contacto nos debe llevar a la ruta /contact/{contact_id}
En la ruta 
    / => Debe mostrarse la lista de contactos (El WhatsappSidebar)
    /contact/:contact_id => Debe mostrar el nombre el contacto seleccionado, o que el mismo no existe.

No se preocupen por los estilos ni la tematica, es lo de menos
*/