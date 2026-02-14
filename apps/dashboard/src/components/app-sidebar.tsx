"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useAuth } from "@/lib/auth-context";
import {
  Sidebar, SidebarContent, SidebarFooter, SidebarGroup,
  SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";
import { Button } from "@/components/ui/button";
import { Heart, Users, ClipboardPlus, BarChart3, LogOut } from "lucide-react";

export function AppSidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const router = useRouter();

  function handleLogout() {
    logout();
    router.push("/login");
  }

  const navItems = [
    { href: "/painel", label: "Painel de Gestantes", icon: Users, roles: ["profissional", "gestor"] },
    { href: "/registrar", label: "Nova Consulta", icon: ClipboardPlus, roles: ["profissional"] },
    { href: "/gestor", label: "Indicadores", icon: BarChart3, roles: ["gestor"] },
  ];

  const visibleItems = navItems.filter((item) => user && item.roles.includes(user.papel));

  return (
    <Sidebar>
      <SidebarHeader className="p-4">
        <Link href="/painel" className="flex items-center gap-2.5">
          <div className="flex items-center justify-center w-8 h-8 rounded-lg bg-sidebar-primary/20">
            <Heart className="w-4 h-4 text-sidebar-primary" />
          </div>
          <div>
            <p className="font-bold text-sm text-sidebar-foreground leading-tight">Caderneta Digital</p>
            <p className="text-[10px] text-sidebar-foreground/50">Mãe Salvador</p>
          </div>
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Navegação</SidebarGroupLabel>
          <SidebarMenu>
            {visibleItems.map((item) => (
              <SidebarMenuItem key={item.href}>
                <SidebarMenuButton asChild isActive={pathname === item.href || pathname.startsWith(item.href + "/")}>
                  <Link href={item.href}>
                    <item.icon className="w-4 h-4" />
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="p-4">
        {user && (
          <div className="flex items-center justify-between">
            <div className="min-w-0">
              <p className="text-xs font-medium text-sidebar-foreground truncate">{user.nome}</p>
              <p className="text-[10px] text-sidebar-foreground/50">{user.papel === "profissional" ? "Profissional Assistente" : "Gestor(a)"}</p>
            </div>
            <Button variant="ghost" size="icon" onClick={handleLogout} className="text-sidebar-foreground/60 hover:text-sidebar-foreground hover:bg-sidebar-accent shrink-0">
              <LogOut className="w-4 h-4" />
            </Button>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
}
