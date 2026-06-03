import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-xl bg-white rounded-2xl shadow p-8 text-center">
        <h1 className="text-3xl font-bold mb-3">
          Price Approval Management System
        </h1>

        <p className="text-gray-600 mb-8">
          ERP-style workflow system for sales executives and managers to manage
          customer price change requests.
        </p>

        <div className="flex gap-4 justify-center">
          <Link
            href="/login"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg font-semibold"
          >
            Login
          </Link>

          <Link
            href="/register"
            className="border border-blue-600 text-blue-600 px-6 py-3 rounded-lg font-semibold"
          >
            Register
          </Link>
        </div>
      </div>
    </main>
  );
}