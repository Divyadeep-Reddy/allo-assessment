import { prisma } from "@/lib/prisma";

export async function POST(req: Request) {

  const body = await req.json();

  const { productId, warehouseId, quantity } = body;

  try {

    const result = await prisma.$transaction(async (tx) => {

      const inventory = await tx.inventory.findFirst({
        where: {
          productId,
          warehouseId,
        },
      });

      if (!inventory) {
        throw new Error("Inventory not found");
      }

      const available =
        inventory.totalStock - inventory.reservedStock;

      if (available < quantity) {
        throw new Error("Not enough stock");
      }

      await tx.inventory.update({
        where: {
          id: inventory.id,
        },
        data: {
          reservedStock: {
            increment: quantity,
          },
        },
      });

      const reservation = await tx.reservation.create({
        data: {
          productId,
          warehouseId,
          quantity,
          status: "pending",
          expiresAt: new Date(
            Date.now() + 10 * 60 * 1000
          ),
        },
      });

      return reservation;
    });

    return Response.json(result);

  } catch (error) {

    return new Response(
      JSON.stringify({
        error: String(error),
      }),
      {
        status: 409,
      }
    );
  }
}