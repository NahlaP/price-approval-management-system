// "use client";

// import { useState } from "react";
// import { useRouter } from "next/navigation";

// export default function LoginPage() {
//   const router = useRouter();

//   const [email, setEmail] = useState("nahla@gmail.com");
//   const [password, setPassword] = useState("123456");
//   const [error, setError] = useState("");

//   const handleLogin = async (e: React.FormEvent) => {
//     e.preventDefault();
//     setError("");

//     const res = await fetch("http://localhost:5000/api/auth/login", {
//       method: "POST",
//       headers: {
//         "Content-Type": "application/json",
//       },
//       body: JSON.stringify({ email, password }),
//     });

//     const data = await res.json();

//     if (!res.ok) {
//       setError(data.message || "Login failed");
//       return;
//     }

//     localStorage.setItem("token", data.token);
//     localStorage.setItem("user", JSON.stringify(data.user));

//     router.push("/dashboard");
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
//       <form
//         onSubmit={handleLogin}
//         className="w-full max-w-md bg-white p-8 rounded-xl shadow"
//       >
//         <h1 className="text-2xl font-bold mb-2">Price Approval Login</h1>
//         <p className="text-gray-500 mb-6">Login to continue</p>

//         {error && (
//           <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
//             {error}
//           </div>
//         )}

//         <label className="block mb-2 font-medium">Email</label>
//         <input
//           className="w-full border p-3 rounded mb-4"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//         />

//         <label className="block mb-2 font-medium">Password</label>
//         <input
//           className="w-full border p-3 rounded mb-6"
//           type="password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//         />

//         <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
//           Login
//         </button>
//       </form>
//     </div>
//   );
// }





















"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("nahla@gmail.com");
  const [password, setPassword] = useState("123456");
  const [error, setError] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      setError(data.message || "Login failed");
      return;
    }

    localStorage.setItem("token", data.token);
    localStorage.setItem("user", JSON.stringify(data.user));

    router.push("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <form
        onSubmit={handleLogin}
        className="w-full max-w-md bg-white p-8 rounded-xl shadow"
      >
        <h1 className="text-2xl font-bold mb-2">Price Approval Login</h1>
        <p className="text-gray-500 mb-6">Login to continue</p>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded">
            {error}
          </div>
        )}

        <label className="block mb-2 font-medium">Email</label>
        <input
          className="w-full border p-3 rounded mb-4"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <label className="block mb-2 font-medium">Password</label>
        <input
          className="w-full border p-3 rounded mb-6"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <button className="w-full bg-blue-600 text-white p-3 rounded font-semibold">
          Login
        </button>

        {/* 👇 REGISTER LINK ADDED */}
        <p className="mt-4 text-sm text-center">
          Don’t have an account?{" "}
          <Link href="/register" className="text-blue-600 font-semibold hover:underline">
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}