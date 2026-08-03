import { useContext, useState, useEffect } from "react"
import { ContactContext } from "../../Context/ContactContext"

function MessagesList() {
    const { contact_selected, deleteMessageById, updateMessageById } = useContext(ContactContext)
    const [openDropdownId, setOpenDropdownId] = useState(null)
    const [editingMessageId, setEditingMessageId] = useState(null)
    const [editedText, setEditedText] = useState("")

    useEffect(() => {
        if (openDropdownId === null) return
        const handleClick = () => setOpenDropdownId(null)
        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [openDropdownId])

    const handleSaveEdit = (e, messageId) => {
        e.preventDefault()
        if (editedText.trim() !== "") {
            updateMessageById(messageId, editedText.trim())
        }
        setEditingMessageId(null)
    }

    return contact_selected.messages.map(
        (message) => {
            const isEditingThis = editingMessageId === message.id

            return (
                <div
                    key={message.id}
                    className={`message-bubble ${message.sendByMe ? 'sent' : 'received'}`}
                >
                    {!message.sendByMe && (
                        <div className="sender-name">{contact_selected.name}</div>
                    )}

                    {isEditingThis ? (
                        <form className="msg-edit-form" onSubmit={(e) => handleSaveEdit(e, message.id)}>
                            <input
                                type="text"
                                value={editedText}
                                onChange={(e) => setEditedText(e.target.value)}
                                autoFocus
                                className="edit-message-input"
                                onKeyDown={(e) => {
                                    if (e.key === 'Escape') setEditingMessageId(null);
                                }}
                                onBlur={(e) => handleSaveEdit(e, message.id)}
                            />
                        </form>
                    ) : (
                        <p>{message.content}</p>
                    )}

                    <div className="message-footer">
                        <span className="message-time">
                            {message.time || new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                        </span>
                        {message.sendByMe && (
                            <span className="read-receipt" title={message.isRead !== false ? "Leído (Visto)" : "Entregado"}>
                                <svg viewBox="0 0 18 12" height="12" width="18" fill={message.isRead !== false ? "#53bdeb" : "#8696a0"}>
                                    <path d="M15.5 1.5 10 7.05 7.95 5 6.55 6.4 10 9.85 16.9 2.9z"/>
                                    <path d="M9.5 1.5 4 7.05 1.95 5 .55 6.4 4 9.85 10.9 2.9z"/>
                                </svg>
                            </span>
                        )}
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
                                                setEditingMessageId(message.id)
                                                setEditedText(message.content)
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