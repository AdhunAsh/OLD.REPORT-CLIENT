import React from 'react';

const PrivacyPolicy = () => {
  return (
    <div className="max-w-4xl mx-auto py-12 px-4">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Privacy Policy</h1>
      
      <div className="prose prose-gray max-w-none">
        <p className="text-lg text-gray-700 mb-6">
          At old.report, we value the trust you place in us and are committed to protecting your privacy. 
          This Privacy Policy explains how we collect, use, and safeguard the information you provide while 
          visiting our website or purchasing from us. By using our services, you agree to the terms outlined below.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Information Collection</h2>
        <p className="text-gray-700 mb-4">
          When you visit our website or place an order, we may collect personal information such as your name, 
          email address, contact details, and any other information necessary to process your purchase. This 
          information is used solely to fulfill your orders, maintain records, improve our services, and 
          communicate with you regarding your purchases or offers that may be of interest to you.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Security</h2>
        <p className="text-gray-700 mb-4">
          We are committed to ensuring that your information remains secure. Suitable measures are in place 
          to protect against unauthorized access, misuse, or disclosure. We do not sell, rent, or distribute 
          your personal information to third parties unless required by law or with your explicit consent.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Cookies</h2>
        <p className="text-gray-700 mb-4">
          Our website may use cookies to improve functionality and provide a personalized browsing experience. 
          Cookies help us analyze traffic and understand customer preferences. You may choose to disable cookies 
          in your browser settings, though this may affect some features of our website.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Communications</h2>
        <p className="text-gray-700 mb-4">
          From time to time, we may send promotional emails about new products, special offers, or other 
          information using the email address you have provided. You may opt out of receiving such 
          communications at any time.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Data Correction</h2>
        <p className="text-gray-700 mb-4">
          If you believe that any information we hold is incorrect or incomplete, or if you would like us 
          to delete your information, please reach out to us. We will promptly address your concerns and 
          update or remove your details as requested.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4">Contact Us</h2>
        <p className="text-gray-700">
          For any questions or concerns regarding this Privacy Policy, you can contact us at{' '}
          <a href="mailto:theoldreport@gmail.com" className="text-blue-600 hover:underline">
            theoldreport@gmail.com
          </a>
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;