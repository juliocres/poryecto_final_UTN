import React, { useState, useEffect } from "react";
import "./ContactHeader.css";

const avatarColors = [
    "#00a884",
    "#df6b4f",
    "#5f9dd6",
    "#9b59b6",
    "#e67e22",
    "#2ecc71",
    "#e74c3c",
    "#3498db",
    "#1abc9c",
    "#f39c12",
    "#2980b9",
    "#c0392b",
    "#8e44ad",
    "#16a085",
    "#d35400",
    "#27ae60",
];

const getAvatarColor = (name) => {
    if (!name) return avatarColors[0];
    let hash = 0;
    for (let i = 0; i < name.length; i++) {
        hash = name.charCodeAt(i) + ((hash << 5) - hash);
    }
    return avatarColors[Math.abs(hash) % avatarColors.length];
};

const ContactHeader = ({ contact, onUpdateName, onBack }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [newName, setNewName] = useState("");
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    // Sincronizar el nombre cuando cambia el contacto o se abre/cierra la edición
    useEffect(() => {
        if (contact) {
            setNewName(contact.name || "");
            setIsEditing(false);
        }
    }, [contact]);

    useEffect(() => {
        if (!isMenuOpen) return;
        const handleClickOutside = () => setIsMenuOpen(false);
        document.addEventListener("click", handleClickOutside);
        return () => document.removeEventListener("click", handleClickOutside);
    }, [isMenuOpen]);

    const handleSaveName = (e) => {
        e.preventDefault();
        if (newName.trim() !== "") {
            onUpdateName(contact.id, newName.trim());
            setIsEditing(false);
        }
    };

    return (
        <div className="chat-header">
            <button className="back-button" onClick={onBack}>
                ←
            </button>

            <div
                className="chat-header-avatar notranslate"
                translate="no"
                style={{ backgroundColor: getAvatarColor(contact.name) }}
            >
                {contact.name ? contact.name.charAt(0).toUpperCase() : "?"}
            </div>

            {/* Renderizado condicional: Formulario de edición VS Info del contacto */}
            {isEditing ? (
                <form className="chat-header-edit-form" onSubmit={handleSaveName}>
                    <input
                        type="text"
                        value={newName}
                        onChange={(e) => setNewName(e.target.value)}
                        autoFocus
                        className="edit-name-input"
                        placeholder="Nombre del contacto (Presiona Enter)"
                        onKeyDown={(e) => {
                            if (e.key === 'Escape') setIsEditing(false);
                        }}
                        onBlur={() => {
                            if (newName.trim() !== "") {
                                onUpdateName(contact.id, newName.trim());
                            }
                            setIsEditing(false);
                        }}
                    />
                </form>
            ) : (
                <div className="chat-header-info">
                    <h1>{contact.name}</h1>
                    <p>{contact.statusText || "en línea"}</p>
                </div>
            )}
            <div className="chat-header-icons">
                <button className="header-icon-btn desktop-only-icon" title="Llamada de video">
                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="currentColor"><title>ic-videocam</title><path fill="currentColor" d="M4 20c-.55 0-1.02-.2-1.41-.59-.4-.39-.59-.86-.59-1.41V6c0-.55.2-1.02.59-1.41C2.98 4.19 3.45 4 4 4h12c.55 0 1.02.2 1.41.59.4.39.59.86.59 1.41v4.5l3.15-3.15c.17-.17.35-.2.55-.13.2.09.3.25.3.48v8.6c0 .23-.1.4-.3.47-.2.09-.38.05-.55-.12L18 13.5V18c0 .55-.2 1.02-.59 1.41-.39.4-.86.59-1.41.59H4Zm0-2h12V6H4v12Z"></path></svg>
                </button>
                <button className="header-icon-btn desktop-only-icon" title="Llamada de audio">
                    <svg viewBox="0 0 24 24" height="24" width="24" preserveAspectRatio="xMidYMid meet" class="" fill="currentColor"><title>ic-call</title>
                        <path fill="currentColor" d="M19.95 21c-2.08 0-4.14-.45-6.17-1.36a18.3 18.3 0 0 1-5.55-3.87 18.47 18.47 0 0 1-3.87-5.54C3.46 8.18 3 6.13 3 4.04A1.02 1.02 0 0 1 4.05 3H8.1c.23 0 .44.08.63.24a.9.9 0 0 1 .32.56l.65 3.5c.03.27.03.5-.02.67-.05.19-.15.35-.28.48L6.97 10.9c.34.62.73 1.21 1.2 1.79.45.57.96 1.13 1.5 1.66A17.59 17.59 0 0 0 13.1 17l2.35-2.35a1.61 1.61 0 0 1 1.3-.4l3.45.7c.23.07.43.19.57.36.16.18.23.37.23.59v4.05A1.02 1.02 0 0 1 19.95 21ZM6.03 9l1.64-1.65L7.25 5H5.03c.08.68.2 1.36.34 2.03.16.66.37 1.32.66 1.97Zm8.95 8.95a12.42 12.42 0 0 0 4.02 1v-2.2l-2.35-.48-1.67 1.68Z"></path>
                    </svg>
                </button>
                <button className="header-icon-btn desktop-only-icon" title="Buscar">
                    <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                        <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"></path>
                    </svg>
                </button>

                <div className="header-menu-wrapper">
                    <button
                        className="header-icon-btn"
                        title="Menú"
                        onClick={(e) => {
                            e.stopPropagation();
                            setIsMenuOpen(!isMenuOpen);
                        }}
                    >
                        <svg viewBox="0 0 24 24" height="24" width="24" fill="currentColor">
                            <path d="M12 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"></path>
                        </svg>
                    </button>

                    {isMenuOpen && (
                        <div
                            className="msg-dropdown"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <button
                                className="msg-dropdown-item mobile-only-menu-item"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
                                    <path d="M17 10.5V7c0-.55-.45-1-1-1H4c-.55 0-1 .45-1 1v10c0 .55.45 1 1 1h12c.55 0 1-.45 1-1v-3.5l4 4v-11l-4 4Z"></path>
                                </svg>
                                Videollamada
                            </button>
                            <button
                                className="msg-dropdown-item mobile-only-menu-item"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
                                    <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2Z"></path>
                                </svg>
                                Llamada de voz
                            </button>
                            <button
                                className="msg-dropdown-item mobile-only-menu-item"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                <svg viewBox="0 0 24 24" height="18" width="18" fill="currentColor">
                                    <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5Zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14Z"></path>
                                </svg>
                                Buscar en el chat
                            </button>
                            <button
                                className="msg-dropdown-item"
                                onClick={() => {
                                    setIsEditing(true);
                                    setIsMenuOpen(false);
                                }}
                            >
                                Editar contacto
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default ContactHeader;
