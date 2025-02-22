
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { ThemeProvider } from "next-themes";
import Home from "./pages/Home";
import Dashboard from "./pages/Dashboard";
import About from "./pages/About";
import Blogs from "./pages/Blogs";
import BlogPost from "./pages/BlogPost";
import { AuthProvider } from "./contexts/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute";
import { Toaster } from "sonner";
import BlogEditor from "./pages/BlogEditor";
import Auth from "./pages/Auth";
import Navigation from "./components/Navigation";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: 1,
      refetchOnWindowFocus: false,
    },
  },
});

export default function App() {
  return (
    <Router>
      <QueryClientProvider client={queryClient}>
        <AuthProvider>
          <ThemeProvider defaultTheme="light" storageKey="vite-ui-theme">
            <div className="min-h-screen bg-background">
              <Navigation />
              <main>
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/blogs" element={<Blogs />} />
                  <Route path="/blog/:slug" element={<BlogPost />} />
                  <Route path="/auth" element={<Auth />} />
                  <Route 
                    path="/dashboard/*" 
                    element={
                      <ProtectedRoute allowedRoles={["admin", "editor"]}>
                        <Dashboard />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/blog/new" 
                    element={
                      <ProtectedRoute allowedRoles={["admin", "editor"]}>
                        <BlogEditor />
                      </ProtectedRoute>
                    } 
                  />
                  <Route 
                    path="/blog/edit/:id" 
                    element={
                      <ProtectedRoute allowedRoles={["admin", "editor"]}>
                        <BlogEditor />
                      </ProtectedRoute>
                    } 
                  />
                </Routes>
              </main>
            </div>
            <Toaster />
          </ThemeProvider>
        </AuthProvider>
      </QueryClientProvider>
    </Router>
  );
}
