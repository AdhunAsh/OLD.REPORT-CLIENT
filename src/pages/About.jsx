import React from "react";
import Title from "../components/Title";
import about_img from "../assets/about_img.png";

const About = () => {
    return (
        <div>
            <div className="text-2xl text-center pt-8 border-t">
                <Title text1={"ABOUT"} text2={"US"} />
            </div>
            <div className="my-10 flex flex-col md:flex-row gap-16">
                <img
                    className="w-full md:max-w-[450px]"
                    src={about_img}
                    alt=""
                />
                <div className="flex flex-col justify-center gap-6 md:2/4 text-gray-600">
                    <p>
                        <span className="font-medium text-gray-800">
                            Welcome to old.report – where timeless style meets
                            modern elegance.
                        </span>
                        <br /> At old.report, we believe fashion is not just
                        about trends — it's about expression, confidence, and
                        comfort. Our carefully curated collection of dresses
                        celebrates individuality and simplicity, offering styles
                        that blend classic charm with contemporary flair.
                        Whether you're looking for something light and casual or
                        chic and statement-making, we have pieces that suit
                        every occasion and personality.
                    </p>
                    <p>
                        Designed with you in mind, crafted for lasting
                        impressions. We’re passionate about quality, fit, and
                        detail. Every dress on old.report is selected with
                        attention to fabric, silhouette, and versatility —
                        making sure you feel your best, always. From our
                        seamless online shopping experience to responsive
                        customer support, we’re here to make fashion more
                        accessible, enjoyable, and uniquely yours.
                    </p>
                    <b className="text-gray-800">Our Mission</b>
                    <p>
                        At old.report, our mission is to redefine everyday
                        fashion by offering dresses that are stylish,
                        affordable, and timeless. We aim to empower individuals
                        to express their unique identity through thoughtfully
                        curated clothing — without compromising on comfort or
                        quality.
                    </p>
                </div>
            </div>
            <div className="text-xl py-4">
                <Title text1={'WHY'} text2={'CHOOSE US'} />
            </div>

            <div className="flex flex-col md:flex-row text-sm mb-20">
                <div className="border px-10 md:px-16 py-8 s,:py-20 flex flex-col gap-5">
                    <b>Quality Assurance: </b>
                    <p className="text-gray-600">We meticulously select and vet each product to ensure it meets our quality standards. Your satisfaction is our priority</p>
                </div>

                <div className="border px-10 md:px-16 py-8 s,:py-20 flex flex-col gap-5">
                    <b>Convenience: </b>
                    <p className="text-gray-600">With our user-friendly interface and hassle-free ordering process, shopping has never been easier.</p>
                </div>

                <div className="border px-10 md:px-16 py-8 s,:py-20 flex flex-col gap-5">
                    <b>Exceptional Customer Service: </b>
                    <p className="text-gray-600">Our team of dedicated professionals is here to assist ou the way, ensuring your satisfaction is our top priority.</p>
                </div>
                
            </div>

        </div>
    );
};

export default About;
