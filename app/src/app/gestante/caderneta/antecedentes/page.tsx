import { auth } from '@/lib/auth'
import { prisma } from '@/lib/prisma'

export default async function AntecedentesPage() {
  const session = await auth()
  const gestante = await prisma.gestante.findUnique({
    where: { id: session!.user.id },
    include: {
      condicoes: { orderBy: { dataInicio: 'desc' } },
    },
  })

  if (!gestante) return null

  const temHistorico = gestante.numGestacoesPrevia !== null || gestante.numPartosNormais !== null ||
    gestante.numPartosCesareos !== null || gestante.numAbortosPrevia !== null

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Antecedentes</h1>
        <p className="text-surface-500 mt-1">Histórico clínico e obstétrico</p>
      </div>

      {/* Histórico Obstétrico */}
      <div className="animate-fade-in stagger-1 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-4">Antecedentes Obstétricos</h2>
        {temHistorico ? (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            <div className="bg-surface-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold font-display text-primary-600">{gestante.numGestacoesPrevia ?? 0}</p>
              <p className="text-xs text-surface-500 mt-1">Gestações prévias</p>
            </div>
            <div className="bg-surface-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold font-display text-accent-600">{gestante.numPartosNormais ?? 0}</p>
              <p className="text-xs text-surface-500 mt-1">Partos normais</p>
            </div>
            <div className="bg-surface-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold font-display text-accent-600">{gestante.numPartosCesareos ?? 0}</p>
              <p className="text-xs text-surface-500 mt-1">Partos cesáreos</p>
            </div>
            <div className="bg-surface-50 rounded-xl p-4 text-center">
              <p className="text-2xl font-bold font-display text-surface-600">{gestante.numAbortosPrevia ?? 0}</p>
              <p className="text-xs text-surface-500 mt-1">Abortos</p>
            </div>
          </div>
        ) : (
          <p className="text-sm text-surface-400">Nenhum antecedente obstétrico informado.</p>
        )}
      </div>

      {/* Antecedentes Clínicos Obstétricos (v2: structured yes/no) */}
      <div className="animate-fade-in stagger-2 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Antecedentes Clínicos Obstétricos</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {[
            { label: 'Diabetes', valor: gestante.antecedentesDiabetes },
            { label: 'Infecção urinária', valor: gestante.antecedentesInfeccaoUrinaria },
            { label: 'Infertilidade', valor: gestante.antecedentesInfertilidade },
            { label: 'Dificuldade de amamentação', valor: gestante.antecedentesDificuldadeAmamentacao },
            { label: 'Cardiopatia', valor: gestante.antecedentesCardiopatia },
          ].map((a) => (
            <div key={a.label} className={`flex items-center justify-between px-4 py-2.5 rounded-xl border ${
              a.valor ? 'bg-red-50 border-red-100' : 'bg-surface-50 border-surface-100'
            }`}>
              <span className={`text-sm ${a.valor ? 'text-red-800 font-medium' : 'text-surface-500'}`}>{a.label}</span>
              <span className={`text-xs px-2 py-0.5 rounded-full font-medium ${
                a.valor ? 'bg-red-100 text-red-700' : 'bg-surface-200 text-surface-500'
              }`}>
                {a.valor ? 'Sim' : 'Não'}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Alergias */}
      <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Alergias</h2>
        {gestante.alergias ? (
          <div className="flex flex-wrap gap-2">
            {gestante.alergias.split(',').map((a, i) => (
              <span key={i} className="px-3 py-1.5 rounded-lg bg-red-50 text-red-700 text-sm font-medium border border-red-100">
                {a.trim()}
              </span>
            ))}
          </div>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma alergia informada.</p>
        )}
      </div>

      {/* Doenças Conhecidas */}
      <div className="animate-fade-in stagger-3 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Doenças Conhecidas</h2>
        {gestante.doencasConhecidas ? (
          <p className="text-sm text-surface-600 bg-surface-50 rounded-xl p-3">{gestante.doencasConhecidas}</p>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma doença informada.</p>
        )}
      </div>

      {/* Condições Clínicas Ativas */}
      {gestante.condicoes.length > 0 && (
        <div className="animate-fade-in stagger-4 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
          <h2 className="font-display font-semibold text-surface-800 mb-3">Condições Clínicas</h2>
          <div className="space-y-3">
            {gestante.condicoes.map((c) => (
              <div key={c.id} className="flex items-start justify-between p-3 rounded-xl bg-surface-50">
                <div>
                  <p className="text-sm font-medium text-surface-800">{c.descricao}</p>
                  <p className="text-xs text-surface-400 mt-0.5">CID: {c.codigoCid}</p>
                </div>
                <span className={`text-xs px-2.5 py-1 rounded-full font-medium ${
                  c.status === 'ATIVO' ? 'bg-red-100 text-red-700' :
                  c.status === 'RESOLVIDO' ? 'bg-green-100 text-green-700' :
                  'bg-yellow-100 text-yellow-700'
                }`}>
                  {c.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Medicações pré-existentes */}
      <div className="animate-fade-in stagger-5 opacity-0 bg-white rounded-2xl p-5 border border-surface-200 shadow-sm">
        <h2 className="font-display font-semibold text-surface-800 mb-3">Medicações Pré-Existentes</h2>
        {gestante.medicacoesPreExistentes ? (
          <p className="text-sm text-surface-600 bg-surface-50 rounded-xl p-3">{gestante.medicacoesPreExistentes}</p>
        ) : (
          <p className="text-sm text-surface-400">Nenhuma medicação pré-existente informada.</p>
        )}
      </div>
    </div>
  )
}
