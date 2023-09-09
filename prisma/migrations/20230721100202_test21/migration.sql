/*
  Warnings:

  - The primary key for the `Session` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The `id` column on the `Session` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - You are about to drop the `Shoe` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Shoe" DROP CONSTRAINT "shoe_account_relation";

-- DropForeignKey
ALTER TABLE "Shoe" DROP CONSTRAINT "shoe_owner_relation";

-- AlterTable
ALTER TABLE "Session" DROP CONSTRAINT "Session_pkey",
DROP COLUMN "id",
ADD COLUMN     "id" SERIAL NOT NULL,
ADD CONSTRAINT "Session_pkey" PRIMARY KEY ("id");

-- DropTable
DROP TABLE "Shoe";

-- CreateTable
CREATE TABLE "chosenItems" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER NOT NULL,
    "shoeId" INTEGER NOT NULL,
    "accountId" INTEGER,

    CONSTRAINT "chosenItems_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "shoe_owner_relation" (
    "id" SERIAL NOT NULL,
    "size" INTEGER NOT NULL,
    "image" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "price_range" INTEGER NOT NULL,
    "gender" TEXT NOT NULL,
    "color" TEXT NOT NULL,
    "used" BOOLEAN,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ownerId" INTEGER NOT NULL,

    CONSTRAINT "shoe_owner_relation_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "shoe_owner_relation_image_key" ON "shoe_owner_relation"("image");

-- AddForeignKey
ALTER TABLE "chosenItems" ADD CONSTRAINT "chosenItems_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chosenItems" ADD CONSTRAINT "chosenItems_shoeId_fkey" FOREIGN KEY ("shoeId") REFERENCES "shoe_owner_relation"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "chosenItems" ADD CONSTRAINT "chosenItems_accountId_fkey" FOREIGN KEY ("accountId") REFERENCES "Account"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "shoe_owner_relation" ADD CONSTRAINT "shoe_owner_relation" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
