import { createContext, useState } from "react";
import { Outlet, useParams } from "react-router";

const ContactContext = createContext()

const server_contacts = [
    {
        id: 1,
        name: "Juan Pérez",
        lastMessage: "Nos vemos mañana!",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Todo bien!"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Que tal?"
            },
            {
                id: 4,
                sendByMe: true,
                content: "Todo bien!"
            }
        ]
    },
    {
        id: 2,
        name: "María Gómez",
        lastMessage: "Dale, gracias 🙏",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Todo bien!"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Que tal?"
            },
            {
                id: 4,
                sendByMe: true,
                content: "Todo bien!"
            }
        ]
    },
    {
        id: 3,
        name: "Carlos Ruiz",
        lastMessage: "Te mando el archivo",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Todo bien!"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Que tal?"
            },
            {
                id: 4,
                sendByMe: true,
                content: "Todo bien!"
            }
        ]
    },
    {
        id: 4,
        name: "Lucía Fernández",
        lastMessage: "Jajaja sí",
        messages: [
            {
                id: 1,
                sendByMe: false,
                content: "hola!"
            },
            {
                id: 2,
                sendByMe: true,
                content: "Todo bien!"
            },
            {
                id: 3,
                sendByMe: false,
                content: "Que tal?"
            },
            {
                id: 4,
                sendByMe: true,
                content: "Todo bien!"
            }
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
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    const message_index = contact.messages.findIndex(message => message.id === Number(message_id))
                    contact.messages.splice(message_index, 1)
                }

                return contact
            }
        )
        setContacts(
            contacts_modified
        )
    }

    function createMessage(value, sendByMe) {
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {

                    const new_message = {
                        content: value,
                        sendByMe: sendByMe,
                        id: contact.messages.length + 1
                    }
                    contact.messages.push(new_message)
                }

                return contact
            }
        )
        setContacts(
            contacts_modified
        )
    }

    function deleteAllMessages() {
        const contacts_modified = contacts.map(
            (contact) => {
                if (contact.id === Number(contact_id)) {
                    contact.messages = []
                }

                return contact
            }
        )
        setContacts(
            contacts_modified
        )
    }

let ultimoIdAsignado = 4;
function createContact(name) {
        
        ultimoIdAsignado++; 

        const new_contact = {
            id: ultimoIdAsignado, 
            name: name,
            lastMessage: "Contacto nuevo",
            messages: []
        }

        setContacts([...contacts, new_contact])
    }

    function deleteContactById (delete_contact){
        const contact_delete_id = contacts.filter(
            (contact) => String(contact.id) !== String(delete_contact)
        )
        setContacts(contact_delete_id)
    }

    function updateContactById (contact_id, newName){
        const update_contact = contacts.map(
            (contact) => {
                if(contact.id === Number(contact_id)) {
                    return {
                        ...contact,
                        name :newName

                    }
                }
                return contact
            })
        setContacts (update_contact)
    }
    /* 
    createContact
    deleteContactById
    updateContactById
    updateMessageById
    */



    const provider_values = {
        contacts: contacts,
        contact_selected,
        deleteMessageById,
        createMessage,
        deleteAllMessages,
        createContact,
        deleteContactById,
        updateContactById
    }
    return (
        <ContactContext.Provider value={provider_values}>
            {/* 
            el outlet hace referencia a las subrutas
            */}
            <Outlet />
        </ContactContext.Provider>
    )
}


export { ContactContext, ContactContextProvider }