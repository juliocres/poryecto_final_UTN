import { useContext } from 'react'
import { useNavigate } from 'react-router'
import WhatsappSidebar from '../../Components/WhatsappSidebar/WhatsappSidebar'
import Messages from '../../Components/Messages/Messages'
import ContactHeader from '../../Components/ContactHeader/ContactHeader'
import ChatEmptyState from '../../Components/ChatEmptyState/ChatEmptyState'
import { ContactContext } from '../../Context/ContactContext'

const ContactChatScreen = () => {
  const { contact_selected, updateContactById } = useContext(ContactContext)
  const navigate = useNavigate()

  return (
    <div className="app-container show-chat">
      <WhatsappSidebar />

      {!contact_selected ? (
        <ChatEmptyState />
      ) : (
        <div className="chat-main">
          <ContactHeader 
            contact={contact_selected} 
            onUpdateName={updateContactById} 
            onBack={() => navigate('/')} 
          />
          <Messages />
        </div>
      )}
    </div>
  )
}

export default ContactChatScreen