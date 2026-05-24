"use client";

import { useEffect, useState } from "react";

export default function Home() {
  const [data, setData] = useState<any[]>([]);

  async function loadProducts() {
    const res = await fetch("/api/products");
    const products = await res.json();
    setData(products);
  }

  useEffect(() => {
    loadProducts();
  }, []);

  async function reserve(productId: number, warehouseId: number) {
    await fetch("/api/reservations", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        productId,
        warehouseId,
        quantity: 1,
      }),
    });

    alert("Reservation Success");

    loadProducts();
  }

  return (
    <div style={{ padding: "20px" }}>
      <h1 style={{ fontSize: "32px", marginBottom: "20px" }}>
        Inventory System
      </h1>

      {data.map((item) => (
        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: "20px",
            marginBottom: "20px",
            borderRadius: "10px",
          }}
        >
          <h2>{item.product.name}</h2>

          <p>Warehouse: {item.warehouse.name}</p>

          <p>
            Available Stock: {item.totalStock - item.reservedStock}
          </p>

          <button
            style={{
              background: "black",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              cursor: "pointer",
            }}
            onClick={() =>
              reserve(item.productId, item.warehouseId)
            }
          >
            Reserve
          </button>
        </div>
      ))}
    </div>
  );
}