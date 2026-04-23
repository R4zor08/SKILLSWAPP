-- CreateTable
CREATE TABLE "User" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "bio" TEXT NOT NULL DEFAULT '',
    "location" TEXT NOT NULL DEFAULT '',
    "avatar" TEXT NOT NULL DEFAULT '',
    "role" TEXT NOT NULL DEFAULT 'user',
    "averageRating" REAL NOT NULL DEFAULT 0,
    "reviewsCount" INTEGER NOT NULL DEFAULT 0,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Skill" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "userId" TEXT NOT NULL,
    "skillName" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "description" TEXT NOT NULL DEFAULT '',
    "type" TEXT NOT NULL,
    "level" TEXT NOT NULL DEFAULT 'beginner',
    "tags" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Skill_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SwapRequest" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "offeredSkillId" TEXT NOT NULL,
    "requestedSkillId" TEXT NOT NULL,
    "message" TEXT NOT NULL DEFAULT '',
    "status" TEXT NOT NULL DEFAULT 'pending',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "SwapRequest_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SwapRequest_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SwapRequest_offeredSkillId_fkey" FOREIGN KEY ("offeredSkillId") REFERENCES "Skill" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "SwapRequest_requestedSkillId_fkey" FOREIGN KEY ("requestedSkillId") REFERENCES "Skill" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Message" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "swapId" TEXT NOT NULL,
    "senderId" TEXT NOT NULL,
    "receiverId" TEXT NOT NULL,
    "content" TEXT NOT NULL,
    "isRead" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Message_swapId_fkey" FOREIGN KEY ("swapId") REFERENCES "SwapRequest" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_senderId_fkey" FOREIGN KEY ("senderId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Message_receiverId_fkey" FOREIGN KEY ("receiverId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Review" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "swapId" TEXT NOT NULL,
    "reviewerId" TEXT NOT NULL,
    "revieweeId" TEXT NOT NULL,
    "rating" INTEGER NOT NULL,
    "comment" TEXT NOT NULL DEFAULT '',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Review_swapId_fkey" FOREIGN KEY ("swapId") REFERENCES "SwapRequest" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_reviewerId_fkey" FOREIGN KEY ("reviewerId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Review_revieweeId_fkey" FOREIGN KEY ("revieweeId") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "Progress" (
    "_id" TEXT NOT NULL PRIMARY KEY,
    "swapId" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "notes" TEXT NOT NULL DEFAULT '',
    "completionStatus" TEXT NOT NULL DEFAULT 'in_progress',
    "updatedById" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    CONSTRAINT "Progress_swapId_fkey" FOREIGN KEY ("swapId") REFERENCES "SwapRequest" ("_id") ON DELETE CASCADE ON UPDATE CASCADE,
    CONSTRAINT "Progress_updatedById_fkey" FOREIGN KEY ("updatedById") REFERENCES "User" ("_id") ON DELETE CASCADE ON UPDATE CASCADE
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE INDEX "Skill_userId_idx" ON "Skill"("userId");

-- CreateIndex
CREATE INDEX "Skill_category_idx" ON "Skill"("category");

-- CreateIndex
CREATE INDEX "SwapRequest_senderId_receiverId_status_idx" ON "SwapRequest"("senderId", "receiverId", "status");

-- CreateIndex
CREATE INDEX "Message_swapId_createdAt_idx" ON "Message"("swapId", "createdAt");

-- CreateIndex
CREATE INDEX "Review_swapId_idx" ON "Review"("swapId");

-- CreateIndex
CREATE UNIQUE INDEX "Review_swapId_reviewerId_key" ON "Review"("swapId", "reviewerId");

-- CreateIndex
CREATE INDEX "Progress_swapId_createdAt_idx" ON "Progress"("swapId", "createdAt" DESC);
