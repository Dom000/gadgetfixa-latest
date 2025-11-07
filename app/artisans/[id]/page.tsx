"use client";

import BreadCrumb from "@/components/CustomBreadcrumb";
import CommentRatingCard from "@/components/my-bussiness/CommentRatingCard";
import PortfolioCard from "@/components/my-bussiness/PorfolioCard";
import RatingCard from "@/components/RatingCard";
import StarRating from "@/components/StarRating";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import { Textarea } from "@/components/ui/textarea";
import { getBusinessById } from "@/controllers/business/index.controller";
import { sendMessage } from "@/controllers/message/index.controller";
import { sendReview } from "@/controllers/review/index.controller";
import { getAnonymousUser } from "@/lib/anonymous-user";
import { authClient } from "@/lib/client";
import { artisansData, portfolioOptions, reviewSamples } from "@/lib/mock-data";
import { useAppStore } from "@/stores/store";
import { useMutation, useQuery } from "@tanstack/react-query";
import { set } from "better-auth";
import { Grid, Loader2, MapPin, MessageCircle, Phone } from "lucide-react";
import { useRouter } from "next/navigation";
import React, { use } from "react";

function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [ratingModal, setRatingModal] = React.useState(false);
  const [reviewData, setReviewData] = React.useState({
    rating: 0,
    comment: "",
  });
  const [messageModal, setMessageModal] = React.useState(false);
  const [messageData, setMessageData] = React.useState("");

  const userDetails = useAppStore((state) => state.userDetails);
  const {
    data: artisan,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["artisanDetails"],
    queryFn: () => getBusinessById(id),
  });
  const { mutate, isPending } = useMutation({
    mutationFn: sendReview,
    onSuccess: () => {
      setRatingModal(false);
      refetch();
      setReviewData({ rating: 0, comment: "" });
    },
  });

  const { mutate: sendMessageMutation, isPending: isSendingMessage } =
    useMutation({
      mutationFn: sendMessage,
      onSuccess: () => {
        setMessageModal(false);
        setMessageData("");
        refetch();
        router.push("/home/inbox");
      },
    });

  const user = authClient.getSession();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center mt-10">Loading...</div>
    );
  }

  const getIsAnonymous = async () => {
    const data = await user;
    return data.data?.session ? false : true;
  };

  const handleRating = async () => {
    mutate({
      bussinessId: artisan?.data.id || "",
      rating: reviewData.rating,
      comment: reviewData.comment,
      anonymous: await getIsAnonymous(),
      anonymousName: (await getIsAnonymous()) ? getAnonymousUser().name : null,
      profileId: (await getIsAnonymous()) ? null : (await user).data?.user.id,
    });
  };

  const handleMessage = async () => {
    const data = await user;
    const isAnonymous = !data.data?.session;
    if (isAnonymous) {
      alert("Please log in to message the artisan.");
      return;
    }
    setMessageModal(true);
  };

  const handleSendMessage = async () => {
    sendMessageMutation({
      senderId: (await user).data?.user.id!,
      receiverId: artisan?.data.profileId!,
      content: messageData,
    });
  };
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0  p-2 md:p-5">
      <BreadCrumb page="Artisan Details" />
      <div className="mt-10 flex flex-col md:flex-row gap-6 bg-background rounded-md md:p-5 items-center justify-center">
        {" "}
        <div className="flex bg-gray-50 md:w-6xl rounded-md p-5 flex-col space-y-4">
          <div className="flex items-start space-x-4">
            <img
              src={`https://avatar.vercel.sh/${encodeURIComponent(
                artisan?.data.name || "Unknown"
              )}.svg?text=${encodeURIComponent(
                (artisan?.data.name || "U").charAt(0).toUpperCase()
              )}`}
              alt={artisan?.data.name || "Artisan"}
              className="w-16 h-16 rounded-full object-cover border-2 border-border"
            />
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="font-semibold text-lg text-foreground">
                    {artisan?.data.name}
                  </h3>
                  {/* <p className="text-primary font-medium">{artisan?.data.}</p> */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-between">
            <StarRating reviews={artisan?.data.reviews || []} />
            <Badge variant="secondary">{artisan?.data.occupation}</Badge>
          </div>

          {/* Description */}
          <p className="text-muted-foreground text-sm leading-relaxed">
            {artisan?.data.description}
          </p>

          {/* Specialties */}
          <div className="flex flex-wrap gap-2">
            {artisan?.data.categories?.map((specialty, index) => (
              <Badge key={index} variant="outline" className="text-xs">
                {specialty.name}
              </Badge>
            ))}
          </div>

          {/* Contact Info */}
          <div className="space-y-2 text-sm">
            <div className="flex items-center space-x-2 text-muted-foreground">
              <Phone className="w-4 h-4" />
              <span>{artisan?.data.phone}</span>
            </div>
            <div className="flex items-center space-x-2 text-muted-foreground">
              <MapPin className="w-4 h-4" />
              <span>{artisan?.data.address}</span>
            </div>
          </div>
          <div className="flex space-x-2 pt-2">
            <Button
              className="w-fit cursor-pointer"
              variant="hero"
              disabled={artisan?.data.profileId === userDetails?.id}
              onClick={handleMessage}
            >
              <MessageCircle className="w-4 h-4 mr-2" />
              Message
            </Button>
          </div>

          <div>
            <h3 className="text-xl font-bold my-3">Portfolios</h3>
            {artisan?.data.portfolios && artisan?.data.portfolios.length > 0 ? (
              <div className="w-full space-y-2 overflow-y-auto max-h-96 pb-4 grid md:grid-cols-2 gap-4">
                {artisan?.data.portfolios.map((item) => (
                  <PortfolioCard key={item.id} {...item} />
                ))}
              </div>
            ) : (
              <Empty>
                <EmptyHeader>
                  <EmptyMedia variant="icon">
                    <Grid />
                  </EmptyMedia>
                  <EmptyTitle>No Portfolios Yet</EmptyTitle>
                  <EmptyDescription>
                    You have not added any portfolio items yet. Click the button
                    above to add your work samples.
                  </EmptyDescription>
                </EmptyHeader>
              </Empty>
            )}
            <div>
              <h3 className="text-xl font-bold my-3">Reviews</h3>
              <div className="w-full space-y-5 overflow-y-auto max-h-96 pb-4">
                {artisan?.data.reviews && artisan?.data.reviews.length > 0 ? (
                  <div className="w-full space-y-2 overflow-y-auto max-h-96 pb-4">
                    {artisan?.data.reviews.map((review) => (
                      <CommentRatingCard key={review.id} {...review} />
                    ))}
                  </div>
                ) : (
                  <Empty>
                    <EmptyHeader>
                      <EmptyMedia variant="icon">
                        <Grid />
                      </EmptyMedia>
                      <EmptyTitle>No Reviews Yet</EmptyTitle>
                      <EmptyDescription>
                        This Artisan has no ratings or reviews yet
                      </EmptyDescription>
                    </EmptyHeader>
                  </Empty>
                )}
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-xl font-bold my-3">Leave a Review</h3>
            <div className="w-full">
              <Textarea
                placeholder="Write your review here..."
                value={reviewData.comment}
                onChange={(e) =>
                  setReviewData({ ...reviewData, comment: e.target.value })
                }
              />
              <div className="flex justify-end mt-2">
                <Button
                  disabled={
                    isPending ||
                    !reviewData.comment ||
                    artisan?.data.profileId === userDetails?.id
                  }
                  onClick={() => setRatingModal(true)}
                  variant="hero"
                >
                  Submit Review
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Dialog open={ratingModal}>
        <DialogContent className="w-5/6 md:w-1/3">
          <DialogHeader>
            <DialogTitle>Add Ratings</DialogTitle>
            <DialogDescription>
              Please provide your ratings and review for this artisan.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="my-4">
              <RatingCard
                value={reviewData.rating}
                onRatingChange={(rating) =>
                  setReviewData((prev) => ({ ...prev, rating }))
                }
                maxRating={5}
                title={`Rate ${artisan?.data.name}`}
              />
            </div>
            <Button
              variant={"hero"}
              type="submit"
              className="w-fit"
              disabled={isPending}
              onClick={handleRating}
            >
              {isPending && <Loader2 className="m-2 h-4 w-4 animate-spin" />}
              Submit Ratings & Review
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      <Dialog open={messageModal}>
        <DialogContent className="w-5/6 md:w-1/3">
          <DialogHeader>
            <DialogTitle>Send Message</DialogTitle>
            <DialogDescription>
              Please provide your message for this artisan.
            </DialogDescription>
          </DialogHeader>
          <div>
            <div className="w-full">
              <Textarea
                placeholder="Write your message here..."
                value={messageData}
                onChange={(e) => setMessageData(e.target.value)}
              />
              <div className="flex justify-end mt-2">
                <Button
                  disabled={isSendingMessage || !messageData}
                  onClick={handleSendMessage}
                  variant="hero"
                >
                  Send Message{" "}
                  {isSendingMessage && (
                    <Loader2 className="m-2 h-4 w-4 animate-spin" />
                  )}
                </Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default page;
