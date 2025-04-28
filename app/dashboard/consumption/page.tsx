"use client";

import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  HourlyConsumptionChart,
  DailyConsumptionChart,
  WeeklyConsumptionChart
} from "@/components/charts/ConsumptionCharts";
//import { getMockData } from "@/api/getMockData";
import { mockData } from "@/lib/mock-data";

import { useEffect, useState } from "react";

export default function ConsumptionPage() {
//   const [mockData, setMockData] = useState<any>(null);

//   useEffect(() => {
//     (async () => {
//       const data = await getMockData();
//       setMockData(data);
//     })();
//   }, []);

//   if (!mockData) {
//     return <div>Loading...</div>;
//   }

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Consumption Details</h1>
          <p className="text-muted-foreground mt-1">
            Detailed view of your electricity consumption patterns
          </p>
        </div>
        
        <Card>
          <CardHeader>
            <CardTitle>Consumption Analysis</CardTitle>
            <CardDescription>
              View your consumption patterns over different time periods
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Tabs defaultValue="hourly" className="space-y-4">
              <TabsList>
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hourly">
                <HourlyConsumptionChart 
                  data={mockData.hourly} 
                  dateRange={[new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]} 
                />
              </TabsContent>
              <TabsContent value="daily">
                <DailyConsumptionChart 
                  data={mockData.daily} 
                  dateRange={[new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]} 
                />
              </TabsContent>
              <TabsContent value="weekly">
                <WeeklyConsumptionChart 
                  data={mockData.weekly} 
                  dateRange={[new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Hourly Consumption</CardTitle>
              <CardDescription>
                Detailed hourly consumption breakdown
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HourlyConsumptionChart 
                data={mockData.hourly} 
                dateRange={[new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]} 
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Daily Consumption</CardTitle>
              <CardDescription>
                Daily consumption patterns
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DailyConsumptionChart 
                data={mockData.daily} 
                dateRange={[new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), new Date()]} 
              />
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}