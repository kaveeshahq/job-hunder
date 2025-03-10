import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import ApplicationForm from "./pages/ApplicationForm";
import Loader from "./components/Loader";

function AppContent() {
  const location = useLocation();
  const [loading, setLoading] = useState(true); // Start with loading true
  const loadingTimeoutRef = useRef(null);
  
  // This effect runs only once when the component first mounts
  useEffect(() => {
    // Hide loader after initial page load
    const initialLoadTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(initialLoadTimeout);
  }, []);
  
  // This effect runs when location changes (navigation between pages)
  useEffect(() => {
    // Don't show loader on initial render since we're already showing it
    if (loadingTimeoutRef.current === null) {
      loadingTimeoutRef.current = true; // Mark first render complete
      return;
    }
    
    // Show loader for navigation
    setLoading(true);
    
    const navigationTimeout = setTimeout(() => {
      setLoading(false);
    }, 1000);
    
    return () => clearTimeout(navigationTimeout);
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex flex-col">
      {/* Show Loader when loading is true */}
      {loading && <Loader />}

      {/* Navbar */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-grow pt-16">
        <Routes>
          <Route path="/" element={<Hero />} />
          <Route path="/apply" element={<ApplicationForm />} />
        </Routes>
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}