import { useContext, useState, useEffect } from "react"
import { ContactContext } from "../../Context/ContactContext"

function MessagesList() {
    const {contact_selected, deleteMessageById, updateMessageById} = useContext(ContactContext)
    const [openDropdownId, setOpenDropdownId] = useState(null)

    useEffect(() => {
        if (openDropdownId === null) return
        const handleClick = () => setOpenDropdownId(null)
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [openDropdownId])

    return contact_selected.messages.map(
        (message) => {
            return (
                <div
                    key={message.id}
                    className={`message-bubble ${message.sendByMe ? 'sent' : 'received'}`}
                >
                    {!message.sendByMe && (
                        <div className="sender-name">{contact_selected.name}</div>
                    )}
                    <p style={{ margin: 0 }}>{message.content}</p>
                    <div className="message-footer">
                        <span className="message-time">
                            {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        <div className="message-actions">
                            <button
                                className="msg-menu-btn"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    setOpenDropdownId(openDropdownId === message.id ? null : message.id)
                                }}
                                title="Más opciones"
                            >
                                <svg viewBox="0 0 24 24" height="16" width="16" fill="currentColor"><path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path></svg>
                            </button>
                            {openDropdownId === message.id && (
                                <div className="msg-dropdown" onClick={(e) => e.stopPropagation()}>
                                    {message.sendByMe && (
                                        <button
                                            className="msg-dropdown-item"
                                            onClick={() => {
                                                const nuevoContenido = prompt(
                                                    "Editar mensaje:",
                                                    message.content,
                                                )
                                                if (nuevoContenido !== null && nuevoContenido.trim() !== "") {
                                                    updateMessageById(message.id, nuevoContenido.trim())
                                                }
                                                setOpenDropdownId(null)
                                            }}
                                        >
                                            Editar mensaje
                                        </button>
                                    )}
                                    <button
                                        className="msg-dropdown-item danger"
                                        onClick={() => {
                                            deleteMessageById(message.id)
                                            setOpenDropdownId(null)
                                        }}
                                    >
                                        Eliminar mensaje
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )
        }
    )
}

export default MessagesList