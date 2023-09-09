/*
  Warnings:

  - You are about to drop the `chosenItems` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `shoe_owner_relation` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "chosenItems" DROP CONSTRAINT "chosenItems_accountId_fkey";

-- DropForeignKey
ALTER TABLE "chosenItems" DROP CONSTRAINT "chosenItems_shoeId_fkey";

-- DropForeignKey
ALTER TABLE "chosenItems" DROP CONSTRAINT "chosenItems_userId_fkey";

-- DropForeignKey
ALTER TABLE "shoe_owner_relation" DROP CONSTRAINT "shoe_owner_relation";

-- DropTable
DROP TABLE "chosenItems";

-- DropTable
DROP TABLE "shoe_owner_relation";

-- CreateTable
CREATE TABLE "ChosenItem" (
    "id" SERIAL NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" INTEGER,

    CONSTRAINT "ChosenItem_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shoe" (
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
    "chosenItemId" INTEGER,

    CONSTRAINT "Shoe_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "T_Shirt" (
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
    "chosenItemId" INTEGER,

    CONSTRAINT "T_Shirt_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Trousers" (
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
    "chosenItemId" INTEGER,

    CONSTRAINT "Trousers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Shorts" (
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
    "chosenItemId" INTEGER,

    CONSTRAINT "Shorts_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Hoodies" (
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
    "chosenItemId" INTEGER,

    CONSTRAINT "Hoodies_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Shoe_image_key" ON "Shoe"("image");

-- CreateIndex
CREATE UNIQUE INDEX "T_Shirt_image_key" ON "T_Shirt"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Trousers_image_key" ON "Trousers"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Shorts_image_key" ON "Shorts"("image");

-- CreateIndex
CREATE UNIQUE INDEX "Hoodies_image_key" ON "Hoodies"("image");

-- AddForeignKey
ALTER TABLE "ChosenItem" ADD CONSTRAINT "ChosenItem_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shoe" ADD CONSTRAINT "Shoe_chosenItemId_fkey" FOREIGN KEY ("chosenItemId") REFERENCES "ChosenItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "T_Shirt" ADD CONSTRAINT "T_Shirt_chosenItemId_fkey" FOREIGN KEY ("chosenItemId") REFERENCES "ChosenItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Trousers" ADD CONSTRAINT "Trousers_chosenItemId_fkey" FOREIGN KEY ("chosenItemId") REFERENCES "ChosenItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shorts" ADD CONSTRAINT "Shorts_chosenItemId_fkey" FOREIGN KEY ("chosenItemId") REFERENCES "ChosenItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Hoodies" ADD CONSTRAINT "Hoodies_chosenItemId_fkey" FOREIGN KEY ("chosenItemId") REFERENCES "ChosenItem"("id") ON DELETE SET NULL ON UPDATE CASCADE;
