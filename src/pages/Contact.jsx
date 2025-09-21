import React from "react";
import Title from "../components/Title";
import contact_img from "../assets/contact_img.png";

const Contact = () => {
    return (
        <div className="max-w-6xl mx-auto py-12 px-4">
            <div className="text-center mb-12">
                <Title text1={"GET IN"} text2={"TOUCH"} />
                <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
                    Have questions about our products or need assistance? We're here to help.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 items-center">
                <div>
                    <img
                        className="w-full rounded-lg shadow-sm"
                        src={contact_img}
                        alt="Contact us"
                    />
                </div>
                
                <div className="space-y-8">
                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">CONTACT US</h3>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center space-x-3">
                                <span className="font-medium">Email:</span>
                                <a href="mailto:theoldreport@gmail.com" className="hover:text-gray-900 transition-colors">
                                    theoldreport@gmail.com
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="font-medium">Phone:</span>
                                <a href="tel:+918590611279" className="hover:text-gray-900 transition-colors">
                                    +91 8590611279
                                </a>
                            </div>
                        </div>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold text-gray-900 mb-4">Policies</h3>
                        <div className="space-y-3 text-gray-600">
                            <div className="flex items-center space-x-3">
                                <span className="font-medium">Privacy:</span>
                                <a href="/privacy-policy" className="hover:text-gray-900 transition-colors">
                                    Privacy Policy
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="font-medium">Terms:</span>
                                <a href="/terms-conditions" className="hover:text-gray-900 transition-colors">
                                    Terms & Conditions
                                </a>
                            </div>
                            <div className="flex items-center space-x-3">
                                <span className="font-medium">Shipping:</span>
                                <a href="/shipping-policy" className="hover:text-gray-900 transition-colors">
                                    Shipping Policy
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-12 p-6 bg-gray-50 rounded-lg text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Need Help?</h3>
                <p className="text-gray-600">
                    Our customer service team is ready to assist you with any questions or concerns.
                </p>
            </div>
        </div>
    );
};

export default Contact;
