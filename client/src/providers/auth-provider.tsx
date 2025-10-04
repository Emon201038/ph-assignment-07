"use client";
import { IUser, SessionStatus } from "@/types";
import React, { createContext, useEffect, useState } from "react";

const serverUrl = process.env.NEXT_PUBLIC_API_URL;

const AuthContext = createContext<{
  status: SessionStatus;
  data: IUser | null;
  setSession: React.Dispatch<
    React.SetStateAction<{
      status: SessionStatus;
      data: IUser | null;
    }>
  >;
} | null>(null);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [session, setSession] = useState<{
    status: SessionStatus;
    data: IUser | null;
  }>({ status: "unauthenticated", data: null });

  useEffect(() => {
    const getSession = async () => {
      try {
        setSession({ status: "loading", data: null });
        const res = await fetch(serverUrl + "/api/v1/auth/me", {
          credentials: "include",
        });
        const data = await res.json();
        console.log(data);
        if (data?.statusCode === 200) {
          setSession({ data: data?.data, status: "authenticated" });
        } else {
          setSession({ status: "unauthenticated", data: null });
        }
      } catch (error) {
        setSession({ status: "unauthenticated", data: null });
      }
    };
    getSession();
  }, []);

  return (
    <AuthContext.Provider value={{ ...session, setSession }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useSession = () => React.useContext(AuthContext);

export default AuthProvider;
