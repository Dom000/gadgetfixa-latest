/*
  Warnings:

  - You are about to drop the column `subject` on the `inboxes` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `inboxes` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[participant1_id,participant2_id]` on the table `inboxes` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `participant1_id` to the `inboxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `participant2_id` to the `inboxes` table without a default value. This is not possible if the table is not empty.
  - Added the required column `inbox_id` to the `messages` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "public"."inboxes" DROP CONSTRAINT "inboxes_user_id_fkey";

-- AlterTable
ALTER TABLE "inboxes" DROP COLUMN "subject",
DROP COLUMN "user_id",
ADD COLUMN     "participant1_id" TEXT NOT NULL,
ADD COLUMN     "participant2_id" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "messages" ADD COLUMN     "inbox_id" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "inboxes_participant1_id_participant2_id_key" ON "inboxes"("participant1_id", "participant2_id");

-- AddForeignKey
ALTER TABLE "messages" ADD CONSTRAINT "messages_inbox_id_fkey" FOREIGN KEY ("inbox_id") REFERENCES "inboxes"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_participant1_id_fkey" FOREIGN KEY ("participant1_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "inboxes" ADD CONSTRAINT "inboxes_participant2_id_fkey" FOREIGN KEY ("participant2_id") REFERENCES "profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;
