import React from 'react';
import Header from '../components/Header';
import "../components/User/UserDashboard.css";

const Layout = ({ children }) => {
  return (
    <div className="flex flex-col h-screen no-scrollbar">
      <Header />
      <main className="flex-1">{children}</main>
      {/* Footer */}
      <footer className="bg-gray-800 text-white py-4">
        <div className="container mx-auto text-center">
          <p>&copy; 2024 My Application. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Layout;
