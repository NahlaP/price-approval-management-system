import { Request, Response } from "express";
import Product from "../models/Product";

// CREATE PRODUCT
export const createProduct = async (req: Request, res: Response) => {
  try {
    const { name, modelNo, category, currentPrice, stock } = req.body;

    const product = await Product.create({
      name,
      modelNo,
      category,
      currentPrice,
      stock,
    });

    res.status(201).json(product);
  } catch (err) {
    res.status(500).json({ message: "Error creating product" });
  }
};

// GET ALL PRODUCTS
export const getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.find().sort({ createdAt: -1 });
    res.json(products);
  } catch (err) {
    res.status(500).json({ message: "Error fetching products" });
  }
};

// GET SINGLE PRODUCT
export const getProductById = async (req: Request, res: Response) => {
  try {
    const product = await Product.findById(req.params.id);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.json(product);
  } catch (err) {
    res.status(500).json({ message: "Error fetching product" });
  }
};