'use client'

import { useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { signOut } from 'next-auth/react'

const itensMenu = [
  { href: '/gestante/dashboard', label: 'Início', icone: '🏠' },
  { href: '/gestante/consultas', label: 'Consultas', icone: '📋' },
  { href: '/gestante/exames', label: 'Exames', icone: '🔬' },
  { href: '/gestante/vacinas', label: 'Vacinas', icone: '💉' },
  { href: '/gestante/medicacoes', label: 'Medicações', icone: '💊' },
  { href: '/gestante/cartao', label: 'Cartão Mãe Salvador', icone: '💳' },
  { href: '/gestante/cadernetas-previas', label: 'Cadernetas Prévias', icone: '📚' },
  { href: '/gestante/avaliacao', label: 'Avaliação', icone: '⭐' },
  { href: '/gestante/notificacoes', label: 'Notificações', icone: '🔔' },
]

const itensCaderneta = [
  { href: '/gestante/caderneta/gestacao-atual', label: 'Gestação Atual' },
  { href: '/gestante/caderneta/orientacoes', label: 'Orientações' },
  { href: '/gestante/caderneta/peso', label: 'Ganho de Peso' },
  { href: '/gestante/caderneta/antecedentes', label: 'Antecedentes' },
  { href: '/gestante/caderneta/profilaxias', label: 'Profilaxias' },
  { href: '/gestante/caderneta/sifilis', label: 'Sífilis' },
  { href: '/gestante/caderneta/pnar', label: 'PNAR' },
  { href: '/gestante/caderneta/odontologia', label: 'Odontologia' },
  { href: '/gestante/caderneta/puerperal', label: 'Puerperal' },
  { href: '/gestante/caderneta/parceiro', label: 'Pré-natal Parceiro' },
  { href: '/gestante/caderneta/atividades', label: 'Atividades & Visitas' },
]

export function NavGestante({ nomeUsuaria, notificacoesNaoLidas = 0 }: { nomeUsuaria: string; notificacoesNaoLidas?: number }) {
  const pathname = usePathname()
  const [cadernetaAberta, setCadernetaAberta] = useState(false)

  const mobileItems = itensMenu.slice(0, 5) // show first 5 on mobile bottom bar

  return (
    <>
      {/* Sidebar Desktop */}
      <aside className="hidden md:flex md:flex-col md:w-64 md:fixed md:inset-y-0 bg-white border-r border-surface-200 z-30">
        <div className="p-6 border-b border-surface-100">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-primary-600 text-white flex items-center justify-center font-bold font-display text-sm">
              CG
            </div>
            <div>
              <p className="font-display font-semibold text-surface-800 text-sm">Caderneta Digital</p>
              <p className="text-xs text-surface-400">Salvador - BA</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 p-4 space-y-1 overflow-y-auto">
          {itensMenu.map((item) => {
            const ativo = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                  ativo
                    ? 'bg-primary-50 text-primary-700'
                    : 'text-surface-600 hover:bg-surface-50 hover:text-surface-800'
                }`}
              >
                <span className="text-lg">{item.icone}</span>
                {item.label}
                {item.href === '/gestante/notificacoes' && notificacoesNaoLidas > 0 && (
                  <span className="ml-auto bg-red-500 text-white text-[10px] font-bold w-5 h-5 rounded-full flex items-center justify-center">
                    {notificacoesNaoLidas}
                  </span>
                )}
              </Link>
            )
          })}

          {/* Caderneta submenu */}
          <div>
            <button
              onClick={() => setCadernetaAberta(!cadernetaAberta)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                pathname.startsWith('/gestante/caderneta')
                  ? 'bg-primary-50 text-primary-700'
                  : 'text-surface-600 hover:bg-surface-50 hover:text-surface-800'
              }`}
            >
              <span className="text-lg">📖</span>
              Caderneta
              <span className={`ml-auto text-xs transition-transform ${cadernetaAberta ? 'rotate-90' : ''}`}>▶</span>
            </button>
            {cadernetaAberta && (
              <div className="ml-9 mt-1 space-y-0.5">
                {itensCaderneta.map((sub) => (
                  <Link
                    key={sub.href}
                    href={sub.href}
                    className={`block px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                      pathname === sub.href
                        ? 'bg-primary-50 text-primary-700'
                        : 'text-surface-500 hover:bg-surface-50 hover:text-surface-700'
                    }`}
                  >
                    {sub.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        </nav>

        <div className="p-4 border-t border-surface-100">
          <div className="flex items-center gap-3 px-4 py-2 mb-2">
            <div className="w-8 h-8 rounded-full bg-primary-100 text-primary-600 flex items-center justify-center text-xs font-bold">
              {nomeUsuaria.charAt(0).toUpperCase()}
            </div>
            <p className="text-sm font-medium text-surface-700 truncate">{nomeUsuaria}</p>
          </div>
          <button
            onClick={() => signOut({ callbackUrl: '/login' })}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-sm text-surface-500 hover:text-red-600 hover:bg-red-50 transition-all"
          >
            <span>🚪</span> Sair
          </button>
        </div>
      </aside>

      {/* Bottom Nav Mobile */}
      <nav className="md:hidden fixed bottom-0 inset-x-0 bg-white border-t border-surface-200 z-30 safe-area-inset-bottom">
        <div className="flex justify-around py-2">
          {mobileItems.map((item) => {
            const ativo = pathname === item.href
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`flex flex-col items-center gap-0.5 px-3 py-1.5 rounded-lg text-xs transition-all ${
                  ativo ? 'text-primary-600' : 'text-surface-400'
                }`}
              >
                <span className="text-xl">{item.icone}</span>
                <span className="font-medium">{item.label}</span>
              </Link>
            )
          })}
        </div>
      </nav>
    </>
  )
}
