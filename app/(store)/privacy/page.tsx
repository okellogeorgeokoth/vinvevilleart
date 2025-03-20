// pages/privacy.tsx
import Link from "next/link";

export default function PrivacyPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Privacy Policy</h1>
      <p className="mb-4">
        Vinceville.africa values your privacy; we therefore follow a strict privacy policy. All information supplied by the customers is used solely by Vinceville.africa for communication and promotion purposes.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Information We Collect</h2>
      <p className="mb-4">
        We use the information you provide when placing an order only to ship the product and to confirm delivery. We do not share this information with outside parties.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Commitment to Data Security</h2>
      <p className="mb-4">
        All orders placed on this site are processed via PayPal. PayPal uses SSL technology to keep your information safe. When you send a payment using PayPal, the recipient does not receive sensitive financial information like your credit card or bank account number. We only receive your shipping address.
      </p>

      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}