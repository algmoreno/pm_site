import React from 'react'
import "../styles/globals.css";
import { Navbar, Footer, Toaster } from '@/components/index';
import { getServerSession } from "next-auth";
import SessionProvider from "@/lib/SessionProvider";

const Layout = async ({ children }) => {
  const session = await getServerSession();

  return (
    <html lang="en">
      <body className="font-primary">
      <SessionProvider>
        <header>
          <Navbar />
        </header>
        <main >
          <Toaster position="bottom-center"/>
          {children}
        </main>
        <footer>
          <Footer/>
        </footer>
      </SessionProvider>
      </body>
    </html>
  );
}

export default Layout;