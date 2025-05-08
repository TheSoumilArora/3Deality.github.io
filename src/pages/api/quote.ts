// pages/api/quote.ts
import type { NextApiRequest, NextApiResponse } from "next";

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).end(); // Method Not Allowed
  }

  const { name, email, productSlug, details } = req.body;

  // TODO: persist to a database or send an email
  console.log("New quote request:", req.body);

  return res.status(200).json({ success: true, message: "Quote received!" });
}