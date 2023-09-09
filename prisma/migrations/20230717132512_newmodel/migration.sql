/*
  Warnings:

  - A unique constraint covering the columns `[image]` on the table `Shoe` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `color` to the `Shoe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `image` to the `Shoe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `ownerId` to the `Shoe` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Shoe` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Shoe" ADD COLUMN     "color" TEXT NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "image" TEXT NOT NULL,
ADD COLUMN     "ownerId" INTEGER NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL,
ADD COLUMN     "used" BOOLEAN;

-- CreateIndex
CREATE UNIQUE INDEX "Shoe_image_key" ON "Shoe"("image");

-- AddForeignKey
ALTER TABLE "Shoe" ADD CONSTRAINT "shoe_owner_relation" FOREIGN KEY ("ownerId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Shoe" ADD CONSTRAINT "shoe_account_relation" FOREIGN KEY ("ownerId") REFERENCES "Account"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
