// "use client";

// import { useEffect, useState } from "react";
// const API_URL = process.env.NEXT_PUBLIC_API_URL;

// interface Product {
//   _id: string;
//   name: string;
//   modelNo: string;
//   category: string;
//   currentPrice: number;
//   stock: number;
// }

// export default function ProductsPage() {
//   const [products, setProducts] = useState<Product[]>([]);

//   useEffect(() => {
//     const fetchProducts = async () => {
//       const token = localStorage.getItem("token");

//       const res = await fetch(`${API_URL}/api/products`, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//         },
//       });

//       const data = await res.json();
//       setProducts(data);
//     };

//     fetchProducts();
//   }, []);

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="bg-white rounded-xl shadow p-6">
//         <h1 className="text-2xl font-bold mb-6">Products</h1>

//         <table className="w-full border">
//           <thead className="bg-gray-200">
//             <tr>
//               <th className="p-3 text-left">Name</th>
//               <th className="p-3 text-left">Model</th>
//               <th className="p-3 text-left">Category</th>
//               <th className="p-3 text-left">Price</th>
//               <th className="p-3 text-left">Stock</th>
//             </tr>
//           </thead>

//           <tbody>
//             {products.map((product) => (
//               <tr key={product._id} className="border-t">
//                 <td className="p-3">{product.name}</td>
//                 <td className="p-3">{product.modelNo}</td>
//                 <td className="p-3">{product.category}</td>
//                 <td className="p-3">AED {product.currentPrice}</td>
//                 <td className="p-3">{product.stock}</td>
//               </tr>
//             ))}
//           </tbody>
//         </table>

//         {products.length === 0 && (
//           <p className="text-gray-500 mt-4">No products found</p>
//         )}
//       </div>
//     </div>
//   );
// }
















"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

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
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        console.log("API_URL:", API_URL);

        if (!API_URL) {
          setError("NEXT_PUBLIC_API_URL is missing");
          return;
        }

        const token = localStorage.getItem("token");
        console.log("TOKEN:", token);

        const res = await fetch(`${API_URL}/api/products`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        console.log("PRODUCT DATA:", data);

        if (!res.ok) {
          setError(data.message || "Failed to fetch products");
          return;
        }

        setProducts(Array.isArray(data) ? data : data.products || []);
      } catch (err) {
        console.error(err);
        setError("API request failed. Check backend URL/CORS/token.");
      }
    };

    fetchProducts();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Products</h1>

        {error && <p className="text-red-600 mb-4">{error}</p>}

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

        {products.length === 0 && !error && (
          <p className="text-gray-500 mt-4">No products found</p>
        )}
      </div>
    </div>
  );
}

