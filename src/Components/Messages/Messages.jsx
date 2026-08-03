import { useContext, useState } from "react"
import MessagesList from "./MessagesList"
import { ContactContext } from "../../Context/ContactContext"
import "./Messages.css"

function Messages() {
    const {contact_selected, createMessage} = useContext(ContactContext)
    const [messageText, setMessageText] = useState("")

    function handleCreateMessage (event) {
        event.preventDefault()
        if (!messageText.trim()) return
        createMessage(messageText.trim(), true)
        setMessageText("")
    }

    return (
        <>
            <div className="chat-messages">
                {contact_selected && contact_selected.messages.length === 0 ? (
                    <div className="empty-messages">
                        <p>No hay mensajes aún. Envía un mensaje para empezar a conversar.</p>
                    </div>
                ) : (
                    <MessagesList />
                )}
            </div>
            <div className="chat-input-area">
                <form onSubmit={handleCreateMessage}>
                    <textarea
                        value={messageText}
                        onChange={(e) => setMessageText(e.target.value)}
                        placeholder="Escribe un mensaje..."
                        rows={1}
                    />
                    <button type="submit" className="send-btn" disabled={!messageText.trim()}>➤</button>
                </form>
            </div>
        </>
    )
}

export default Messages
