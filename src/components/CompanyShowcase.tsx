import { motion } from "framer-motion";
import Image from "next/image";
import { Building2, Users, Trophy, Printer } from "lucide-react";

const stats = [
  { icon: Building2, value: "5+", label: "Years Experience" },
  { icon: Users, value: "500+", label: "Happy Clients" },
  { icon: Trophy, value: "98%", label: "Success Rate" },
  { icon: Printer, value: "1000+", label: "Projects Completed" },
];

export const CompanyShowcase = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <span className="text-primary font-medium tracking-wider uppercase text-sm">
              Our Company
            </span>
            <h2 className="mt-4 text-4xl font-bold text-gray-900">
              Excellence in 3D Printing
            </h2>
            <p className="mt-4 text-lg text-gray-600 max-w-2xl mx-auto">
              With years of experience and cutting-edge technology, we deliver exceptional
              3D printing solutions for businesses and individuals.
            </p>
          </motion.div>
        </div>

        {/* Image Gallery */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1488590528505-98d2b5aba04b"
              alt="3D Printing Process"
              width={800}
              height={400}
              className="w-full h-64 object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1518770660439-4636190af475"
              alt="Advanced Technology"
              width={800}
              height={400}
              className="w-full h-64 object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
            className="rounded-2xl overflow-hidden shadow-lg"
          >
            <Image
              src="https://images.unsplash.com/photo-1461749280684-dccba630e2f6"
              alt="Quality Control"
              width={800}
              height={400}
              className="w-full h-64 object-cover hover:scale-105 transition-transform"
            />
          </motion.div>
        </div>

        {/* Company Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className="text-center p-6 rounded-xl bg-gray-50"
            >
              <stat.icon className="w-8 h-8 mx-auto mb-4 text-primary" />
              <div className="text-3xl font-bold text-gray-900 mb-2">{stat.value}</div>
              <div className="text-sm text-gray-600">{stat.label}</div>
            </motion.div>
          ))}
        </div>

        {/* Company Description */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="mt-20 text-center max-w-3xl mx-auto"
        >
          <h3 className="text-2xl font-bold text-gray-900 mb-6">
            Why Choose 3Deality?
          </h3>
          <p className="text-gray-600 leading-relaxed">
            At 3Deality, we combine cutting-edge technology with years of expertise to deliver
            exceptional 3D printing solutions. Our state-of-the-art facilities and dedicated team
            ensure that every project meets the highest standards of quality and precision.
            Whether you&apos;re a startup prototyping your first product or an established business
            needing production-ready parts, we have the capabilities to bring your vision to life.
          </p>
        </motion.div>
      </div>
    </section>
  );
};