import React, { useState } from 'react';

const ReturnPolicy = () => {
  const [showPolicy, setShowPolicy] = useState(false);

  const togglePolicy = () => {
    setShowPolicy(!showPolicy);
  };

  return (
    <div className="text-sm text-gray-700">
      <p
       
        className=" text-gray-700 hover:text-blue-800 transition-colors"
      >
        Return and Exchange Policy �
      </p>

       
        <div className="mt-4 border p-4 rounded bg-gray-50 text-gray-800 shadow-sm">
          Orders once done cannot be cancelled. No Return No Exchange No Refund. Replacement will be applicable if damaged or defected products recieved, unboxing video of the product is must for authentication.
        </div>
      
    </div>
  );
};

export default ReturnPolicy;

