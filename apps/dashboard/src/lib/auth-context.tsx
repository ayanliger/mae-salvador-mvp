"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

type Papel = "profissional" | "gestor" | "cadastro";
export type NivelAcesso = "local-equipe" | "local-gerente" | "distrital" | "central";

export const NIVEL_ACESSO_LABELS: Record<NivelAcesso, string> = {
  "local-equipe": "Local — Equipe",
  "local-gerente": "Local — Gerente",
  "distrital": "Distrital",
  "central": "Central",
};

interface AuthUser {
  id: string;
  nome: string;
  papel: Papel;
}

interface AuthContextType {
  user: AuthUser | null;
  nivelAcesso: NivelAcesso;
  setNivelAcesso: (nivel: NivelAcesso) => void;
  login: (papel: Papel) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  nivelAcesso: "local-equipe",
  setNivelAcesso: () => {},
  login: () => {},
  logout: () => {},
});

const MOCK_USERS: Record<Papel, AuthUser> = {
  profissional: { id: "prof-002", nome: "Enf. Carla Santos Oliveira", papel: "profissional" },
  gestor: { id: "prof-004", nome: "Maria Helena Ferreira", papel: "gestor" },
  cadastro: { id: "prof-005", nome: "Profissional de Cadastro", papel: "cadastro" },
};

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [nivelAcesso, setNivelAcesso] = useState<NivelAcesso>("local-equipe");

  function login(papel: Papel) {
    setUser(MOCK_USERS[papel]);
    setNivelAcesso(
      papel === "gestor" ? "central" : "local-equipe",
    );
  }

  function logout() {
    setUser(null);
    setNivelAcesso("local-equipe");
  }

  return (
    <AuthContext.Provider value={{ user, nivelAcesso, setNivelAcesso, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}

export type { Papel, AuthUser };
