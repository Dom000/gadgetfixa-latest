import { Star } from "lucide-react";

interface StarRatingProps {
  rating: number;
  maxRating?: number;
  size?: "sm" | "md" | "lg";
}

const StarRating = ({ rating, maxRating = 5, size = "md" }: StarRatingProps) => {
  const sizeClasses = {
    sm: "w-3 h-3",
    md: "w-4 h-4", 
    lg: "w-5 h-5"
  };

  return (
    <div className="flex items-center space-x-1">
      {[...Array(maxRating)].map((_, index) => (
        <Star
          key={index}
          className={`${sizeClasses[size]} ${
            index < Math.floor(rating)
              ? "fill-accent text-accent"
              : index < rating
              ? "fill-accent/50 text-accent"
              : "text-muted-foreground"
          }`}
        />
      ))}
      <span className="text-sm text-muted-foreground ml-2">
        ({rating.toFixed(1)})
      </span>
    </div>
  );
};

export default StarRating;