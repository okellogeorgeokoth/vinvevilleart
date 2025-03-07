// pages/cookies.tsx
import Link from "next/link";

export default function CookiesPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Cookies Policy</h1>
      <p className="mb-4">
        This Cookies Policy explains how we use cookies and similar technologies to recognize you when you visit our website.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">What Are Cookies?</h2>
      <p className="mb-4">
        Cookies are small text files that are stored on your device when you visit a website. They help us improve your experience.
      </p>
      <h2 className="text-2xl font-semibold mt-6 mb-4">How We Use Cookies</h2>
      <p className="mb-4">
        We use cookies to analyze traffic, personalize content, and improve our services.
      </p>
      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home
      </Link>
    </div>
  );
}