import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import OverviewTabContent from "./_components/overview-tab-content";

const AdminPage = () => {
  return (
    <div className="p-2  h-full">
      <div className="border p-2 rounded backdrop-blur-sm shadow-md">
        <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
        <div className="my-4">
          <Tabs defaultValue="overview" className="space-y-4">
            <TabsList>
              <TabsTrigger value="overview">Overview</TabsTrigger>
              {/* <TabsTrigger value="analytics" disabled>
                Analytics
              </TabsTrigger>
              <TabsTrigger value="reports" disabled>
                Reports
              </TabsTrigger>
              <TabsTrigger value="notifications" disabled>
                Notifications
              </TabsTrigger> */}
            </TabsList>
            <TabsContent value="overview" className="space-y-4">
              <OverviewTabContent />
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
