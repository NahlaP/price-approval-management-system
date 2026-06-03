"use client";

import { useEffect, useState } from "react";


const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Product {
  _id: string;
  name: string;
  modelNo: string;
  currentPrice: number;
  stock: number;
}

export default function PriceRequestsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [productId, setProductId] = useState("");
  const [requestedPrice, setRequestedPrice] = useState("");
  const [quantity, setQuantity] = useState("");
  const [reason, setReason] = useState("");
  const [message, setMessage] = useState("");

  const selectedProduct = products.find((p) => p._id === productId);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/products`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage("");

    const token = localStorage.getItem("token");

    const res = await fetch(`${API_URL}/api/price-requests`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        productId,
        requestedPrice: Number(requestedPrice),
        quantity: Number(quantity),
        reason,
      }),
    });

    const data = await res.json();

    if (!res.ok) {
      setMessage(data.message || "Something went wrong");
      return;
    }

    setMessage("Price request submitted successfully");
    setProductId("");
    setRequestedPrice("");
    setQuantity("");
    setReason("");
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-2xl bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Create Price Request</h1>

        {message && (
          <div className="mb-4 bg-green-100 text-green-700 p-3 rounded">
            {message}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <label className="block mb-2 font-medium">Select Product</label>
          <select
            className="w-full border p-3 rounded mb-4"
            value={productId}
            onChange={(e) => setProductId(e.target.value)}
            required
          >
            <option value="">Choose product</option>
            {products.map((product) => (
              <option key={product._id} value={product._id}>
                {product.name} - {product.modelNo}
              </option>
            ))}
          </select>

          {selectedProduct && (
            <div className="mb-4 bg-blue-50 p-4 rounded">
              <p>Current Price: AED {selectedProduct.currentPrice}</p>
              <p>Stock: {selectedProduct.stock}</p>
            </div>
          )}

          <label className="block mb-2 font-medium">Requested Price</label>
          <input
            type="number"
            className="w-full border p-3 rounded mb-4"
            value={requestedPrice}
            onChange={(e) => setRequestedPrice(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Quantity</label>
          <input
            type="number"
            className="w-full border p-3 rounded mb-4"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />

          <label className="block mb-2 font-medium">Reason</label>
          <textarea
            className="w-full border p-3 rounded mb-6"
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            required
          />

          <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
            Submit Request
          </button>
        </form>
      </div>
    </div>
  );
}