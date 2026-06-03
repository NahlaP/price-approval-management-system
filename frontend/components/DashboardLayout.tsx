// "use client";

// import Link from "next/link";
// import { useEffect, useState } from "react";
// import { usePathname, useRouter } from "next/navigation";
// import { isTokenExpired } from "@/lib/auth";
// interface User {
//   name: string;
//   email: string;
//   role: "executive" | "manager" | "admin";
// }

// export default function DashboardLayout({
//   children,
//   title,
// }: {
//   children: React.ReactNode;
//   title: string;
// }) {
//   const router = useRouter();
//   const pathname = usePathname();
//   const [user, setUser] = useState<User | null>(null);

// //   useEffect(() => {
// //     const token = localStorage.getItem("token");
// //     const savedUser = localStorage.getItem("user");

// //     if (!token || !savedUser) {
// //       router.push("/login");
// //       return;
// //     }

// //     setUser(JSON.parse(savedUser));
// //   }, [router]);


// useEffect(() => {
//   const token = localStorage.getItem("token");
//   const savedUser = localStorage.getItem("user");

//   if (!token || !savedUser || isTokenExpired(token)) {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     router.push("/login");
//     return;
//   }

//   setUser(JSON.parse(savedUser));
// }, [router]);

// //   const logout = () => {
// //     localStorage.removeItem("token");
// //     localStorage.removeItem("user");
// //     router.push("/login");
// //   };


// const logout = () => {
//   localStorage.removeItem("token");
//   localStorage.removeItem("user");
//   router.push("/login");
// };
//   const executiveLinks = [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "Products", href: "/products" },
//     { name: "Create Request", href: "/price-requests" },
//     { name: "My Requests", href: "/my-requests" },
//   ];

//   const managerLinks = [
//     { name: "Dashboard", href: "/dashboard" },
//     { name: "Products", href: "/products" },
//     { name: "All Requests", href: "/all-requests" },
//     { name: "Approvals", href: "/approvals" },
//   ];

//   const links =
//     user?.role === "manager" || user?.role === "admin"
//       ? managerLinks
//       : executiveLinks;

//   return (
//     <div className="min-h-screen bg-slate-100 flex">
//       <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
//         <div className="p-6 border-b border-slate-700">
//           <h1 className="text-xl font-bold">Price Approval</h1>
//           <p className="text-xs text-slate-400 mt-1">ERP Workflow System</p>
//         </div>

//         <nav className="flex-1 p-4 space-y-2">
//           {links.map((link) => (
//             <Link
//               key={link.href}
//               href={link.href}
//               className={`block px-4 py-3 rounded-lg text-sm font-medium ${
//                 pathname === link.href
//                   ? "bg-blue-600 text-white"
//                   : "text-slate-300 hover:bg-slate-800"
//               }`}
//             >
//               {link.name}
//             </Link>
//           ))}
//         </nav>

//         <div className="p-4 border-t border-slate-700">
//           <p className="text-sm font-semibold">{user?.name}</p>
//           <p className="text-xs text-slate-400">{user?.role}</p>

//           <button
//             onClick={logout}
//             className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
//           >
//             Logout
//           </button>
//         </div>
//       </aside>

//       <main className="flex-1">
//         <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
//           <div>
//             <h2 className="text-2xl font-bold">{title}</h2>
//             <p className="text-sm text-gray-500">
//               Welcome back, {user?.name}
//             </p>
//           </div>

//           <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
//             {user?.role}
//           </span>
//         </header>

//         <section className="p-6">{children}</section>
//       </main>
//     </div>
//   );
// }


















"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname, useRouter } from "next/navigation";
import { isTokenExpired } from "@/lib/auth";

interface User {
  name: string;
  email: string;
  role: "executive" | "manager" | "admin";
}

export default function DashboardLayout({
  children,
  title,
}: {
  children: React.ReactNode;
  title: string;
}) {
  const router = useRouter();
  const pathname = usePathname();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const savedUser = localStorage.getItem("user");

    if (!token || !savedUser || isTokenExpired(token)) {
      localStorage.removeItem("token");
      localStorage.removeItem("user");
      router.push("/login");
      return;
    }

    setUser(JSON.parse(savedUser));
  }, [router]);

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    router.push("/login");
  };

  const executiveLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/products" },
    { name: "Create Request", href: "/price-requests" },
    { name: "My Requests", href: "/my-requests" },
  ];

  const managerLinks = [
    { name: "Dashboard", href: "/dashboard" },
    { name: "Products", href: "/products" },
    { name: "All Requests", href: "/all-requests" },
    { name: "Approvals", href: "/approvals" },
  ];

  const links =
    user?.role === "manager" || user?.role === "admin"
      ? managerLinks
      : executiveLinks;

  return (
    <div className="min-h-screen bg-slate-100 flex">
      <aside className="w-64 bg-slate-900 text-white hidden md:flex flex-col">
        <div className="p-6 border-b border-slate-700">
          <h1 className="text-xl font-bold">Price Approval</h1>
          <p className="text-xs text-slate-400 mt-1">ERP Workflow System</p>
        </div>

        <nav className="flex-1 p-4 space-y-2">
          {links.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`block px-4 py-3 rounded-lg text-sm font-medium ${
                pathname === link.href
                  ? "bg-blue-600 text-white"
                  : "text-slate-300 hover:bg-slate-800"
              }`}
            >
              {link.name}
            </Link>
          ))}
        </nav>

        <div className="p-4 border-t border-slate-700">
          <p className="text-sm font-semibold">{user?.name}</p>
          <p className="text-xs text-slate-400">{user?.role}</p>

          <button
            onClick={logout}
            className="mt-4 w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded-lg text-sm"
          >
            Logout
          </button>
        </div>
      </aside>

      <main className="flex-1">
        <header className="bg-white border-b px-6 py-4 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">{title}</h2>
            <p className="text-sm text-gray-500">Welcome back, {user?.name}</p>
          </div>

          <span className="px-3 py-1 bg-blue-50 text-blue-700 rounded-full text-sm font-semibold">
            {user?.role}
          </span>
        </header>

        <section className="p-6">{children}</section>
      </main>
    </div>
  );
}