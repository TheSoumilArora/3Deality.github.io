import { Printer, Clock, Shield, Zap } from "lucide-react";
import { motion } from "framer-motion";

const services = [
  {
    icon: Printer,
    title: "Precision Printing",
    description: "High-quality 3D printing with industry-leading accuracy and detail.",
  },
  {
    icon: Clock,
    title: "Quick Turnaround",
    description: "Fast prototyping and production to meet your deadlines.",
  },
  {
    icon: Shield,
    title: "Quality Assured",
    description: "Rigorous quality control for every printed component.",
  },
  {
    icon: Zap,
    title: "Rapid Prototyping",
    description: "Quick iteration cycles for your product development needs.",
  },
];

export const Services = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Services</span>
          <h2 className="mt-4 text-4xl font-bold text-gray-900">Expert 3D Printing Solutions</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => (
            <motion.div
              key={service.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="p-6 rounded-xl bg-gray-50 hover:bg-gray-100 transition-colors group"
            >
              <service.icon className="h-12 w-12 text-primary mb-4 group-hover:scale-110 transition-transform" />
              <h3 className="text-xl font-semibold mb-2">{service.title}</h3>
              <p className="text-gray-600">{service.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};