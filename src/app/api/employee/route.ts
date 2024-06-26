import prisma from "@/lib/prisma";
import { UserRole } from "@/app/enum";
import { User } from "@prisma/client";
import { requestMiddleware } from "@/middlewares/requestMiddleware";

const ALLOW_ROLES_EMPLOYEE = [UserRole.cashier_rest, UserRole.waiter_rest, UserRole.bartender_rest];

export const GET = requestMiddleware(async () => {
  return await prisma.user.findMany({ where: { AND: [{ role: { in: ALLOW_ROLES_EMPLOYEE } }] } });
});

export const POST = requestMiddleware(async ({ data }: { data: User }) => {
  if (ALLOW_ROLES_EMPLOYEE.includes(data.role as UserRole)) {
    return await prisma.user.create({ data });
  } else {
    throw new Error("UserRole must be cashier, waiter or bartender");
  }
});
