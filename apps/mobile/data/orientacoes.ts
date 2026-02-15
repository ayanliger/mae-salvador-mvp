// 31 orientation topics from Section 5a of the requirements
// Grouped into logical categories for the gestante to browse

export interface OrientacaoTopic {
  id: string;
  titulo: string;
  icon: string;
  resumo: string;
  conteudo: string[];
}

export interface OrientacaoCategory {
  titulo: string;
  icon: string;
  color: string;
  topicos: OrientacaoTopic[];
}

export const ORIENTACOES: OrientacaoCategory[] = [
  {
    titulo: 'Seus Direitos e Informações',
    icon: 'balance-scale',
    color: '#1A56C4',
    topicos: [
      {
        id: 'ori-01',
        titulo: 'Conheça seus direitos',
        icon: 'balance-scale',
        resumo: 'Direitos da gestante e informações municipais de Salvador',
        conteudo: [
          'Toda gestante tem direito ao acompanhamento pré-natal gratuito pelo SUS, com no mínimo 6 consultas durante a gestação.',
          'Você tem direito a um acompanhante de sua escolha durante o trabalho de parto, parto e pós-parto imediato — é a Lei do Acompanhante (Lei nº 11.108/2005).',
          'A gestante tem prioridade no atendimento em serviços de saúde, bancos, supermercados e transporte público.',
          'Em Salvador, o Programa Mãe Salvador oferece o Cartão Transcard com passagens gratuitas no transporte público municipal para gestantes vinculadas ao programa.',
          'Você tem direito à licença-maternidade de 120 dias, podendo ser estendida para 180 dias em empresas do Programa Empresa Cidadã.',
          'A gestante não pode ser demitida desde a confirmação da gravidez até 5 meses após o parto — é a estabilidade provisória garantida pela Constituição.',
          'Procure a sua Unidade Básica de Saúde (UBS) para iniciar o pré-natal o mais cedo possível, de preferência antes das 12 semanas de gestação.',
        ],
      },
      {
        id: 'ori-02',
        titulo: 'Pré-natal do parceiro',
        icon: 'male',
        resumo: 'A importância da participação do parceiro no pré-natal',
        conteudo: [
          'O pré-natal do parceiro é uma estratégia do Ministério da Saúde que incentiva a participação ativa do(a) companheiro(a) durante a gestação.',
          'O parceiro(a) pode realizar exames de rotina como testes rápidos para HIV, sífilis, hepatites B e C, além de atualizar a caderneta de vacinação.',
          'A presença do parceiro(a) nas consultas fortalece o vínculo familiar e contribui para a saúde emocional da gestante.',
          'Estudos mostram que gestantes com participação ativa do parceiro apresentam menores índices de prematuridade e depressão pós-parto.',
          'O parceiro(a) também pode participar das atividades educativas oferecidas pela unidade de saúde.',
        ],
      },
    ],
  },
  {
    titulo: 'A Gestação',
    icon: 'heartbeat',
    color: '#E07A5F',
    topicos: [
      {
        id: 'ori-03',
        titulo: 'A descoberta da gravidez',
        icon: 'heart',
        resumo: 'Os primeiros passos após descobrir que está grávida',
        conteudo: [
          'A gestação pode ser confirmada por teste rápido na UBS, exame de Beta-HCG no sangue ou pelo atraso menstrual acompanhado de sintomas.',
          'Ao descobrir a gravidez, procure sua UBS o mais rápido possível para iniciar o pré-natal. O ideal é começar antes de completar 12 semanas.',
          'Na primeira consulta, o profissional de saúde vai calcular a Idade Gestacional (IG) e a Data Provável do Parto (DPP) a partir da sua última menstruação.',
          'Serão solicitados exames iniciais como hemograma, glicemia, tipagem sanguínea, sorologias (HIV, sífilis, hepatites) e ultrassonografia obstétrica.',
          'É normal sentir uma mistura de emoções — alegria, medo, ansiedade. Converse com sua equipe de saúde sobre seus sentimentos.',
          'Inicie o uso de ácido fólico o mais cedo possível, pois ele é essencial para a formação do sistema nervoso do bebê.',
        ],
      },
      {
        id: 'ori-04',
        titulo: 'Os 3 primeiros meses de gestação',
        icon: 'calendar',
        resumo: '1º trimestre: semanas 1 a 13',
        conteudo: [
          'O primeiro trimestre é o período de maior formação dos órgãos do bebê. É fundamental evitar medicamentos sem prescrição médica, álcool, cigarro e outras drogas.',
          'Sintomas comuns: náuseas, vômitos, cansaço, sonolência, aumento da frequência urinária e sensibilidade nos seios.',
          'Para aliviar as náuseas, prefira refeições menores e mais frequentes, evite alimentos muito gordurosos e beba bastante líquido.',
          'A ultrassonografia do primeiro trimestre confirma a idade gestacional, a localização da gravidez e se é gestação única ou múltipla.',
          'Mantenha suas consultas de pré-natal em dia e siga as orientações da equipe de saúde.',
        ],
      },
      {
        id: 'ori-05',
        titulo: 'Como seu bebê está se formando?',
        icon: 'child',
        resumo: 'O desenvolvimento do bebê mês a mês',
        conteudo: [
          '4 semanas: O embrião tem o tamanho de um grão de arroz. O coração já começa a bater.',
          '8 semanas: Os braços e pernas estão se formando. O rosto começa a ter forma com olhos, nariz e boca.',
          '12 semanas: O bebê mede cerca de 6 cm. Já tem todos os órgãos formados, que vão amadurecendo ao longo da gestação.',
          '20 semanas: O bebê mede cerca de 16 cm e pesa aproximadamente 300g. Você pode começar a sentir os movimentos.',
          '28 semanas: Os pulmões estão em amadurecimento. O bebê já consegue abrir os olhos e reage a sons.',
          '36 semanas: O bebê está praticamente pronto para nascer, ganhando peso e acumulando gordura.',
          '40 semanas: A data provável do parto. O bebê mede em média 50 cm e pesa cerca de 3,3 kg.',
        ],
      },
      {
        id: 'ori-06',
        titulo: 'Do 4° ao 6° mês',
        icon: 'calendar-check-o',
        resumo: '2º trimestre: semanas 14 a 27',
        conteudo: [
          'O segundo trimestre costuma ser o período de maior bem-estar. As náuseas geralmente diminuem e a energia aumenta.',
          'Você vai começar a sentir os movimentos do bebê, geralmente entre as semanas 18 e 22. É uma sensação única!',
          'A barriga começa a ficar mais evidente. É hora de usar roupas confortáveis e manter a hidratação da pele.',
          'A ultrassonografia morfológica, realizada entre 20 e 24 semanas, avalia detalhadamente a anatomia do bebê.',
          'Exames do segundo trimestre incluem o teste de tolerância à glicose (TOTG) para rastreamento de diabetes gestacional.',
          'Continue com a suplementação de ferro e ácido fólico conforme orientação do profissional de saúde.',
        ],
      },
      {
        id: 'ori-07',
        titulo: 'Do 7° ao 9° mês — hora de fazer o ninho',
        icon: 'home',
        resumo: '3º trimestre: semanas 28 a 40',
        conteudo: [
          'O terceiro trimestre é o período de preparação final. O bebê está ganhando peso e os pulmões estão amadurecendo.',
          'É normal sentir mais cansaço, dificuldade para dormir, azia e inchaço nos pés. Eleve as pernas quando possível.',
          'Prepare a mala da maternidade a partir da 36ª semana: documentos, roupas para você e para o bebê, itens de higiene.',
          'As consultas ficam mais frequentes: quinzenais entre 28 e 36 semanas, e semanais após 36 semanas.',
          'Identifique o caminho até a maternidade de referência e tenha um plano para o dia do parto.',
          'A visita de vinculação à maternidade é um direito seu e ajuda a conhecer o local onde o bebê vai nascer.',
        ],
      },
    ],
  },
  {
    titulo: 'Preparação para o Parto',
    icon: 'star',
    color: '#8B5CF6',
    topicos: [
      {
        id: 'ori-08',
        titulo: 'Preparando para nascer',
        icon: 'star',
        resumo: 'Como se preparar para o momento do parto',
        conteudo: [
          'Converse com sua equipe de saúde sobre o plano de parto — um documento onde você expressa suas preferências para o momento do nascimento.',
          'Participe das atividades educativas sobre parto e nascimento oferecidas pela sua UBS.',
          'Escolha um acompanhante de confiança que estará com você durante o trabalho de parto e parto.',
          'Prepare a mala com antecedência: documentos pessoais, cartão SUS, caderneta da gestante, roupas para mãe e bebê.',
          'Conheça os sinais de trabalho de parto: contrações regulares e cada vez mais intensas, perda do tampão mucoso, ruptura da bolsa.',
        ],
      },
      {
        id: 'ori-09',
        titulo: 'Prematuro',
        icon: 'exclamation-triangle',
        resumo: 'Sobre o nascimento antes de 37 semanas',
        conteudo: [
          'O bebê prematuro é aquele que nasce antes de completar 37 semanas de gestação.',
          'Fatores de risco incluem: infecções, pré-eclâmpsia, gestação múltipla, idade materna extrema, histórico de prematuridade anterior.',
          'Sinais de alerta para parto prematuro: contrações regulares antes de 37 semanas, pressão na pelve, cólicas, sangramento vaginal.',
          'Se você perceber esses sinais, procure imediatamente o serviço de saúde. O tratamento precoce pode retardar o parto.',
          'O bebê prematuro pode precisar de cuidados especiais em UTI neonatal. A equipe vai orientar sobre cada etapa.',
          'O leite materno é especialmente importante para o prematuro, pois contém anticorpos e nutrientes essenciais para sua recuperação.',
        ],
      },
      {
        id: 'ori-17',
        titulo: 'O parto está a cada dia mais perto',
        icon: 'clock-o',
        resumo: 'Últimas semanas antes do nascimento',
        conteudo: [
          'Nas últimas semanas, o bebê costuma "encaixar" — a cabeça desce em direção à pelve, preparando-se para o parto.',
          'Você pode notar que a barriga "abaixou" e a respiração fica mais fácil, porém com mais vontade de urinar.',
          'As contrações de treinamento (Braxton Hicks) ficam mais frequentes, mas são irregulares e não indicam trabalho de parto.',
          'Mantenha as consultas semanais e comunique qualquer mudança ao seu profissional de saúde.',
          'Tenha sempre à mão os documentos, a mala da maternidade e o número de telefone de quem vai te acompanhar.',
        ],
      },
      {
        id: 'ori-18',
        titulo: 'Seu útero já está se preparando para o parto',
        icon: 'refresh',
        resumo: 'As mudanças que acontecem antes do trabalho de parto',
        conteudo: [
          'Nas semanas finais, o colo do útero começa a amolecer e dilatar gradualmente — é um processo natural.',
          'Você pode perceber a saída do tampão mucoso, uma secreção espessa e gelatinosa, com ou sem raios de sangue.',
          'A perda do tampão mucoso não significa que o parto é imediato, mas indica que o corpo está se preparando.',
          'As contrações de Braxton Hicks ajudam a posicionar o bebê e preparar o útero para o trabalho de parto real.',
        ],
      },
      {
        id: 'ori-19',
        titulo: 'Trabalho de parto',
        icon: 'heartbeat',
        resumo: 'Como identificar e o que esperar',
        conteudo: [
          'O trabalho de parto é identificado por contrações regulares, progressivamente mais fortes, duradouras e próximas.',
          'Fase latente: contrações a cada 15-20 minutos. Você pode ficar em casa, relaxar, tomar banho morno e se hidratar.',
          'Fase ativa: contrações a cada 5 minutos ou menos, durando 40-60 segundos. É hora de ir para a maternidade.',
          'A ruptura da bolsa (saída de líquido claro pela vagina) pode acontecer antes ou durante o trabalho de parto. Vá à maternidade.',
          'Na maternidade, a equipe vai avaliar a dilatação do colo, os batimentos do bebê e orientar sobre as próximas etapas.',
        ],
      },
      {
        id: 'ori-20',
        titulo: 'O que você pode fazer para favorecer seu parto',
        icon: 'thumbs-up',
        resumo: 'Técnicas de conforto e posições',
        conteudo: [
          'Movimentar-se durante o trabalho de parto ajuda na descida do bebê e pode aliviar a dor. Caminhe, balance, use a bola suíça.',
          'A respiração consciente ajuda a relaxar entre as contrações. Inspire lentamente pelo nariz e expire pela boca.',
          'O banho morno (chuveiro ou banheira) é um excelente método de alívio da dor durante o trabalho de parto.',
          'Massagens na região lombar, feitas pelo acompanhante, ajudam a aliviar o desconforto.',
          'Mantenha-se hidratada e alimentada com alimentos leves durante a fase inicial do trabalho de parto.',
        ],
      },
      {
        id: 'ori-21',
        titulo: 'Posições para o trabalho de parto e parto vaginal',
        icon: 'arrows-alt',
        resumo: 'Sugestões de posições que podem ajudar',
        conteudo: [
          'Posição de cócoras: aproveita a gravidade e amplia o diâmetro da pelve, favorecendo a descida do bebê.',
          'De quatro apoios (mãos e joelhos): alivia a dor nas costas e ajuda na rotação do bebê.',
          'Em pé apoiada: segure no acompanhante ou em uma barra de apoio, deixando o corpo balançar levemente.',
          'Sentada na bola suíça: ajuda na mobilidade da pelve e pode ser usada durante todo o trabalho de parto.',
          'Deitada de lado (lateral): posição de descanso que permite relaxar entre as contrações mantendo boa circulação.',
          'Converse com a equipe sobre qual posição é mais confortável para você em cada momento.',
        ],
      },
      {
        id: 'ori-22',
        titulo: 'Parto e nascimento',
        icon: 'star-o',
        resumo: 'O momento do nascimento do seu bebê',
        conteudo: [
          'O parto vaginal é o modo fisiológico de nascer e traz benefícios para a mãe e o bebê, incluindo recuperação mais rápida.',
          'A cesariana é uma cirurgia indicada em situações específicas, como sofrimento fetal, desproporção ou posição inadequada do bebê.',
          'Após o nascimento, o bebê deve ser colocado imediatamente em contato pele a pele com a mãe — o "golden hour".',
          'O clampeamento tardio do cordão umbilical (após 1-3 minutos) aumenta as reservas de ferro do bebê.',
          'A amamentação na primeira hora de vida é fundamental para o vínculo e para a saúde do bebê.',
        ],
      },
      {
        id: 'ori-23',
        titulo: 'Medos e anseios sobre o parto',
        icon: 'comments',
        resumo: 'Como lidar com as preocupações',
        conteudo: [
          'Sentir medo ou ansiedade sobre o parto é completamente normal. Você não está sozinha nesse sentimento.',
          'Converse com sua equipe de saúde sobre seus medos. Informação de qualidade ajuda a reduzir a ansiedade.',
          'Participar de grupos de gestantes na UBS permite trocar experiências e se sentir acolhida.',
          'Técnicas de relaxamento, meditação e respiração podem ser praticadas durante a gestação para preparar o corpo e a mente.',
          'Lembre-se: a equipe da maternidade estará ao seu lado, cuidando de você e do seu bebê a cada momento.',
        ],
      },
    ],
  },
  {
    titulo: 'Cuidados na Gravidez',
    icon: 'shield',
    color: '#059669',
    topicos: [
      {
        id: 'ori-10',
        titulo: 'Cuidados importantes na gravidez',
        icon: 'shield',
        resumo: 'Hábitos saudáveis e cuidados essenciais',
        conteudo: [
          'Não fume, não consuma álcool e não use drogas. Essas substâncias prejudicam gravemente o desenvolvimento do bebê.',
          'Tome apenas medicamentos prescritos pelo seu profissional de saúde. Automedicação pode ser perigosa.',
          'Use protetor solar diariamente para evitar manchas na pele (melasma), comuns durante a gestação.',
          'Pratique atividade física leve a moderada, como caminhada, conforme orientação médica.',
          'Mantenha a higiene bucal em dia — problemas dentários podem estar associados a parto prematuro.',
          'Durma bem e descanse sempre que possível. O sono adequado é fundamental para a sua saúde e a do bebê.',
        ],
      },
      {
        id: 'ori-11',
        titulo: 'Alimentação saudável e ganho de peso',
        icon: 'cutlery',
        resumo: 'Nutrição adequada durante a gestação',
        conteudo: [
          'Uma alimentação equilibrada é essencial para fornecer os nutrientes que você e o bebê precisam.',
          'Consuma frutas, verduras, legumes, proteínas magras, cereais integrais e laticínios diariamente.',
          'Evite alimentos ultraprocessados, excesso de sal, açúcar e gorduras saturadas.',
          'Beba pelo menos 2 litros de água por dia. A hidratação adequada previne infecções urinárias e constipação.',
          'O ganho de peso ideal depende do seu IMC pré-gestacional. Converse com seu profissional de saúde sobre a meta adequada para você.',
          'A suplementação de ferro e ácido fólico é indispensável e deve ser mantida conforme prescrição médica.',
        ],
      },
      {
        id: 'ori-12',
        titulo: 'Sexo na gestação',
        icon: 'heart-o',
        resumo: 'Orientações sobre vida sexual durante a gravidez',
        conteudo: [
          'Na maioria dos casos, a relação sexual é segura durante toda a gestação e não prejudica o bebê.',
          'O bebê está protegido pelo útero, pela bolsa amniótica e pelo tampão mucoso no colo do útero.',
          'É normal que o desejo sexual varie ao longo da gestação. Converse com seu parceiro(a) sobre seus sentimentos.',
          'Algumas situações exigem abstinência sexual, como placenta prévia, ameaça de parto prematuro ou ruptura da bolsa. Siga a orientação médica.',
          'Posições confortáveis podem ser necessárias à medida que a barriga cresce.',
        ],
      },
      {
        id: 'ori-13',
        titulo: 'Atenção para situações e sintomas',
        icon: 'exclamation-circle',
        resumo: 'Sintomas que merecem atenção durante a gestação',
        conteudo: [
          'Inchaço excessivo nas mãos, rosto e pernas pode ser sinal de pré-eclâmpsia — procure atendimento.',
          'Dor de cabeça forte e persistente, visão embaçada ou com pontos brilhantes requerem avaliação imediata.',
          'Dor abdominal intensa, diferente de cólicas leves, deve ser investigada.',
          'Febre (temperatura acima de 37,8°C) pode indicar infecção e precisa de tratamento.',
          'Ardência ou dor ao urinar pode ser sinal de infecção urinária, comum na gestação e que precisa de tratamento.',
          'Corrimento vaginal com odor forte, coceira ou mudança de cor deve ser comunicado ao profissional.',
        ],
      },
      {
        id: 'ori-14',
        titulo: 'Sinais de alerta — procure o serviço de saúde',
        icon: 'warning',
        resumo: 'Situações que exigem atendimento de urgência',
        conteudo: [
          'Procure imediatamente o serviço de saúde se apresentar:',
          'Sangramento vaginal em qualquer fase da gestação.',
          'Perda de líquido pela vagina (pode indicar ruptura da bolsa).',
          'Contrações regulares antes de 37 semanas.',
          'Diminuição ou ausência de movimentos do bebê (após 28 semanas, observe se o bebê se movimenta pelo menos 6 vezes em 1 hora).',
          'Pressão arterial elevada acompanhada de dor de cabeça, visão turva ou dor no estômago.',
          'Febre alta com calafrios.',
          'Não espere — procure a maternidade de referência ou ligue para o SAMU (192).',
        ],
      },
    ],
  },
  {
    titulo: 'Pré-natal e Exames',
    icon: 'stethoscope',
    color: '#D97706',
    topicos: [
      {
        id: 'ori-15',
        titulo: 'Acompanhamento do pré-natal',
        icon: 'stethoscope',
        resumo: 'A importância das consultas regulares',
        conteudo: [
          'O pré-natal é o acompanhamento de saúde durante a gestação. Deve ser iniciado no primeiro trimestre.',
          'São recomendadas no mínimo 6 consultas: uma no 1º trimestre, duas no 2º e três no 3º trimestre.',
          'Em cada consulta, são avaliados: peso, pressão arterial, altura uterina, batimentos cardíacos do bebê e exames de rotina.',
          'O pré-natal permite identificar e tratar precocemente condições como diabetes gestacional, hipertensão, infecções e anemias.',
          'Leve sempre sua caderneta da gestante às consultas — ela contém todo o registro do seu acompanhamento.',
          'Não falte às consultas. Se precisar remarcar, entre em contato com a UBS o mais rápido possível.',
        ],
      },
      {
        id: 'ori-16',
        titulo: 'Exames e vacinas do pré-natal',
        icon: 'flask',
        resumo: 'Conheça os principais exames e vacinação',
        conteudo: [
          'Exames do 1º trimestre: hemograma, glicemia, tipagem sanguínea, sorologias (HIV, sífilis, hepatites B e C, toxoplasmose), urina, ultrassonografia.',
          'Exames do 2º trimestre: TOTG (teste de tolerância à glicose), ultrassonografia morfológica, repetição de sorologias quando indicado.',
          'Exames do 3º trimestre: repetição de sorologias (HIV, sífilis, hepatites), hemograma, cultura para Streptococcus do grupo B.',
          'Vacina dTpa (difteria, tétano e coqueluche): aplicada a partir da 20ª semana a cada gestação.',
          'Vacina Influenza: aplicada durante o período de campanha, em qualquer fase da gestação.',
          'Vacina Hepatite B: completar esquema se necessário.',
          'Vacina COVID-19: conforme orientação vigente do Ministério da Saúde.',
        ],
      },
    ],
  },
  {
    titulo: 'Após o Nascimento',
    icon: 'child',
    color: '#EC4899',
    topicos: [
      {
        id: 'ori-24',
        titulo: 'O primeiro encontro: o nascimento',
        icon: 'smile-o',
        resumo: 'Os primeiros momentos com seu bebê',
        conteudo: [
          'O contato pele a pele logo após o nascimento regula a temperatura do bebê, acalma e favorece a amamentação.',
          'O bebê será avaliado pela equipe com o teste de Apgar no 1º e 5º minuto de vida.',
          'O teste do pezinho deve ser realizado entre o 3º e o 5º dia de vida e detecta doenças que podem ser tratadas precocemente.',
          'O teste da orelhinha, do olhinho e do coraçãozinho também são realizados na maternidade.',
          'A primeira vacina (BCG e Hepatite B) é aplicada ainda na maternidade.',
        ],
      },
      {
        id: 'ori-25',
        titulo: 'Primeiros cuidados com o recém-nascido',
        icon: 'child',
        resumo: 'Uma nova vida em família',
        conteudo: [
          'O banho do bebê pode ser dado diariamente com água morna. Verifique a temperatura da água com o cotovelo.',
          'O coto umbilical deve ser mantido limpo e seco. Utilize álcool 70% conforme orientação da maternidade.',
          'Vista o bebê conforme a temperatura ambiente. Evite excesso de roupas e cobertas.',
          'O bebê deve dormir de barriga para cima (posição supina) para prevenir a morte súbita.',
          'Amamente em livre demanda — sempre que o bebê demonstrar fome. Nos primeiros dias, o colostro é o alimento ideal.',
          'Agende a consulta de retorno na UBS entre 3 a 5 dias após a alta da maternidade.',
        ],
      },
      {
        id: 'ori-26',
        titulo: 'Puerpério — você também precisa de cuidados',
        icon: 'user',
        resumo: 'O período pós-parto e sua recuperação',
        conteudo: [
          'O puerpério é o período de recuperação do corpo após o parto, que dura aproximadamente 42 dias.',
          'É normal ter sangramento vaginal (loquiação) que diminui gradualmente. Se aumentar ou tiver odor forte, procure atendimento.',
          'Cólicas leves são normais e estão relacionadas à involução do útero, especialmente durante a amamentação.',
          'Sentimentos de tristeza, choro fácil e irritabilidade são comuns nos primeiros dias (baby blues). Se persistirem por mais de 2 semanas, procure ajuda — pode ser depressão pós-parto.',
          'Aceite ajuda da família e amigos. Descansar enquanto o bebê dorme é importante para sua recuperação.',
          'A consulta puerperal deve acontecer até 42 dias após o parto. Nela serão avaliados sua recuperação e orientação sobre contracepção.',
        ],
      },
      {
        id: 'ori-27',
        titulo: 'Contracepção',
        icon: 'info-circle',
        resumo: 'Métodos contraceptivos após o parto',
        conteudo: [
          'É possível engravidar novamente poucas semanas após o parto, mesmo amamentando.',
          'Converse com a equipe de saúde durante o pré-natal sobre seus planos reprodutivos e métodos contraceptivos.',
          'Métodos compatíveis com amamentação incluem: DIU (cobre ou hormonal), implante subdérmico, pílula só de progesterona e preservativos.',
          'O DIU pode ser inserido ainda na maternidade (pós-placentário) ou na consulta puerperal.',
          'O preservativo é o único método que também protege contra infecções sexualmente transmissíveis.',
        ],
      },
      {
        id: 'ori-28',
        titulo: 'Consulta pós-parto',
        icon: 'calendar-check-o',
        resumo: 'A importância do acompanhamento após o parto',
        conteudo: [
          'A consulta puerperal deve ocorrer até 42 dias após o parto na sua UBS.',
          'Na consulta, serão avaliados: cicatrização (se houve episiotomia ou cesariana), pressão arterial, peso, estado emocional e amamentação.',
          'É o momento de discutir contracepção e escolher o método mais adequado para você.',
          'A equipe avaliará também o bebê: peso, amamentação, vacinas e testes de triagem.',
          'Se você perceber sinais de depressão pós-parto (tristeza persistente, desinteresse pelo bebê, dificuldade de dormir), comunique ao profissional.',
        ],
      },
    ],
  },
  {
    titulo: 'Amamentação e Perda Gestacional',
    icon: 'heart',
    color: '#7C3AED',
    topicos: [
      {
        id: 'ori-29',
        titulo: 'Amamentação',
        icon: 'heart',
        resumo: 'Orientações sobre aleitamento materno',
        conteudo: [
          'O leite materno é o alimento mais completo para o bebê até os 6 meses de vida, devendo ser exclusivo nesse período.',
          'O colostro (primeiro leite, amarelado) é rico em anticorpos e é fundamental para a proteção do recém-nascido.',
          'Amamente em livre demanda — quanto mais o bebê mama, mais leite é produzido.',
          'A pega correta é fundamental: a boca do bebê deve abocanhar toda a aréola, não apenas o bico do seio.',
          'Dor ao amamentar não é normal e geralmente indica pega incorreta. Procure ajuda da equipe de saúde.',
          'Evite uso de bicos artificiais e mamadeiras nos primeiros meses, pois podem interferir na amamentação.',
        ],
      },
      {
        id: 'ori-30',
        titulo: 'Vantagens da amamentação',
        icon: 'thumbs-o-up',
        resumo: 'Benefícios para a mãe e o bebê',
        conteudo: [
          'Para o bebê: proteção contra infecções, alergias e doenças crônicas; melhor desenvolvimento cerebral e emocional.',
          'Para a mãe: ajuda na recuperação pós-parto, reduz risco de câncer de mama e ovário, e fortalece o vínculo com o bebê.',
          'O leite materno é sempre fresco, na temperatura ideal, gratuito e ambientalmente sustentável.',
          'Crianças amamentadas têm menor risco de obesidade, diabetes e problemas dentários na infância.',
          'A amamentação promove economia para a família, pois não há gasto com fórmulas, mamadeiras e esterilização.',
        ],
      },
      {
        id: 'ori-31',
        titulo: 'Perda gestacional',
        icon: 'leaf',
        resumo: 'Acolhimento e orientações sobre perda',
        conteudo: [
          'A perda gestacional é uma experiência dolorosa que pode acontecer em qualquer fase da gestação.',
          'Sentimentos de tristeza, culpa, raiva e vazio são normais. Permita-se sentir e procure apoio.',
          'Não existe culpa. Na maioria dos casos, a perda está relacionada a alterações cromossômicas que não podiam ser prevenidas.',
          'Converse com a equipe de saúde sobre o que aconteceu. Entender pode ajudar no processo de luto.',
          'Procure apoio psicológico se necessário. O CAPS e a equipe da UBS podem auxiliar nesse momento.',
          'Quando se sentir pronta, converse com seu profissional de saúde sobre planejamento de uma nova gestação.',
        ],
      },
    ],
  },
];

// Flat list for easy lookup by ID
export const ORIENTACOES_MAP = new Map<string, OrientacaoTopic>(
  ORIENTACOES.flatMap((cat) => cat.topicos.map((t) => [t.id, t] as const))
);
