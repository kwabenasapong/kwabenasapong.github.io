
import { createContext, useContext, useEffect, useState } from "react";
import { supabase } from "../integrations/supabase/client";
import { Session, User } from "@supabase/supabase-js";
import { useNavigate } from "react-router-dom";

type AuthContextType = {
  user: User | null;
  session: Session | null;
  isAdmin: boolean;
  isEditor: boolean;
  signOut: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isEditor, setIsEditor] = useState(false);
  const navigate = useNavigate();

  const checkUserRoles = async (userId: string) => {
    try {
      console.log('Checking roles for user:', userId);
      
      const { data: hasAdminRole, error: adminError } = await supabase.rpc('has_role', {
        role_to_check: 'admin'
      });
      
      const { data: hasEditorRole, error: editorError } = await supabase.rpc('has_role', {
        role_to_check: 'editor'
      });

      console.log('Role check results:', { hasAdminRole, hasEditorRole });
      
      if (adminError) console.error('Admin role check error:', adminError);
      if (editorError) console.error('Editor role check error:', editorError);

      setIsAdmin(!!hasAdminRole);
      setIsEditor(!!hasEditorRole);

      console.log('Updated role states:', { isAdmin: !!hasAdminRole, isEditor: !!hasEditorRole });
    } catch (error) {
      console.error('Error checking user roles:', error);
    }
  };

  useEffect(() => {
    // Check active session
    supabase.auth.getSession().then(({ data: { session } }) => {
      console.log('Initial session check:', session);
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        checkUserRoles(session.user.id);
      }
    });

    // Listen for auth changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      console.log('Auth state changed:', { event: _event, session });
      setSession(session);
      setUser(session?.user ?? null);
      
      if (session?.user) {
        await checkUserRoles(session.user.id);
      } else {
        setIsAdmin(false);
        setIsEditor(false);
      }
    });

    return () => subscription.unsubscribe();
  }, []);

  const signOut = async () => {
    await supabase.auth.signOut();
    setIsAdmin(false);
    setIsEditor(false);
    navigate('/auth');
  };

  return (
    <AuthContext.Provider value={{ user, session, isAdmin, isEditor, signOut }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
