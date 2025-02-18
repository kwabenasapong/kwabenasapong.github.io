
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const experiences = [
  {
    title: "Team Lead / Lead Architect",
    company: "MyDevConnect (Reign of Titans)",
    period: "May 2024 - Present",
    description: "Leading the integration of tournament platform, overseeing frontend and backend development.",
  },
  {
    title: "Area Manager - Electrical Engineering Section",
    company: "Volta Aluminium Company Ltd.",
    period: "Jan 2024 - Present",
    description: "Leading dynamic team for success, driving operational excellence and fostering collaborative culture.",
  },
  {
    title: "Manager - Plant Electricals and Power Systems",
    company: "Volta Aluminium Company Ltd.",
    period: "Jan 2019 - Jan 2024",
    description: "Managed plant power systems, electrical teams, and engineering operations.",
  },
  {
    title: "Electrical Engineer",
    company: "Volta Aluminium Company Ltd.",
    period: "Sep 2011 - Jan 2019",
    description: "Provided engineering support for production and maintenance, executed system integration projects.",
  },
];

const Experience = () => {
  return (
    <section id="experience" className="py-20">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-primary mb-8 text-center"
        >
          Professional Experience
        </motion.h2>
        <div className="space-y-6">
          {experiences.map((exp, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6">
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-semibold text-primary">
                      {exp.title}
                    </h3>
                    <p className="text-secondary">{exp.company}</p>
                  </div>
                  <span className="text-muted-foreground text-sm mt-2 md:mt-0">
                    {exp.period}
                  </span>
                </div>
                <p className="text-muted-foreground">{exp.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Experience;
