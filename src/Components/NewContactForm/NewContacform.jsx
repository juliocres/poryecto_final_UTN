import React, { useContext } from 'react'
import { ContactContext } from '../../Context/ContactContext'

const NewContactForm = () => {
    // Traemos la función directamente desde el contexto
    const { createContact } = useContext(ContactContext)

    function handleSubmitContact(event) {
        event.preventDefault()
        const name = event.target.contactName.value.trim()
        
        if (name) {
            createContact(name)
            event.target.reset() // Limpia el input automáticamente
        }
    }

    return (
        <form onSubmit={handleSubmitContact} style={{ marginBottom: '15px' }}>
            <input 
                type="text" 
                name="contactName" 
                placeholder="Nuevo contacto..." 
                required 
            />
            <button type="submit">Añadir</button>
        </form>
    )
}

export default NewContactForm