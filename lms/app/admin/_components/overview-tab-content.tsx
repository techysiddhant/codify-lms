
import { OverviewCard } from "./overview-card";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { OverviewChart } from "./overview-chart";
import { OverviewRecentSales } from "./overview-recent-sales";
import { getRecentSales, getTotalCreators, getTotalRevenue, getTotalUsers } from "@/actions/admin.actions";
import { Blocks, IndianRupee, UserPlus } from "lucide-react";

export default async function OverviewTabContent() {
    const revenue = await getTotalRevenue();
    const totalStudent = await getTotalUsers();
    const totalCreators = await getTotalCreators();
    
  return (
    <>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <OverviewCard icon={IndianRupee} amount={revenue?._sum.amount} title="Total Revenue" />
        <OverviewCard count={totalStudent!} title="Total Student" icon={UserPlus} />
        <OverviewCard count={totalCreators!} title="Total Creator" icon={Blocks} />
        {/* <OverviewCard /> */}
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <OverviewChart />
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>You made 265 sales this month.</CardDescription>
          </CardHeader>
          <CardContent>
            <OverviewRecentSales />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
