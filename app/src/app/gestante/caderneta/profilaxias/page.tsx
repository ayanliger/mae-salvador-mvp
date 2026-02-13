import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'
import { formatarData } from '@/lib/utils'

const profilaxiasEsperadas = [
  { chave: 'ferro', nome: 'Suplementação de Ferro', palavras: ['ferro', 'sulfato ferroso', 'ferrous'] },
  { chave: 'folico', nome: 'Suplementação de Ác. Fólico', palavras: ['fólico', 'folico', 'ácido fólico', 'acido folico'] },
  { chave: 'calcio', nome: 'Suplementação de Cálcio', palavras: ['cálcio', 'calcio', 'calcium'] },
  { chave: 'aas', nome: 'Uso de AAS (Profilaxia pré-eclâmpsia)', palavras: ['aas', 'aspirina', 'ácido acetilsalicílico'] },
]

export default async function ProfilaxiasPage() {
  const session = await auth()
  const medicacoes = await prisma.medicacao.findMany({
    where: { gestanteId: session!.user.id },
    orderBy: { dataInicio: 'desc' },
  })

  const resultados = profilaxiasEsperadas.map((prof) => {
    const encontrada = medicacoes.find((m) =>
      prof.palavras.some((p) => m.medicamento.toLowerCase().includes(p))
    )
    return { ...prof, medicacao: encontrada || null }
  })

  const outras = medicacoes.filter((m) =>
    !profilaxiasEsperadas.some((prof) =>
      prof.palavras.some((p) => m.medicamento.toLowerCase().includes(p))
    )
  )

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Profilaxias</h1>
        <p className="text-surface-500 mt-1">Suplementações e profilaxias da gestação</p>
      </div>

      <div className="space-y-3">
        {resultados.map((r, i) => (
          <div key={r.chave} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl p-5 border shadow-sm ${
            r.medicacao ? (r.medicacao.ativo ? 'border-green-200' : 'border-surface-200') : 'border-surface-200'
          }`}>
            <div className="flex items-start justify-between">
              <div>
                <p className="text-base font-semibold text-surface-800">{r.nome}</p>
                {r.medicacao ? (
                  <>
                    <p className="text-sm text-surface-500 mt-1">{r.medicacao.medicamento} — {r.medicacao.dosagem}</p>
                    {r.medicacao.via && <p className="text-xs text-surface-400 mt-0.5">Via: {r.medicacao.via}</p>}
                    <p className="text-xs text-surface-400 mt-1">
                      Desde {formatarData(r.medicacao.dataInicio)}
                      {r.medicacao.dataFim && ` até ${formatarData(r.medicacao.dataFim)}`}
                    </p>
                  </>
                ) : (
                  <p className="text-sm text-surface-400 mt-1">Não prescrito</p>
                )}
              </div>
              <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                r.medicacao
                  ? r.medicacao.ativo ? 'bg-green-100 text-green-700' : 'bg-surface-100 text-surface-500'
                  : 'bg-yellow-100 text-yellow-700'
              }`}>
                {r.medicacao ? (r.medicacao.ativo ? 'Em uso' : 'Encerrado') : 'Pendente'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {/* Outras medicações */}
      {outras.length > 0 && (
        <div className="animate-fade-in bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <h2 className="font-display font-semibold text-surface-800 mb-3">Outras Medicações</h2>
          <div className="space-y-3">
            {outras.map((m) => (
              <div key={m.id} className="flex items-start justify-between p-3 rounded-xl bg-surface-50">
                <div>
                  <p className="text-sm font-medium text-surface-700">{m.medicamento}</p>
                  <p className="text-xs text-surface-400">{m.dosagem}</p>
                </div>
                <span className={`text-xs px-2 py-0.5 rounded-full ${m.ativo ? 'bg-green-100 text-green-700' : 'bg-surface-100 text-surface-500'}`}>
                  {m.ativo ? 'Ativo' : 'Encerrado'}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
