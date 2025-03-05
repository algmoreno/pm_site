import React from 'react'
import "../styles/globals.css";
import { Navbar, Footer, Toaster } from '@/components/index';

const Layout = async ({ children }) => {

  return (
    <html lang="en">
      <body>
        <header>
          <Navbar />
        </header>
        <main >
          <Toaster />
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