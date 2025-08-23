import React, { useState, useEffect } from "react";
import Hero from "../components/Hero";
import LatestCollection from "../components/LatestCollection";
import BestSeller from "../components/BestSeller";
import OurPolicy from "../components/OurPolicy";
import HomeLoader from "../components/loaders/HomeLoader";

const Home = () => {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => setLoading(false), 1000);
        return () => clearTimeout(timer);
    }, []);

    return (
        <div>
            {loading ? (
                <HomeLoader />
            ) : (
                <>
                    <Hero />
                    <LatestCollection />
                    {/* <BestSeller /> */}
                    <OurPolicy />
                </>
            )}
        </div>
    );
};

export default Home;
