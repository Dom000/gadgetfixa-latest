import { useState } from "react";
import { Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

interface RatingCardProps {
  onRatingChange: (rating: number) => void;
  maxRating?: number;
  title?: string;
  value?: number;
}

const RatingCard = ({ onRatingChange, maxRating = 5, title = "Rate this service", value = 0 }: RatingCardProps) => {
  const [rating, setRating] = useState(value);
  const [hoverRating, setHoverRating] = useState(0);

  const handleStarClick = (starIndex: number) => {
    const newRating = starIndex + 1;
    setRating(newRating);
    onRatingChange(newRating);
  };

  return (
    <Card className="w-full max-w-md">
      <CardHeader>
        <CardTitle className="text-center">{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-center space-x-1">
          {[...Array(maxRating)].map((_, index) => (
            <Star
              key={index}
              className={`w-8 h-8 cursor-pointer transition-colors ${
                index < (hoverRating || rating)
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
              onClick={() => handleStarClick(index)}
              onMouseEnter={() => setHoverRating(index + 1)}
              onMouseLeave={() => setHoverRating(0)}
            />
          ))}
        </div>
        <p className="text-center mt-4 text-sm text-muted-foreground">
          {rating > 0 ? `You rated: ${rating} out of ${maxRating} stars` : "Click to rate"}
        </p>
      </CardContent>
    </Card>
  );
};

export default RatingCard;