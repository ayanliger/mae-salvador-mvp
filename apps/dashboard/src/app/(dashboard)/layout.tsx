"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth, NIVEL_ACESSO_LABELS, type NivelAcesso } from "@/lib/auth-context";
import { SidebarProvider, SidebarInset, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import { Separator } from "@/components/ui/separator";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Shield } from "lucide-react";

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  const { user, nivelAcesso, setNivelAcesso } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!user) router.replace("/login");
  }, [user, router]);

  if (!user) return null;

  return (
    <SidebarProvider>
      <AppSidebar />
      <SidebarInset>
        <header className="flex h-14 items-center gap-2 border-b border-border/60 px-4 bg-card/80 backdrop-blur-sm">
          <SidebarTrigger className="-ml-1" />
          <Separator orientation="vertical" className="h-5" />
          <span className="text-sm text-muted-foreground">
            Programa Mãe Salvador
          </span>
          <div className="ml-auto flex items-center gap-2">
            <Shield className="w-3.5 h-3.5 text-muted-foreground" />
            <Select value={nivelAcesso} onValueChange={(v) => setNivelAcesso(v as NivelAcesso)}>
              <SelectTrigger className="h-8 w-[180px] text-xs">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {(Object.entries(NIVEL_ACESSO_LABELS) as [NivelAcesso, string][]).map(([value, label]) => (
                  <SelectItem key={value} value={value} className="text-xs">
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </header>
        <main className="flex-1 p-6">
          {children}
        </main>
      </SidebarInset>
    </SidebarProvider>
  );
}
