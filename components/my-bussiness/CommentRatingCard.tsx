import { Review } from "@/lib/prisma/generated";
import React from "react";
import Image from "next/image";

interface CommentRatingCardProps {
  id: string;
  anonymous: boolean;
  anonymousName?: string | null;
  createdAt: Date;
  comment: string;
  rating: number;
  name?: string;
}

function CommentRatingCard({
  id,
  anonymous,
  anonymousName,
  createdAt,
  comment,
  rating,
  name,
}: CommentRatingCardProps) {
  return (
    <div className="flex round bg-amber-50/40 p-3">
      <div className="shrink-0">
        <div className="">
          <Image
            src={`https://avatar.vercel.sh/${encodeURIComponent(
              anonymous ? anonymousName || "User" : name || "User"
            )}.svg?text=${encodeURIComponent(
              anonymous
                ? (anonymousName || "A").charAt(0).toUpperCase()
                : (name || "U").charAt(0).toUpperCase()
            )}`}
            alt={anonymous ? "Anonymous" : name || "User"}
            className="rounded"
            width={40}
            height={40}
          />
        </div>
      </div>
      <div className="ml-4">
        <div className="flex items-center">
          <span className="font-semibold">
            {anonymous ?  anonymousName: name}
          </span>
          <span className="text-sm text-gray-500 ml-2">
            {new Date(createdAt).toLocaleDateString()}
          </span>
        </div>
        <div className="mt-1">
          <p className="text-gray-700 text-[14px] text-muted-foreground">{comment}</p>
        </div>
        <div className="mt-2">
          <span className="text-yellow-500">{Array(rating).fill("★")}</span>
          <span className="text-gray-300">{Array(5 - rating).fill("★")}</span>
        </div>
      </div>
    </div>
  );
}

export default CommentRatingCard;
