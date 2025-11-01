"use client";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import Header from "@/components/Header";
import ArtisanCard from "@/components/ArtisanCard";
import { Search, Filter, MapPin } from "lucide-react";
import { artisansData, categories } from "@/lib/mock-data";



const Artisans = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("rating");

  const filteredArtisans = artisansData
    .filter((artisan) => {
      const matchesSearch =
        artisan.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.shopName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        artisan.specialties.some((s) =>
          s.toLowerCase().includes(searchTerm.toLowerCase())
        );
      const matchesCategory =
        selectedCategory === "All Categories" ||
        artisan.category === selectedCategory;
      return matchesSearch && matchesCategory;
    })
    .sort((a, b) => {
      if (sortBy === "rating") return b.rating - a.rating;
      if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
      return a.name.localeCompare(b.name);
    });

  return (
    <div className="min-h-screen bg-background">
      <section className="py-12 px-4 bg-linear-to-b from-muted/50 to-background">
        <div className="container mx-auto">
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl lg:text-5xl font-bold">
              Find Your Perfect{" "}
              <span className="bg-gradient-primary bg-clip-text text-transparent">
                Artisan
              </span>
            </h1>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
              Browse our network of skilled professionals ready to fix your
              devices
            </p>
          </div>
        </div>
      </section>

      {/* Filters Section */}
      <section className="py-6 px-4 border-b border-border bg-card">
        <div className="container mx-auto">
          <div className="flex flex-col lg:flex-row gap-4 items-center">
            {/* Search */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <Input
                placeholder="Search by name, shop, or specialty..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>

            {/* Category Filter */}
            <Select
              value={selectedCategory}
              onValueChange={setSelectedCategory}
            >
              <SelectTrigger className="w-[200px]">
                <Filter className="w-4 h-4 mr-2" />
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Sort */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="rating">Top Rated</SelectItem>
                <SelectItem value="reviews">Most Reviews</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            {/* Location Filter */}
            <Button variant="outline" className="flex items-center">
              <MapPin className="w-4 h-4 mr-2" />
              Near Me
            </Button>
          </div>
        </div>
      </section>

      {/* Results Section */}
      <section className="py-8 px-4">
        <div className="container mx-auto">
          {/* Results Header */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-4">
              <h2 className="text-2xl font-semibold">
                {filteredArtisans.length} Artisan
                {filteredArtisans.length !== 1 ? "s" : ""} Found
              </h2>
              {selectedCategory !== "All Categories" && (
                <Badge variant="secondary" className="text-sm">
                  {selectedCategory}
                </Badge>
              )}
            </div>
          </div>

          {/* Artisan Grid */}
          <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
            {filteredArtisans.map((artisan) => (
              <ArtisanCard key={artisan.id} artisan={artisan} />
            ))}
          </div>

          {/* No Results */}
          {filteredArtisans.length === 0 && (
            <div className="text-center py-12">
              <div className="text-muted-foreground text-lg mb-4">
                No artisans found matching your criteria
              </div>
              <Button
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("All Categories");
                }}
                variant="outline"
              >
                Clear Filters
              </Button>
            </div>
          )}

          {/* Load More */}
          {filteredArtisans.length > 0 && (
            <div className="text-center mt-12">
              <Button variant="outline" size="lg">
                Load More Artisans
              </Button>
            </div>
          )}
        </div>
      </section>
    </div>
  );
};

export default Artisans;
