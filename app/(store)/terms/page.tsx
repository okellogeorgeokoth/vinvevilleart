// pages/terms.tsx
import Link from "next/link";

export default function TermsPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Terms and Conditions</h1>
      <p className="mb-4">
        These terms and conditions outline the rules and regulations for the use of Vinceville’s website.
      </p>
      <p className="mb-4">
        By accessing this website, we assume you accept these terms and conditions in full. Do not continue to use Vinceville’s website if you do not accept all of the terms and conditions stated on this page.
      </p>

      <h2 className="text-2xl font-semibold mt-6 mb-4">License</h2>
      <p className="mb-4">
        Unless otherwise stated, Vinceville and/or its licensors own the intellectual property rights for all material on Vinceville. All intellectual property rights are reserved. You may view and/or print pages from vinceville.africa for your own personal use subject to restrictions set in these terms and conditions.
      </p>
      <p className="mb-4">
        You must not:
      </p>
      <ul className="list-disc pl-8 mb-4">
        <li>Republish material from vinceville.africa</li>
        <li>Sell, rent, or sub-license material from vinceville.africa</li>
        <li>Reproduce, duplicate, or copy material from vinceville.africa</li>
        <li>Redistribute content from Vinceville (unless content is specifically made for redistribution)</li>
      </ul>

      <h2 className="text-2xl font-semibold mt-6 mb-4">Selling Art on Vinceville</h2>
      <p className="mb-4">
        To sell art on the online Vinceville store, you agree to the following:
      </p>
      <ul className="list-disc pl-8 mb-4">
        <li>If you sell an original artwork, Vinceville will take a 20% commission and add any PayPal or Stripe fees on the final sale price.</li>
        <li>You will be able to request your payout 7 days after your artwork has been safely delivered to the collector or buyer.</li>
        <li>Artists are responsible for all shipping documents, labels, and packaging of artwork. Collectors are responsible for shipping costs.</li>
        <li>All images submitted are accepted on a case-by-case basis.</li>
        <li>All artwork must be for sale and original art.</li>
      </ul>

      <Link href="/" className="text-blue-500 hover:underline">
        Back to Home!
      </Link>
    </div>
  );
}