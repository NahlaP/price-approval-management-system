"use client";

import { useEffect, useState } from "react";

const API_URL = process.env.NEXT_PUBLIC_API_URL;
interface Product {
  name: string;
  modelNo: string;
  currentPrice: number;
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

export default function ApprovalsPage() {
  const [requests, setRequests] = useState<PriceRequest[]>([]);
  const [comment, setComment] = useState("");

  const fetchRequests = async () => {
    const token = localStorage.getItem("token");

    // const res = await fetch("http://localhost:5000/api/price-requests", {
    const res = await fetch(`${API_URL}/api/price-requests/pending`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    const data = await res.json();
    setRequests(data);
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  const approveRequest = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/price-requests/${id}/approve`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchRequests();
  };

  const rejectRequest = async (id: string) => {
    const token = localStorage.getItem("token");

    await fetch(`${API_URL}/api/price-requests/${id}/reject`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        comment: comment || "Rejected by manager",
      }),
    });

    setComment("");
    fetchRequests();
  };

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="bg-white rounded-xl shadow p-6">
        <h1 className="text-2xl font-bold mb-6">Manager Approval Panel</h1>

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

              {req.status === "pending" && (
                <div className="mt-4">
                  <textarea
                    className="w-full border p-3 rounded mb-3"
                    placeholder="Reject comment"
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                  />

                  <div className="flex gap-3">
                    <button
                      onClick={() => approveRequest(req._id)}
                      className="bg-green-600 text-white px-4 py-2 rounded"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => rejectRequest(req._id)}
                      className="bg-red-600 text-white px-4 py-2 rounded"
                    >
                      Reject
                    </button>
                  </div>
                </div>
              )}
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