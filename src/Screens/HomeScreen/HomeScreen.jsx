import { useState } from "react"
import WhatsappSidebar from "../../Components/WhatsappSidebar/WhatsappSidebar"

function HomeScreen (){
    const [showChat, setShowChat] = useState(false)
    return (
        <div className={showChat ? 'app-container show-chat' : 'app-container'}>
            <WhatsappSidebar onSelectChat={() => setShowChat(true)} />
            <div className="empty-state">
                <div className="empty-icon">💬</div>
                <h2>WhatsApp Web</h2>
                <p>Selecciona un chat para empezar a conversar</p>
            </div>
        </div>
    )
}

export default HomeScreen
