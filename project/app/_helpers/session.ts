import { auth } from "@/lib/auth";
import { headers } from "next/headers";

export const getUserFromSession = async () => {
  return await auth.api.getSession({
    headers: await headers(),
  });
};
