export default async function analyzeRfp({ rfpUrl }) {
  return {
    sections: ["Project Narrative", "Budget", "Outcomes"],
    riskScore: 12,
    complexity: "Medium"
  };
}
