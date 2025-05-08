// src/pages/products/index.tsx
import Head from "next/head";
import Link from "next/link";
import { products } from "@/lib/products";

// derive unique categories
const categories = Array.from(new Set(products.map((p) => p.category)));

// prettier labels
const labels: Record<string, string> = {
  "plane-kits": "Plane Kits",
  "fpv-parts":  "FPV Parts",
  // …add more as you add categories
};

export default function ProductsIndex() {
  return (
    <>
      <Head>
        <title>Products – 3Deality</title>
        <meta name="description" content="Browse all 3Deality product categories." />
      </Head>

      <main className="px-6 py-12 max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold mb-6">Our Product Categories</h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat}
              href={`/products/${cat}`}
              className="
                block
                border
                rounded-lg
                p-6
                transform
                transition-transform
                duration-200
                ease-out
                hover:shadow-xl
                hover:scale-105
              "
            >
              <h2 className="text-xl font-semibold">
                {labels[cat] ?? cat.replace(/-/g, " ")}
              </h2>
              <p className="mt-2 text-gray-600">
                Explore {(labels[cat] ?? cat).toLowerCase()}
              </p>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}