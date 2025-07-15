import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
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
import AnimatedCard from "./components/AnimatedCard";
import { ToastContainer } from "react-toastify";
import {
  SignIn,
  SignUp,
  SignedIn,
  SignedOut,
  RedirectToSignIn,
} from "@clerk/clerk-react";
import Profile from "./pages/Profile";

export const backendUrl = import.meta.env.VITE_BACKEND_URL;

const App = () => {
  const location = useLocation();

  return (
    <div className="px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw]">
      <ToastContainer />
      <NavBar />
      <SearchBar />

      <AnimatedCard key={location.key}>
      <Routes location={location}>
        {/* Public Routes */}
        <Route path="/" element={<Home />} />
        <Route path="/collection" element={<Collection />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/product/:productId" element={<Product />} />
        <Route path="/profile" element={<Profile />} />
        {/* Clerk Auth Routes */}
        <Route
          path="/login"
          element={
            <SignIn routing="path" path="/login" afterSignInUrl="/" />
          }
        />
        <Route
          path="/signup"
          element={
            <SignedOut>
              <SignUp routing="path" path="/signup" />
            </SignedOut>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/cart"
          element={
            <SignedIn>
              <Cart />
            </SignedIn>
          }
        />
        <Route
          path="/placeorder"
          element={
            <SignedIn>
              <PlaceOrder />
            </SignedIn>
          }
        />
        <Route
          path="/orders"
          element={
            <SignedIn>
              <Orders />
            </SignedIn>
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
      </AnimatedCard>

      <Footer />
    </div>
  );
};

export default App;
