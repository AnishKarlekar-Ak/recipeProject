import React, { useState, useEffect } from "react";
import Header from "./header";
import Footer from "./footer";
import LoginModal from "./LoginModal";
import { Outlet, useNavigate } from "react-router-dom";
import axios from "axios";

const Layout = () => {
  const navigate = useNavigate();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [user, setUser] = useState(null);
  const [activeSection, setActiveSection] = useState("home");

  const navItems = [
    { id: "home", label: "Home" },
    { id: "recipes", label: "Recipes" },
    { id: "categories", label: "Categories" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];

  const handleNavClick = (sectionId) => {
    setActiveSection(sectionId);
    setIsMobileMenuOpen(false);

    if (sectionId === "recipes") {
      document
        .getElementById("recipes-section")
        ?.scrollIntoView({ behavior: "smooth" });
    } else {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  // ✅ Logout handler
  const onLogoutClick = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/users/logout",
        {},
        { withCredentials: true }
      );
      setUser(null);
      navigate("/");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  // ✅ Handle login success from modal
  const handleLoginSuccess = (userData) => {
    setUser(userData);
    setShowLoginModal(false);
  };

  // ✅ Persist user session on page reload
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/profile", {
          withCredentials: true,
        });
        setUser(res.data);
      } catch (err) {
        console.log("User not logged in or session expired.");
      }
    };
    fetchUser();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <Header
        navItems={navItems}
        activeSection={activeSection}
        handleNavClick={handleNavClick}
        isMobileMenuOpen={isMobileMenuOpen}
        setIsMobileMenuOpen={setIsMobileMenuOpen}
        user={user}
        onLoginClick={() => setShowLoginModal(true)}
        isAuthor={user?.role === "Author" || user?.role === "Admin"}
        onLogoutClick={onLogoutClick}
      />

      <main className="pt-4">
        <Outlet />
      </main>

      <Footer />

      {showLoginModal && (
        <LoginModal
          onClose={() => setShowLoginModal(false)}
          onLoginSuccess={handleLoginSuccess}
        />
      )}
    </div>
  );
};

export default Layout;
