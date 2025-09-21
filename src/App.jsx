import React, { useContext, useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import PageWrapper from "./components/PageWrapper";
import Collection from "./pages/Collection";
import Home from "./pages/Home";
import Product from "./pages/Product";
import About from "./pages/About";
import Contact from "./pages/Contact";
import Cart from "./pages/Cart";
import PlaceOrder from "./pages/PlaceOrder";
import Orders from "./pages/Orders";
import Footer from "./components/Footer";
import NavBar from "./components/NavBar";
import SearchBar from "./components/SearchBar";
import Loading from "./components/Loading";
import { ToastContainer } from "react-toastify";
import {
    SignIn,
    SignUp,
    SignedIn,
    SignedOut,
    RedirectToSignIn,
} from "@clerk/clerk-react";
import Profile from "./pages/Profile";
import ErrorBoundary from "./components/ErrorBoundary";
import { TOAST_CONFIG } from "./utils/constants";
import { ShopContext } from "./context/ShopContext";
import "react-toastify/dist/ReactToastify.css";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
    const { loading } = useContext(ShopContext);
    const location = useLocation();
    const [showInitialLoading, setShowInitialLoading] = useState(true);

    useEffect(() => {
        const timer = setTimeout(() => {
            setShowInitialLoading(false);
        }, 1000);
        return () => clearTimeout(timer);
    }, []);

    if (loading || showInitialLoading) {
        return <Loading />;
    }

    return (
        <ErrorBoundary>
            <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
                <ToastContainer {...TOAST_CONFIG} />
                <NavBar />
                <SearchBar />

                <main>
                    <PageWrapper key={location.pathname}>
                        <Routes>
                            {/* Public Routes */}
                            <Route path="/" element={<Home />} />
                            <Route path="/collection" element={<Collection />} />
                            <Route path="/about" element={<About />} />
                            <Route path="/contact" element={<Contact />} />
                            <Route
                                path="/product/:productId"
                                element={<Product />}
                            />
                            <Route path="/profile" element={<Profile />} />
                        {/* Clerk Auth Routes */}
                        <Route
                            path="/login"
                            element={
                                <div className="bg-white flex items-center justify-center">
                                    <SignIn
                                        routing="path"
                                        path="/login"
                                        afterSignInUrl="/"
                                    />
                                </div>
                            }
                        />
                        <Route
                            path="/signup"
                            element={
                                <SignedOut>
                                    <div className="min-h-screen bg-white flex items-center justify-center">
                                        <SignUp routing="path" path="/signup" />
                                    </div>
                                </SignedOut>
                            }
                        />

                        {/* Protected Routes */}
                        <Route
                            path="/cart"
                            element={
                                <>
                                    <SignedIn>
                                        <Cart />
                                    </SignedIn>
                                    <SignedOut>
                                        <div className="bg-white flex items-center justify-center">
                                            <SignIn routing="path" path="/cart" afterSignInUrl="/cart" />
                                        </div>
                                    </SignedOut>
                                </>
                            }
                        />
                        <Route
                            path="/placeorder"
                            element={
                                <>
                                    <SignedIn>
                                        <PlaceOrder />
                                    </SignedIn>
                                    <SignedOut>
                                        <div className="bg-white flex items-center justify-center">
                                            <SignIn routing="path" path="/placeorder" afterSignInUrl="/placeorder" />
                                        </div>
                                    </SignedOut>
                                </>
                            }
                        />
                        <Route
                            path="/orders"
                            element={
                                <>
                                    <SignedIn>
                                        <Orders />
                                    </SignedIn>
                                    <SignedOut>
                                        <div className="bg-white flex items-center justify-center">
                                            <SignIn routing="path" path="/orders" afterSignInUrl="/orders" />
                                        </div>
                                    </SignedOut>
                                </>
                            }
                        />

                        {/* Fallback: Redirect all unknown paths for signed out users */}
                        <Route
                            path="*"
                            element={
                                <SignedOut>
                                    <RedirectToSignIn />
                                </SignedOut>
                            }
                        />
                        </Routes>
                    </PageWrapper>
                </main>

                <Footer />
            </div>
        </ErrorBoundary>
    );
};

export default App;
