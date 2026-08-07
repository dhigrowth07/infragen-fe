"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import SideDrawer from "@/components/shared/SideDrawer";
import Footer from "@/components/shared/Footer";
import ChatbotWidget from "@/components/shared/ChatbotWidget";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  return (
    <>
      <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      <main className="flex-1">
        {children}
      </main>

      <Footer />
      <ChatbotWidget />
    </>
  );
}
