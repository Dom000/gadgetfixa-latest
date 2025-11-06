import React from "react";
import Image from "next/image";
import { Trash2 } from "lucide-react";
import { Button } from "../ui/button";

interface PortfolioCardProps {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  viewOnly?: boolean;
}

function PortfolioCard({
  title,
  description,
  imageUrl,
  viewOnly = false,
}: PortfolioCardProps) {
  const onDelete = () => {
    // Handle delete action
    console.log("Delete portfolio item");
  };
  return (
    <div className="bg-white rounded-lg cursor-pointer w-full shadow-md overflow-hidden relative group">
      <div className="relative">
        <Image
          src={imageUrl}
          alt={title}
          width={300}
          height={200}
          className="w-full h-48 object-cover group-hover:brightness-50 transition-all"
        />
        <div className="absolute inset-0 bg-black opacity-0 group-hover:opacity-30 transition-opacity" />
        {viewOnly && (
          <Button
            size={"icon"}
            onClick={onDelete}
            className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 p-2 bg-red-500 text-white rounded-full hover:bg-red-600 opacity-0 group-hover:opacity-100 transition-opacity z-10"
          >
            <Trash2 size={16} />
          </Button>
        )}
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-2">{title}</h3>
        <p className="text-gray-600 text-sm">
          {viewOnly ? description.substring(0, 100) + "..." : description}
        </p>
      </div>
    </div>
  );
}

export default PortfolioCard;
