
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";


export const Hero = () => {
  const router = useRouter();
  return (
    <div className="relative min-h-[80vh] flex items-center justify-center overflow-hidden bg-gradient-to-b from-white to-gray-50">
      <div className="container px-4 mx-auto relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="text-center max-w-4xl mx-auto"
        >
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Welcome to 3Deality</span>
          <h1 className="mt-4 text-5xl md:text-6xl font-bold text-gray-900 leading-tight">
            Transform Your Ideas Into Reality
          </h1>
          <p className="mt-6 text-xl text-gray-600 leading-relaxed">
            Professional 3D printing services for prototyping and production.
            Bringing your designs to life with precision and quality.
          </p>
          <div className="mt-10 flex items-center justify-center gap-4">
          <Button
            size="lg"
            className="group"
            onClick={() => window.open('https://forms.gle/6XNEZpBWvx6TdJr8A', '_blank')}
          >
            Get a Quote
            <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
          </Button>
          </div>
        </motion.div>
      </div>
    </div>
  );
};
