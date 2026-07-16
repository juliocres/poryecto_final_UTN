import React, { useContext } from 'react'
import { Link, useParams } from 'react-router'
import WhatsappSidebar from '../../Components/WhatsappSidebar/WhatsappSidebar'
import Messages from '../../Components/Messages/Messages'
import { ThemeContext } from '../../Context/ThemeContext'
import { ContactContext } from '../../Context/ContactContext'

const ContactChatScreen = () => {
    const {contact_selected} = useContext(ContactContext)
    if (!contact_selected) {
        return (
            <div>
                <WhatsappSidebar />
                <h2>Contacto no encontrado</h2>
                <Link to="/">Volver a inicio</Link>
            </div>
        )
    }
    return (
        <div >
            <WhatsappSidebar />
            <h1>{contact_selected.name}</h1>
            <Messages/>
        </div>
    )
}

export default ContactChatScreen