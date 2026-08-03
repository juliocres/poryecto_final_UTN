import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";

const ContactContext = createContext()

const server_contacts = [
    {
        id: 1,
        name: "Juan Pérez",
        lastMessage: "Nos vemos mañana!",
        last_time: "14:25",
        statusText: "en línea",
        messages: [
            { id: 1, sendByMe: false, content: "hola!", time: "14:20" },
            { id: 2, sendByMe: true, content: "Todo bien!", time: "14:22" },
            { id: 3, sendByMe: false, content: "Que tal?", time: "14:24" },
            { id: 4, sendByMe: true, content: "Nos vemos mañana!", time: "14:25" }
        ]
    },
    {
        id: 2,
        name: "María Gómez",
        lastMessage: "Dale, gracias 🙏",
        last_time: "Ayer 18:40",
        statusText: "últ. vez ayer a las 18:40",
        messages: [
            { id: 1, sendByMe: false, content: "hola!", time: "Ayer 18:30" },
            { id: 2, sendByMe: true, content: "Todo bien!", time: "Ayer 18:35" },
            { id: 3, sendByMe: false, content: "Que tal?", time: "Ayer 18:38" },
            { id: 4, sendByMe: true, content: "Dale, gracias 🙏", time: "Ayer 18:40" }
        ]
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        lastMessage: "Te mando el archivo",
        last_time: "Hace 2 días",
        statusText: "últ. vez hace 2 días a las 11:15",
        messages: [
            { id: 1, sendByMe: false, content: "hola!", time: "Hace 2 días 11:00" },
            { id: 2, sendByMe: true, content: "Todo bien!", time: "Hace 2 días 11:05" },
            { id: 3, sendByMe: false, content: "Que tal?", time: "Hace 2 días 11:10" },
            { id: 4, sendByMe: true, content: "Te mando el archivo", time: "Hace 2 días 11:15" }
        ]
    },
    {
        id: 4,
        name: "Lucía Fernández",
        lastMessage: "Jajaja sí",
        last_time: "Hace 3 días",
        statusText: "últ. vez hace 3 días a las 20:10",
        messages: [
            { id: 1, sendByMe: false, content: "hola!", time: "Hace 3 días 20:01" },
            { id: 2, sendByMe: true, content: "Todo bien!", time: "Hace 3 días 20:05" },
            { id: 3, sendByMe: false, content: "Que tal?", time: "Hace 3 días 20:08" },
            { id: 4, sendByMe: true, content: "Jajaja sí", time: "Hace 3 días 20:10" }
        ]
    },
]
//let ultimoIdAsignado = 4;

function ContactContextProvider() {
    const [contacts, setContacts] = useState(server_contacts)

    const { contact_id } = useParams()

    let contact_selected = null

    if (contact_id) {
        contact_selected = contacts.find(contact => contact.id === Number(contact_id))
    }

    function deleteMessageById(message_id) {
        const contacts_modified = contacts.map(contact => {
            if (contact.id === Number(contact_id)) {
                const updatedMessages = contact.messages.filter(msg => msg.id !== Number(message_id))
                const lastMsg = updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1].content : "Sin mensajes"
                return {
                    ...contact,
                    messages: updatedMessages,
                    lastMessage: lastMsg
                }
            }
            return contact
        })
        setContacts(contacts_modified)
    }

    function createMessage(value, sendByMe) {
        const now = new Date()
        const currentTime = now.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })

        const contacts_modified = contacts.map(contact => {
            if (contact.id === Number(contact_id)) {
                const new_message = {
                    content: value,
                    sendByMe: sendByMe,
                    id: contact.messages.length + 1,
                    time: currentTime
                }
                const updatedMessages = [...contact.messages, new_message]
                return {
                    ...contact,
                    messages: updatedMessages,
                    lastMessage: value,
                    last_time: currentTime,
                    statusText: "en línea"
                }
            }
            return contact
        })
        setContacts(contacts_modified)
    }

    function deleteAllMessages() {
        const contacts_modified = contacts.map(contact => {
            if (contact.id === Number(contact_id)) {
                return {
                    ...contact,
                    messages: [],
                    lastMessage: "Sin mensajes"
                }
            }
            return contact
        })
        setContacts(contacts_modified)
    }

    function deleteAllMessagesById(delete_contact_id) {
        const contacts_modified = contacts.map(contact => {
            if (contact.id === Number(delete_contact_id)) {
                return {
                    ...contact,
                    messages: [],
                    lastMessage: "Sin mensajes"
                }
            }
            return contact
        })
        setContacts(contacts_modified)
    }

    function createContact(name) {
        const maxId = contacts.length > 0 ? Math.max(...contacts.map(c => c.id)) : 0
        const new_contact = {
            id: maxId + 1,
            name: name,
            lastMessage: "Contacto nuevo",
            messages: []
        }
        setContacts([...contacts, new_contact])
    }

    function deleteContactById(delete_contact) {
        const filtered = contacts.filter(
            (contact) => String(contact.id) !== String(delete_contact)
        )
        setContacts(filtered)
    }

    function updateContactById(target_id, newName) {
        const updated = contacts.map(contact => {
            if (contact.id === Number(target_id)) {
                return {
                    ...contact,
                    name: newName
                }
            }
            return contact
        })
        setContacts(updated)
    }

    function updateMessageById(message_id, newContent) {
        const updated = contacts.map(contact => {
            if (contact.id === Number(contact_id)) {
                const updatedMessages = contact.messages.map(message => {
                    if (message.id === Number(message_id)) {
                        return {
                            ...message,
                            content: newContent
                        }
                    }
                    return message
                })
                const lastMsg = updatedMessages.length > 0 ? updatedMessages[updatedMessages.length - 1].content : "Sin mensajes"
                return {
                    ...contact,
                    messages: updatedMessages,
                    lastMessage: lastMsg
                }
            }
            return contact
        })
        setContacts(updated)
    }

    const provider_values = {
        contacts: contacts,
        contact_selected,
        deleteMessageById,
        createMessage,
        deleteAllMessages,
        deleteAllMessagesById,
        createContact,
        deleteContactById,
        updateContactById,
        updateMessageById
    }
    return (
        <ContactContext.Provider value={provider_values}>
            <Outlet />
        </ContactContext.Provider>
    )
}


export { ContactContext, ContactContextProvider }