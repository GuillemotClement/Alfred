import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserFromSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};

export const getUserIdFromSession = async (): Promise<string | null> => {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!session) {
    return null;
  }

  return session.user.id;
};
