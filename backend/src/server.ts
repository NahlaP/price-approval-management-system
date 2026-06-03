import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";



import authRoutes from "./routes/auth.routes";
import productRoutes from "./routes/product.routes";
import priceRequestRoutes from "./routes/priceRequest.routes";

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/price-requests", priceRequestRoutes);

const PORT = process.env.PORT || 5000;

mongoose
  .connect(process.env.MONGO_URI as string)
  .then(() => {
    console.log("MongoDB Connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));