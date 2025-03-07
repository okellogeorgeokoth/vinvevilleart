// pages/terms.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        By using our website, you agree to these terms and conditions. Please read them carefully.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">Acceptance of Terms</h2>
      <p className="mb-4">
        Your access to and use of our services is conditioned on your acceptance of these terms.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">User Responsibilities</h2>
      <p className="mb-4">
        You agree to use our services responsibly and not to engage in any illegal or harmful activities.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}