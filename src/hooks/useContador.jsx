import { useState } from "react"
function useCounter(valorInicial = 0){
    const [contador_estado, setContadorEstado] = useState(valorInicial)
    function incrementar (){
        setContadorEstado(contador_estado + 1)
        console.log("[Incrementar] Ahora contador es: " + contador_estado)
    }
    function decrementar(){
        setContadorEstado(contador_estado - 1)
        console.log("[Decrementar] Ahora contador es: " + contador_estado)
    }

    return {
        contador_estado,
        incrementar,
        decrementar,
    }
}
export default useCounter