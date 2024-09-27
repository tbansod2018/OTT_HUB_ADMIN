// src/screens/AdminPanel.js
import React, { useState } from 'react';
import Appbar from '../components/Appbar';
import Subscriptions from '../screens/Subscriptions'; // Subscriptions component
import VendorManagement from '../screens/VendorManagment'; // VendorManagement component
import Chat from '../screens/Chat'; // Chat component

function AdminPanel() {
    const [activeSection, setActiveSection] = useState('Subscriptions');

    const renderContent = () => {
        switch (activeSection) {
            case 'Subscriptions':
                return <Subscriptions />;
            case 'VendorManagement':
                return <VendorManagement />;
            case 'Chat':
                return <Chat />;
            default:
                return <Subscriptions />; // Default to Subscriptions if no section is selected
        }
    };

    return (
        <div>
            <Appbar activeSection={activeSection} setActiveSection={setActiveSection} />
            <div style={{ marginTop: '20px' }}>
                {renderContent()}
            </div>
        </div>
    );
}

export default AdminPanel;
