"use client";

import { useEffect, useState } from "react";

export default function Home() {

  const [products, setProducts] = useState<any[]>([]);

  async function loadProducts() {

    const res = await fetch(
      "http://localhost:3000/api/products"
    );

    const data = await res.json();

    setProducts(data);
  }

  async function reserve(
    productId: number,
    warehouseId: number
  ) {

    const res = await fetch(
      "http://localhost:3000/api/reservations",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          productId,
          warehouseId,
          quantity: 1,
        }),
      }
    );

    const data = await res.json();

    if (res.ok) {
      alert("Reservation Success");
      loadProducts();
    } else {
      alert(data.error);
    }
  }

  useEffect(() => {
    loadProducts();
  }, []);

  return (
    <div style={{ padding: 20 }}>

      <h1>Inventory System</h1>

      {products.map((item) => (

        <div
          key={item.id}
          style={{
            border: "1px solid gray",
            padding: 10,
            marginBottom: 10,
          }}
        >

          <h2>{item.product.name}</h2>

          <p>
            Warehouse:
            {" "}
            {item.warehouse.name}
          </p>

          <p>
            Available Stock:
            {" "}
            {item.totalStock - item.reservedStock}
          </p>

          <button
            onClick={() =>
              reserve(
                item.productId,
                item.warehouseId
              )
            }
          >
            Reserve
          </button>

        </div>
      ))}
    </div>
  );
}