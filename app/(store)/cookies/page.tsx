import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
      <p className="mb-4">
        This Cookies Policy explains how Vinceville.africa uses cookies and similar technologies to recognize you when you visit our website.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files that are sent by web servers to web browsers and may be sent back to the server each time the browser requests a page. They are used to recognize you, log your visits, provide a secure connection, and enhance your user experience.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Cookies</h2>
      <p className="mb-4">
        Vinceville.africa uses cookies for the following purposes:
      </p>
      <ul className="list-disc pl-6 mb-4">
        <li>
          <strong>Tracking Visited Paintings:</strong> We use cookies to track the paintings you visit on our site, so we can show you the artworks you recently viewed.
        </li>
        <li>
          <strong>Shopping Cart:</strong> Cookies are used to keep track of the artworks you add to your shopping cart, ensuring your cart stays intact while you continue browsing the site.
        </li>
      </ul>

      <p className="mb-4">
        These cookies are essential for providing you with a seamless and personalized experience on Vinceville.africa.
      </p>

      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}