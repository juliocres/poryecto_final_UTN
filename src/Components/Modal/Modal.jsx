import { useState } from "react"
import './modal.css'

/* 
Children y key son propiedades prohebidas en react debido a que este reserva su nombre
*/

function Modal(
    {   
        children, 
        openModal, 
        onOpen, 
        onClose
    }
) {

    
    return (
        <div>
            {
                openModal 
                && 
                <div className="modal-overlay">
                    <div className="modal">
                        {children}
                        <button onClick={onClose}> Cerrar</button>
                    </div>
                </div>
            }
        </div>
    )
}

export default Modal