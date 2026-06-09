export default async function searchGrants({ projectId }) {
  return [
    {
      id: "demo-1",
      title: "Community Development Block Grant",
      funder: "HUD",
      deadline: "2026-08-01",
      amount: "$50,000 - $500,000",
      fitScore: 82,
      eligibility: "Green"
    }
  ];
}
