import React from 'react';

const ShippingPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Shipping Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Shipping Methods</h2>
        <p className="text-gray-700 mb-4">
          All orders from old.report are shipped through registered domestic courier companies and/or 
          Speed Post only. Orders are shipped within 8–14 days or as per the delivery date agreed at 
          the time of order confirmation, and delivery of the shipment is subject to the norms of the 
          courier company or postal authorities.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Delivery Timeline</h2>
        <p className="text-gray-700 mb-4">
          old.report is not liable for any delay in delivery by the courier company or postal authorities 
          and only guarantees to hand over the consignment to the courier company or postal authorities 
          within 8–14 days from the date of the order and payment, or as per the delivery date agreed at 
          the time of order confirmation.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Delivery Address</h2>
        <p className="text-gray-700 mb-4">
          Delivery of all orders will be made to the address provided by the buyer at the time of purchase. 
          Delivery of our services will be confirmed to the email ID specified during registration.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact for Shipping Queries</h2>
        <p className="text-gray-700">
          If you have any queries or concerns regarding shipping, you may contact us at{' '}
          <a href="mailto:theoldreport@gmail.com" className="text-blue-600 hover:underline">
            theoldreport@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ShippingPolicy;