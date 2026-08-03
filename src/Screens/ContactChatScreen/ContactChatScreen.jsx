import { useContext, useState } from 'react'
import { Link, useParams } from 'react-router'
import WhatsappSidebar from '../../Components/WhatsappSidebar/WhatsappSidebar'
import Messages from '../../Components/Messages/Messages'
import { ContactContext } from '../../Context/ContactContext'

const avatarColors = [
    "#00a884", "#df6b4f", "#5f9dd6", "#9b59b6",
    "#e67e22", "#2ecc71", "#e74c3c", "#3498db",
    "#1abc9c", "#f39c12", "#2980b9", "#c0392b",
    "#8e44ad", "#16a085", "#d35400", "#27ae60",
];

const getAvatarColor = (name) => {
    if (!name) return avatarColors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
};

const ContactChatScreen = () => {
    const {contact_selected} = useContext(ContactContext)
    const [showChat, setShowChat] = useState(false)

    if (!contact_selected) {
        return (
            <div className={showChat ? 'app-container show-chat' : 'app-container'}>
                <WhatsappSidebar onSelectChat={() => {}} />
                <div className="empty-state">
                    <div className="empty-icon">💬</div>
                    <h2>WhatsApp Web</h2>
                    <p>Selecciona un chat para empezar a conversar</p>
                </div>
            </div>
        )
    }
    return (
        <div className={showChat ? 'app-container show-chat' : 'app-container'}>
            <WhatsappSidebar onSelectChat={() => setShowChat(true)} />
            <div className="chat-main">
                <div className="chat-header">
                        <button className="back-button" onClick={() => setShowChat(false)}>←</button>
                        <div className="chat-header-avatar" style={{ backgroundColor: getAvatarColor(contact_selected.name) }}>
                            {contact_selected.name ? contact_selected.name.charAt(0).toUpperCase() : '?'}
                        </div>
                        <div className="chat-header-info">
                            <h1>{contact_selected.name}</h1>
                            <p>en línea</p>
                        </div>
                        <div className="chat-header-icons">
                            <button className="header-icon-btn" title="Llamada de video">
                                <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4Z"></path></svg>
                            </button>
                            <button className="header-icon-btn" title="Llamada de audio">
                                <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"></path></svg>
                            </button>
                            <button className="header-icon-btn" title="Buscar">
                                <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"></path></svg>
                            </button>
                            <button className="header-icon-btn" title="Menú">
                                <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path></svg>
                            </button>
                        </div>
                    </div>
                <Messages />
            </div>
        </div>
    )
}

export default ContactChatScreen
