// import {
//     Avatar,
//     AvatarFallback,
//     AvatarImage,
//   } from "@/registry/new-york/ui/avatar"

import { getRecentSales, getTotalMonthSales } from "@/actions/admin.actions";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatPrice } from "@/lib/format";
import { Purchase } from "@prisma/client";

export async function OverviewRecentSales() {
  const recentsales = await getRecentSales();
  const totalsales = await getTotalMonthSales();
  console.log(totalsales);
  return (
    <div className="space-y-8">
      {recentsales && recentsales.map((item)=>(
        <div className="flex items-center" key={item.id}>
        <Avatar className="h-9 w-9">
          <AvatarImage src={item?.user?.image!} alt="Avatar" />
          <AvatarFallback>OM</AvatarFallback>
        </Avatar>
        <div className="ml-4 space-y-1">
          <p className="text-sm font-medium leading-none">{item?.user?.name}</p>
          <p className="text-sm text-muted-foreground">
            {item?.user?.email}
          </p>
        </div>
        <div className="ml-auto font-medium">+{formatPrice(item?.amount!)}</div>
      </div>
      ))}
    </div>
  );
}
