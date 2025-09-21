import React from "react";
import Title from "../components/Title";
import about_img from "../assets/about_img.png";

const About = () => {
    return (
        <div className="animate-fadeIn">
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={"ABOUT"} text2={"US"} />
            </div>
            
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img
                    className="w-full md:max-w-[450px]"
                    src={about_img}
                    alt="About Old Report Fashion"
                />
                <div className="flex flex-col justify-center gap-6 md:w-2/4 text-gray-600">
                    <p>
                        <span className="font-medium text-gray-800">
                            Welcome to old.report – where timeless style meets modern elegance.
                        </span>
                        <br /> At old.report, we believe fashion is not just about trends — it's about expression, confidence, and comfort. Our carefully curated collection of dresses celebrates individuality and simplicity, offering styles that blend classic charm with contemporary flair. Whether you're looking for something light and casual or chic and statement-making, we have pieces that suit every occasion and personality.
                    </p>
                    <p>
                        Designed with you in mind, crafted for lasting impressions. We're passionate about quality, fit, and detail. Every dress on old.report is selected with attention to fabric, silhouette, and versatility — making sure you feel your best, always. From our seamless online shopping experience to responsive customer support, we're here to make fashion more accessible, enjoyable, and uniquely yours.
                    </p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>
                        At old.report, our mission is to redefine everyday fashion by offering dresses that are stylish, affordable, and timeless. We aim to empower individuals to express their unique identity through thoughtfully curated clothing — without compromising on comfort or quality.
                    </p>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Premium Quality Assurance</b>
                    <p className="text-gray-600">Every garment undergoes rigorous quality checks. We partner with trusted suppliers and maintain strict standards to ensure exceptional craftsmanship and durability.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Seamless Experience</b>
                    <p className="text-gray-600">Our intuitive platform and streamlined checkout process make shopping effortless. From browsing to delivery, we've optimized every touchpoint for your convenience.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 sm:py-20 flex flex-col gap-5">
                    <b>Dedicated Customer Care</b>
                    <p className="text-gray-600">Our passionate support team provides personalized assistance throughout your journey. From styling advice to post-purchase support, we're committed to your satisfaction.</p>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={'OUR'} text2={'POLICIES'} />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20 text-center text-sm">
                <div className="border px-6 py-8 flex flex-col gap-3">
                    <b>Easy Returns</b>
                    <p className="text-gray-600">30-day hassle-free returns with free pickup service</p>
                </div>

                <div className="border px-6 py-8 flex flex-col gap-3">
                    <b>Secure Payments</b>
                    <p className="text-gray-600">SSL encrypted transactions with multiple payment options</p>
                </div>

                <div className="border px-6 py-8 flex flex-col gap-3">
                    <b>Fast Shipping</b>
                    <p className="text-gray-600">Express delivery within 3-5 business days nationwide</p>
                </div>

                <div className="border px-6 py-8 flex flex-col gap-3">
                    <b>Quality Guarantee</b>
                    <p className="text-gray-600">100% satisfaction guarantee or full refund policy</p>
                </div>
            </div>

            <div className="border-t pt-8 mb-20">
                <h3 className="text-lg font-semibold text-gray-800 mb-6 text-center">Detailed Policy Information</h3>
                <div className="grid md:grid-cols-2 gap-8 text-sm">
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Privacy & Data Protection</h4>
                            <p className="text-gray-600">Your personal information is encrypted and never shared with third parties. We comply with international data protection standards.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Size Exchange Policy</h4>
                            <p className="text-gray-600">Free size exchanges within 15 days of delivery. We provide detailed size guides to ensure the perfect fit.</p>
                        </div>
                    </div>
                    <div className="space-y-4">
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Damage Protection</h4>
                            <p className="text-gray-600">Items damaged during shipping are replaced immediately at no cost. We ensure your order arrives in perfect condition.</p>
                        </div>
                        <div>
                            <h4 className="font-semibold text-gray-800 mb-2">Customer Support</h4>
                            <p className="text-gray-600">24/7 customer support via email and phone. Our response time is typically under 2 hours during business days.</p>
                        </div>
                    </div>
                </div>
            </div>

            <div className="text-xl py-4">
                <Title text1={'GET IN'} text2={'TOUCH'} />
            </div>

            <div className="flex flex-col md:flex-row gap-10 mb-20">
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Contact Information</h3>
                    <div className="space-y-3 text-gray-600">
                        <p><span className="font-medium">Email:</span> theoldreport@gmail.com</p>
                        <p><span className="font-medium">Phone:</span> +91 8590611279</p>
                        <p><span className="font-medium">Business Hours:</span> Monday - Saturday, 9:00 AM - 6:00 PM</p>
                    </div>
                </div>
                <div className="flex-1">
                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Customer Support</h3>
                    <p className="text-gray-600 mb-4">
                        Have questions about your order, need styling advice, or want to know more about our products? 
                        We're here to help! Reach out to us via email or phone, and our friendly team will get back to you promptly.
                    </p>
                    <p className="text-gray-600">
                        For order-related queries, please have your order number ready to help us assist you faster.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default About;