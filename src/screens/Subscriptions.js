// src/screens/Subscriptions.js
import React, { useEffect, useState } from 'react';
import { db } from '../firebase/firebaseConfig'; // Make sure db is correctly exported
import { collection, addDoc, getDocs, deleteDoc, doc, updateDoc } from 'firebase/firestore';
import SubscriptionCard from '../components/SubscriptionCard'; // Import the SubscriptionCard component
import './Subscriptions.css'; // Import CSS

function Subscriptions() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [subscriptionName, setSubscriptionName] = useState('');
    const [oneDayPrice, setOneDayPrice] = useState('');
    const [oneWeekPrice, setOneWeekPrice] = useState('');
    const [oneMonthPrice, setOneMonthPrice] = useState('');
    const [subscriptions, setSubscriptions] = useState([]);
    const [editSubscriptionId, setEditSubscriptionId] = useState(null); // Track the subscription being edited

    // Fetch subscriptions from Firestore
    const fetchSubscriptions = async () => {
        const querySnapshot = await getDocs(collection(db, 'subscriptions'));
        const subs = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setSubscriptions(subs);
    };

    const handleAddSubscription = async () => {
        try {
            await addDoc(collection(db, 'subscriptions'), {
                subscription_name: subscriptionName,
                one_day_price: oneDayPrice,
                one_week_price: oneWeekPrice,
                one_month_price: oneMonthPrice,
            });
            resetForm();
            fetchSubscriptions(); // Refresh the subscription list
        } catch (error) {
            console.error('Error adding subscription: ', error);
        }
    };

    const handleEditSubscription = async () => {
        if (editSubscriptionId) {
            try {
                await updateDoc(doc(db, 'subscriptions', editSubscriptionId), {
                    subscription_name: subscriptionName,
                    one_day_price: oneDayPrice,
                    one_week_price: oneWeekPrice,
                    one_month_price: oneMonthPrice,
                });
                resetForm();
                fetchSubscriptions(); // Refresh the subscription list
            } catch (error) {
                console.error('Error updating subscription: ', error);
            }
        }
    };

    const handleDeleteSubscription = async (id) => {
        try {
            await deleteDoc(doc(db, 'subscriptions', id));
            fetchSubscriptions(); // Refresh the subscription list after deletion
        } catch (error) {
            console.error('Error deleting subscription: ', error);
        }
    };

    const resetForm = () => {
        setSubscriptionName('');
        setOneDayPrice('');
        setOneWeekPrice('');
        setOneMonthPrice('');
        setIsModalOpen(false);
        setEditSubscriptionId(null); // Reset the edit ID
    };

    const openEditModal = (subscription) => {
        setSubscriptionName(subscription.subscription_name);
        setOneDayPrice(subscription.one_day_price);
        setOneWeekPrice(subscription.one_week_price);
        setOneMonthPrice(subscription.one_month_price);
        setEditSubscriptionId(subscription.id); // Set the ID of the subscription being edited
        setIsModalOpen(true);
    };

    useEffect(() => {
        fetchSubscriptions(); // Fetch subscriptions on component mount
    }, []);

    return (
        <>

            <div className="subscriptions-container">
                <button className="add-subscription-button" onClick={() => setIsModalOpen(true)}>
                    Add Subscription
                </button>
                {isModalOpen && (
                    <div className="modal">
                        <div className="modal-content">
                            <span className="close" onClick={resetForm}>&times;</span>
                            <h2>{editSubscriptionId ? 'Edit Subscription' : 'Add Subscription'}</h2>
                            <form onSubmit={(e) => { e.preventDefault(); editSubscriptionId ? handleEditSubscription() : handleAddSubscription(); }}>
                                <label>Subscription Name:</label>
                                <input
                                    type="text"
                                    value={subscriptionName}
                                    onChange={(e) => setSubscriptionName(e.target.value)}
                                    required
                                />
                                <label>One Day Price:</label>
                                <input
                                    type="number"
                                    value={oneDayPrice}
                                    onChange={(e) => setOneDayPrice(e.target.value)}
                                    required
                                />
                                <label>One Week Price:</label>
                                <input
                                    type="number"
                                    value={oneWeekPrice}
                                    onChange={(e) => setOneWeekPrice(e.target.value)}
                                    required
                                />
                                <label>One Month Price:</label>
                                <input
                                    type="number"
                                    value={oneMonthPrice}
                                    onChange={(e) => setOneMonthPrice(e.target.value)}
                                    required
                                />
                                <button type="submit" className="submit-button">{editSubscriptionId ? 'Update Subscription' : 'Add Subscription'}</button>
                            </form>
                        </div>
                    </div>
                )}

                {/* Display list of subscriptions in cards */}
                <div className="subscription-list">
                    <h2>Your Subscriptions</h2>
                    <div className="subscription-cards">
                        {subscriptions.length > 0 ? (
                            subscriptions.map(sub => (
                                <SubscriptionCard
                                    key={sub.id}
                                    subscription={sub}
                                    onEdit={() => openEditModal(sub)}
                                    onDelete={handleDeleteSubscription}
                                />
                            ))
                        ) : (
                            <p>No subscriptions available.</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default Subscriptions;
