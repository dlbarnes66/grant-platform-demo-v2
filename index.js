import "dotenv/config";
import { Worker, QueueEvents } from "bullmq";
import { connection } from "../shared/redis.js";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();
const queueName = "grantQueue";

// ⭐ Logging helper — saves logs to DB + prints to console
async function log(jobId, message, level = "info", step = null) {
  try {
    await prisma.jobLog.create({
      data: { jobId, message, level, step }
    });
  } catch (err) {
    console.error("Failed to write log:", err);
  }

  console.log(`[${level}] ${message}`);
}

// Listen for queue events
const queueEvents = new QueueEvents(queueName, { connection });

queueEvents.on("completed", ({ jobId }) => {
  console.log(`Job ${jobId} completed`);
});

queueEvents.on("failed", ({ jobId, failedReason }) => {
  console.error(`Job ${jobId} failed: ${failedReason}`);
});

// ⭐ Worker with retry-job + logging + default job handler
const worker = new Worker(
  queueName,
  async (job) => {
    const jobId = job.data.id;

    // ⭐ Handle retry-job
    if (job.name === "retry-job") {
      await log(jobId, "Retrying job", "info", "retry");

      await prisma.job.update({
        where: { id: jobId },
        data: { status: "queued" }
      });

      return { message: "Retry triggered" };
    }

    // ⭐ Default job handler
    await log(jobId, "Job received", "info", "start");

    await prisma.job.update({
      where: { id: jobId },
      data: { status: "processing" }
    });

    await log(jobId, "Status set to processing", "info", "processing");

    // Simulate work
    await log(jobId, "Simulating work...", "info", "work");
    await new Promise((resolve) => setTimeout(resolve, 2000));

    const result = { message: "Job completed successfully" };

    await prisma.job.update({
      where: { id: jobId },
      data: {
        status: "completed",
        result
      }
    });

    await log(jobId, "Job completed successfully", "info", "completed");

    return result;
  },
  { connection }
);

// Keep worker alive on Railway
setInterval(() => {}, 1000);
