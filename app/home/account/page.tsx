"use client";
import BreadCrumb from "@/components/CustomBreadcrumb";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAppStore } from "@/stores/store";

function page() {
  const user = useAppStore((state) => state.userDetails);
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0 bg-gray-100 rounded-md p-2 md:p-5">
      <BreadCrumb page="Account Information" />
      <div className="my-3 max-w-3xl ">
        <p className="text-sm text-gray-600">
          Manage your account settings and preferences.
        </p>
      </div>
      <div className="mt-10 bg-gray-50 rounded p-5 space-y-5 max-w-3xl ">
        <form className="space-y-4 ">
          <Label>Full Name</Label>
          <Input
            type="text"
            placeholder="John Doe"
            defaultValue={user?.fullName}
            disabled
          />{" "}
          <Label>Email</Label>
          <Input
            type="text"
            placeholder="John Doe"
            disabled
            defaultValue={user?.email}
          />{" "}
          <Label>Phone</Label>
          <Input
            type="text"
            placeholder="John Doe"
            disabled
            defaultValue={user?.phone ?? "Not Set"}
          />
          <Button className="w-fit" disabled variant="hero">
            Edit Account Info
          </Button>
        </form>
      </div>
    </div>
  );
}

export default page;
