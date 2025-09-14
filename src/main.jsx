import React from "react";
import ReactDOM from "react-dom/client";
import './index.css';
import App from './App.jsx';
import { ClerkProvider, ClerkLoaded } from "@clerk/clerk-react";
import { BrowserRouter } from "react-router-dom";
import ShopContextProvider from "./context/ShopContext.jsx";
import { LoadingProvider } from "./context/LoadingContext.jsx";

console.log("CLERK ENV KEY:", import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);
const clerkPubKey = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY;
if (!clerkPubKey) {
  throw new Error("Missing Clerk publishable key");
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <ClerkProvider publishableKey={clerkPubKey}>
    <ClerkLoaded>
      <BrowserRouter>
        <ShopContextProvider>
          <LoadingProvider>
            <App />
          </LoadingProvider>
        </ShopContextProvider>
      </BrowserRouter>
    </ClerkLoaded>
  </ClerkProvider>
);