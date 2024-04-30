import prisma from "@/lib/prisma";
// import { Product } from "@/types/product";
import { requestMiddleware } from "@/middlewares/requestMiddleware";
import { Product } from "@prisma/client";

export const GET = requestMiddleware(async () => {
  return await prisma.product.findMany({
    orderBy: { name: "asc" },
    include: { productType: true },
  });
});

export const POST = requestMiddleware(async ({ data }: { data: Product }) => {
  return await prisma.product.create({
    data,
    include: { productType: true },
  });
});
