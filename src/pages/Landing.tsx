import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Zap, TrendingUp, Clock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20">
      {/* Navigation */}
      <nav className="border-b border-border/50 bg-background/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            <span className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              ClipForge
            </span>
          </div>
          <div className="flex items-center gap-4">
            <Link to="/pricing">
              <Button variant="ghost">Pricing</Button>
            </Link>
            <Link to="/login">
              <Button variant="outline">Sign In</Button>
            </Link>
            <Link to="/login">
              <Button className="bg-gradient-primary hover:opacity-90">
                Get Started
              </Button>
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="container mx-auto px-4 py-20 md:py-32">
        <div className="text-center max-w-4xl mx-auto animate-slide-up">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full bg-primary/10 border border-primary/20">
            <span className="text-sm font-medium text-primary">
              ✨ AI-Powered Content Repurposing
            </span>
          </div>
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Transform Long Videos Into
            <span className="bg-gradient-hero bg-clip-text text-transparent">
              {" "}Viral Clips
            </span>
          </h1>
          <p className="text-xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            ClipForge uses AI to analyze your YouTube videos and automatically
            generate engaging short-form content with perfect timestamps, hooks,
            and captions.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/login">
              <Button
                size="lg"
                className="bg-gradient-primary hover:opacity-90 text-lg px-8 shadow-elegant animate-glow"
              >
                Start Creating Free
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/pricing">
              <Button size="lg" variant="outline" className="text-lg px-8">
                View Pricing
              </Button>
            </Link>
          </div>
          <p className="text-sm text-muted-foreground mt-4">
            Free plan: 2 videos per day • No credit card required
          </p>
        </div>
      </section>

      {/* Features Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold mb-4">
            Why Content Creators Love ClipForge
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Save hours of editing time with AI-powered content repurposing
          </p>
        </div>

        <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">AI-Powered Analysis</h3>
            <p className="text-muted-foreground">
              Advanced AI automatically identifies the most engaging moments in
              your videos and creates perfect clip suggestions.
            </p>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-accent/10 flex items-center justify-center mb-4">
              <TrendingUp className="h-6 w-6 text-accent" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Viral-Ready Hooks</h3>
            <p className="text-muted-foreground">
              Get AI-generated titles and captions optimized for maximum
              engagement on TikTok, Instagram Reels, and YouTube Shorts.
            </p>
          </Card>

          <Card className="p-8 bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-elegant transition-all duration-300">
            <div className="w-12 h-12 rounded-lg bg-primary/10 flex items-center justify-center mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-3">Save 10+ Hours Weekly</h3>
            <p className="text-muted-foreground">
              Automate the tedious process of finding, cutting, and captioning
              clips. Focus on creating, not editing.
            </p>
          </Card>
        </div>
      </section>

      {/* CTA Section */}
      <section className="container mx-auto px-4 py-20">
        <Card className="bg-gradient-primary p-12 md:p-16 text-center text-white border-0">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Ready to 10x Your Content Output?
          </h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of creators using ClipForge to repurpose their content
            and grow their audience faster.
          </p>
          <Link to="/login">
            <Button
              size="lg"
              variant="secondary"
              className="text-lg px-8 bg-white text-primary hover:bg-white/90"
            >
              Get Started Free
              <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </Card>
      </section>

      {/* Footer */}
      <footer className="border-t border-border/50 py-8 mt-20">
        <div className="container mx-auto px-4 text-center text-muted-foreground">
          <p>© 2025 ClipForge. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
};

export default Landing;
