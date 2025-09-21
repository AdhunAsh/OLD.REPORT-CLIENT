import React from 'react';

const TermsConditions = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Terms and Conditions</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          Welcome to old.report. By accessing or using our website and purchasing from us, you agree to be 
          bound by the following Terms and Conditions. Please read them carefully before making any purchase.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Product Availability & Pricing</h2>
        <p className="text-gray-700 mb-4">
          All products available on old.report are subject to availability. We reserve the right to modify, 
          discontinue, or update any product at any time without prior notice. Prices listed on our website 
          are in Indian Rupees (INR) and are inclusive or exclusive of applicable taxes, as specified at checkout.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Orders & Payments</h2>
        <p className="text-gray-700 mb-4">
          When you place an order with us, you agree to provide accurate and complete information. Once your 
          order is placed, you will receive an order confirmation email. Orders may be cancelled or refused 
          if we suspect fraudulent or unauthorized activity. Payments are processed securely through Razorpay, 
          and by completing a payment you confirm that you are authorized to use the chosen payment method.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Shipping & Delivery</h2>
        <p className="text-gray-700 mb-4">
          Shipping timelines will be mentioned on the product or checkout page. While we strive to deliver 
          on time, we are not responsible for delays caused by courier services or circumstances beyond our 
          control. Risk of loss passes to you once the order has been shipped.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Returns & Exchanges</h2>
        <p className="text-gray-700 mb-4">
          If you receive a defective or incorrect item, please contact us promptly so that we can arrange 
          for a replacement or resolution in line with our return and exchange policy.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Intellectual Property</h2>
        <p className="text-gray-700 mb-4">
          All intellectual property on this website, including text, images, logos, and designs, belongs 
          to old.report. You may not reproduce, distribute, or use any content from our website without 
          written permission.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">User Conduct</h2>
        <p className="text-gray-700 mb-4">
          By using our website, you agree not to misuse the services provided by old.report, including 
          but not limited to attempting unauthorized access, engaging in fraudulent activity, or violating 
          applicable laws. We reserve the right to terminate your access to our website if such misuse is detected.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Updates to Terms</h2>
        <p className="text-gray-700 mb-4">
          These Terms and Conditions may be updated from time to time, and changes will be reflected on 
          this page. By continuing to use our website, you agree to the updated terms.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          If you have any questions or concerns about these Terms and Conditions, you may contact us by 
          email at{' '}
          <a href="mailto:theoldreport@gmail.com" className="text-blue-600 hover:underline">
            theoldreport@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default TermsConditions;