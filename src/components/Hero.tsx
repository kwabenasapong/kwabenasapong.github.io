
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { ChevronDown } from "lucide-react";

const Hero = () => {
  return (
    <section className="min-h-screen flex items-center justify-center relative">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <img
          src="/lovable-uploads/24f38886-d7d5-41c4-9eff-af14123bf225.png"
          alt="City Background"
          className="w-full h-full object-cover opacity-50"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-[#1A1F2C]/80 to-[#1A1F2C]/95" />
      </div>

      <div className="container mx-auto grid md:grid-cols-2 gap-8 items-center relative z-10 px-4">
        <div className="text-left order-2 md:order-1">
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl md:text-6xl font-bold text-white mb-6"
          >
            Kwabena Sapong
          </motion.h1>
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-secondary mb-8"
          >
            Electrical Engineer | Full Stack Software Engineer
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="text-white/70 max-w-2xl mb-12 text-lg"
          >
            Passionate engineer with expertise in full-stack development, electrical
            engineering, and team leadership. Building innovative solutions that make
            a difference.
          </motion.p>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="space-x-4"
          >
            <Button
              size="lg"
              className="bg-[#1A1F2C] hover:bg-[#1A1F2C]/90 text-white"
              onClick={() => document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" })}
            >
              View Projects
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="bg-[#1A1F2C] text-white hover:bg-[#1A1F2C]/90 border-white/20"
              onClick={() => document.getElementById("contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
          </motion.div>
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="order-1 md:order-2 flex justify-center md:justify-end"
        >
          <div className="relative w-72 h-72 md:w-96 md:h-96">
            <div className="absolute inset-0 bg-secondary/20 rounded-full -z-10 translate-x-2 translate-y-2"></div>
            <img
              src="/lovable-uploads/4070a1cc-c64c-418d-91a4-a0c7c11c5770.png"
              alt="Profile"
              className="rounded-full w-full h-full object-cover border-4 border-primary/20 shadow-2xl"
            />
          </div>
        </motion.div>
      </div>

      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <ChevronDown className="text-primary" size={32} />
      </div>
    </section>
  );
};

export default Hero;
