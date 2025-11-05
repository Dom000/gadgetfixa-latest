import { Card, CardContent } from "@/components/ui/card";
import StarRating from "./StarRating";
import { Quote } from "lucide-react";

interface TestimonialCardProps {
  testimonial: {
    id: string;
    name: string;
    avatar: string;
    reviews?: { rating: number }[];
    text: string;
    service: string;
  };
}

const TestimonialCard = ({ testimonial }: TestimonialCardProps) => {
  return (
    <Card className="border-border shadow-card">
      <CardContent className="p-6">
        <div className="flex flex-col space-y-4">
          <div className="flex items-center space-x-1">
            <Quote className="w-5 h-5 text-accent" />
            <StarRating reviews={testimonial.reviews} size="sm" />
          </div>

          <p className="text-muted-foreground italic leading-relaxed">
            "{testimonial.text}"
          </p>

          <div className="flex items-center space-x-3 pt-2 border-t border-border">
            <img
              src={testimonial.avatar}
              alt={testimonial.name}
              className="w-10 h-10 rounded-full object-cover"
            />
            <div>
              <p className="font-medium text-foreground">{testimonial.name}</p>
              <p className="text-sm text-muted-foreground">
                {testimonial.service}
              </p>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default TestimonialCard;
