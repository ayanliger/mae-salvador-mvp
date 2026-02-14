"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Papel = "profissional" | "gestor";

interface AuthUser {
  id: string;
  nome: string;
  papel: Papel;
}

interface AuthContextType {
  user: AuthUser | null;
  login: (papel: Papel) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  login: () => {},
  logout: () => {},
});

const MOCK_USERS: Record<Papel, AuthUser> = {
  profissional: { id: "prof-002", nome: "Enf. Carla Santos Oliveira", papel: "profissional" },
  gestor: { id: "prof-004", nome: "Maria Helena Ferreira", papel: "gestor" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);

  function login(papel: Papel) {
    setUser(MOCK_USERS[papel]);
  }

  function logout() {
    setUser(null);
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export type { Papel, AuthUser };
