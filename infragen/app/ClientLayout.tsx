"use client";

import React, { useState } from "react";
import Navbar from "@/components/shared/Navbar";
import SideDrawer from "@/components/shared/SideDrawer";
import Footer from "@/components/shared/Footer";
import VideoModal from "@/components/shared/VideoModal";
import ChatbotWidget from "@/components/shared/ChatbotWidget";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);

  return (
    <>
      <Navbar onOpenDrawer={() => setIsDrawerOpen(true)} />
      <SideDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />
      
      {/* Pass video modal trigger handler down through child clone or context if needed */}
      <main className="flex-1">
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            return React.cloneElement(child, {
              onOpenVideoModal: () => setIsVideoModalOpen(true),
            } as Record<string, unknown>);
          }
          return child;
        })}
      </main>

      <Footer />
      <VideoModal isOpen={isVideoModalOpen} onClose={() => setIsVideoModalOpen(false)} />
      <ChatbotWidget />
    </>
  );
}
