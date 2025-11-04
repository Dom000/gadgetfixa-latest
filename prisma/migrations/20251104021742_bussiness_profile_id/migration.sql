/*
  Warnings:

  - Made the column `profileId` on table `businesses` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "public"."businesses" DROP CONSTRAINT "businesses_profileId_fkey";

-- AlterTable
ALTER TABLE "businesses" ALTER COLUMN "profileId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "businesses" ADD CONSTRAINT "businesses_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES "profiles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
