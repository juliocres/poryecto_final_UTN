import { useContext, useState } from "react"
import MessagesList from "./MessagesList"
import { ContactContext } from "../../Context/ContactContext"

function Messages() {


    const {contact_selected, deleteMessageById, deleteAllMessages, createMessage} = useContext(ContactContext)

    function handleCreateMessage (event) {
        event.preventDefault()
        createMessage(event.target.message.value, true)

        //Resetea el form
        event.target.reset()
    }
    return (
        <div>
            <button onClick={deleteAllMessages}>Eliminar historial</button>
            <h1>Mensajes:</h1>
            <MessagesList  />


            <form onSubmit={handleCreateMessage}>
                <label htmlFor="message">Envia un mensaje:</label>
                <textarea id="message" name="message" />
                <button type="submit">Enviar</button>
            </form>

        </div>
    )
}

export default Messages



