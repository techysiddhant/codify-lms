import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { formatNumber, formatPrice } from "@/lib/format";
import { IndianRupee, LucideIcon } from "lucide-react";
type OverviewCardProps={
    icon:LucideIcon;
    amount?:number | null | undefined;
    title:string;
    count?:number;
}
export const OverviewCard = ({icon:Icon,amount,title,count}:OverviewCardProps) => {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium">{title}</CardTitle>
        {/* <IndianRupee /> */}
        <Icon/>
      </CardHeader>
      <CardContent>
        {count && <div className="text-2xl font-bold">{formatNumber(count)}</div> }
        {amount && <div className="text-2xl font-bold">{formatPrice(amount? amount : 0)}</div> }
        <p className="text-xs text-muted-foreground">+20.1% from last month</p>
      </CardContent>
    </Card>
  );
};
