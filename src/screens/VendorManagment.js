// src/screens/Vendor.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig';
import VendorForm from '../components/VendorForm';
import { collection, addDoc, deleteDoc, doc, getDocs, setDoc } from 'firebase/firestore';
import './VendorManagment.css';


const Vendor = () => {
    const [vendorRequests, setVendorRequests] = useState([]);
    const [approvedVendors, setApprovedVendors] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [isEditing, setIsEditing] = useState(false);
    const [currentVendor, setCurrentVendor] = useState(null);

    // Fetch vendor requests and approved vendors from Firestore
    const fetchVendors = async () => {
        const vendorRequestsSnapshot = await getDocs(collection(db, 'vendorRequests'));
        const approvedVendorsSnapshot = await getDocs(collection(db, 'vendors'));

        const requests = vendorRequestsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        const vendors = approvedVendorsSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

        setVendorRequests(requests);
        setApprovedVendors(vendors);
    };

    useEffect(() => {
        fetchVendors();
    }, []);

    // Handle approval of vendor requests
    const handleApprove = async (vendor) => {
        await addDoc(collection(db, 'vendors'), vendor);
        await deleteDoc(doc(db, 'vendorRequests', vendor.id));
        setApprovedVendors((prev) => [...prev, vendor]);
        setVendorRequests((prev) => prev.filter((request) => request.id !== vendor.id));
    };

    // Handle rejection of vendor requests
    const handleReject = async (vendor) => {
        await deleteDoc(doc(db, 'vendorRequests', vendor.id));
        setVendorRequests((prev) => prev.filter((request) => request.id !== vendor.id));
    };

    // Handle submission from the form
    const handleSubmit = async (vendorData) => {
        const newVendorRequest = { ...vendorData };
        if (isEditing) {
            await setDoc(doc(db, 'vendorRequests', currentVendor.id), newVendorRequest);
            setVendorRequests((prevRequests) =>
                prevRequests.map((vendor) => (vendor.id === currentVendor.id ? newVendorRequest : vendor))
            );
        } else {
            const docRef = await addDoc(collection(db, 'vendorRequests'), newVendorRequest);
            setVendorRequests((prev) => [
                ...prev,
                { id: docRef.id, ...newVendorRequest }
            ]);
        }
        setShowForm(false);
    };

    return (

        <div className="vendor-container">

            <h2>Vendor Management</h2>
            <button onClick={() => { setShowForm(true); setIsEditing(false); }}>Add Vendor Request</button>

            <div className="vendor-section">
                <h3>Vendor Requests</h3>
                {vendorRequests.length === 0 ? (
                    <p>No vendor requests available.</p>
                ) : (
                    vendorRequests.map((vendor) => (
                        <div key={vendor.id}>
                            <h4>{vendor.name}</h4>
                            <p>Mobile: {vendor.mobile}</p>
                            <p>Email: {vendor.email}</p>
                            <button onClick={() => handleApprove(vendor)}>Approve</button>
                            <button onClick={() => handleReject(vendor)}>Reject</button>
                            <button onClick={() => {
                                setShowForm(true);
                                setIsEditing(true);
                                setCurrentVendor(vendor);
                            }}>Edit</button>
                        </div>
                    ))
                )}
            </div>

            <div className="vendor-section">
                <h3>Approved Vendors</h3>
                {approvedVendors.length === 0 ? (
                    <p>No approved vendors available.</p>
                ) : (
                    approvedVendors.map((vendor) => (
                        <div key={vendor.id}>
                            <h4>{vendor.name}</h4>
                            <p>Mobile: {vendor.mobile}</p>
                            <p>Email: {vendor.email}</p>
                        </div>
                    ))
                )}
            </div>

            {showForm && (
                <VendorForm
                    onClose={() => setShowForm(false)}
                    onSubmit={handleSubmit}
                    initialData={isEditing ? currentVendor : null}
                />
            )}
        </div>
    );
};

export default Vendor;
