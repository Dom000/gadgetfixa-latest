import BreadCrumb from "@/components/CustomBreadcrumb";
import React from "react";

function page() {
  return (
    <div className="w-full space-y-4 mt-2x md:space-y-0 bg-gray-100 rounded-md p-2 md:p-5">
      <BreadCrumb page="Dashboard" />
      <p>Admin Page</p>
    </div>
  );
}

export default page;
