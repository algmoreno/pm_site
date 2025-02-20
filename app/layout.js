import React from 'react'
import "../styles/globals.css";
import { Navbar, Footer } from '../components';


const Layout = ({ children }) => {
  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main className="bg-white">
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>
      </body>
    </html>
  );
}

export default Layout;