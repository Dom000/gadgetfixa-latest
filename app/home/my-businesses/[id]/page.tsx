"use client";
import { z } from "zod";
import BreadCrumb from "@/components/CustomBreadcrumb";
import { zodResolver } from "@hookform/resolvers/zod";
import React, { useEffect, useState } from "react";
import { use } from "react";
import { useForm } from "react-hook-form";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
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
import { Grid, Loader2 } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import PortfolioCard from "@/components/my-bussiness/PorfolioCard";
import { portfolioOptions } from "@/lib/mock-data";
import { useMutation, useQuery } from "@tanstack/react-query";
import {
  addPortfolioItem,
  getBusinessById,
} from "@/controllers/business/index.controller";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyMedia,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Dropzone,
  DropzoneContent,
  DropzoneEmptyState,
} from "@/components/ui/shadcn-io/dropzone";

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

const addPortfolio = z.object({
  portfolioTitle: z.string().min(2, "Title must be at least 2 characters"),
  portfolioDescription: z
    .string()
    .min(10, "Description must be at least 10 characters"),
  images: z.array(z.instanceof(File)).optional(),
});

type AddPortfolioFormData = z.infer<typeof addPortfolio>;

type UpdateBizFormData = z.infer<typeof updateBizForm>;

const options = [
  { label: "Plumbing", value: "Plumbing" },
  { label: "Electrical", value: "Electrical" },
  { label: "Carpentry", value: "Carpentry" },
  { label: "Landscaping", value: "Landscaping" },
  { label: "Cleaning", value: "Cleaning" },
  { label: "Painting", value: "Painting" },
  { label: "Roofing", value: "Roofing" },
  { label: "HVAC", value: "HVAC" },
  { label: "Flooring", value: "Flooring" },
  { label: "Masonry", value: "Masonry" },
  { label: "Fencing", value: "Fencing" },
  { label: "Iphone Repair", value: "Iphone Repair" },
  { label: "Computer Repair", value: "Computer Repair" },
  { label: "Appliance Repair", value: "Appliance Repair" },
  { label: "Auto Repair", value: "Auto Repair" },
  { label: "Other", value: "Other" },
];

function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const [filePreview, setFilePreview] = useState<string | undefined>();
  const [files, setFiles] = useState<File[] | undefined>();
  const [portfolioModal, setPortfolioModal] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["businessDetails"],
    queryFn: () => getBusinessById(id),
  });
  const [selectedValues, setSelectedValues] = useState<string[]>([]);

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

  const addPortfolio = useForm({
    resolver: zodResolver(
      z.object({
        portfolioTitle: z
          .string()
          .min(2, "Title must be at least 2 characters"),
        portfolioDescription: z
          .string()
          .min(10, "Description must be at least 10 characters"),
        images: z.array(z.instanceof(File)).optional(),
      })
    ),
    defaultValues: {
      portfolioTitle: "",
      portfolioDescription: "",
      images: [],
    },
  });

  useEffect(() => {
    if (data?.data) {
      const businessData = data.data;
      updateBiz.reset({
        bussinessName: businessData.name || "",
        occupation: businessData.occupation || "",
        categories: businessData.categories?.map((cat) => cat.name) || [],
        email: businessData.email || "",
        phone: businessData.phone || "",
        website: businessData.website || "",
        address: businessData.address || "",
        description: businessData.description || "",
      });
      setSelectedValues(businessData.categories?.map((cat) => cat.name) || []);
    }
  }, [data]);

  const { mutate } = useMutation({
    mutationFn: (formData: FormData) => addPortfolioItem(id, formData),
    onSuccess: (data) => {
      console.log("Portfolio item added successfully", data);
    },
    onError: (error) => {
      console.error("Error adding portfolio item:", error);
    },
  });

  const handleUpdateBiz = (data: UpdateBizFormData) => {
    console.log("Updating business with data:", data);
  };

  const handleDrop = (files: File[]) => {
    console.log(files);
    setFiles(files);
    if (files.length > 0) {
      const reader = new FileReader();
      reader.onload = (e) => {
        if (typeof e.target?.result === "string") {
          setFilePreview(e.target?.result);
        }
      };
      reader.readAsDataURL(files[0]);
    }
  };

  const handleAddPortfolio = (data: AddPortfolioFormData) => {
  
    const fdata = new FormData();
    if (files && files.length > 0) {
      files.forEach((file) => {
        fdata.append("image", file);
      });
    }
    fdata.append("title", data.portfolioTitle);
    fdata.append("description", data.portfolioDescription);

    mutate(fdata);
  };
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0 bg-gray-100 rounded-md p-2 md:p-5">
      <BreadCrumb
        page="Edit Bussiness"
        breadcrumbs={[{ name: "My Bussiness", href: "/home" }]}
      />
      <div className="mt-10 bg-gray-50 rounded p-5 space-y-5 max-w-3xl ">
        <Form {...updateBiz}>
          <form onSubmit={updateBiz.handleSubmit(handleUpdateBiz)}>
            <div className="space-y-4 grid md:grid-cols-2 gap-2">
              {" "}
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
                        onValueChange={(values) => {
                          setSelectedValues(values);
                          field.onChange(values);
                        }}
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
            </div>
            <Separator className="col-span-2 my-4" />
            <Button
              type="submit"
              className="w-fit"
              disabled={isLoading}
              variant="outline"
              onClick={() => setPortfolioModal(true)}
            >
              {isLoading && <Loader2 className="m-2 h-4 w-4 animate-spin" />}
              Add Portfolio Item
            </Button>
            {data?.data.portfolios && data?.data.portfolios.length > 0 ? (
              <div className="w-full my-3 space-y-2 overflow-y-auto max-h-96 pb-4 grid md:grid-cols-2 gap-4">
                {data?.data.portfolios.map((item) => (
                  <PortfolioCard viewOnly key={item.id} {...item} />
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
            <Button
              type="submit"
              className="w-fit"
              disabled={
                !updateBiz.formState.isDirty ||
                updateBiz.formState.isValidating ||
                isLoading
              }
              variant="hero"
            >
              {isLoading && <Loader2 className="m-2 h-4 w-4 animate-spin" />}
              Update Bussiness
            </Button>
          </form>
        </Form>
      </div>

      <Dialog open={portfolioModal}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Portfolio Item</DialogTitle>
            <DialogDescription>
              Add a new portfolio item to showcase your work. Provide details
              and upload images to attract more clients.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...addPortfolio}>
              <form onSubmit={addPortfolio.handleSubmit(handleAddPortfolio)}>
                <div className="space-y-4 my-4 grid md:grid-cols-1 gap-2">
                  <FormField
                    control={addPortfolio.control}
                    name="portfolioTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="my-2">Title</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Portfolio Title"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={addPortfolio.control}
                    name="portfolioDescription"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="my-2">Description</FormLabel>
                        <FormControl>
                          <Textarea
                            placeholder="Portfolio Description"
                            {...field}
                            disabled={isLoading}
                          />
                        </FormControl>
                      </FormItem>
                    )}
                  />{" "}
                  <Dropzone
                    accept={{ "image/*": [".png", ".jpg", ".jpeg"] }}
                    onDrop={handleDrop}
                    onError={console.error}
                    src={files}
                  >
                    <DropzoneEmptyState />
                    <DropzoneContent>
                      {filePreview && (
                        <div className="h-[102px] w-full">
                          <img
                            alt="Preview"
                            className="absolute top-0 left-0 h-full w-full object-cover"
                            src={filePreview}
                          />
                        </div>
                      )}
                    </DropzoneContent>
                  </Dropzone>
                </div>
                <Button
                  variant={"hero"}
                  type="submit"
                  className="w-fit"
                  disabled={isLoading}
                >
                  {isLoading && (
                    <Loader2 className="m-2 h-4 w-4 animate-spin" />
                  )}
                  Save Portfolio Item
                </Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default page;
