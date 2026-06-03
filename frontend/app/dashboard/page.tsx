





// "use client";

// import { useEffect, useState } from "react";
// import Link from "next/link";

// interface User {
//   name: string;
//   email: string;
//   role: "executive" | "manager" | "admin";
// }

// export default function DashboardPage() {
//   const [user, setUser] = useState<User | null>(null);

//   useEffect(() => {
//     const savedUser = localStorage.getItem("user");
//     if (savedUser) setUser(JSON.parse(savedUser));
//   }, []);

//   const logout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     window.location.href = "/login";
//   };

//   return (
//     <div className="min-h-screen bg-gray-100 p-8">
//       <div className="bg-white rounded-xl shadow p-6">
//         <div className="flex justify-between items-center">
//           <div>
//             <h1 className="text-2xl font-bold">Dashboard</h1>
//             <p className="mt-2 text-gray-600">Welcome {user?.name}</p>
//             <p className="text-sm text-gray-500">Role: {user?.role}</p>
//           </div>

//           <button
//             onClick={logout}
//             className="bg-red-600 text-white px-4 py-2 rounded"
//           >
//             Logout
//           </button>
//         </div>

//         {user?.role === "executive" && (
//           <>
//             <h2 className="text-xl font-bold mt-8 mb-4">Executive Menu</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Link href="/products" className="p-5 bg-blue-50 rounded-lg block">
//                 <h2 className="font-semibold">Products</h2>
//                 <p className="text-sm text-gray-600">View product price list</p>
//               </Link>

//               <Link href="/price-requests" className="p-5 bg-yellow-50 rounded-lg block">
//                 <h2 className="font-semibold">Create Price Request</h2>
//                 <p className="text-sm text-gray-600">Request discount approval</p>
//               </Link>

//               <Link href="/my-requests" className="p-5 bg-purple-50 rounded-lg block">
//                 <h2 className="font-semibold">My Requests</h2>
//                 <p className="text-sm text-gray-600">Track your request status</p>
//               </Link>
//             </div>
//           </>
//         )}

//         {(user?.role === "manager" || user?.role === "admin") && (
//           <>
//             <h2 className="text-xl font-bold mt-8 mb-4">Manager Menu</h2>

//             <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
//               <Link href="/products" className="p-5 bg-blue-50 rounded-lg block">
//                 <h2 className="font-semibold">Products</h2>
//                 <p className="text-sm text-gray-600">View product price list</p>
//               </Link>

//               <Link href="/all-requests" className="p-5 bg-yellow-50 rounded-lg block">
//                 <h2 className="font-semibold">All Requests</h2>
//                 <p className="text-sm text-gray-600">View all discount requests</p>
//               </Link>

//               <Link href="/approvals" className="p-5 bg-green-50 rounded-lg block">
//                 <h2 className="font-semibold">Approvals</h2>
//                 <p className="text-sm text-gray-600">Approve or reject requests</p>
//               </Link>
//             </div>
//           </>
//         )}
//       </div>
//     </div>
//   );
// }

















"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import DashboardLayout from "@/components/DashboardLayout";

interface User {
  name: string;
  role: "executive" | "manager" | "admin";
}

export default function DashboardPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("user");
    if (savedUser) setUser(JSON.parse(savedUser));
  }, []);

  return (
    <DashboardLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-500">Logged in as</p>
          <h3 className="text-2xl font-bold mt-2">{user?.role}</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-500">Workflow</p>
          <h3 className="text-2xl font-bold mt-2">Price Approval</h3>
        </div>

        <div className="bg-white p-6 rounded-2xl shadow-sm border">
          <p className="text-sm text-gray-500">Status</p>
          <h3 className="text-2xl font-bold mt-2 text-green-600">Active</h3>
        </div>
      </div>

      {user?.role === "executive" && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
            <h3 className="font-bold text-lg">Products</h3>
            <p className="text-gray-500 mt-2">View product price list</p>
          </Link>

          <Link href="/price-requests" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
            <h3 className="font-bold text-lg">Create Price Request</h3>
            <p className="text-gray-500 mt-2">Submit discount request</p>
          </Link>

          <Link href="/my-requests" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
            <h3 className="font-bold text-lg">My Requests</h3>
            <p className="text-gray-500 mt-2">Track request status</p>
          </Link>
        </div>
      )}

      {(user?.role === "manager" || user?.role === "admin") && (
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-6">
          <Link href="/products" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
            <h3 className="font-bold text-lg">Products</h3>
            <p className="text-gray-500 mt-2">View product list</p>
          </Link>

          <Link href="/all-requests" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
            <h3 className="font-bold text-lg">All Requests</h3>
            <p className="text-gray-500 mt-2">View full request history</p>
          </Link>

          <Link href="/approvals" className="bg-white p-6 rounded-2xl shadow-sm border hover:shadow-md">
            <h3 className="font-bold text-lg">Approvals</h3>
            <p className="text-gray-500 mt-2">Approve or reject requests</p>
          </Link>
        </div>
      )}
    </DashboardLayout>
  );
}