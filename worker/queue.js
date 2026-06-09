import { Queue } from "bullmq";
import { redis } from "../shared/redis.js";

export const jobQueue = new Queue("grant-jobs", {
  connection: redis
});
