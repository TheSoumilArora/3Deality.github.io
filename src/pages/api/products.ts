// pages/api/products.ts
import type { NextApiRequest, NextApiResponse } from "next";
import { products } from "@/lib/products";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // You can add filtering logic here via req.query.category, etc.
  res.status(200).json(products);
}