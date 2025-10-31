import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import TestimonialCard from "@/components/TestimonialCard";
import { ArrowRight, Shield, Clock, Star, Search, Users } from "lucide-react";

import Link from "next/link";

const testimonials = [
  {
    id: "1",
    name: "Sarah Johnson",
    avatar: "/customer1.jpg",
    rating: 5,
    text: "Amazing service! My phone screen was replaced perfectly and faster than expected. The technician was professional and explained everything clearly.",
    service: "Phone Screen Repair",
  },
  {
    id: "2",
    name: "Michael Chen",
    avatar: "/customer2.jpg",
    rating: 5,
    text: "Found the perfect repair shop for my laptop through Gadget Fixa. Great communication and fair pricing. Highly recommend!",
    service: "Laptop Repair",
  },
];

const Index = () => {
  return (
    <div className="min-h-screen bg-background">

      {/* Hero Section */}
      <section className="relative py-20 px-4 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero opacity-10" />
        <div className="container mx-auto relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                Find Expert{" "}
                <span className="bg-gradient-primary bg-clip-text text-transparent">
                  Artisans
                </span>{" "}
                Near You
              </h1>
              <p className="text-xl text-muted-foreground leading-relaxed">
                Connect with skilled phone repairers, electronics engineers, and
                gadget specialists. Get your devices fixed quickly by trusted
                professionals in your area.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link href="#">
                  <Button size="lg" variant="hero" className="text-lg px-8">
                    Find Artisans
                    <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </Link>
                <Button variant="outline" size="lg" className="text-lg px-8">
                  Join as Artisan
                </Button>
              </div>
            </div>
            <div className="relative">
              <img
                src="/hero-image.jpg"
                alt="Professional device repair"
                className="rounded-2xl shadow-hover w-full h-auto"
              />
              <div className="absolute -bottom-6 -left-6 bg-card border border-border rounded-lg p-4 shadow-card">
                <div className="flex items-center space-x-3">
                  <div className="w-3 h-3 bg-secondary rounded-full animate-pulse" />
                  <span className="text-sm font-medium">
                    500+ Active Artisans
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              Why Choose Gadget Fixa?
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              We make finding reliable repair services simple and secure
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <Card className="border-border shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Shield className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Verified Artisans</h3>
                <p className="text-muted-foreground">
                  All our artisans are thoroughly vetted and verified for
                  quality and reliability.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-secondary rounded-lg flex items-center justify-center mx-auto">
                  <Clock className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Fast Service</h3>
                <p className="text-muted-foreground">
                  Quick response times and efficient repair services to get your
                  devices back fast.
                </p>
              </CardContent>
            </Card>

            <Card className="border-border shadow-card hover:shadow-hover transition-all duration-300">
              <CardContent className="p-6 text-center space-y-4">
                <div className="w-12 h-12 bg-gradient-primary rounded-lg flex items-center justify-center mx-auto">
                  <Star className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-xl font-semibold">Quality Guaranteed</h3>
                <p className="text-muted-foreground">
                  Transparent ratings and reviews ensure you get the best
                  service every time.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4">
        <div className="container mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                500+
              </div>
              <div className="text-muted-foreground">Active Artisans</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                10K+
              </div>
              <div className="text-muted-foreground">Repairs Completed</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
                4.9★
              </div>
              <div className="text-muted-foreground">Average Rating</div>
            </div>
            <div className="space-y-2">
              <div className="text-3xl lg:text-4xl font-bold bg-gradient-secondary bg-clip-text text-transparent">
                24/7
              </div>
              <div className="text-muted-foreground">Support Available</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 px-4 bg-muted/30">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-12">
            <h2 className="text-3xl lg:text-4xl font-bold">
              What Our Customers Say
            </h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Join thousands of satisfied customers who trust Gadget Fixa
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {testimonials.map((testimonial) => (
              <TestimonialCard key={testimonial.id} testimonial={testimonial} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-3xl mx-auto space-y-8">
            <h2 className="text-3xl lg:text-5xl font-bold">
              Ready to Fix Your Device?
            </h2>
            <p className="text-xl text-muted-foreground">
              Browse our network of skilled artisans and get your gadgets
              repaired today.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/artisans">
                <Button size="lg" variant="hero" className="text-lg px-8">
                  <Search className="mr-2 w-5 h-5" />
                  Browse Artisans
                </Button>
              </Link>
              <Button variant="outline" size="lg" className="text-lg px-8">
                <Users className="mr-2 w-5 h-5" />
                Join Our Network
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Index;
