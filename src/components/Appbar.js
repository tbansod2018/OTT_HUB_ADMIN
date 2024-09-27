// src/components/Appbar.js
import React from 'react';
import './Appbar.css'; // Import your CSS file

const Appbar = ({ activeSection, setActiveSection }) => {
    return (
        <nav>
            <ul>
                <li
                    className={activeSection === 'Subscriptions' ? 'active' : ''}
                    onClick={() => setActiveSection('Subscriptions')}
                >
                    Subscriptions
                </li>
                <li
                    className={activeSection === 'VendorManagement' ? 'active' : ''}
                    onClick={() => setActiveSection('VendorManagement')}
                >
                    Vendor Management
                </li>
                <li
                    className={activeSection === 'Chat' ? 'active' : ''}
                    onClick={() => setActiveSection('Chat')}
                >
                    Chat
                </li>
            </ul>
        </nav>
    );
};

export default Appbar;
