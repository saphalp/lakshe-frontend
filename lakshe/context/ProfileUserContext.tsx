"use client";

import React, { createContext, useContext } from "react";
import { useFetchUser } from "@/hooks/useFetchUser";

type ProfileUserContextType = {
  userId: string | null;
  loading: boolean;
};

const ProfileUserContext = createContext<ProfileUserContextType | null>(null);

export function ProfileUserProvider({ children }: { children: React.ReactNode }) {
  const { userId, loading } = useFetchUser();

  return (
    <ProfileUserContext.Provider value={{ userId, loading }}>
      {children}
    </ProfileUserContext.Provider>
  );
}

export function useProfileUser() {
  const ctx = useContext(ProfileUserContext);
  if (!ctx) throw new Error("useProfileUser must be used inside ProfileUserProvider");
  return ctx;
}
