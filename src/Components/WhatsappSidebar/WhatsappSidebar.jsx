import { useContext, useState, useEffect } from "react";
import { Link } from "react-router";
import { ContactContext } from "../../Context/ContactContext";
import NewContactForm from "../NewContactForm/NewContacform";
import "./WhatsappSidebar.css";

const getInitials = (name) => {
    if (!name) return "?";
    return name.charAt(0).toUpperCase();
};

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

const filters = ["Todos", "No leídos", "Favoritos", "Grupos"];

const WhatsappSidebar = ({ onSelectChat }) => {
    const { contacts, deleteContactById, updateContactById, deleteAllMessagesById, updateMessageById } =
        useContext(ContactContext);
    const [activeFilter, setActiveFilter] = useState("Todos");
    const [isFormOpen, setIsFormOpen] = useState(false);
    const [openDropdownId, setOpenDropdownId] = useState(null);

    useEffect(() => {
        if (openDropdownId === null) return;
        const handleClick = () => setOpenDropdownId(null);
        document.addEventListener("click", handleClick);
        return () => document.removeEventListener("click", handleClick);
    }, [openDropdownId]);

    return (
        <div className="whatsapp-sidebar">
            <div className="sidebar-icon-bar">
                <div className="icon-bar-avatar">UTN</div>
                <button className="icon-bar-btn active" title="Chats">
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path fill="currentColor" fill-rule="evenodd" d="M22 6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53L3 9v8.33C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67ZM7 10a1 1 0 0 1 1-1h9a1 1 0 1 1 0 2H8a1 1 0 0 1-1-1Zm1 3a1 1 0 1 0 0 2h6a1 1 0 1 0 0-2H8Z" clip-rule="evenodd"></path></svg>
                </button>
                <button className="icon-bar-btn" title="Estados">
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M13.56 3.14c.1-.55.62-.92 1.15-.77a10 10 0 0 1 6.98 12.1.91.91 0 0 1-1.23.6c-.52-.18-.78-.75-.66-1.3a8 8 0 0 0-5.44-9.41c-.53-.17-.9-.68-.8-1.22Zm5.34 14.65c.42.35.48.98.08 1.37a10 10 0 0 1-13.96 0c-.4-.39-.34-1.02.08-1.38a1.11 1.11 0 0 1 1.46.09 8 8 0 0 0 10.88 0c.4-.38 1.03-.44 1.45-.09ZM3.54 15.08c-.52.19-1.1-.08-1.23-.62A10 10 0 0 1 9.29 2.37c.53-.15 1.05.22 1.15.77.1.54-.27 1.05-.8 1.22a8 8 0 0 0-5.44 9.42c.12.54-.14 1.1-.66 1.3Z"></path><path fill="currentColor" fill-rule="evenodd" d="M12 16a4 4 0 1 0 0-8 4 4 0 0 0 0 8Zm0 2a6 6 0 1 0 0-12 6 6 0 0 0 0 12Z" clip-rule="evenodd"></path></svg>
                </button>
                <button className="icon-bar-btn" title="Llamadas">
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor"><path d="M19.95 21c-2.08 0-4.14-.45-6.17-1.36a18.3 18.3 0 0 1-5.55-3.87 18.47 18.47 0 0 1-3.87-5.54C3.46 8.18 3 6.13 3 4.04A1.02 1.02 0 0 1 4.05 3H8.1c.23 0 .44.08.63.24a.9.9 0 0 1 .32.56l.65 3.5c.03.27.03.5-.02.67-.05.19-.15.35-.28.48L6.97 10.9c.34.62.73 1.21 1.2 1.79.45.57.96 1.13 1.5 1.66A17.59 17.59 0 0 0 13.1 17l2.35-2.35a1.61 1.61 0 0 1 1.3-.4l3.45.7c.23.07.43.19.57.36.16.18.23.37.23.59v4.05A1.02 1.02 0 0 1 19.95 21ZM6.03 9l1.64-1.65L7.25 5H5.03c.08.68.2 1.36.34 2.03.16.66.37 1.32.66 1.97Zm8.95 8.95a12.42 12.42 0 0 0 4.02 1v-2.2l-2.35-.48-1.67 1.68Z"></path></svg>
                </button>
                <div className="icon-bar-spacer" />
                <button className="icon-bar-btn" title="Menú">⋮</button>
            </div>

            <div className="sidebar-main">
                <div className="sidebar-header">
                    <h2>WhatsApp</h2>
                    <div className="header-icons">
                        <span className="icon-btn" title="Nuevo chat" onClick={() => setIsFormOpen(!isFormOpen)}>
                            <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="none"><title>new-chat-outline</title><path fill="currentColor" d="M9.53 13h1.98v1.97c0 .43.25.85.67.98a1 1 0 0 0 1.31-.94v-2.02h1.98c.43 0 .85-.25.98-.67a1 1 0 0 0-.94-1.31h-2.02V9.03c0-.43-.25-.85-.67-.98a1 1 0 0 0-1.31.94v2.02H9.49a1 1 0 0 0-.94 1.31c.13.42.55.67.98.67Z"></path><path fill="currentColor" fill-rule="evenodd" d="M.94 5.53 3 8.85v8.48C3 18.81 4.2 20 5.67 20h13.66c1.48 0 2.67-1.2 2.67-2.67V6.67C22 5.19 20.8 4 19.33 4H1.8a1 1 0 0 0-.85 1.53ZM5 8.28v9.05c0 .37.3.67.67.67h13.66c.37 0 .67-.3.67-.67V6.67c0-.37-.3-.67-.67-.67H3.6L5 8.28Z" clip-rule="evenodd"></path></svg>
                        </span>
                        <span className="icon-btn" title="Menú">⋮</span>
                    </div>
                </div>

                <div className="search-bar">
                    <input type="text" placeholder="Busca un chat o inicia uno nuevo" />
                </div>

                {isFormOpen && <NewContactForm />}

                <div className="filter-tabs">
                    {filters.map((filter) => (
                        <button
                            key={filter}
                            className={`filter-tab ${activeFilter === filter ? "active" : ""}`}
                            onClick={() => setActiveFilter(filter)}
                        >
                            {filter}
                        </button>
                    ))}
                </div>

                <div className="contacts-list">
                    {contacts
                        .filter((contact) => {
                            if (activeFilter === "Todos") return true;
                            return true;
                        })
                        .map((contact) => {
                            return (
                                <Link to={`/contact/${contact.id}`} key={contact.id} className="contact-item" onClick={() => onSelectChat && onSelectChat()}>
                                    <div className="contact-avatar" style={{ backgroundColor: getAvatarColor(contact.name) }}>
                                        {getInitials(contact.name)}
                                    </div>
                                    <div className="contact-info">
                                        <div className="contact-top">
                                            <h3 className="contact-name">{contact.name}</h3>
                                            <span className="contact-time">
                                                {new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                            </span>
                                        </div>
                                        <p className="contact-preview">{contact.lastMessage || "..."}</p>
                                    </div>
                                    <div className="contact-actions">
                                        <button
                                            className="dropdown-toggle"
                                            onClick={(e) => {
                                                e.preventDefault();
                                                e.stopPropagation();
                                                setOpenDropdownId(openDropdownId === contact.id ? null : contact.id);
                                            }}
                                            title="Más opciones"
                                        >
                                            <svg viewBox="0 0 24 24" height="20" width="20" fill="currentColor"><path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path></svg>
                                        </button>
                                        {openDropdownId === contact.id && (
                                            <div className="dropdown-menu" onClick={(e) => e.stopPropagation()}>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        const nombreActual = contact.name || "";
                                                        const nuevoNombre = prompt(
                                                            "Escribe el nuevo nombre para este contacto:",
                                                            nombreActual,
                                                        );
                                                        if (nuevoNombre !== null && nuevoNombre.trim() !== "") {
                                                            updateContactById(contact.id, nuevoNombre.trim());
                                                        }
                                                        setOpenDropdownId(null);
                                                    }}
                                                >
                                                    Actualizar contacto
                                                </button>
                                                <button
                                                    className="dropdown-item"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        deleteAllMessagesById(contact.id);
                                                        setOpenDropdownId(null);
                                                    }}
                                                >
                                                    Eliminar historial
                                                </button>
                                                <button
                                                    className="dropdown-item danger"
                                                    onClick={(e) => {
                                                        e.preventDefault();
                                                        e.stopPropagation();
                                                        deleteContactById(contact.id);
                                                        setOpenDropdownId(null);
                                                    }}
                                                >
                                                    Eliminar contacto
                                                </button>
                                            </div>
                                        )}
                                    </div>
                                </Link>
                            );
                        })}
                </div>
            </div>
        </div>
    );
};

export default WhatsappSidebar;