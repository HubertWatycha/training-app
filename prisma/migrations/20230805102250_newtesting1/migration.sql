/*
  Warnings:

  - You are about to drop the column `chosenItemId` on the `Hoodies` table. All the data in the column will be lost.
  - You are about to drop the column `chosenItemId` on the `Shoe` table. All the data in the column will be lost.
  - You are about to drop the column `chosenItemId` on the `Shorts` table. All the data in the column will be lost.
  - You are about to drop the column `chosenItemId` on the `T_Shirt` table. All the data in the column will be lost.
  - You are about to drop the column `chosenItemId` on the `Trousers` table. All the data in the column will be lost.
  - You are about to drop the `ChosenItem` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `VerificationToken` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "ChosenItem" DROP CONSTRAINT "ChosenItem_userId_fkey";

-- DropForeignKey
ALTER TABLE "Hoodies" DROP CONSTRAINT "Hoodies_chosenItemId_fkey";

-- DropForeignKey
ALTER TABLE "Shoe" DROP CONSTRAINT "Shoe_chosenItemId_fkey";

-- DropForeignKey
ALTER TABLE "Shorts" DROP CONSTRAINT "Shorts_chosenItemId_fkey";

-- DropForeignKey
ALTER TABLE "T_Shirt" DROP CONSTRAINT "T_Shirt_chosenItemId_fkey";

-- DropForeignKey
ALTER TABLE "Trousers" DROP CONSTRAINT "Trousers_chosenItemId_fkey";

-- AlterTable
ALTER TABLE "Hoodies" DROP COLUMN "chosenItemId";

-- AlterTable
ALTER TABLE "Shoe" DROP COLUMN "chosenItemId";

-- AlterTable
ALTER TABLE "Shorts" DROP COLUMN "chosenItemId";

-- AlterTable
ALTER TABLE "T_Shirt" DROP COLUMN "chosenItemId";

-- AlterTable
ALTER TABLE "Trousers" DROP COLUMN "chosenItemId";

-- DropTable
DROP TABLE "ChosenItem";

-- DropTable
DROP TABLE "VerificationToken";

-- CreateTable
CREATE TABLE "_UserShoe" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserT_Shirt" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserTrousers" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserShorts" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateTable
CREATE TABLE "_UserHoodies" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_UserShoe_AB_unique" ON "_UserShoe"("A", "B");

-- CreateIndex
CREATE INDEX "_UserShoe_B_index" ON "_UserShoe"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserT_Shirt_AB_unique" ON "_UserT_Shirt"("A", "B");

-- CreateIndex
CREATE INDEX "_UserT_Shirt_B_index" ON "_UserT_Shirt"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserTrousers_AB_unique" ON "_UserTrousers"("A", "B");

-- CreateIndex
CREATE INDEX "_UserTrousers_B_index" ON "_UserTrousers"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserShorts_AB_unique" ON "_UserShorts"("A", "B");

-- CreateIndex
CREATE INDEX "_UserShorts_B_index" ON "_UserShorts"("B");

-- CreateIndex
CREATE UNIQUE INDEX "_UserHoodies_AB_unique" ON "_UserHoodies"("A", "B");

-- CreateIndex
CREATE INDEX "_UserHoodies_B_index" ON "_UserHoodies"("B");

-- AddForeignKey
ALTER TABLE "_UserShoe" ADD CONSTRAINT "_UserShoe_A_fkey" FOREIGN KEY ("A") REFERENCES "Shoe"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserShoe" ADD CONSTRAINT "_UserShoe_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserT_Shirt" ADD CONSTRAINT "_UserT_Shirt_A_fkey" FOREIGN KEY ("A") REFERENCES "T_Shirt"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserT_Shirt" ADD CONSTRAINT "_UserT_Shirt_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTrousers" ADD CONSTRAINT "_UserTrousers_A_fkey" FOREIGN KEY ("A") REFERENCES "Trousers"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserTrousers" ADD CONSTRAINT "_UserTrousers_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserShorts" ADD CONSTRAINT "_UserShorts_A_fkey" FOREIGN KEY ("A") REFERENCES "Shorts"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserShorts" ADD CONSTRAINT "_UserShorts_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHoodies" ADD CONSTRAINT "_UserHoodies_A_fkey" FOREIGN KEY ("A") REFERENCES "Hoodies"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_UserHoodies" ADD CONSTRAINT "_UserHoodies_B_fkey" FOREIGN KEY ("B") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
