import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import { useQueryClient } from "@tanstack/react-query";
import type React from "react";
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react";
import { useActor } from "../hooks/useActor";
import type { Customer, UserRole } from "../types";

interface AuthContextType {
  customer: Customer | null;
  isAdmin: boolean;
  isAuthenticated: boolean;
  isInitializing: boolean;
  isLoggingIn: boolean;
  needsRegistration: boolean;
  login: () => void;
  logout: () => void;
  registerCustomer: (name: string, email: string) => Promise<void>;
  refreshProfile: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const {
    login,
    clear,
    isAuthenticated,
    isInitializing,
    isLoggingIn,
    loginStatus,
  } = useInternetIdentity();
  const queryClient = useQueryClient();
  const { actor, isFetching: actorFetching } = useActor();
  const [customer, setCustomer] = useState<Customer | null>(null);
  const [profileFetched, setProfileFetched] = useState(false);

  const refreshProfile = useCallback(async () => {
    if (!actor || actorFetching) return;
    try {
      const profile = await actor.getMyProfile();
      setCustomer(profile ?? null);
    } catch {
      setCustomer(null);
    } finally {
      setProfileFetched(true);
    }
  }, [actor, actorFetching]);

  useEffect(() => {
    if (isAuthenticated && actor && !actorFetching) {
      refreshProfile();
    } else if (!isAuthenticated) {
      setCustomer(null);
      setProfileFetched(false);
    }
  }, [isAuthenticated, actor, actorFetching, refreshProfile]);

  // Re-fetch after interactive login
  useEffect(() => {
    if (loginStatus === "success" && actor && !actorFetching) {
      refreshProfile();
    }
  }, [loginStatus, actor, actorFetching, refreshProfile]);

  const registerCustomer = useCallback(
    async (name: string, email: string) => {
      if (!actor) return;
      const result = await actor.registerCustomer(name, email);
      if (result.__kind__ === "ok") {
        setCustomer(result.ok);
      } else {
        throw new Error(Object.values(result.err)[0] as string);
      }
    },
    [actor],
  );

  const logout = useCallback(() => {
    clear();
    queryClient.clear();
    setCustomer(null);
    setProfileFetched(false);
  }, [clear, queryClient]);

  const isAdmin =
    customer?.role === ("Admin" as UserRole) ||
    customer?.role?.toString() === "Admin";
  const needsRegistration =
    isAuthenticated && profileFetched && customer === null;

  return (
    <AuthContext.Provider
      value={{
        customer,
        isAdmin,
        isAuthenticated,
        isInitializing,
        isLoggingIn,
        needsRegistration,
        login,
        logout,
        registerCustomer,
        refreshProfile,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth(): AuthContextType {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within AuthProvider");
  return ctx;
}
