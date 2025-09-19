
import Navigation from "@/components/Navigation";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      <div className="container mx-auto px-4 pt-24">
        <h1 className="text-4xl font-bold mb-8">About Me</h1>
        
        <div className="prose prose-lg max-w-none">
          <h2 className="text-2xl font-semibold mb-6">Professional Summary</h2>
          <p className="mb-6">
            Resourceful and user-obsessed technical professional with 10+ years of experience bridging software engineering, customer enablement, and electrical systems. Skilled at troubleshooting modern web stacks, distilling complex concepts into clear documentation, and leading high-performance technical teams.
          </p>
          
          <h3 className="text-xl font-semibold mb-4">Key Expertise</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div>
              <h4 className="font-semibold mb-2">Frontend Development</h4>
              <p className="text-sm text-muted-foreground">React, Vite, HTML, CSS, JS/TS, Tailwind</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Backend & Integration</h4>
              <p className="text-sm text-muted-foreground">Node.js, Python, REST APIs, SQL/NoSQL, C# .NET</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Customer Success</h4>
              <p className="text-sm text-muted-foreground">Developer enablement, technical documentation, user support</p>
            </div>
            <div>
              <h4 className="font-semibold mb-2">Leadership & Process</h4>
              <p className="text-sm text-muted-foreground">Team building, remote collaboration, technical education</p>
            </div>
          </div>

          <h3 className="text-xl font-semibold mb-4">Education & Certifications</h3>
          <div className="space-y-3 mb-6">
            <div>
              <p className="font-semibold">MSc Strategic Management and Leadership</p>
              <p className="text-sm text-muted-foreground">Kwame Nkrumah University of Science and Technology (2025 - Ongoing)</p>
            </div>
            <div>
              <p className="font-semibold">Software Engineering, Full-Stack Development</p>
              <p className="text-sm text-muted-foreground">ALX Africa / Holberton School (2022-2023)</p>
            </div>
            <div>
              <p className="font-semibold">BSc Electrical and Electronics Engineering</p>
              <p className="text-sm text-muted-foreground">University of Mines and Technology, Tarkwa (2007-2011)</p>
            </div>
          </div>

          <p className="mb-4">
            Currently serving as Implementation & Architecture / Talent & Culture Manager at MyDevConnect Ltd. / PCXPay, where I architect process improvements for web projects and lead technical recruitment. I'm also the CEO of Sapong Engineering, providing consulting services in software, electrical, and automation engineering.
          </p>
          
          <p className="mb-4">
            My passion lies in empowering others through exceptional customer experiences, building scalable support processes, and fostering technical communities. I believe in transparent communication, continuous learning, and creating solutions that make a real difference.
          </p>
        </div>
      </div>
    </div>
  );
}
