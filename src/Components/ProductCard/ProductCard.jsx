/* 
Cualquier componente puede recibir props 
Es la forma en la que nos comunicamos con un componente
*/
function ProductCard (propiedades){
    console.log(propiedades)

    let categorias_lista = []
    for(let categoria of propiedades.categories){
        categorias_lista.push(<span>{categoria}</span>)
    }
    
    return <div>
        <h2>{propiedades.title}</h2>
        <p>{propiedades.description}</p>
        <span>Precio: ${propiedades.price}USD</span>
        <div>
            <span>Categorias:</span>
            <div 
                style={
                    {display: 'flex', flexDirection: 'row', gap: '10px'}
                }
            >
                {categorias_lista}
            </div>
        </div>
        <button>Comprar</button>
    </div>
}


export {ProductCard}