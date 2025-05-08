// src/pages/products/[category]/[slug].tsx
import { useRouter } from "next/router";
import Head from "next/head";
import Link from "next/link";
import { products, Product } from "@/lib/products";

const ProductDetailPage = () => {
  const { category, slug } = useRouter().query;

  // Find the matching product
  const product: Product | undefined = products.find(
    (p) => p.category === category && p.slug === slug
  );

  if (!product) {
    return (
      <main className="px-6 py-12 max-w-4xl mx-auto">
        <p className="text-center text-lg">Product not found.</p>
      </main>
    );
  }

  return (
    <>
      <Head>
        <title>{product.name} – 3Deality</title>
        <meta name="description" content={product.name} />
      </Head>

      <main className="px-6 py-12 max-w-4xl mx-auto space-y-6">
        {/* Back Link */}
        <Link href={`/products/${product.category}`} className="text-primary underline mb-4 inline-block">

        &larr; Back to {product.category.replace(/-/g, " ")}
        
        </Link>

        {/* Content */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="w-full md:w-1/2 h-auto object-cover rounded-lg"
          />

          {/* Details */}
          <div className="md:w-1/2 space-y-4">
            <h1 className="text-2xl font-bold">{product.name}</h1>
            <p className="text-primary text-xl font-semibold">{product.price}</p>
            <p>
              {/* Replace this with a real description from your data */}
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut
              euismod, nisl vel tincidunt facilisis, nunc sapien molestie
              nisi, in dictum purus lacus sit amet eros.
            </p>
            <button
              onClick={() =>
                window.open("https://forms.gle/your-form-link", "_blank")
              }
              className="bg-primary text-white px-6 py-2 rounded-lg"
            >
              Get a Quote
            </button>
          </div>
        </div>
      </main>
    </>
  );
};

export default ProductDetailPage;