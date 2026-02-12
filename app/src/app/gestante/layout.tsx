import { redirect } from 'next/navigation'
import { auth } from '@/lib/auth'
import { NavGestante } from '@/components/NavGestante'

export default async function GestanteLayout({ children }: { children: React.ReactNode }) {
  const session = await auth()

  if (!session?.user || session.user.role !== 'gestante') {
    redirect('/login')
  }

  return (
    <div className="min-h-screen bg-surface-50">
      <NavGestante nomeUsuaria={session.user.name} />
      <main className="pb-20 md:pb-0 md:ml-64">
        <div className="max-w-4xl mx-auto px-4 py-6">
          {children}
        </div>
      </main>
    </div>
  )
}
