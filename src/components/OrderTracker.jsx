import React from 'react';

const OrderTracker = ({ order }) => {
  return (
    <div className="order-tracker">
      <h3>Order #{order.id}</h3>
      <div>Status: {order.status || 'Processing'}</div>
      <div>Inventory: {order.items[0].stockStatus}</div>
    </div>
  );
};

export default OrderTracker;