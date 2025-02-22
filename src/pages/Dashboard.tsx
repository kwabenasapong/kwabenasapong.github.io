
import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";
import { Button } from "../components/ui/button";
import { FileText, Plus, Home, Users } from "lucide-react";
import OverviewSection from "../components/dashboard/OverviewSection";
import BlogsSection from "../components/dashboard/BlogsSection";
import ProjectsSection from "../components/dashboard/ProjectsSection";
import AboutSection from "../components/dashboard/AboutSection";

export default function Dashboard() {
  const { signOut } = useAuth();
  const [selectedSection, setSelectedSection] = useState<"home" | "blogs" | "projects" | "about">("home");

  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-16">
          <h1 className="text-xl font-semibold">Back Office Dashboard</h1>
          <Button variant="outline" onClick={signOut}>Sign Out</Button>
        </div>
      </header>

      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex space-x-4 mb-6">
          <Button
            variant={selectedSection === "home" ? "default" : "outline"}
            onClick={() => setSelectedSection("home")}
          >
            <Home className="mr-2 h-4 w-4" />
            Overview
          </Button>
          <Button
            variant={selectedSection === "blogs" ? "default" : "outline"}
            onClick={() => setSelectedSection("blogs")}
          >
            <FileText className="mr-2 h-4 w-4" />
            Blogs
          </Button>
          <Button
            variant={selectedSection === "projects" ? "default" : "outline"}
            onClick={() => setSelectedSection("projects")}
          >
            <Plus className="mr-2 h-4 w-4" />
            Projects
          </Button>
          <Button
            variant={selectedSection === "about" ? "default" : "outline"}
            onClick={() => setSelectedSection("about")}
          >
            <Users className="mr-2 h-4 w-4" />
            About
          </Button>
        </div>

        {selectedSection === "home" && <OverviewSection />}
        {selectedSection === "blogs" && <BlogsSection />}
        {selectedSection === "projects" && <ProjectsSection />}
        {selectedSection === "about" && <AboutSection />}
      </main>
    </div>
  );
}
