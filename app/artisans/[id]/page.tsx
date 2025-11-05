"use client";

import BreadCrumb from "@/components/CustomBreadcrumb";
import CommentRatingCard from "@/components/my-bussiness/CommentRatingCard";
import PortfolioCard from "@/components/my-bussiness/PorfolioCard";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { artisansData, portfolioOptions, reviewSamples } from "@/lib/mock-data";
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
            {/* <StarRating rating={artisan.r} /> */}
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
            <h3 className="text-xl font-bold my-3">Portfolios</h3>
            <div className="w-full space-y-2 overflow-y-auto max-h-96 pb-4 grid md:grid-cols-2 gap-4">
              {portfolioOptions.map((item) => (
                <PortfolioCard key={item.id} {...item} />
              ))}
            </div>
            <div>
              <h3 className="text-xl font-bold my-3">Reviews</h3>
              <div className="w-full space-y-5 overflow-y-auto max-h-96 pb-4">
                {reviewSamples.map((review) => (
                  <CommentRatingCard key={review.id} {...review} />
                ))}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold my-3">Leave a Review</h3>
            <div className="w-full">
              <Textarea placeholder="Write your review here..." />
              <div className="flex justify-end mt-2">
                <Button variant="hero">Submit Review</Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default page;
