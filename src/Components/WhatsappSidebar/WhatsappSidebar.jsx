import React, { useContext } from "react";
import { Link } from "react-router";
import { ContactContext } from "../../Context/ContactContext";
import NewContactForm from "../NewContactForm/NewContacform";

const WhatsappSidebar = () => {
    const { contacts, deleteContactById, updateContactById } =
        useContext(ContactContext);
    return (
        <aside>
            <h2>Whatsapp</h2>

            <NewContactForm />
            <div>
                {contacts.map((contact) => {
                    return (
                        <Link to={`/contact/${contact.id}`} key={contact.id}>
                            <h3>{contact.name}</h3>
                            <p>{contact.lastMessage}</p>
                            <button onClick={() => deleteContactById(contact.id)}>
                                Eliminar contacto
                            </button>
                            <button
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
                                }}
                                className="edit-btn"
                            >
                                ✏️
                            </button>
                            <hr />
                        </Link>
                    );
                })}
            </div>
        </aside>
    );
};

export default WhatsappSidebar;
