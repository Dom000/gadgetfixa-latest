/*
  Warnings:

  - The `role` column on the `profiles` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "data" JSONB,
DROP COLUMN "role",
ADD COLUMN     "role" JSONB DEFAULT '["user"]';
