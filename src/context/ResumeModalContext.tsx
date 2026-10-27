"use client";

import { createContext, useContext, useState, useCallback, ReactNode } from "react";
import ResumeModal from "@/components/ResumeModal";

interface ResumeModalContextType {
  isOpen: boolean;
  openResumeModal: () => void;
  closeResumeModal: () => void;
}

const ResumeModalContext = createContext<ResumeModalContextType | undefined>(undefined);

export function ResumeModalProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);

  const openResumeModal = useCallback(() => setIsOpen(true), []);
  const closeResumeModal = useCallback(() => setIsOpen(false), []);

  return (
    <ResumeModalContext.Provider value={{ isOpen, openResumeModal, closeResumeModal }}>
      {children}
      <ResumeModal isOpen={isOpen} onClose={closeResumeModal} />
    </ResumeModalContext.Provider>
  );
}

export function useResumeModal() {
  const context = useContext(ResumeModalContext);
  if (!context) {
    throw new Error("useResumeModal must be used within a ResumeModalProvider");
  }
  return context;
}
