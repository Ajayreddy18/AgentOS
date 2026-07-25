ALTER TABLE "knowledges" ALTER COLUMN "embedding" SET DATA TYPE vector(1024);--> statement-breakpoint
ALTER TABLE "memories" ADD COLUMN "embedding" vector(1024);