import { jobQueue } from "@/worker/queue";

export async function GET(req, { params }) {
  const job = await jobQueue.getJob(params.id);
  if (!job) return Response.json({ error: "Job not found" });

  const state = await job.getState();
  const result = await job.returnvalue;

  return Response.json({
    status: state,
    result: result || null
  });
}
