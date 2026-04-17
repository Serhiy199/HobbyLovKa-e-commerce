import { UserRole } from "@prisma/client";

import { auth } from "./auth";

export async function requireAuth() {
  const session = await auth();
  if (!session?.user) {
    throw new Error("UNAUTHORIZED");
  }

  return session;
}

export async function requireAdmin() {
  const session = await requireAuth();
  if (session.user.role !== UserRole.ADMIN) {
    throw new Error("FORBIDDEN");
  }

  return session;
}
