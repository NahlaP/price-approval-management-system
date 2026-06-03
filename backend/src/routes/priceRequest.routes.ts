import express from "express";
import {
  createRequest,
  getRequests,
  getMyRequests,
  getPendingRequests,
  approveRequest,
  rejectRequest,
} from "../controllers/priceRequest.controller";
import { protect } from "../middleware/auth.middleware";
import { authorize } from "../middleware/role.middleware";

const router = express.Router();

router.post("/", protect, authorize("executive", "manager"), createRequest);
router.get("/", protect, authorize("manager", "admin"), getRequests);
router.get("/my", protect, authorize("executive", "manager"), getMyRequests);
router.get("/pending", protect, authorize("manager", "admin"), getPendingRequests);
router.patch("/:id/approve", protect, authorize("manager", "admin"), approveRequest);
router.patch("/:id/reject", protect, authorize("manager", "admin"), rejectRequest);

export default router;