
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";

const experiences = [
  {
    title: "Implementation & Architecture / Talent & Culture Manager",
    company: "MyDevConnect Ltd. / PCXPay",
    period: "May 2025 - Present",
    description: "Architect and implement process improvements for web and software projects. Lead technical recruitment, onboarding, and skills assessment. Develop documentation and champion remote work best practices.",
  },
  {
    title: "Area Manager, Docks, Engineering & Maintenance Department",
    company: "Volta Aluminium Company Ltd. (VALCO)",
    period: "Jan 2024 - Present",
    description: "Deputise for department director, oversee engineering teams. Manage process improvement, technical troubleshooting, and incident response for complex systems.",
  },
  {
    title: "CEO & Lead Consultant",
    company: "Sapong Engineering",
    period: "2024 - Present",
    description: "Provide consulting services in software, electrical, and automation engineering. Deliver high-impact client solutions from software implementation to technical training.",
  },
  {
    title: "Team Lead, QA and System Architect",
    company: "MyDevConnect Ltd.",
    period: "May 2024 - April 2025",
    description: "Oversaw integration and quality of Reign of Titans tournament platform. Coordinated frontend and backend teams, facilitated user acceptance testing.",
  },
  {
    title: "Plant Electricals & Power Systems Manager",
    company: "Volta Aluminium Company Ltd.",
    period: "2019 - 2024",
    description: "Managed plant power systems, electrical teams, and engineering operations with focus on safety and regulatory compliance.",
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
