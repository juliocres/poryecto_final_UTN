import React from "react";
import "./ChatEmptyState.css";

const ChatEmptyState = () => {
    return (
        <div className="empty-state">
            <div className="empty-icon">💬</div>
            <h2>WhatsApp Web</h2>
            <p>Selecciona un chat para empezar a conversar</p>
        </div>
    );
};

export default ChatEmptyState;
