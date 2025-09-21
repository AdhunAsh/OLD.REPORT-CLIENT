import React from 'react';

const ReturnPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Return Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Return Window</h2>
        <p className="text-gray-700 mb-4">
          We accept returns within 7 days of delivery. Items must be in original condition 
          with tags attached and in original packaging.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Return Process</h2>
        <p className="text-gray-700 mb-4">
          To initiate a return, please contact us at theoldreport@gmail.com with your order 
          number and reason for return. We will provide you with return instructions and 
          shipping details.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Refund Processing</h2>
        <p className="text-gray-700 mb-4">
          Refunds will be processed within 5-7 business days after we receive and inspect 
          the returned item. Refunds will be credited to the original payment method.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Non-Returnable Items</h2>
        <p className="text-gray-700 mb-4">
          Items that have been worn, washed, damaged, or altered cannot be returned. 
          Sale items and final sale products are not eligible for return.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          For any questions regarding returns, contact us at{' '}
          <a href="mailto:theoldreport@gmail.com" className="text-blue-600 hover:underline">
            theoldreport@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default ReturnPolicy;