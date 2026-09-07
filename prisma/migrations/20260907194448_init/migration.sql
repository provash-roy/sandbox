-- CreateTable
CREATE TABLE "Game" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "messages" JSONB NOT NULL DEFAULT '[]',
    "chatAccessToken" TEXT,
    "chatLastEventId" TEXT,
    "sandboxId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Game_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CreditLedger" (
    "id" TEXT NOT NULL,
    "orgId" TEXT NOT NULL,
    "entryKey" TEXT NOT NULL,
    "amount" BIGINT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "CreditLedger_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "Game_orgId_createdAt_idx" ON "Game"("orgId", "createdAt" DESC);

-- CreateIndex
CREATE UNIQUE INDEX "CreditLedger_orgId_entryKey_key" ON "CreditLedger"("orgId", "entryKey");
