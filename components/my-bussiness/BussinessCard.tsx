"use client";
import { artisansData } from "@/lib/mock-data";
import React, { use, useEffect, useState } from "react";
import ArtisanCard from "../ArtisanCard";
import { useMutation, useQuery } from "@tanstack/react-query";
import { getBusinessByProfileId } from "@/controllers/business/index.controller";
import { useAppStore } from "@/stores/store";
import { Bussiness } from "@/lib/prisma/generated";
import { authClient } from "@/lib/client";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "../ui/empty";
import { Grid } from "lucide-react";

function BussinessCard() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All Categories");
  const [sortBy, setSortBy] = useState("rating");
  const user = useAppStore((state) => state.userDetails);
  const userSession = authClient.getSession();

  const { data, refetch, isLoading } = useQuery<{ data: Bussiness[] }>({
    queryKey: ["businessByProfile"],
    queryFn: async () =>
      getBusinessByProfileId(user?.id || (await userSession).data?.user.id),
    retry: 1,
  });

  console.log("Business data:", data);

  const filteredArtisans =
    data?.data.filter((artisan) => {
      const matchesSearch = artisan.name
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      // artisan.s.toLowerCase().includes(searchTerm.toLowerCase()) ||
      // artisan.specialties.some((s) =>
      //   s.toLowerCase().includes(searchTerm.toLowerCase())
      // );
      //   const matchesCategory =
      //     selectedCategory === "All Categories" ||
      //     artisan.category === selectedCategory;
      return matchesSearch;
    }) || [];
  // .sort((a, b) => {
  //   if (sortBy === "rating") return b.rating - a.rating;
  //   if (sortBy === "reviews") return b.reviewCount - a.reviewCount;
  //   return a.name.localeCompare(b.name);
  // });

  useEffect(() => {
    refetch();
  }, [refetch]);

  return (
    <>
      {isLoading ? (
        <div className="flex items-center justify-center">Loading...</div>
      ) : filteredArtisans.length === 0 ? (
        <Empty>
          <EmptyHeader>
            <EmptyMedia variant="icon">
              <Grid />
            </EmptyMedia>
            <EmptyTitle>No Business created yet</EmptyTitle>
            <EmptyDescription>
              You have not created any business. Create a business to see it
              listed here.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <div className="grid lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredArtisans.map((artisan) => (
            <ArtisanCard
              key={artisan.id}
              artisan={{ private: true, ...artisan }}
            />
          ))}
        </div>
      )}
    </>
  );
}

export default BussinessCard;
