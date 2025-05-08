// src/pages/products/[category].tsx
import { useRouter } from "next/router";
import Head from "next/head";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import Link from "next/link";
import { products, Product } from "@/lib/products";

const ProductCategoryPage = () => {
  const router = useRouter();
  const { category } = router.query;

  // Filter our dummy data by the current category (e.g. "plane-kits")
  const filtered: Product[] =
    typeof category === "string"
      ? products.filter((p) => p.category === category)
      : [];

  return (
    <>
      <Head>
        <title>
          {category
            ?.toString()
            .replace(/-/g, " ")
            .replace(/\b\w/g, (c) => c.toUpperCase())}{" "}
          – 3Deality Products
        </title>
        <meta
          name="description"
          content={`Browse ${category} products on 3Deality.`}
        />
      </Head>

      {/* Breadcrumb trail */}
      <Breadcrumbs />
      
      <main className="px-6 py-12 max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold capitalize mb-8">
          {category?.toString().replace(/-/g, " ")}
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filtered.length > 0 ? (
            filtered.map((prod) => (
              <Link
                key={prod.slug}
                href={`/products/${prod.category}/${prod.slug}`}
                className="
                    block
                    border
                    rounded-lg
                    overflow-hidden
                    transform
                    transition-transform
                    duration-200
                    ease-out
                    hover:shadow-xl
                    hover:scale-105
                "
            >
                <img
                  src={prod.image}
                  alt={prod.name}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h2 className="font-semibold text-lg">{prod.name}</h2>
                  <p className="text-primary font-medium mt-2">
                    {prod.price}
                  </p>
                </div>
              </Link>
            ))
          ) : (
            <p>No products found in this category.</p>
          )}
        </div>
      </main>
    </>
  );
};

export default ProductCategoryPage;