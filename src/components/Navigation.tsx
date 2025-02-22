
import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "./ui/button";
import { Menu, X, LogIn, LogOut } from "lucide-react";
import { useAuth } from "../contexts/AuthContext";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

const Navigation = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user, signOut } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { href: "/about", label: "About", isHash: false },
    { href: "#projects", label: "Projects", isHash: true },
    { href: "#experience", label: "Experience", isHash: true },
    { href: "#skills", label: "Skills", isHash: true },
    { href: "#contact", label: "Contact", isHash: true },
  ];

  // Only show hash links on home page
  const currentLinks = location.pathname === "/" ? navLinks : navLinks.filter(link => !link.isHash);

  const handleSignOut = async () => {
    try {
      await signOut();
      setIsMenuOpen(false); // Close mobile menu after signing out
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <nav
      className={`fixed w-full z-50 transition-all duration-300 ${
        isScrolled 
          ? "bg-[#1A1F2C] text-white shadow-md" 
          : "bg-[#1A1F2C]/95 text-white backdrop-blur-md"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <Link to="/" className="text-xl font-bold text-white flex items-center gap-2">
            <img
              src="/lovable-uploads/da49f507-9959-4888-9f64-3987986bb126.png"
              alt="Logo"
              className="h-10 w-10 rounded-full"
            />
            <span>KS</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {currentLinks.map((link) => (
              link.isHash ? (
                <a
                  key={link.href}
                  href={link.href}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </a>
              ) : (
                <Link
                  key={link.href}
                  to={link.href}
                  className="text-white/80 hover:text-white transition-colors font-medium"
                >
                  {link.label}
                </Link>
              )
            ))}
            <Link
              to="/blogs"
              className="text-white/80 hover:text-white transition-colors font-medium"
            >
              Blogs
            </Link>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="text-white/80 hover:text-white transition-colors font-medium">
                  Back Office
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to="/dashboard" className="flex items-center gap-2">
                    Dashboard
                  </Link>
                </DropdownMenuItem>
                {user ? (
                  <DropdownMenuItem onClick={handleSignOut} className="flex items-center gap-2">
                    <LogOut className="w-4 h-4" />
                    Sign Out
                  </DropdownMenuItem>
                ) : (
                  <DropdownMenuItem asChild>
                    <Link to="/auth" className="flex items-center gap-2">
                      <LogIn className="w-4 h-4" />
                      Sign In
                    </Link>
                  </DropdownMenuItem>
                )}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden text-white"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden absolute top-16 left-0 right-0 bg-[#1A1F2C] border-t border-white/10 shadow-lg">
            <div className="flex flex-col px-4 py-2">
              {currentLinks.map((link) => (
                link.isHash ? (
                  <a
                    key={link.href}
                    href={link.href}
                    className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </a>
                ) : (
                  <Link
                    key={link.href}
                    to={link.href}
                    className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {link.label}
                  </Link>
                )
              ))}
              <Link
                to="/blogs"
                className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Blogs
              </Link>
              <Link
                to="/dashboard"
                className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium"
                onClick={() => setIsMenuOpen(false)}
              >
                Dashboard
              </Link>
              {user ? (
                <button
                  onClick={handleSignOut}
                  className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium text-left w-full flex items-center gap-2"
                >
                  <LogOut className="w-4 h-4" />
                  Sign Out
                </button>
              ) : (
                <Link
                  to="/auth"
                  className="py-3 px-4 text-white/80 hover:text-white hover:bg-white/10 transition-colors rounded-md font-medium flex items-center gap-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <LogIn className="w-4 h-4" />
                  Sign In
                </Link>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
