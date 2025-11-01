"use client";
import BreadCrumb from "@/components/CustomBreadcrumb";
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
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const createBizForm = z.object({
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

type CreateBizFormData = z.infer<typeof createBizForm>;

const options = [
  { value: "react", label: "React" },
  { value: "vue", label: "Vue.js" },
  { value: "angular", label: "Angular" },
];

function page() {
  const [selectedValues, setSelectedValues] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const createBiz = useForm<CreateBizFormData>({
    resolver: zodResolver(createBizForm),
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

  const handleCreateBiz = (data: CreateBizFormData) => {
    console.log("Creating Bussiness with data:", data);
  };
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0 bg-gray-100 rounded-md p-2 md:p-5">
      <BreadCrumb
        page="Create New"
        breadcrumbs={[{ name: "My Bussiness", href: "/home" }]}
      />
      <div className="mt-10 bg-gray-50 rounded p-5 space-y-5 max-w-3xl ">
        <Form {...createBiz}>
          <form
            onSubmit={createBiz.handleSubmit(handleCreateBiz)}
            className="space-y-4 grid md:grid-cols-2 gap-2"
          >
            <FormField
              control={createBiz.control}
              name="bussinessName"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bussiness Name</FormLabel>
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
              control={createBiz.control}
              name="occupation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Occupation</FormLabel>
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
            <FormField
              control={createBiz.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      placeholder="Description"
                      {...field}
                      disabled={isLoading}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={createBiz.control}
              name="categories"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Categories</FormLabel>
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
              control={createBiz.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bussiness Email</FormLabel>
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
              control={createBiz.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
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
              control={createBiz.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Bussiness Address</FormLabel>
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
              control={createBiz.control}
              name="website"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Website</FormLabel>
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
            <Button
              type="submit"
              className="w-fit"
              disabled={isLoading}
              variant="hero"
            >
              {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Create Bussiness
            </Button>
          </form>
        </Form>{" "}
      </div>
    </div>
  );
}

export default page;
