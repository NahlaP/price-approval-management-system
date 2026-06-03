"use client";

import { useEffect, useState } from "react";

interface Product {
  _id: string;
  name: string;
  modelNo: string;
  category: string;
  currentPrice: number;
  stock: number;
}

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/products", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setProducts(data);
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        <table className="w-full border">
          <thead className="bg-gray-200">
            <tr>
              <th className="p-3 text-left">Name</th>
              <th className="p-3 text-left">Model</th>
              <th className="p-3 text-left">Category</th>
              <th className="p-3 text-left">Price</th>
              <th className="p-3 text-left">Stock</th>
            </tr>
          </thead>

          <tbody>
            {products.map((product) => (
              <tr key={product._id} className="border-t">
                <td className="p-3">{product.name}</td>
                <td className="p-3">{product.modelNo}</td>
                <td className="p-3">{product.category}</td>
                <td className="p-3">AED {product.currentPrice}</td>
                <td className="p-3">{product.stock}</td>
              </tr>
            ))}
          </tbody>
        </table>

        {products.length === 0 && (
          <p className="text-gray-500 mt-4">No products found</p>
        )}
      </div>
    </div>
  );
}