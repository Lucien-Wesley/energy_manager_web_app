"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  HourlyConsumptionChart,
  DailyConsumptionChart,
  WeeklyConsumptionChart
} from "@/components/charts/ConsumptionCharts";
import { DateRangePicker } from "@/components/filters/DateRangePicker";
import ConsumptionFilter from "@/components/filters/ConsumptionFilter";
import ConsumptionOverview from "@/components/dashboard/ConsumptionOverview";
import AnomalyDetection from "@/components/dashboard/AnomalyDetection";
import { mockData } from "@/lib/mock-data";

// Types for the time period filter
type TimePeriod = "hourly" | "daily" | "weekly";

export default function ConsumptionDashboard() {
  const [activeTab, setActiveTab] = useState<TimePeriod>("hourly");
  const [selectedDateRange, setSelectedDateRange] = useState<[Date, Date]>([
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // 7 days ago
    new Date()
  ]);

  // Function to handle date range changes
  const handleDateRangeChange = (dateRange: [Date, Date]) => {
    setSelectedDateRange(dateRange);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Energy Dashboard</h1>
          <p className="text-muted-foreground mt-1">
            Monitor and analyze your electricity consumption
          </p>
        </div>
        <DateRangePicker 
          dateRange={selectedDateRange}
          onDateRangeChange={handleDateRangeChange}
        />
      </div>
      
      <ConsumptionOverview data={mockData.overview} />
      
      <div className="grid md:grid-cols-3 gap-6">
        <Card className="md:col-span-2">
          <CardHeader className="pb-2">
            <CardTitle>Consumption Analysis</CardTitle>
          </CardHeader>
          <CardContent>
            <Tabs 
              defaultValue="hourly" 
              onValueChange={(value) => setActiveTab(value as TimePeriod)}
              className="space-y-4"
            >
              <TabsList className="grid grid-cols-3 w-full md:w-[400px]">
                <TabsTrigger value="hourly">Hourly</TabsTrigger>
                <TabsTrigger value="daily">Daily</TabsTrigger>
                <TabsTrigger value="weekly">Weekly</TabsTrigger>
              </TabsList>
              
              <TabsContent value="hourly">
                <HourlyConsumptionChart 
                  data={mockData.hourly} 
                  dateRange={selectedDateRange} 
                />
              </TabsContent>
              <TabsContent value="daily">
                <DailyConsumptionChart 
                  data={mockData.daily} 
                  dateRange={selectedDateRange} 
                />
              </TabsContent>
              <TabsContent value="weekly">
                <WeeklyConsumptionChart 
                  data={mockData.weekly} 
                  dateRange={selectedDateRange} 
                />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
        
        <ConsumptionFilter />
      </div>
      
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Predictions vs. Actual and Future Predictions</CardTitle>
          </CardHeader>
          <CardContent>
            {activeTab === "hourly" && (
              <HourlyConsumptionChart 
                data={mockData.hourlyVsPredictions} 
                dateRange={selectedDateRange}
                showPredictions={true}
              />
            )}
            {activeTab === "daily" && (
              <DailyConsumptionChart 
                data={mockData.dailyVsPredictions} 
                dateRange={selectedDateRange}
                showPredictions={true}
              />
            )}
            {activeTab === "weekly" && (
              <WeeklyConsumptionChart 
                data={mockData.weeklyPredictions} 
                dateRange={selectedDateRange}
                showPredictions={true}
              />
            )}
          </CardContent>
        </Card>
        
        <AnomalyDetection 
          data={mockData.anomalies} 
          dateRange={selectedDateRange}
        />
      </div>
    </div>
  );
}