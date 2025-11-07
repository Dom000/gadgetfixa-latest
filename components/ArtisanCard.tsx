import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Phone, MapPin, Clock, MessageCircle, Settings } from "lucide-react";
import StarRating from "./StarRating";
import Link from "next/link";
import { Bussiness } from "@/lib/prisma/generated";

interface ArtisanCardProps {
  artisan: Bussiness & {
    isPrivate?: boolean;
    isOnline?: boolean;
    reviews?: { rating: number }[];
    categories?: { name: string; id: string }[];
    specialties?: string[];
    location?: string;
    private?: boolean;
  };
}

const ArtisanCard = ({ artisan }: ArtisanCardProps) => {
  return (
    <Card className="hover:shadow-hover transition-all duration-300 group border-border">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          {/* Header */}
          <div className="flex items-start space-x-4">
            <img
              src={`https://avatar.vercel.sh/${encodeURIComponent(
                artisan.name || "Unknown"
              )}.svg?text=${encodeURIComponent(
                (artisan.name || "U").charAt(0).toUpperCase()
              )}`}
              alt={artisan.name || "Artisan"}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {artisan.name}
                  </h3>
                  {/* <p className="text-primary font-medium">{artisan.name}</p> */}
                </div>
                {!artisan.private && (
                  <div className="flex items-center space-x-2">
                    <div
                      className={`w-3 h-3 rounded-full ${
                        artisan.isOnline
                          ? "bg-secondary"
                          : "bg-muted-foreground"
                      }`}
                    />
                    <span className="text-sm text-muted-foreground">
                      {artisan.isOnline ? "Online" : "Offline"}
                    </span>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Rating */}
          <div className="flex items-center justify-between">
            <StarRating reviews={artisan.reviews || []} />
            <Badge variant="secondary">{artisan.occupation}</Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {artisan.description}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {artisan?.categories?.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty.name}
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
              <span>{artisan.address}</span>
            </div>
          </div>

          {/* Action Buttons */}
          {artisan.private ? (
            <div className="flex space-x-2 pt-2">
              <Button className="flex-1" variant="hero">
                <MessageCircle className="w-4 h-4 mr-2" />
                View Inboxes
              </Button>
              <Link
                className="w-full"
                href={`/home/my-businesses/${artisan.id}`}
              >
                <Button variant="outline" className="flex-1">
                  <Settings className="w-4 h-4 mr-2" />
                  Manage
                </Button>
              </Link>
            </div>
          ) : (
            <div className="flex space-x-2 pt-2">
              <Link className="w-full" href={"/artisans/" + artisan.id}>
                <Button variant="outline" className="flex-1">
                  <Clock className="w-4 h-4 mr-2" />
                  See More
                </Button>
              </Link>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ArtisanCard;
