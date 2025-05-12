import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import FileUploader from "@/components/FileUploader";

const UploadModel: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="min-h-screen py-12 bg-gray-50">
        <div className="container px-4 mx-auto">
          <div className="max-w-3xl mx-auto mb-8 text-center">
            <h1 className="mb-4 text-3xl font-bold text-gray-900 md:text-4xl">Upload Your 3D Model</h1>
            <p className="text-lg text-gray-600">
              Get an instant quote for your custom 3D printing project. 
              We support STL, OBJ, STP, STEP, IGS, and IGES file formats.
            </p>
          </div>
          
          <FileUploader />
          
          <div className="max-w-3xl mx-auto mt-16">
            <h2 className="mb-6 text-2xl font-semibold text-gray-900">How It Works</h2>
            
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-full">
                  <span className="text-xl font-semibold text-purple-600">1</span>
                </div>
                <h3 className="mb-2 text-lg font-medium">Upload Your File</h3>
                <p className="text-gray-600">
                  Upload your 3D model file in any supported format. Our system will analyze it automatically.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-full">
                  <span className="text-xl font-semibold text-purple-600">2</span>
                </div>
                <h3 className="mb-2 text-lg font-medium">Choose Settings</h3>
                <p className="text-gray-600">
                  Select your preferred material, quality settings, and other print parameters.
                </p>
              </div>
              
              <div className="p-6 bg-white rounded-lg shadow-sm">
                <div className="flex items-center justify-center w-12 h-12 mb-4 bg-purple-100 rounded-full">
                  <span className="text-xl font-semibold text-purple-600">3</span>
                </div>
                <h3 className="mb-2 text-lg font-medium">Place Order</h3>
                <p className="text-gray-600">
                  Review your quote, add to cart, and proceed to checkout when you're ready.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default UploadModel;