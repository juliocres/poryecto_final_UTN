import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router'
import WhatsappSidebar from '../../Components/WhatsappSidebar/WhatsappSidebar'
import Messages from '../../Components/Messages/Messages'
import ContactHeader from '../../Components/ContactHeader/ContactHeader'
import ChatEmptyState from '../../Components/ChatEmptyState/ChatEmptyState'
import { ContactContext } from '../../Context/ContactContext'

const ContactChatScreen = () => {
  const { contact_selected, updateContactById } = useContext(ContactContext)
  const [showChat, setShowChat] = useState(true)
  const navigate = useNavigate()

  useEffect(() => {
    if (contact_selected) {
      setShowChat(true)
    }
  }, [contact_selected])

  return (
    <div className={showChat ? 'app-container show-chat' : 'app-container'}>
      <WhatsappSidebar onSelectChat={() => setShowChat(true)} />

      {!contact_selected ? (
        <ChatEmptyState />
      ) : (
        <div className="chat-main">
          <ContactHeader 
            contact={contact_selected} 
            onUpdateName={updateContactById} 
            onBack={() => {
              setShowChat(false)
              navigate('/')
            }} 
          />
          <Messages />
        </div>
      )}
    </div>
  )
}

export default ContactChatScreen