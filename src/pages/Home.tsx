import { supabase } from "@/helper/supabase-client";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Loader2, Settings, BarChart3, Lightbulb, Rocket, User, LogOut,} from "lucide-react";

const Home = () => {
  const [isSessionAvail, setIsSessionAvail] = useState(true);
  const [loading, setLoading] = useState(true);

  const navigative=useNavigate();
  interface User {
    email?: string;
    user_metadata?: {
      name?: string;
      avatar_url?: string;
    };
  }

  const [_user, setUser] = useState<User | null>(null);

  useEffect(() => {
    async function checkAuthentication() {
      try {
        const { data: { session } } = await supabase.auth.getSession();
        if (session?.user) {
          setIsSessionAvail(true);
          setUser(session.user);
        }
      } catch (error) {
        console.error("Auth check failed:", error);
      } finally {
        setLoading(false);
      }
    }

    checkAuthentication();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      (_event, session) => {
        if (session?.user) {
          setIsSessionAvail(true);
          setUser(session.user);
        } else {
          setIsSessionAvail(false);
          setUser(null);
        }
        setLoading(false);
      }
    );

    return () => subscription.unsubscribe();
  }, []);

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut();
    } catch (error) {
      console.error("Sign out failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="h-[500px] w-full flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="h-6 w-6 animate-spin text-primary" />
          <p className="text-xs text-muted-foreground">Loading...</p>
        </div>
      </div>
    );
  }

  if (!isSessionAvail) {
    return (
      <div className="h-full! w-full! bg-background p-3 overflow-y-auto">
        <div className="space-y-4">
          {/* Compact Logo Section */}
          <div className="text-center py-2">
            <div className="w-12 h-12 mx-auto bg-primary rounded-lg flex items-center justify-center mb-2">
              <Rocket className="h-6 w-6 text-primary-foreground" />
            </div>
            <h1 className="text-lg font-semibold">Your Extension</h1>
            <p className="text-xs text-muted-foreground">Boost your productivity</p>
          </div>

          {/* Compact Auth Card */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm text-center">Welcome</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 pb-3">
              <Button asChild className="w-full h-8 text-xs">
                <Link to="/login">Sign In</Link>
              </Button>
              <Button asChild variant="outline" className="w-full h-8 text-xs">
                <Link to="/register">Create Account</Link>
              </Button>
            </CardContent>
          </Card>

          {/* Compact Features */}
          <Card className="border-0 shadow-sm">
            <CardHeader className="pb-2 pt-3">
              <CardTitle className="text-sm">Features</CardTitle>
            </CardHeader>
            <CardContent className="pb-3">
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs">
                  <BarChart3 className="h-3 w-3 text-primary" />
                  <span>Analytics Dashboard</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Settings className="h-3 w-3 text-primary" />
                  <span>Secure Sync</span>
                </div>
                <div className="flex items-center gap-2 text-xs">
                  <Lightbulb className="h-3 w-3 text-primary" />
                  <span>Smart Insights</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }else{
    navigative('/prompt')
  }



 return (
   <div className="h-[500px] w-full bg-background flex flex-col">
     {/* Compact Header */}
     <div className="border-b px-3 py-2 flex-shrink-0">
       <div className="flex items-center justify-between">
         <div className="flex items-center gap-2 min-w-0">
           <Avatar className="h-7 w-7 flex-shrink-0">
             <AvatarImage src={_user?.user_metadata?.avatar_url} />
             <AvatarFallback className="bg-primary text-primary-foreground text-xs">
               {_user?.email?.charAt(0).toUpperCase()}
             </AvatarFallback>
           </Avatar>
           <div className="min-w-0 flex-1">
             <p className="text-xs font-medium truncate">
               {_user?.user_metadata?.name || 'User'}
             </p>
             <p className="text-xs text-muted-foreground truncate">
               {_user?.email}
             </p>
           </div>
         </div>
         <Button
           variant="ghost"
           size="sm"
           onClick={handleSignOut}
           className="h-7 w-7 p-0 flex-shrink-0"
         >
           <LogOut className="h-3 w-3" />
         </Button>
       </div>
     </div>
     {/* Scrollable Content */}
     <div className="flex-1 overflow-y-auto p-3 space-y-3">
       {/* Compact Quick Actions */}
       <div>
         <h3 className="text-xs font-medium mb-2 text-muted-foreground uppercase tracking-wide">
           Quick Actions
         </h3>
         <div className="grid grid-cols-2 gap-2">
           <Button
             asChild
             variant="outline"
             className="h-16 p-2 flex-col gap-1 border-dashed hover:border-solid"
           >
             <Link to="/analytics">
               <BarChart3 className="h-4 w-4 text-primary" />
               <span className="text-xs">Analytics</span>
             </Link>
           </Button>
           <Button
             asChild
             variant="outline"
             className="h-16 p-2 flex-col gap-1 border-dashed hover:border-solid"
           >
             <Link to="/settings">
               <Settings className="h-4 w-4 text-primary" />
               <span className="text-xs">Settings</span>
             </Link>
           </Button>
         </div>
       </div>
       {/* Compact Status */}
       <Card className="border-0 shadow-sm">
         <CardHeader className="pb-2 pt-3">
           <div className="flex items-center justify-between">
             <CardTitle className="text-xs font-medium">Status</CardTitle>
             <Badge variant="secondary" className="h-4 text-xs px-1.5">
               Active
             </Badge>
           </div>
         </CardHeader>
         <CardContent className="pb-3">
           <p className="text-xs text-muted-foreground">All systems operational</p>
         </CardContent>
       </Card>
       {/* Additional Actions */}
       <div className="space-y-2">
         <Button
           asChild
           variant="ghost"
           className="w-full justify-start h-8 text-xs"
         >
           <Link to="/insights">
             <Lightbulb className="h-3 w-3 mr-2" />
             View Insights
           </Link>
         </Button>
         <Button
           asChild
           variant="ghost"
           className="w-full justify-start h-8 text-xs"
         >
           <Link to="/profile">
             <User className="h-3 w-3 mr-2" />
             Profile Settings
           </Link>
         </Button>
       </div>
     </div>
   </div>
 );
};

export default Home;
