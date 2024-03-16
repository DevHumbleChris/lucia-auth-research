-- CreateTable
CREATE TABLE "oauth_account" (
    "providerId" TEXT NOT NULL,
    "providerUserId" TEXT NOT NULL,
    "userEmail" TEXT NOT NULL,
    "userName" TEXT NOT NULL,
    "userAvatarURL" TEXT NOT NULL,
    "userId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL
);

-- CreateTable
CREATE TABLE "session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "user" (
    "id" TEXT NOT NULL,
    "email" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "oauth_account_userId_key" ON "oauth_account"("userId");

-- CreateIndex
CREATE UNIQUE INDEX "oauth_account_providerId_providerUserId_key" ON "oauth_account"("providerId", "providerUserId");

-- CreateIndex
CREATE INDEX "Session_userId_fkey" ON "session"("userId");

-- AddForeignKey
ALTER TABLE "oauth_account" ADD CONSTRAINT "oauth_account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE CASCADE ON UPDATE CASCADE;
