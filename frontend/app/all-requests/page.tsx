"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Product {
  name: string;
  modelNo: string;
}

interface Executive {
  name: string;
  email: string;
}

interface PriceRequest {
  _id: string;
  productId: Product;
  executiveId: Executive;
  currentPrice: number;
  requestedPrice: number;
  quantity: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  managerComment?: string;
}

export default function AllRequestsPage() {
  const [requests, setRequests] = useState<PriceRequest[]>([]);

  useEffect(() => {
    const fetchRequests = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch(`${API_URL}/api/price-requests`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRequests(data);
    };

    fetchRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">All Requests</h1>

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="border rounded-lg p-5">
              <div className="flex justify-between gap-4">
                <div>
                  <h2 className="text-lg font-semibold">
                    {req.productId?.name} - {req.productId?.modelNo}
                  </h2>

                  <p className="text-sm text-gray-600">
                    Executive: {req.executiveId?.name} ({req.executiveId?.email})
                  </p>

                  <p className="mt-2">
                    Current Price: <b>AED {req.currentPrice}</b>
                  </p>

                  <p>
                    Requested Price: <b>AED {req.requestedPrice}</b>
                  </p>

                  <p>Quantity: {req.quantity}</p>
                  <p>Reason: {req.reason}</p>

                  {req.managerComment && (
                    <p className="mt-2 text-red-600">
                      Manager Comment: {req.managerComment}
                    </p>
                  )}
                </div>

                <span
                  className={`h-fit px-3 py-1 rounded text-sm font-semibold ${
                    req.status === "approved"
                      ? "bg-green-100 text-green-700"
                      : req.status === "rejected"
                      ? "bg-red-100 text-red-700"
                      : "bg-yellow-100 text-yellow-700"
                  }`}
                >
                  {req.status}
                </span>
              </div>
            </div>
          ))}
        </div>

        {requests.length === 0 && (
          <p className="text-gray-500">No requests found</p>
        )}
      </div>
    </div>
  );
}



