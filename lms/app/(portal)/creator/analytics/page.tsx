import React from "react";
import { DataCard } from "./_components/data-card";
import { Chart } from "./_components/chart";
import { getAnalytics } from "@/actions/creator.actions";
import { getServerSession } from "next-auth/next";
import { CustomSession, authOptions } from "@/app/api/auth/[...nextauth]/route";

const CreatorAnalytics = async () => {
  const session: CustomSession | null = await getServerSession(authOptions);
  const { data, totalRevenue, totalSales } = await getAnalytics(
    session?.user?.id!
  );
  return (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <DataCard label="Total Revenue" value={totalRevenue} shouldFormat />
        <DataCard label="Total Sales" value={totalSales} />
      </div>
      <Chart data={data} />
    </div>
  );
};

export default CreatorAnalytics;
