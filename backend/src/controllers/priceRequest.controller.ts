import { Response } from "express";
import PriceRequest from "../models/PriceRequest";
import Product from "../models/Product";
import { AuthRequest } from "../middleware/auth.middleware";

// CREATE REQUEST
export const createRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { productId, requestedPrice, quantity, reason } = req.body;

    const product = await Product.findById(productId);
    if (!product) return res.status(404).json({ message: "Product not found" });

    const request = await PriceRequest.create({
      productId,
      executiveId: req.user.id,
      currentPrice: product.currentPrice,
      requestedPrice,
      quantity,
      reason,
    });

    res.status(201).json(request);
  } catch (err) {
    res.status(500).json({ message: "Error creating request" });
  }
};

// GET ALL REQUESTS
// export const getRequests = async (req: AuthRequest, res: Response) => {
//   try {
//     const requests = await PriceRequest.find()
//       .populate("productId")
//       .populate("executiveId", "name email")
//       .populate("approvedBy", "name email")
//       .sort({ createdAt: -1 });

//     res.json(requests);
//   } catch (err) {
//     res.status(500).json({ message: "Error fetching requests" });
//   }
// };

export const getRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await PriceRequest.find()
      .populate("productId")
      .populate("executiveId", "name email")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching requests" });
  }
};

// APPROVE REQUEST
export const approveRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;

    const request = await PriceRequest.findByIdAndUpdate(
      id,
      {
        status: "approved",
        approvedBy: req.user.id,
        approvedAt: new Date(),
      },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Error approving request" });
  }
};

// REJECT REQUEST
export const rejectRequest = async (req: AuthRequest, res: Response) => {
  try {
    const { id } = req.params;
    const { comment } = req.body;

    const request = await PriceRequest.findByIdAndUpdate(
      id,
      {
        status: "rejected",
        managerComment: comment,
        approvedBy: req.user.id,
        approvedAt: new Date(),
      },
      { new: true }
    );

    res.json(request);
  } catch (err) {
    res.status(500).json({ message: "Error rejecting request" });
  }
};


export const getMyRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await PriceRequest.find({ executiveId: req.user.id })
      .populate("productId")
      .populate("approvedBy", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching my requests" });
  }
};
export const getPendingRequests = async (req: AuthRequest, res: Response) => {
  try {
    const requests = await PriceRequest.find({ status: "pending" })
      .populate("productId")
      .populate("executiveId", "name email")
      .sort({ createdAt: -1 });

    res.json(requests);
  } catch (err) {
    res.status(500).json({ message: "Error fetching pending requests" });
  }
};