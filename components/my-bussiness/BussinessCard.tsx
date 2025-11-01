"use client";
import { artisansData } from "@/lib/mock-data";
import React, { useState } from "react";
import ArtisanCard from "../ArtisanCard";

function BussinessCard() {
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
    <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
      {filteredArtisans.map((artisan) => (
        <ArtisanCard key={artisan.id} artisan={{ private: true, ...artisan }} />
      ))}
    </div>
  );
}

export default BussinessCard;
