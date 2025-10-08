import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card } from "@/components/ui/card";
import { Sparkles, LogOut, Upload, Loader2 } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";
import ResultsTable from "@/components/ResultsTable";

const Dashboard = () => {
  const [user, setUser] = useState<any>(null);
  const [profile, setProfile] = useState<any>(null);
  const [videoUrl, setVideoUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    checkUser();
    fetchResults();
  }, []);

  const checkUser = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();

    if (!session) {
      navigate("/login");
      return;
    }

    setUser(session.user);

    // Fetch user profile
    const { data: profileData } = await supabase
      .from("profiles")
      .select("*")
      .eq("id", session.user.id)
      .single();

    setProfile(profileData);
  };

  const fetchResults = async () => {
    const {
      data: { session },
    } = await supabase.auth.getSession();
    if (!session) return;

    const { data, error } = await supabase
      .from("repurpose_results")
      .select("*")
      .eq("user_id", session.user.id)
      .order("created_at", { ascending: false });

    if (!error && data) {
      setResults(data);
    }
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
    navigate("/login");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!profile) {
      toast({
        title: "Error",
        description: "Profile not loaded. Please refresh the page.",
        variant: "destructive",
      });
      return;
    }

    // Check rate limits
    const today = new Date().toISOString().split("T")[0];
    const lastProcessed = profile.last_processed_date;
    const videosToday =
      lastProcessed === today ? profile.videos_processed_today : 0;

    if (profile.plan === "free" && videosToday >= 2) {
      toast({
        title: "Rate limit reached",
        description: "Free plan allows 2 videos per day. Upgrade to Pro for unlimited access!",
        variant: "destructive",
      });
      return;
    }

    setLoading(true);

    try {
      // TODO: Call edge function to process video
      // For now, create mock results
      const mockResults = [
        {
          user_id: user.id,
          video_url: videoUrl,
          title: "Amazing Hook #1",
          clip_start: 10,
          clip_end: 25,
          caption: "This is where it gets interesting! 🔥",
        },
        {
          user_id: user.id,
          video_url: videoUrl,
          title: "Viral Moment #2",
          clip_start: 45,
          clip_end: 60,
          caption: "You won't believe what happens next! 😱",
        },
        {
          user_id: user.id,
          video_url: videoUrl,
          title: "Perfect Ending #3",
          clip_start: 120,
          clip_end: 135,
          caption: "This changed everything! ✨",
        },
      ];

      // Insert results
      const { error: insertError } = await supabase
        .from("repurpose_results")
        .insert(mockResults);

      if (insertError) throw insertError;

      // Update profile usage
      await supabase
        .from("profiles")
        .update({
          videos_processed_today: videosToday + 1,
          last_processed_date: today,
        })
        .eq("id", user.id);

      toast({
        title: "Success!",
        description: "Your video has been processed. Check the results below.",
      });

      setVideoUrl("");
      fetchResults();
      checkUser(); // Refresh profile
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const remainingVideos = profile
    ? profile.plan === "pro"
      ? "Unlimited"
      : Math.max(
          0,
          2 -
            (profile.last_processed_date === new Date().toISOString().split("T")[0]
              ? profile.videos_processed_today
              : 0)
        )
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <Link to="/" className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ClipForge
            </span>
          </Link>
          <div className="flex items-center gap-4">
            <div className="text-sm text-muted-foreground">
              {profile && (
                <>
                  <span className="font-medium text-foreground">
                    {profile.plan === "pro" ? "Pro Plan" : "Free Plan"}
                  </span>
                  {" • "}
                  <span>{remainingVideos} videos remaining today</span>
                </>
              )}
            </div>
            <Link to="/pricing">
              <Button variant="outline" size="sm">
                Upgrade
              </Button>
            </Link>
            <Button variant="ghost" size="sm" onClick={handleSignOut}>
              <LogOut className="h-4 w-4 mr-2" />
              Sign Out
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="mb-8">
            <h1 className="text-4xl font-bold mb-2">Welcome back!</h1>
            <p className="text-muted-foreground">
              Upload a YouTube URL to generate viral clip suggestions
            </p>
          </div>

          {/* Upload Form */}
          <Card className="p-8 mb-12 shadow-elegant">
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="videoUrl">YouTube Video URL</Label>
                <Input
                  id="videoUrl"
                  type="url"
                  placeholder="https://www.youtube.com/watch?v=..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                  required
                  disabled={loading}
                />
              </div>

              <Button
                type="submit"
                className="w-full bg-gradient-primary hover:opacity-90"
                disabled={loading}
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Processing Video...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Generate Clips
                  </>
                )}
              </Button>
            </form>
          </Card>

          {/* Results */}
          <div className="mb-8">
            <h2 className="text-2xl font-bold mb-4">Your Clip Suggestions</h2>
            <ResultsTable results={results} onRefresh={fetchResults} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
