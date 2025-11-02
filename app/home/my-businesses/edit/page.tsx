"use client";
import { z } from "zod";
import BreadCrumb from "@/components/CustomBreadcrumb";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MultiSelect } from "@/components/ui/multi-select";
import { Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PortfolioCard from "@/components/my-bussiness/PorfolioCard";

const updateBizForm = z.object({
  bussinessName: z
    .string()
    .min(2, "Bussiness Name must be at least 2 characters"),
  occupation: z.string().min(2, "Occupation must be at least 2 characters"),
  categories: z.array(z.string()).min(1, "Select at least one category"),
  email: z.string().email("Invalid email address"),
  phone: z.string().min(10, "Phone number must be at least 10 digits"),
  website: z.string().url("Invalid URL").optional(),
  address: z.string().min(5, "Address must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
});

type UpdateBizFormData = z.infer<typeof updateBizForm>;

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

const portfolioOptions = [
  {
    id: "1",
    title: "Smartphone Screen Repair",
    description:
      "Professional iPhone 14 screen replacement with original parts",
    imageUrl:
      "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
  },
  {
    id: "2",
    title: "Laptop Battery Replacement",
    description: "MacBook Pro battery replacement service with 1-year warranty",
    imageUrl:
      "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?w=300&h=200&fit=crop",
  },
  {
    id: "3",
    title: "Gaming Console Repair",
    description: "PS5 overheating fix and thermal paste replacement",
    imageUrl:
      "https://images.unsplash.com/photo-1606144042614-b2417e99c4e3?w=300&h=200&fit=crop",
  },
  {
    id: "4",
    title: "Tablet Water Damage Recovery",
    description: "iPad water damage repair with data recovery service",
    imageUrl:
      "https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?w=300&h=200&fit=crop",
  },
  {
    id: "5",
    title: "Smartwatch Band Replacement",
    description: "Apple Watch Series 8 band and crown repair service",
    imageUrl:
      "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=200&fit=crop",
  },
];
function page() {
  const updateBiz = useForm<UpdateBizFormData>({
    resolver: zodResolver(updateBizForm),
    defaultValues: {
      bussinessName: "",
      occupation: "",
      categories: [],
      email: "",
      phone: "",
      website: "",
      address: "",
      description: "",
    },
  });

  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleUpdateBiz = (data: UpdateBizFormData) => {
    console.log("Updating Bussiness with data:", data);
  };
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0 bg-gray-100 rounded-md p-2 md:p-5">
      <BreadCrumb
        page="Edit Bussiness"
        breadcrumbs={[{ name: "My Bussiness", href: "/home" }]}
      />
      <div className="mt-10 bg-gray-50 rounded p-5 space-y-5 max-w-3xl ">
        <Form {...updateBiz}>
          <form
            onSubmit={updateBiz.handleSubmit(handleUpdateBiz)}
            className="space-y-4 grid md:grid-cols-2 gap-2"
          >
            <FormField
              control={updateBiz.control}
              name="bussinessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Bussiness Name</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="John Doe"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateBiz.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Occupation</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Occupation"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="col-span-2">
              <FormField
                control={updateBiz.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="my-20">Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Description"
                        {...field}
                        disabled={isLoading}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <FormField
              control={updateBiz.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Categories</FormLabel>
                  <FormControl>
                    <MultiSelect
                      options={options}
                      onValueChange={setSelectedValues}
                      defaultValue={selectedValues}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateBiz.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Bussiness Email</FormLabel>
                  <FormControl>
                    <Input
                      type="email"
                      placeholder="Bussiness Email"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateBiz.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Phone</FormLabel>
                  <FormControl>
                    <Input
                      type="tel"
                      placeholder="Phone"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateBiz.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Bussiness Address</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Address"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={updateBiz.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="my-2">Website</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="Website"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <Separator className="col-span-2 my-4" />
            <Button
              type="submit"
              className="w-fit"
              disabled={isLoading}
              variant="hero"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Add Portfolio Item
            </Button>{" "}
          </form>{" "}
          <div className="w-full space-y-2 overflow-y-auto max-h-96 pb-4 grid md:grid-cols-2 gap-4">
            {portfolioOptions.map((item) => (
              <PortfolioCard key={item.id} {...item} />
            ))}
          </div>
          <Button
            type="submit"
            className="w-fit"
            disabled={isLoading}
            variant="hero"
          >
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Update Bussiness
          </Button>
        </Form>
      </div>
    </div>
  );
}

export default page;
