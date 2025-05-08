// src/components/Breadcrumbs.tsx
import Link from "next/link";
import { useRouter } from "next/router";

export const Breadcrumbs = () => {
  const { asPath } = useRouter();

  // split path into segments, e.g. "/products/plane-kits/mig-29"
  const segments = asPath
    .split("/")
    .filter((seg) => seg.length > 0);

  // build a crumb for each segment
  const crumbs = segments.map((seg, i) => {
    // reconstruct href up to this segment
    const href = "/" + segments.slice(0, i + 1).join("/");
    // pretty label: turn "plane-kits" → "Plane Kits"
    const label = seg
      .replace(/-/g, " ")
      .replace(/\b\w/g, (c) => c.toUpperCase());
    return { href, label };
  });

  return (
    <nav className="text-sm text-gray-600 mb-4">
      <Link href="/" className="hover:underline">
        Home
      </Link>

      {crumbs.map(({ href, label }) => (
        <span key={href}>
          <span className="mx-2">›</span>
          <Link href={href} className="hover:underline">
            {label}
          </Link>
        </span>
      ))}
    </nav>
  );
};