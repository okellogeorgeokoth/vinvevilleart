import React from 'react';

function AboutUs() {
  return (
    <div className="flex flex-col items-center justify-start min-h-screen bg-gradient-to-br from-gray-50 to-gray-200 p-6">
      <div className="bg-white p-10 rounded-xl shadow-2xl w-full max-w-6xl transform transition-all hover:shadow-3xl">
       <h1 className="text-3xl uppercase font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-pink-600 mb-8 text-center font-serif tracking-wide animate-custom-pulse">
  About Us
</h1>

        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Welcome to <strong className="text-indigo-600">Vinceville</strong>, where art meets passion. We are more than just an online art gallery; 
          we are a movement dedicated to <strong className="text-indigo-600">Connecting Hearts to Art</strong>. Our platform is designed to inspire 
          you to not only admire the beauty of artistic creations but to bring them into your life and share them with the world. 
          At Vinceville, we celebrate contemporary art, support emerging artists, and make it easier for you to discover and own 
          extraordinary pieces that resonate with your soul.
        </p>

        <h2 className="text-xl font-semibold text-gray-700 mt-8 mb-4 font-serif">
          Our Mission
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          At Vinceville, we believe that art has the power to inspire, transform, and elevate every space it touches. 
          Our mission is to bridge the gap between art lovers and extraordinary creations, making art accessible to everyone, 
          everywhere. We strive to create a world where art is not just a luxury but a part of everyday life.
        </p>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 font-serif">
          What We Offer
        </h2>
        <ul className="list-disc list-inside text-lg text-gray-700 mb-6 space-y-2">
          <li><strong>Exclusive Artworks:</strong> Discover contemporary paintings, sculptures, and digital prints from talented artists.</li>
          <li><strong>Support for Artists:</strong> We champion emerging artists by providing them a platform to showcase their unique creations.</li>
          <li><strong>Seamless Experience:</strong> Enjoy a user-friendly online shopping experience with secure transactions.</li>
          <li><strong>Global Reach:</strong> We offer worldwide shipping with expert packaging to ensure your art arrives safely.</li>
          <li><strong>Dedicated Support:</strong> Our team is here to assist you with all your art-related needs.</li>
        </ul>

        <h2 className="text-xl font-semibold text-gray-900 mt-8 mb-4 font-serif">
          Why Choose Vinceville?
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          What sets us apart is our unwavering commitment to quality, authenticity, and customer satisfaction. 
          Whether you&apos;re a seasoned collector or just beginning your art journey, Vinceville is your trusted partner 
          in finding the perfect masterpiece. We curate each piece with care, ensuring it tells a story and adds value 
          to your collection.
        </p>

        <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4 font-serif">
          Join Our Community
        </h2>
        <p className="text-lg text-gray-700 mb-6 leading-relaxed">
          Become a part of the Vinceville family! Explore our ever-growing collection, attend our exclusive exhibitions, 
          and connect with fellow art enthusiasts. Follow us on social media to stay updated on new arrivals, special 
          promotions, and exciting events. Together, let&apos;s celebrate the beauty of art and creativity.
        </p>
      </div>
    </div>
  );
}

export default AboutUs;