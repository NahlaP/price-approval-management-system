"use client";

import { useEffect, useState } from "react";

interface RequestItem {
  _id: string;
  productId: {
    name: string;
    modelNo: string;
  };
  currentPrice: number;
  requestedPrice: number;
  quantity: number;
  reason: string;
  status: "pending" | "approved" | "rejected";
  managerComment?: string;
}

export default function MyRequestsPage() {
  const [requests, setRequests] = useState<RequestItem[]>([]);

  useEffect(() => {
    const fetchMyRequests = async () => {
      const token = localStorage.getItem("token");

      const res = await fetch("http://localhost:5000/api/price-requests/my", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();
      setRequests(data);
    };

    fetchMyRequests();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">My Requests</h1>

        <div className="space-y-4">
          {requests.map((req) => (
            <div key={req._id} className="border rounded-lg p-5">
              <div className="flex justify-between">
                <div>
                  <h2 className="font-semibold text-lg">
                    {req.productId?.name} - {req.productId?.modelNo}
                  </h2>
                  <p>Current Price: AED {req.currentPrice}</p>
                  <p>Requested Price: AED {req.requestedPrice}</p>
                  <p>Quantity: {req.quantity}</p>
                  <p>Reason: {req.reason}</p>

                  {req.managerComment && (
                    <p className="text-red-600 mt-2">
                      Manager Comment: {req.managerComment}
                    </p>
                  )}
                </div>

                <span className="h-fit px-3 py-1 rounded bg-gray-100 font-semibold">
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