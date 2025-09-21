import React, { createContext, useState, useContext, useRef, useEffect } from 'react';
import { setLoadingHandler } from '../axios.jsx';

const LoadingContext = createContext();

export const LoadingProvider = ({ children }) => {
  const [loading, setLoadingState] = useState(true); // Start with true
  const [initialLoadingDone, setInitialLoadingDone] = useState(false);
  const startTimeRef = useRef(null);
  const MIN_LOADING_TIME = 500;

  const setLoading = (isLoading) => {
    if (isLoading) {
      startTimeRef.current = Date.now();
      setLoadingState(true);
    } else {
      const elapsed = Date.now() - startTimeRef.current;
      const delay = Math.max(0, MIN_LOADING_TIME - elapsed);
      setTimeout(() => {
        setLoadingState(false);
        setInitialLoadingDone(true); // Set flag after first loading ends
      }, delay);
    }
  };

  // Send to axios
  setLoadingHandler(setLoading);

  return (
    <LoadingContext.Provider value={{ loading, setLoading, initialLoadingDone }}>
      {children}
    </LoadingContext.Provider>
  );
};

export const useLoading = () => useContext(LoadingContext);
