import React from "react";
import { Button } from "@/components/ui/button";
import { Link as ScrollLink } from "react-scroll";
import { Link } from "react-router-dom";

const HeroSection: React.FC = () => {
  return (
    <section className="relative bg-gradient-to-r from-purple-900 to-indigo-800 text-white">
      <div className="container px-4 py-20 mx-auto md:py-28">
        <div className="grid items-center grid-cols-1 md:grid-cols-2 gap-12">
          <div>
            <h1 className="mb-6 text-4xl font-bold leading-tight md:text-5xl lg:text-6xl">
              3D Printed <br />
              Innovation for <br />
              Every Need
            </h1>
            <p className="mb-8 text-lg md:text-xl text-gray-200">
              From custom drone parts to detailed miniatures, explore our premium quality 3D printed products. Designed with precision, built to perform.
            </p>
            <div className="flex flex-wrap gap-4">
              <ScrollLink to="categories" smooth={true} duration={500}>
                <Button className="text-base bg-purple-500 hover:bg-purple-600 px-6 py-6">
                  Shop Now
                </Button>
              </ScrollLink>
              <Link to="/upload">
                <Button variant="outline" className="text-base border-white text-white hover:bg-white hover:text-purple-800 px-6 py-6">
                  Custom Order
                </Button>
              </Link>
            </div>
          </div>
          <div className="relative hidden md:block">
            <img 
              src="https://images.unsplash.com/photo-1527977966376-1c8408f9f108?q=80&w=800&auto=format&fit=crop" 
              alt="3D Printed Drone" 
              className="relative z-10 rounded-lg shadow-xl"
            />
            <div className="absolute inset-0 bg-purple-500 rounded-lg transform translate-x-4 translate-y-4 -z-0" />
          </div>
        </div>
      </div>
      <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;