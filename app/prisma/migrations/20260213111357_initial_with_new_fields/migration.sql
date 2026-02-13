-- CreateTable
CREATE TABLE "gestantes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "cns" TEXT,
    "nome" TEXT NOT NULL,
    "nomeSocial" TEXT,
    "dataNascimento" DATETIME NOT NULL,
    "telefone" TEXT NOT NULL,
    "email" TEXT,
    "endereco" TEXT NOT NULL,
    "bairro" TEXT,
    "cep" TEXT,
    "ubsVinculada" TEXT,
    "dataUltimaMenstruacao" DATETIME,
    "dataProvavelParto" DATETIME,
    "tipoGravidez" TEXT NOT NULL DEFAULT 'UNICA',
    "riscoGestacional" TEXT NOT NULL DEFAULT 'HABITUAL',
    "temWhatsapp" BOOLEAN NOT NULL DEFAULT false,
    "comoDescobriuGestacao" TEXT,
    "programaSocial" TEXT,
    "temPlanoSaude" BOOLEAN NOT NULL DEFAULT false,
    "desejaSeguimentoUbs" BOOLEAN NOT NULL DEFAULT true,
    "numGestacoesPrevia" INTEGER,
    "numPartosNormais" INTEGER,
    "numPartosCesareos" INTEGER,
    "numAbortosPrevia" INTEGER,
    "alergias" TEXT,
    "doencasConhecidas" TEXT,
    "medicacoesPreExistentes" TEXT,
    "pesoPreGestacional" REAL,
    "alturaM" REAL,
    "maternidadeVinculacao" TEXT,
    "desejoContracepcao" BOOLEAN,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "profissionais" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cpf" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "cargo" TEXT NOT NULL,
    "registroConselho" TEXT,
    "ubs" TEXT NOT NULL,
    "senha" TEXT NOT NULL,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "consultas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "data" DATETIME NOT NULL,
    "tipo" TEXT NOT NULL,
    "semanaGestacional" INTEGER,
    "pesoKg" REAL,
    "pressaoArterial" TEXT,
    "alturaUterina" REAL,
    "batimentoCardiacoFetal" INTEGER,
    "notas" TEXT,
    "ubs" TEXT,
    "gestanteId" TEXT NOT NULL,
    "profissionalId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "consultas_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE,
    CONSTRAINT "consultas_profissionalId_fkey" FOREIGN KEY ("profissionalId") REFERENCES "profissionais" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "exames" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "tipo" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "resultado" TEXT,
    "status" TEXT NOT NULL DEFAULT 'SOLICITADO',
    "observacao" TEXT,
    "unidade" TEXT,
    "gestanteId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "exames_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "vacinas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigoVacina" TEXT NOT NULL,
    "nome" TEXT NOT NULL,
    "data" DATETIME NOT NULL,
    "dose" TEXT NOT NULL,
    "lote" TEXT,
    "fabricante" TEXT,
    "localAplicacao" TEXT,
    "gestanteId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "vacinas_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "medicacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "medicamento" TEXT NOT NULL,
    "dosagem" TEXT NOT NULL,
    "via" TEXT,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME,
    "ativo" BOOLEAN NOT NULL DEFAULT true,
    "observacao" TEXT,
    "gestanteId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "medicacoes_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "condicoes_clinicas" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "codigoCid" TEXT NOT NULL,
    "descricao" TEXT NOT NULL,
    "dataInicio" DATETIME NOT NULL,
    "dataFim" DATETIME,
    "status" TEXT NOT NULL DEFAULT 'ATIVO',
    "gravidade" TEXT,
    "gestanteId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "condicoes_clinicas_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "cartoes_mae_salvador" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "numeroTranscard" TEXT,
    "status" TEXT NOT NULL DEFAULT 'PENDENTE',
    "termoLgpdAceito" BOOLEAN NOT NULL DEFAULT false,
    "etapaAtual" INTEGER NOT NULL DEFAULT 0,
    "gestanteId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "atualizadoEm" DATETIME NOT NULL,
    CONSTRAINT "cartoes_mae_salvador_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "notificacoes" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "titulo" TEXT NOT NULL,
    "mensagem" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "lida" BOOLEAN NOT NULL DEFAULT false,
    "gestanteId" TEXT NOT NULL,
    "criadoEm" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "notificacoes_gestanteId_fkey" FOREIGN KEY ("gestanteId") REFERENCES "gestantes" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "gestantes_cpf_key" ON "gestantes"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "profissionais_cpf_key" ON "profissionais"("cpf");

-- CreateIndex
CREATE UNIQUE INDEX "cartoes_mae_salvador_gestanteId_key" ON "cartoes_mae_salvador"("gestanteId");
