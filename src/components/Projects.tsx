
import { motion } from "framer-motion";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Github } from "lucide-react";

const projects = [
  {
    title: "SMS Alert System",
    description: "VSMSAlert System - An ASP.NET Core MVC application for sending SMS messages with Hubtel Quick SMS API integration.",
    link: "https://github.com/kwabenasapong/VALCOBulkSMSAlertSystem.git",
    tech: ["ASP.NET Core", "MVC", "API Integration"],
  },
  {
    title: "AirBnB Clone",
    description: "A complete Airbnb clone with console interface, developed as part of the ALX SE programme.",
    link: "https://github.com/kwabenasapong/AirBnB_clone_v4.git",
    tech: ["Python", "Flask", "JavaScript"],
  },
  {
    title: "Simple Shell",
    description: "A UNIX command interpreter implementation providing command line interface for OS interaction.",
    link: "https://github.com/kwabenasapong/simple_shell.git",
    tech: ["C", "Unix", "Shell Scripting"],
  },
  {
    title: "Haul Road Scale Upgrade",
    description: "Advanced Automated Weighing and Record Auditing System for modernizing truck weighing processes.",
    link: "https://github.com/koby-deveer/scale_project/tree/connect",
    tech: ["Full Stack", "Database", "UI/UX"],
  },
];

const Projects = () => {
  return (
    <section id="projects" className="py-20 bg-muted">
      <div className="container mx-auto px-4">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="text-3xl font-bold text-primary mb-8 text-center"
        >
          Featured Projects
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {projects.map((project, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
            >
              <Card className="p-6 h-full flex flex-col">
                <h3 className="text-xl font-semibold mb-3">{project.title}</h3>
                <p className="text-muted-foreground mb-4 flex-grow">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((tech, i) => (
                    <span
                      key={i}
                      className="bg-accent/10 text-accent px-3 py-1 rounded-full text-sm"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
                <Button
                  variant="outline"
                  className="w-full"
                  onClick={() => window.open(project.link, "_blank")}
                >
                  <Github className="mr-2 h-4 w-4" />
                  View on GitHub
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;
