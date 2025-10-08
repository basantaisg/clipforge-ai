import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Sparkles, Check, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const Pricing = () => {
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

      {/* Pricing Section */}
      <section className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Start for free, upgrade when you're ready to scale
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
          {/* Free Plan */}
          <Card className="p-8 border-border/50 hover:shadow-elegant transition-all duration-300">
            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Free</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold">$0</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                Perfect for trying out ClipForge
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>2 videos per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>3 clip suggestions per video</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>AI-generated titles & captions</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Timestamp markers</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Export results as JSON/CSV</span>
              </li>
            </ul>

            <Link to="/login">
              <Button variant="outline" className="w-full">
                Start Free
              </Button>
            </Link>
          </Card>

          {/* Pro Plan */}
          <Card className="p-8 border-2 border-primary bg-gradient-to-b from-primary/5 to-transparent hover:shadow-[0_0_60px_-10px_hsl(var(--primary))] transition-all duration-300 relative">
            <div className="absolute -top-4 left-1/2 -translate-x-1/2 px-4 py-1 bg-gradient-primary text-white text-sm font-medium rounded-full">
              Most Popular
            </div>

            <div className="mb-6">
              <h3 className="text-2xl font-bold mb-2">Pro</h3>
              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl font-bold">$29</span>
                <span className="text-muted-foreground">/month</span>
              </div>
              <p className="text-muted-foreground">
                For serious content creators
              </p>
            </div>

            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span className="font-medium">Unlimited videos per day</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Up to 5 clip suggestions per video</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Advanced AI analysis</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Priority processing</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Custom branding on exports</span>
              </li>
              <li className="flex items-center gap-2">
                <Check className="h-5 w-5 text-primary flex-shrink-0" />
                <span>Priority support</span>
              </li>
            </ul>

            <Link to="/login">
              <Button className="w-full bg-gradient-primary hover:opacity-90">
                Upgrade to Pro
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </Card>
        </div>

        {/* FAQ */}
        <div className="mt-20 max-w-3xl mx-auto">
          <h2 className="text-3xl font-bold text-center mb-12">
            Frequently Asked Questions
          </h2>

          <div className="space-y-6">
            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                Can I cancel my subscription anytime?
              </h3>
              <p className="text-muted-foreground">
                Yes! You can cancel your Pro subscription at any time. You'll
                continue to have access until the end of your billing period.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                What payment methods do you accept?
              </h3>
              <p className="text-muted-foreground">
                We accept all major credit cards through Stripe, our secure
                payment processor.
              </p>
            </Card>

            <Card className="p-6">
              <h3 className="font-semibold mb-2">
                Do you offer refunds?
              </h3>
              <p className="text-muted-foreground">
                We offer a 7-day money-back guarantee. If you're not satisfied
                with ClipForge Pro, contact us within 7 days for a full refund.
              </p>
            </Card>
          </div>
        </div>
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

export default Pricing;
