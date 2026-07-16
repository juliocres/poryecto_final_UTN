import { useState } from "react"

import useCounter from "../../hooks/useContador"

/* 
plantear el hook: useCounter(defaultCounterValue)
La idea es que la funcionalidad de incremento y decremento del contador sea manejada en este hook useCounter asi de esta manera el Contador component queda mas limpio y solo se encarga de la renderizacion del contador.

El useCounter sera invocado desde Contador.jsx
*/
function Contador (){

    const {contador_estado, incrementar, decrementar} = useCounter(0)

    return (
        <div>
            <button onClick={decrementar}>-</button>
            <span>{contador_estado}</span>
            <button onClick={incrementar}>+</button>
            <br/>
            {
                contador_estado > 10 
                && 
                <span style={{color: 'red'}}>[ERROR]: El numero maximo a incrementar es 10</span>
            }

            {
                contador_estado < 0 
                ? <span style={{color: 'red'}}>[ERROR]: El numero minimo es 0</span>
                : <span style={{color: 'green'}}>El contador es valido</span>
            }

            
        </div>
    )
}


export default Contador


/* 
Un componente busca renderizarse la MENOR cantidad de veces posible
*/