import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "./ui/breadcrumb";

function BreadCrumb({
  page,
  breadcrumbs,
}: {
  page: string;
  breadcrumbs?: { name: string; href: string }[];
}) {
  return (
    <Breadcrumb className="text-xs">
      <BreadcrumbList>
        {breadcrumbs?.map((breadcrumb, index) => (
          <React.Fragment key={index}>
            <BreadcrumbItem>
              <BreadcrumbLink href={breadcrumb.href}>
                {breadcrumb.name}
              </BreadcrumbLink>
            </BreadcrumbItem>
            <BreadcrumbSeparator />
          </React.Fragment>
        ))}
        <BreadcrumbItem>
          <BreadcrumbPage>{page}</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export default BreadCrumb;
