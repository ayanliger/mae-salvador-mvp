"use client";

import { useRouter } from "next/navigation";
import { useAuth, type Papel } from "@/lib/auth-context";
import { ClipboardList, BarChart3, Heart } from "lucide-react";

const ROLES: { papel: Papel; label: string; desc: string; icon: React.ElementType }[] = [
  { papel: "profissional", label: "Profissional Assistente", desc: "Acompanhamento pré-natal e gestão local das gestantes da equipe", icon: ClipboardList },
  { papel: "gestor", label: "Gestor(a)", desc: "Indicadores, relatórios e visão distrital ou central", icon: BarChart3 },
];

export default function LoginPage() {
  const router = useRouter();
  const { login } = useAuth();

  function handleLogin(papel: Papel) {
    login(papel);
    router.push(papel === "gestor" ? "/gestor" : "/painel");
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-[oklch(0.22_0.045_200)] via-[oklch(0.28_0.06_195)] to-[oklch(0.20_0.04_215)] px-4">
      <div className="w-full max-w-sm">
        {/* Header */}
        <div className="text-center mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
          <div className="inline-flex items-center justify-center w-14 h-14 rounded-2xl bg-white/10 backdrop-blur-sm mb-4">
            <Heart className="w-7 h-7 text-[oklch(0.75_0.14_30)]" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight">
            Caderneta Digital
          </h1>
          <p className="text-sm text-white/50 mt-1">
            Programa Mãe Salvador &mdash; SMS
          </p>
        </div>

        {/* Role selection card */}
        <div className="bg-white/95 backdrop-blur rounded-2xl shadow-2xl shadow-black/20 p-6 animate-in fade-in slide-in-from-bottom-6 duration-700 delay-150">
          <p className="text-sm text-muted-foreground text-center mb-5">
            Selecione seu perfil de acesso
          </p>
          <div className="space-y-2.5">
            {ROLES.map(({ papel, label, desc, icon: Icon }) => (
              <button
                key={papel}
                onClick={() => handleLogin(papel)}
                className="w-full flex items-center gap-4 px-4 py-3.5 rounded-xl border border-border bg-white hover:bg-primary/5 hover:border-primary/30 transition-all duration-200 text-left group cursor-pointer"
              >
                <div className="flex items-center justify-center w-10 h-10 rounded-lg bg-primary/10 text-primary group-hover:bg-primary group-hover:text-white transition-colors duration-200">
                  <Icon className="w-5 h-5" />
                </div>
                <div className="flex-1 min-w-0">
                  <p className="font-semibold text-sm text-foreground">{label}</p>
                  <p className="text-xs text-muted-foreground truncate">{desc}</p>
                </div>
              </button>
            ))}
          </div>
        </div>

        <p className="text-center text-xs text-white/30 mt-6">
          MVP &mdash; Demonstração &middot; v0.1
        </p>
      </div>
    </div>
  );
}
