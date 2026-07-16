import React, { useContext } from 'react'
import { Link } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'

const WhatsappSidebar = () => {
    const {contacts} = useContext(ContactContext)
    return (
        <aside>
            <h2>Whatsapp</h2>
            <div>
                {
                    contacts.map(
                        (contact) => {
                            return (
                                <Link to={`/contact/${contact.id}`} key={contact.id}>
                                    <h3>{contact.name}</h3>
                                    <p>{contact.lastMessage}</p>
                                    <hr />
                                </Link>
                            )
                        }
                    )
                }
            </div>
        </aside>
    )
}

export default WhatsappSidebar