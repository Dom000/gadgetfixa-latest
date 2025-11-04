import BreadCrumb from "@/components/CustomBreadcrumb";
import BussinessCard from "@/components/my-bussiness/BussinessCard";
import { Button } from "@/components/ui/button";
import { MessageCircle, Plus } from "lucide-react";
import Link from "next/link";

function page() {
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0 bg-gray-100 rounded-md p-2 md:p-5">
      <BreadCrumb page="My Bussiness" />
      <div className="mt-5 space-y-5">
        <div className="flex justify-end">
          <Link href={"/home/my-businesses/create"}>
            {" "}
            <Button className="" variant="hero">
              <Plus className="w-4 h-4 mr-2" />
              Create New
            </Button>
          </Link>
        </div>
        <BussinessCard />
      </div>
    </div>
  );
}

export default page;
