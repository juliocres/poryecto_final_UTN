import { useContext } from "react"
import { ContactContext } from "../../Context/ContactContext"

function MessagesList() {
    const {contact_selected, deleteMessageById} = useContext(ContactContext)
    if(contact_selected.messages.length === 0){
        return (
            <h2>Aun no hay historial de mensajes</h2>
        )
    }
    return contact_selected.messages.map(
        (message) => {

            return <div key={message.id}>
                <h2>{message.sendByMe ? 'Tu' : contact_selected.name}</h2>
                <p>{message.content}</p>
                <button onClick={() => { deleteMessageById( message.id) }}>Eliminar</button>
                <hr />
            </div>
        }
    )
}

export default MessagesList