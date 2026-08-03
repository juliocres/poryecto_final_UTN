import { useContext, useState, useEffect } from 'react'
import { Link, useParams } from 'react-router'
import { ContactContext } from '../../Context/ContactContext'
import NewContactForm from '../NewContactForm/NewContacform'
import './WhatsappSidebar.css'

const avatarColors = [
  "#00a884", "#df6b4f", "#5f9dd6", "#9b59b6",
  "#e67e22", "#2ecc71", "#e74c3c", "#3498db",
  "#1abc9c", "#f39c12", "#2980b9", "#c0392b",
  "#8e44ad", "#16a085", "#d35400", "#27ae60",
]

const getAvatarColor = (name) => {
  if (!name) return avatarColors[0]
  let hash = 0
  for (let i = 0; i < name.length; i++) {
    hash = name.charCodeAt(i) + ((hash << 5) - hash)
  }
  return avatarColors[Math.abs(hash) % avatarColors.length]
}

const WhatsappSidebar = ({ onSelectChat }) => {
  const { contacts, deleteContactById, deleteAllMessagesById } = useContext(ContactContext)
  const { contact_id } = useParams()
  const [searchTerm, setSearchTerm] = useState('')
  const [activeTab, setActiveTab] = useState('all')
  const [showNewContactForm, setShowNewContactForm] = useState(false)
  const [openDropdownId, setOpenDropdownId] = useState(null)

  useEffect(() => {
    if (openDropdownId === null) return
    const handleClickOutside = () => setOpenDropdownId(null)
    document.addEventListener('click', handleClickOutside)
    return () => document.removeEventListener('click', handleClickOutside)
  }, [openDropdownId])

  // Filtrado dinámico por pestaña seleccionada (No leídos, Grupos, Estados, Comunidades muestran lista vacía)
  const filteredContacts = (contacts || []).filter((contact) => {
    if (['unread', 'groups', 'status', 'communities'].includes(activeTab)) {
      return false
    }
    const matchesSearch = contact.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (contact.lastMessage || contact.last_message || '').toLowerCase().includes(searchTerm.toLowerCase())
    return matchesSearch
  })

  return (
    <aside className="whatsapp-sidebar">
      <div className="sidebar-icon-bar">
        <button 
          className={`icon-bar-btn ${['all', 'unread', 'groups'].includes(activeTab) ? 'active' : ''}`} 
          title="Chats"
          onClick={() => setActiveTab('all')}
        >
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>wds-ic-chat-filled</title><path fill="currentColor" fillRule="evenodd" d="M22 6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53L3 9v8.33C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67ZM7 10a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H8Z" clipRule="evenodd"></path></svg>
        </button>
        <button 
          className={`icon-bar-btn ${activeTab === 'status' ? 'active' : ''}`} 
          title="Novedades"
          onClick={() => setActiveTab('status')}
        >
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>wds-ic-status</title><path fill="currentColor" d="M13.56 3.14c.1-.55.62-.92 1.15-.77a10 10 0 0 1 6.98 12.1.91.91 0 0 1-1.23.6c-.52-.18-.78-.75-.66-1.3a8 8 0 0 0-5.44-9.41c-.53-.17-.9-.68-.8-1.22Zm5.34 14.65c.42.35.48.98.08 1.37a10 10 0 0 1-13.96 0c-.4-.39-.34-1.02.08-1.38a1.11 1.11 0 0 1 1.46.09 8 8 0 0 0 10.88 0c.4-.38 1.03-.44 1.45-.09ZM3.54 15.08c-.52.19-1.1-.08-1.23-.62A10 10 0 0 1 9.29 2.37c.53-.15 1.05.22 1.15.77.1.54-.27 1.05-.8 1.22a8 8 0 0 0-5.44 9.42c.12.54-.14 1.1-.66 1.3Z"></path><path fill="currentColor" fillRule="evenodd" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" clipRule="evenodd"></path></svg>
        </button>
        <button 
          className={`icon-bar-btn ${activeTab === 'communities' ? 'active' : ''}`} 
          title="Comunidades"
          onClick={() => setActiveTab('communities')}
        >
          <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="currentColor"><title>wds-ic-communities</title><path fill="currentColor" fillRule="evenodd" d="M6.37 18.67a1.81 1.81 0 0 1-.58-1.24c-.01-.5-.03-1.5.03-1.94a2.7 2.7 0 0 1 .4-1.1 2.84 2.84 0 0 1 .9-.82c.46-.28.98-.46 1.4-.58A12.2 12.2 0 0 1 12 12.5a12.69 12.69 0 0 1 3.47.49 5.76 5.76 0 0 1 1.52.65c.28.19.56.44.78.76a2.41 2.41 0 0 1 .41 1.1c.06.43.04 1.43.03 1.93a1.9 1.9 0 0 1-.58 1.24c-.22.2-.48.33-.75.33H7.12c-.27 0-.53-.13-.75-.33Zm13.6-3.27c.04.6.03.86.02 1.6v.49a4.58 4.58 0 0 1-.3 1.51h2.97c.72 0 1.31-1.85 1.33-2.58.01-.4.02-.13-.02-.46a2.34 2.34 0 0 0-.95-1.6 4.27 4.27 0 0 0-1.41-.68h-.02v-.01a7.72 7.72 0 0 0-2.35-.27 4.18 4.18 0 0 1 .72 2Zm-2.04-3.95a2.65 2.65 0 0 0 3.16.06 2.67 2.67 0 1 0-3.16-.06ZM14.9 9.62A3.54 3.54 0 0 0 15.5 7a3.56 3.56 0 1 0-.61 2.62Zm-7.88.4a2.67 2.67 0 1 0-5.16-1.38 2.67 2.67 0 0 0 5.16 1.38Zm-4.42 3.6-.18.05h-.03a4.3 4.3 0 0 0-1.41.69 2.3 2.3 0 0 0-.95 1.6c-.04.33-.03 1.06-.02 1.46.02.73.61 1.58 1.33 1.58H4.3a4.58 4.58 0 0 1-.3-1.51V17c-.01-.74-.02-1 .03-1.6 0-.05 0-.1.02-.15a4.48 4.48 0 0 1 .7-1.85 7.22 7.22 0 0 0-2.16.22Zm9.4.88c-1.21 0-2.22.2-2.92.4-.37.12-.68.23-.91.38-.23.13-.3.25-.34.34a.7.7 0 0 0-.03.14s0-.01 0 0L7.79 17h8.42v-1.24c-.01-.01 0 .01 0 0a.7.7 0 0 0-.04-.14c-.03-.09-.11-.2-.34-.34a3.84 3.84 0 0 0-.91-.37c-.7-.2-1.7-.41-2.92-.41ZM12 6a1.55 1.55 0 1 0 0 3.11c.86 0 1.56-.7 1.56-1.55C13.56 6.7 12.86 6 12 6Z" clipRule="evenodd"></path></svg>
        </button>
        <div className="icon-bar-spacer" />
        <button className="icon-bar-btn" title="Multimedia">
          <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
            <path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM5 15h14l-4.5-6-3.5 4.5-2.5-3z"></path>
          </svg>
        </button>
        <button className="icon-bar-btn notranslate" translate="no" title="Mi perfil">
          <svg viewBox="0 0 212 212" height="24" width="24">
            <path fill="currentColor" d="M106 0a106 106 0 1 0 106 106A106 106 0 0 0 106 0Zm0 60a32 32 0 1 1-32 32 32 32 0 0 1 32-32Zm0 120a84 84 0 0 1-59.4-24.6c.4-19.7 39.6-30.5 59.4-30.5s59 10.8 59.4 30.5A84 84 0 0 1 106 180Z"/>
          </svg>
        </button>
      </div>


      <div className="sidebar-main">
        {/* Encabezado */}
        <div className="sidebar-header">
          <h2>WhatsApp</h2>
          <div className="header-icons">
            <button
              className="icon-btn"
              title="Nuevo chat"
              onClick={() => setShowNewContactForm(!showNewContactForm)}
            >
              <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" fill="none"><title>new-chat-outline</title><path fill="currentColor" d="M9.53 13h1.98v1.97c0 .43.25.85.67.98a1 1 0 0 0 1.31-.94v-2.02h1.98c.43 0 .85-.25.98-.67a1 1 0 0 0-.94-1.31h-2.02V9.03c0-.43-.25-.85-.67-.98a1 1 0 0 0-1.31.94v2.02H9.49a1 1 0 0 0-.94 1.31c.13.42.55.67.98.67Z"></path><path fill="currentColor" fillRule="evenodd" d="M.94 5.53 3 8.85v8.48C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53ZM5 8.28v9.05c0 .37.3.67.67.67h13.66c.37 0 .67-.3.67-.67V6.67c0-.37-.3-.67-.67-.67H3.6L5 8.28Z" clipRule="evenodd"></path></svg>
            </button>
            <button className="icon-btn" title="Más opciones">
              ⋮
            </button>
          </div>
        </div>

        {showNewContactForm && (
          <NewContactForm />
        )}
        <div className="search-bar">
          <input
            type="text"
            placeholder="Buscar o empezar un nuevo chat"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Pestañas de filtro */}
        <div className="filter-tabs">
          <button
            className={`filter-tab ${activeTab === 'all' ? 'active' : ''}`}
            onClick={() => setActiveTab('all')}
          >
            Todos
          </button>
          <button
            className={`filter-tab ${activeTab === 'unread' ? 'active' : ''}`}
            onClick={() => setActiveTab('unread')}
          >
            No leídos
          </button>
          <button
            className={`filter-tab ${activeTab === 'groups' ? 'active' : ''}`}
            onClick={() => setActiveTab('groups')}
          >
            Grupos
          </button>
        </div>

        {/* Lista de Contactos */}
        <div className="contacts-list">
          {filteredContacts.length === 0 ? (
            <div className="empty-messages">
              {activeTab === 'unread' 
                ? 'No hay chats no leídos' 
                : activeTab === 'groups' 
                ? 'No hay grupos' 
                : activeTab === 'status'
                ? 'No hay novedades o estados disponibles'
                : activeTab === 'communities'
                ? 'No hay comunidades disponibles'
                : 'No se encontraron contactos'}
            </div>
          ) : (
            filteredContacts.map((contact) => {
              const isSelected = String(contact_id) === String(contact.id)
              const lastMsg = contact.messages && contact.messages.length > 0
                ? contact.messages[contact.messages.length - 1].content
                : (contact.lastMessage || contact.last_message || 'Sin mensajes')

              return (
                <div key={contact.id} className="contact-wrapper">
                  <Link
                    to={`/contact/${contact.id}`}
                    className={`contact-item ${isSelected ? 'active' : ''}`}
                    onClick={() => {
                      if (onSelectChat) onSelectChat()
                    }}
                  >
                    <div
                      className="contact-avatar notranslate"
                      translate="no"
                      style={{ backgroundColor: getAvatarColor(contact.name) }}
                    >
                      {contact.name ? contact.name.charAt(0).toUpperCase() : '?'}
                    </div>

                    <div className="contact-info">
                      <div className="contact-top">
                        <span className="contact-name">{contact.name}</span>
                        <span className="contact-time">{contact.last_time || '12:00'}</span>
                      </div>
                      <div className="contact-bottom">
                        <p className="contact-preview">
                          {lastMsg}
                        </p>
                      </div>
                    </div>

                    <div className="contact-actions">
                      <button
                        className="dropdown-toggle"
                        onClick={(e) => {
                          e.preventDefault()
                          e.stopPropagation()
                          setOpenDropdownId(openDropdownId === contact.id ? null : contact.id)
                        }}
                        title="Opciones"
                      >
                        ⋮
                      </button>
                    </div>
                  </Link>

                  {openDropdownId === contact.id && (
                    <div
                      className="dropdown-menu"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {deleteAllMessagesById && (
                        <button
                          className="dropdown-item"
                          onClick={() => {
                            deleteAllMessagesById(contact.id)
                            setOpenDropdownId(null)
                          }}
                        >
                          Vaciar chat
                        </button>
                      )}
                      <button
                        className="dropdown-item danger"
                        onClick={() => {
                          deleteContactById(contact.id)
                          setOpenDropdownId(null)
                        }}
                      >
                        Eliminar contacto
                      </button>
                    </div>
                  )}
                </div>
              )
            })
          )}
        </div>
      </div>
    </aside>
  )
}

export default WhatsappSidebar