-- AlterTable
ALTER TABLE "profiles" ADD COLUMN     "ban_expires" TIMESTAMP(3),
ADD COLUMN     "ban_reason" TEXT,
ADD COLUMN     "banned" BOOLEAN DEFAULT false,
ADD COLUMN     "image" TEXT,
ADD COLUMN     "role" TEXT DEFAULT 'user';

-- AlterTable
ALTER TABLE "sessions" ADD COLUMN     "impersonated_by" TEXT;
