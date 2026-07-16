import { useState } from "react"

/* 
custom hook son funciones asociadas a react que manejamos nosotros
los custom hooks solo pueden ser invocados dentro de un componente
los custom hooks SIEMPRE los vamos a usar para separar logica, NO son necesarios pero nos ayudan a mantener separadas las responsabilidades


useModal es un custom hook
tiene la responsabilidad de manejar el estado y logica del modal
para que el hook pueda comunicarse con el exterior usamos el return
para que se puedan comunicar con el usamos los parametros
*/

function useModal(defaultOpenModalState) {
    const [openModal, setOpenModal] = useState(
        defaultOpenModalState || false
    )

    function onOpen() {
        setOpenModal(true)
    }

    function onClose() {
        setOpenModal(false)
    }

    return {
        openModal: openModal,
        onOpen: onOpen,
        onClose: onClose
    }
}

export default useModal