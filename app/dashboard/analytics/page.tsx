import DashboardLayout from "@/components/layouts/DashboardLayout";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { 
  HourlyConsumptionChart,
  DailyConsumptionChart
} from "@/components/charts/ConsumptionCharts";
import AnomalyDetection from "@/components/dashboard/AnomalyDetection";
import { mockData } from "@/lib/mock-data";

export default function AnalyticsPage() {
  const dateRange: [Date, Date] = [
    new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
    new Date()
  ];

  return (
    <DashboardLayout>
      <div className="space-y-6">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Analytics</h1>
          <p className="text-muted-foreground mt-1">
            Advanced analytics and anomaly detection
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle>Predictions vs. Actual</CardTitle>
              <CardDescription>
                Compare your actual consumption with predicted values
              </CardDescription>
            </CardHeader>
            <CardContent>
              <HourlyConsumptionChart 
                data={mockData.hourlyPredictions} 
                dateRange={dateRange}
                showPredictions={true}
              />
            </CardContent>
          </Card>
          
          <Card>
            <CardHeader>
              <CardTitle>Daily Comparison</CardTitle>
              <CardDescription>
                Actual vs. predicted daily consumption
              </CardDescription>
            </CardHeader>
            <CardContent>
              <DailyConsumptionChart 
                data={mockData.dailyPredictions} 
                dateRange={dateRange}
                showPredictions={true}
              />
            </CardContent>
          </Card>
        </div>
        
        <div className="grid md:grid-cols-2 gap-6">
          <AnomalyDetection 
            data={mockData.anomalies} 
            dateRange={dateRange}
          />
          
          <Card>
            <CardHeader>
              <CardTitle>Prediction Accuracy</CardTitle>
              <CardDescription>
                How accurate our predictions have been over time
              </CardDescription>
            </CardHeader>
            <CardContent className="h-[350px] flex items-center justify-center">
              <p className="text-muted-foreground text-center p-4">
                Prediction accuracy metrics coming soon
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </DashboardLayout>
  );
}