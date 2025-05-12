import React from "react";
import Navbar from "@/components/Navbar";
import HeroSection from "@/components/HeroSection";
import CategorySection from "@/components/CategorySection";
import FeaturedProducts from "@/components/FeaturedProducts";
import Footer from "@/components/Footer";
import GoogleReviews from "@/components/GoogleReviews";
import { CartProvider } from "@/contexts/CartContext";

const Index: React.FC = () => {
  return (
    <CartProvider>
      <div className="flex flex-col min-h-screen">
        <Navbar />
        <main className="flex-grow">
          <HeroSection />
          
          <section className="py-16 bg-white">
            <div className="container px-4 mx-auto text-center">
              <h2 className="mb-4 text-3xl font-bold text-gray-900">How It Works</h2>
              <p className="mx-auto mb-12 text-lg text-gray-600 max-w-2xl">
                Get your custom 3D printed products in just a few simple steps
              </p>
              
              <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">1. Upload Your Design</h3>
                  <p className="text-gray-600">
                    Upload your 3D model file in STL, OBJ, STEP or other supported formats.
                  </p>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">2. Customize Your Print</h3>
                  <p className="text-gray-600">
                    Select materials, quality settings, colors and other parameters for your 3D print.
                  </p>
                </div>
                
                <div className="p-6 bg-gray-50 rounded-lg">
                  <div className="flex items-center justify-center w-16 h-16 mx-auto mb-4 bg-purple-100 rounded-full">
                    <svg xmlns="http://www.w3.org/2000/svg" className="w-8 h-8 text-purple-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
                    </svg>
                  </div>
                  <h3 className="mb-2 text-xl font-semibold">3. Receive Your Print</h3>
                  <p className="text-gray-600">
                    We'll print your design and ship it directly to your doorstep with care.
                  </p>
                </div>
              </div>
            </div>
          </section>
          
          <CategorySection />
          <FeaturedProducts />
          
          <section className="py-16 bg-white">
            <div className="container px-4 mx-auto">
              <h2 className="mb-4 text-3xl font-bold text-center text-gray-900">What Our Customers Say</h2>
              <GoogleReviews />
            </div>
          </section>
        </main>
        <Footer />
      </div>
    </CartProvider>
  );
};

export default Index;