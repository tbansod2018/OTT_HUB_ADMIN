// src / components / SubscriptionCard.js
import React from 'react';
import './SubscriptionCard.css';


const SubscriptionCard = ({ subscription, onEdit, onDelete }) => {
    return (
        <div className="subscription-card">
            <h4>{subscription.subscription_name}</h4>
            <p>One Day Price: ${subscription.one_day_price}</p>
            <p>One Week Price: ${subscription.one_week_price}</p>
            <p>One Month Price: ${subscription.one_month_price}</p>
            <button onClick={onEdit}>Edit</button>
            <button onClick={() => onDelete(subscription.id)}>Delete</button>
        </div>
    );
};

export default SubscriptionCard;
