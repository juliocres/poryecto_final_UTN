import { useParams } from "react-router"
import Header from "../../Components/Header/Header"

function ProductDetailScreen (){
    const {product_id} = useParams() //{product_id: "1"}
    const products = [
        {id: 1, price: 200, title: "tv samsung"},
        {id: 2, price: 250, title: "tv noblex"}
    ]


    const product_found = products.find(
        (product) => {return product.id === Number(product_id)}
    )

    if(!product_found){
        return (
            <div>
                <h2>Producto no encontrado, error 404</h2>
            </div>
        )
    }
    return (
        <div>
            <Header/>
            <h1>{product_found.title}</h1>
            <span>Precio: ${product_found.price}</span>
            <button>Agregar al carrito</button>
        </div>
    )
}


export default ProductDetailScreen