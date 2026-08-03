import { useContext } from 'react'
import { ContactContext } from '../../Context/ContactContext'

const NewContactForm = () => {
    const { createContact } = useContext(ContactContext)

    function handleSubmitContact(event) {
        event.preventDefault()
        const name = event.target.contactName.value.trim()
        if (name) {
            createContact(name)
            event.target.reset()
        }
    }

    return (
        <form className="new-contact-form" onSubmit={handleSubmitContact}>
            <input
                type="text"
                name="contactName"
                placeholder="Nuevo contacto..."
                required
            />
            <button className="add-btn" type="submit">Añadir</button>
        </form>
    )
}

export default NewContactForm
