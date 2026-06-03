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




















const [products] = useState<Product[]>([
  {
    _id: "1",
    name: "Dell Latitude 5540",
    modelNo: "DL-5540",
    category: "Laptop",
    currentPrice: 3200,
    stock: 15,
  },
  {
    _id: "2",
    name: "HP ProBook 450",
    modelNo: "HP-450",
    category: "Laptop",
    currentPrice: 2800,
    stock: 10,
  },
  {
    _id: "3",
    name: "Samsung Monitor 24 Inch",
    modelNo: "SM-24",
    category: "Monitor",
    currentPrice: 650,
    stock: 30,
  },
  {
    _id: "4",
    name: "Logitech MX Master 3",
    modelNo: "MX-3",
    category: "Accessories",
    currentPrice: 350,
    stock: 50,
  },
  {
    _id: "5",
    name: "Apple MacBook Pro M3",
    modelNo: "MBP-M3",
    category: "Laptop",
    currentPrice: 7800,
    stock: 8,
  },
  {
    _id: "6",
    name: "Lenovo ThinkPad X1",
    modelNo: "TP-X1",
    category: "Laptop",
    currentPrice: 5200,
    stock: 12,
  },
  {
    _id: "7",
    name: "Canon Laser Printer",
    modelNo: "CN-LP01",
    category: "Printer",
    currentPrice: 950,
    stock: 7,
  },
  {
    _id: "8",
    name: "Cisco Router",
    modelNo: "CS-R100",
    category: "Networking",
    currentPrice: 1200,
    stock: 20,
  },
]);