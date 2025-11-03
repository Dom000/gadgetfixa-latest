"use client";

import BreadCrumb from "@/components/CustomBreadcrumb";
import PortfolioCard from "@/components/my-bussiness/PorfolioCard";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { artisansData, portfolioOptions } from "@/lib/mock-data";
import { MapPin, MessageCircle, Phone } from "lucide-react";
import React from "react";
const artisan = artisansData[0];
function page() {
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0  p-2 md:p-5">
      <BreadCrumb page="Artisan Details" />
      <div className="mt-10 flex flex-col md:flex-row gap-6 bg-background rounded-md p-5 items-center justify-center">
        {" "}
        <div className="flex bg-gray-50 w-6xl rounded-md p-5 flex-col space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <img
              src={artisan.profileImage}
              alt={artisan.name}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {artisan.name}
                  </h3>
                  <p className="text-primary font-medium">{artisan.shopName}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <StarRating rating={artisan.rating} />
            <Badge variant="secondary">{artisan.category}</Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {artisan.description}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {artisan.specialties.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty}
              </Badge>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{artisan.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{artisan.location}</span>
            </div>
          </div>
          <div className="flex space-x-2 pt-2">
            <Button className="w-fit cursor-pointer" variant="hero">
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>

          <div>
            <div className="w-full space-y-2 overflow-y-auto max-h-96 pb-4 grid md:grid-cols-2 gap-4">
              {portfolioOptions.map((item) => (
                <PortfolioCard key={item.id} {...item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
