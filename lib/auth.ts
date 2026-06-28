import { auth } from "@clerk/nextjs";

export function getUserId() {
  const { userId } = auth();
  if (!userId) throw new Error("Not authenticated");
  return userId;
}
