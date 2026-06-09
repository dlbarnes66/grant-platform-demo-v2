import { Worker } from "bullmq";
import { redis } from "../shared/redis.js";
import searchGrants from "./jobs/searchGrants.js";
import analyzeRfp from "./jobs/analyzeRfp.js";
import generateDraft from "./jobs/generateDraft.js";
import dueDiligence from "./jobs/dueDiligence.js";

const processor = async (job) => {
  switch (job.name) {
    case "search_grants":
      return await searchGrants(job.data);
    case "analyze_rfp":
      return await analyzeRfp(job.data);
    case "generate_draft":
      return await generateDraft(job.data);
    case "due_diligence":
      return await dueDiligence(job.data);
    default:
      throw new Error("Unknown job type");
  }
};

new Worker("grant-jobs", processor, { connection: redis });

console.log("Worker running...");
