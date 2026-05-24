import { prisma } from "@/lib/prisma";

export async function GET() {

  const products = await prisma.inventory.findMany({
    include: {
      product: true,
      warehouse: true,
    },
  });

  return Response.json(products);
}