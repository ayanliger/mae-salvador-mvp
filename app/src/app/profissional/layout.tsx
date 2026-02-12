import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { NavProfissional } from '@/components/NavProfissional'

export default async function ProfissionalLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'profissional') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <NavProfissional nomeUsuario={session.user.name} />
      <main className="pb-20 md:pb-0 md:ml-64">
        <div className="max-w-5xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
