'use client'

import { useState } from 'react'

const secoes = [
  {
    titulo: 'Conheça seus direitos',
    conteudo: [
      'Direito a 6 consultas de pré-natal, no mínimo, sendo preferencialmente uma no 1º trimestre, duas no 2º trimestre e três no 3º trimestre.',
      'Direito a um acompanhante de sua escolha durante o trabalho de parto, parto e pós-parto imediato (Lei Federal nº 11.108/2005).',
      'Direito à vinculação a uma maternidade de referência para o parto.',
      'Direito a conhecer previamente a maternidade onde será realizado o parto.',
      'Licença-maternidade de 120 dias para trabalhadoras com carteira assinada.',
      'Estabilidade no emprego desde a confirmação da gravidez até 5 meses após o parto.',
      'Direito a dispensa do horário de trabalho para realização de, no mínimo, 6 consultas e demais exames.',
      'Prioridade de atendimento em instituições públicas e privadas.',
      'Em Salvador, o programa Mãe Salvador oferece créditos de transporte para gestantes que realizam o acompanhamento pré-natal na atenção primária.',
    ],
  },
  {
    titulo: 'Pré-natal do parceiro',
    conteudo: [
      'O pré-natal do parceiro é uma estratégia do Ministério da Saúde para inserir o(a) parceiro(a) no acompanhamento da gestação.',
      'O(a) parceiro(a) pode realizar exames como: tipagem sanguínea, hemograma, glicemia, testes rápidos para HIV, Sífilis, Hepatite B e C.',
      'A participação do(a) parceiro(a) nas consultas fortalece o vínculo familiar e contribui para uma gestação mais saudável.',
      'O(a) parceiro(a) também pode atualizar seu cartão vacinal durante esse período.',
      'Procure a unidade de saúde para mais informações sobre como incluir seu(sua) parceiro(a) no pré-natal.',
    ],
  },
  {
    titulo: 'A descoberta da gravidez',
    conteudo: [
      'A gravidez pode ser descoberta por meio de teste rápido, exame de sangue (Beta-HCG) ou pela percepção do atraso menstrual.',
      'Ao descobrir a gestação, procure o mais rápido possível uma unidade de saúde para iniciar o pré-natal.',
      'O início precoce do pré-natal é fundamental para garantir uma gestação saudável.',
      'Na primeira consulta, o profissional de saúde vai solicitar exames e calcular a data provável do parto.',
    ],
  },
  {
    titulo: 'Os 3 primeiros meses de gestação',
    conteudo: [
      'O primeiro trimestre vai da 1ª à 13ª semana de gestação.',
      'É comum sentir enjoos, sonolência e cansaço nesse período.',
      'Evite medicações sem orientação médica e mantenha uma alimentação saudável.',
      'O bebê está em fase de formação dos principais órgãos, por isso os cuidados são essenciais.',
      'Realize os exames de primeiro trimestre conforme orientação do profissional de saúde.',
    ],
  },
  {
    titulo: 'Como seu bebê está se formando?',
    conteudo: [
      'O desenvolvimento do bebê começa desde a fecundação e passa por etapas importantes a cada semana.',
      'No primeiro trimestre, formam-se o coração, cérebro, coluna e os principais órgãos.',
      'No segundo trimestre, o bebê começa a se movimentar e você poderá sentir os primeiros chutes.',
      'No terceiro trimestre, o bebê ganha peso e se prepara para o nascimento.',
    ],
  },
  {
    titulo: 'Do 4° ao 6° mês',
    conteudo: [
      'O segundo trimestre vai da 14ª à 27ª semana.',
      'Geralmente os enjoos diminuem e você se sentirá mais disposta.',
      'O bebê começa a se movimentar e você poderá sentir os primeiros movimentos.',
      'Mantenha as consultas de pré-natal em dia e realize os exames de segundo trimestre.',
      'É o período ideal para a vacinação (dTpa) e para conhecer a maternidade.',
    ],
  },
  {
    titulo: 'Do 7° ao 9° mês — é hora de fazer o ninho',
    conteudo: [
      'O terceiro trimestre vai da 28ª semana até o parto.',
      'O bebê está ganhando peso e se posicionando para o nascimento.',
      'Você pode sentir mais cansaço, incômodo e dificuldade para dormir.',
      'Prepare a mala da maternidade e os documentos necessários.',
      'As consultas serão mais frequentes — acompanhe o crescimento do bebê com seu profissional.',
    ],
  },
  {
    titulo: 'Preparando para nascer',
    conteudo: [
      'Conheça a maternidade de referência antes do parto.',
      'Prepare a mala com itens para você e para o bebê.',
      'Tenha em mãos: documento de identidade, cartão do SUS, caderneta da gestante e exames.',
      'Combine com seu acompanhante quem estará presente no parto.',
      'Converse com o profissional de saúde sobre seu plano de parto.',
    ],
  },
  {
    titulo: 'Prematuro',
    conteudo: [
      'O bebê é considerado prematuro quando nasce antes de 37 semanas de gestação.',
      'Sinais de trabalho de parto prematuro incluem contrações regulares, dor lombar e pressão na pelve.',
      'Se perceber esses sinais, procure imediatamente o serviço de saúde.',
      'O pré-natal adequado ajuda a prevenir a prematuridade.',
    ],
  },
  {
    titulo: 'Cuidados importantes na gravidez',
    conteudo: [
      'Não fume, não consuma álcool e não use drogas durante a gestação.',
      'Evite medicações sem prescrição médica.',
      'Mantenha atividade física leve conforme orientação profissional.',
      'Beba bastante água e mantenha uma alimentação equilibrada.',
      'Use protetor solar e roupas confortáveis.',
      'Evite carregar peso e ficar muito tempo em pé.',
    ],
  },
  {
    titulo: 'Alimentação saudável e ganho de peso adequado',
    conteudo: [
      'Uma alimentação equilibrada é fundamental para a saúde da mãe e do bebê.',
      'Consuma frutas, verduras, legumes, proteínas e cereais integrais.',
      'Evite alimentos ultraprocessados, excesso de sal e açúcar.',
      'O ganho de peso esperado depende do seu IMC pré-gestacional — acompanhe com seu profissional.',
      'A suplementação de ferro e ácido fólico é recomendada durante toda a gestação.',
    ],
  },
  {
    titulo: 'Sexo na gestação',
    conteudo: [
      'Na maioria dos casos, a atividade sexual pode ser mantida durante a gestação.',
      'Converse com seu profissional de saúde sobre eventuais restrições.',
      'O sexo não prejudica o bebê — ele está protegido pelo líquido amniótico e pela musculatura uterina.',
      'Respeite seus limites e converse com seu(sua) parceiro(a) sobre conforto.',
    ],
  },
  {
    titulo: 'Atenção para algumas situações e sintomas',
    conteudo: [
      'Fique atenta a incômodos frequentes como dor de cabeça persistente, inchaço excessivo e alterações na visão.',
      'Contrações antes de 37 semanas podem indicar trabalho de parto prematuro.',
      'Sangramento vaginal em qualquer fase da gestação deve ser avaliado com urgência.',
      'Diminuição dos movimentos do bebê deve ser comunicada ao profissional de saúde.',
    ],
  },
  {
    titulo: 'Sinais de alerta — procure o serviço de saúde se:',
    conteudo: [
      'Sangramento vaginal.',
      'Dor de cabeça forte e persistente.',
      'Visão turva ou embaçada.',
      'Inchaço excessivo (rosto, mãos e pés).',
      'Febre alta.',
      'Perda de líquido pela vagina (pode indicar ruptura da bolsa).',
      'Diminuição ou ausência de movimentos fetais.',
      'Contrações regulares antes de 37 semanas.',
      'Dor abdominal intensa.',
    ],
  },
  {
    titulo: 'Acompanhamento do pré-natal',
    conteudo: [
      'O pré-natal deve ser iniciado o mais cedo possível, idealmente no primeiro trimestre.',
      'São recomendadas no mínimo 6 consultas durante a gestação.',
      'Nas consultas, serão verificados: peso, pressão arterial, altura uterina, batimentos cardíacos fetais e outros parâmetros.',
      'O acompanhamento regular permite identificar precocemente possíveis complicações.',
    ],
  },
  {
    titulo: 'Principais exames e vacinas do pré-natal',
    conteudo: [
      'Hemograma completo, tipagem sanguínea e fator Rh.',
      'Testes rápidos: HIV, Sífilis, Hepatite B e C.',
      'Glicemia de jejum e teste oral de tolerância à glicose.',
      'Exame de urina e urocultura.',
      'Ultrassonografia obstétrica.',
      'Sorologias: Toxoplasmose, Rubola, Citomegalovírus.',
      'Vacinas recomendadas: dTpa, Hepatite B, Influenza e Covid-19.',
    ],
  },
  {
    titulo: 'O parto está a cada dia mais perto',
    conteudo: [
      'A partir da 37ª semana, o bebê é considerado a termo e pode nascer a qualquer momento.',
      'Fique atenta aos sinais de trabalho de parto: contrações regulares, perda do tampão mucoso e ruptura da bolsa.',
      'Mantenha a mala pronta e os documentos organizados.',
      'Converse com seu acompanhante sobre o momento do parto.',
    ],
  },
  {
    titulo: 'Seu útero já está se preparando para o parto',
    conteudo: [
      'Nas últimas semanas, você pode sentir contrações de treinamento (Braxton Hicks).',
      'Essas contrações são irregulares e geralmente indolores.',
      'O colo do útero começa a se modificar (amolecer e dilatar) antes do trabalho de parto.',
      'Se as contrações se tornarem regulares e dolorosas, procure a maternidade.',
    ],
  },
  {
    titulo: 'Trabalho de parto',
    conteudo: [
      'O trabalho de parto começa quando as contrações se tornam regulares e progressivas.',
      'A dilatação do colo do útero vai de 0 a 10 centímetros.',
      'O tempo do trabalho de parto varia — especialmente na primeira gestação, pode ser mais demorado.',
      'Respeite o tempo do seu corpo. Movimente-se, respire e busque posições confortáveis.',
    ],
  },
  {
    titulo: 'O que você pode fazer para favorecer seu parto',
    conteudo: [
      'Mantenha-se ativa durante a gestação com caminhadas e exercícios recomendados.',
      'Pratique exercícios de respiração e relaxamento.',
      'Informe-se sobre o processo do parto para reduzir a ansiedade.',
      'Converse com seu profissional sobre o plano de parto.',
      'Conte com a presença de um(a) acompanhante de confiança.',
    ],
  },
  {
    titulo: 'Sugestões de posições para o trabalho de parto e parto vaginal',
    conteudo: [
      'Posição de cócoras: facilita a abertura da pelve.',
      'De joelhos: alivia a dor nas costas.',
      'Em pé, apoiada: a gravidade ajuda na descida do bebê.',
      'De quatro apoios: útil para aliviar a pressão nas costas.',
      'Sentada na bola suíça: ajuda no relaxamento e na mobilidade pélvica.',
      'Converse com a equipe sobre as posições que podem ser adotadas na maternidade.',
    ],
  },
  {
    titulo: 'Parto e nascimento',
    conteudo: [
      'O parto pode ser vaginal (normal) ou cesáreo, conforme indicação clínica.',
      'O contato pele a pele imediato com o bebê é recomendado logo após o nascimento.',
      'A amamentação deve ser iniciada na primeira hora de vida, sempre que possível.',
      'Você tem direito a um acompanhante durante todo o processo.',
    ],
  },
  {
    titulo: 'Medos e anseios sobre o parto',
    conteudo: [
      'É normal sentir medo e ansiedade em relação ao parto.',
      'Converse com seu profissional de saúde sobre seus medos e dúvidas.',
      'Busque informações confiáveis e participe de grupos de gestantes.',
      'O apoio emocional do(a) parceiro(a) e da família é muito importante.',
      'Lembre-se: você tem o direito de ser respeitada e bem cuidada durante o parto.',
    ],
  },
  {
    titulo: 'O primeiro encontro: o nascimento',
    conteudo: [
      'Após o nascimento, o bebê será avaliado e receberá os primeiros cuidados.',
      'O contato pele a pele favorece o vínculo e regula a temperatura do bebê.',
      'O cordão umbilical será clampeado no momento adequado.',
      'A identificação do bebê (pulseira) é realizada logo após o nascimento.',
    ],
  },
  {
    titulo: 'Os primeiros cuidados de uma nova vida em família',
    conteudo: [
      'O bebê precisa de cuidados especiais: banho, higiene do coto umbilical e amamentação.',
      'Mantenha o ambiente seguro, arejado e tranquilo.',
      'O bebê deve dormir de barriga para cima em superfície firme.',
      'Realize o teste do pezinho, teste da orelhinha e teste do olhinho nos primeiros dias.',
      'Leve o bebê para a primeira consulta com o pediatra na primeira semana de vida.',
    ],
  },
  {
    titulo: 'Puerpério: você também precisa de cuidados',
    conteudo: [
      'O puerpério é o período após o parto em que o corpo se recupera — dura cerca de 6 a 8 semanas.',
      'É normal sentir oscilações de humor, cansaço e dificuldade para dormir.',
      'Peça ajuda à família e ao(a) parceiro(a) — você não precisa dar conta de tudo sozinha.',
      'Se sentir tristeza persistente, ansiedade intensa ou dificuldade de se conectar com o bebê, procure ajuda profissional.',
      'Faça a consulta puerperal na unidade de saúde.',
    ],
  },
  {
    titulo: 'Contracepção',
    conteudo: [
      'Após o parto, converse com o profissional de saúde sobre métodos contraceptivos.',
      'Existem métodos compatíveis com a amamentação.',
      'O DIU (LARC) pode ser inserido no pós-parto, conforme avaliação médica.',
      'Planeje com antecedência o método que melhor se adapta à sua realidade.',
    ],
  },
  {
    titulo: 'Consulta pós-parto',
    conteudo: [
      'A consulta puerperal deve ser realizada entre 7 e 10 dias após o parto.',
      'Nela, o profissional avalia sua recuperação, a amamentação e o estado emocional.',
      'Também serão avaliados: pressão arterial, cicatrização e sangramento.',
      'É uma oportunidade para tirar dúvidas e discutir métodos contraceptivos.',
    ],
  },
  {
    titulo: 'Amamentação',
    conteudo: [
      'O leite materno é o melhor alimento para o bebê até os 6 meses de vida, de forma exclusiva.',
      'A amamentação fortalece o vínculo entre mãe e bebê.',
      'Procure posições confortáveis e observe se a pega está correta (boca bem aberta, lábios evertidos).',
      'Em caso de dificuldade, procure apoio na unidade de saúde ou em bancos de leite humano.',
    ],
  },
  {
    titulo: 'Vantagens da amamentação',
    conteudo: [
      'Protege o bebê contra infecções, alergias e doenças crônicas.',
      'Reduz o risco de câncer de mama e ovário na mãe.',
      'Ajuda na recuperação pós-parto (contração uterina).',
      'É econômico, prático e está sempre na temperatura ideal.',
      'Promove o desenvolvimento cognitivo e emocional do bebê.',
    ],
  },
  {
    titulo: 'Perda gestacional',
    conteudo: [
      'A perda gestacional é um momento muito difícil. Você não está sozinha.',
      'Procure apoio emocional — converse com profissionais de saúde, familiares ou grupos de apoio.',
      'Não se culpe. A maioria das perdas gestacionais ocorre por causas que não podem ser controladas.',
      'Após a perda, faça o acompanhamento médico necessário e respeite o seu tempo de luto.',
      'Quando se sentir pronta, converse com seu profissional sobre uma futura gestação.',
    ],
  },
]

export default function OrientacoesPage() {
  const [aberta, setAberta] = useState<number | null>(0)

  return (
    <div className="space-y-6">
      <div className="animate-fade-in">
        <h1 className="text-2xl font-bold font-display text-surface-800">Orientações</h1>
        <p className="text-surface-500 mt-1">Informações importantes para a sua gestação</p>
      </div>

      <div className="space-y-3">
        {secoes.map((secao, i) => (
          <div key={secao.titulo} className={`animate-fade-in stagger-${Math.min(i + 1, 5)} opacity-0 bg-white rounded-2xl border border-surface-200 shadow-sm overflow-hidden`}>
            <button
              onClick={() => setAberta(aberta === i ? null : i)}
              className="w-full flex items-center justify-between p-5 text-left"
            >
              <h2 className="font-display font-semibold text-surface-800">{secao.titulo}</h2>
              <span className={`text-surface-400 transition-transform ${aberta === i ? 'rotate-180' : ''}`}>▼</span>
            </button>
            {aberta === i && (
              <div className="px-5 pb-5 animate-fade-in">
                <ul className="space-y-3">
                  {secao.conteudo.map((item, j) => (
                    <li key={j} className="flex gap-3 text-sm text-surface-600">
                      <span className="text-primary-400 mt-0.5">•</span>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}
