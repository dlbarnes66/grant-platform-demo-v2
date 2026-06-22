import 'dotenv/config';
import { Queue } from "bullmq";
import { connection } from "../shared/redis.js";

export const grantQueue = new Queue("grantQueue", { connection });
