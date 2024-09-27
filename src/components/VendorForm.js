// src/screens/VendorForm.js

import React, { useState } from 'react';
import './VendorForm.css';

const VendorForm = ({ onClose, onSubmit, initialData }) => {
    const [name, setName] = useState(initialData?.name || '');
    const [mobile, setMobile] = useState(initialData?.mobile || '');
    const [email, setEmail] = useState(initialData?.email || '');
    const [platformName, setPlatformName] = useState(initialData?.platformName || '');

    const handleSubmit = (e) => {
        e.preventDefault();
        const vendorData = { name, mobile, email, platformName };
        onSubmit(vendorData);
        onClose(); // Close the form after submission
    };

    return (
        <div className="modal">
            <div className="modal-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{initialData ? 'Edit Vendor' : 'Add Vendor'}</h2>
                <form onSubmit={handleSubmit}>
                    <label>Name</label>
                    <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />

                    <label>Mobile</label>
                    <input type="text" value={mobile} onChange={(e) => setMobile(e.target.value)} required />

                    <label>Email</label>
                    <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />

                    <label>Platform Name</label>
                    <input type="text" value={platformName} onChange={(e) => setPlatformName(e.target.value)} required />

                    <button type="submit">{initialData ? 'Update' : 'Add'}</button>
                </form>
            </div>
        </div>
    );
};

export default VendorForm;
