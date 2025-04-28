"use client";

import { 
  Activity, 
  TrendingDown, 
  TrendingUp, 
  AlertTriangle, 
  Zap 
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { cn } from "@/lib/utils";

interface ConsumptionStats {
  currentUsage: number;
  previousUsage: number;
  percentChange: number;
  predictedUsage: number;
  anomaliesCount: number;
  efficiency: number;
  unit: string;
}

interface ConsumptionOverviewProps {
  data: ConsumptionStats;
}

export default function ConsumptionOverview({ data }: ConsumptionOverviewProps) {
  const {
    currentUsage,
    previousUsage,
    percentChange,
    predictedUsage,
    anomaliesCount,
    efficiency,
    unit
  } = data;
  
  const isIncrease = percentChange > 0;
  
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Current Consumption
            </p>
            <Zap className="h-4 w-4 text-primary" />
          </div>
          <div className="flex items-baseline justify-between">
            <p className="text-2xl font-bold">{currentUsage} {unit}</p>
            <div className={cn(
              "flex items-center text-sm font-medium",
              isIncrease ? "text-destructive" : "text-green-500"
            )}>
              {isIncrease ? (
                <TrendingUp className="mr-1 h-4 w-4" />
              ) : (
                <TrendingDown className="mr-1 h-4 w-4" />
              )}
              {Math.abs(percentChange)}%
            </div>
          </div>
          <p className="text-xs text-muted-foreground mt-1">
            vs {previousUsage} {unit} last period
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Prediction Accuracy
            </p>
            <Activity className="h-4 w-4 text-chart-2" />
          </div>
          <p className="text-2xl font-bold">
            {predictedUsage} {unit}
          </p>
          <div className="mt-2">
            <Progress 
              value={90} 
              className="h-2" 
            />
            <p className="text-xs text-muted-foreground mt-1">
              90% accuracy in predictions
            </p>
          </div>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Detected Anomalies
            </p>
            <AlertTriangle className="h-4 w-4 text-chart-5" />
          </div>
          <p className="text-2xl font-bold">{anomaliesCount}</p>
          <p className="text-xs text-muted-foreground mt-1">
            {anomaliesCount > 0 
              ? `${anomaliesCount} anomalies detected in current period` 
              : "No anomalies detected in current period"}
          </p>
        </CardContent>
      </Card>
      
      <Card>
        <CardContent className="p-6">
          <div className="flex items-center justify-between space-y-1">
            <p className="text-sm font-medium leading-none text-muted-foreground">
              Energy Efficiency
            </p>
            <Zap className="h-4 w-4 text-chart-4" />
          </div>
          <div className="flex items-baseline space-x-2">
            <p className="text-2xl font-bold">{efficiency}%</p>
          </div>
          <div className="mt-2">
            <Progress 
              value={efficiency} 
              className="h-2" 
              indicatorClassName={cn(
                efficiency < 40 ? "bg-destructive" :
                efficiency < 70 ? "bg-chart-5" :
                "bg-chart-2"
              )}
            />
            <p className="text-xs text-muted-foreground mt-1">
              {efficiency < 40 ? "Poor" : 
               efficiency < 70 ? "Average" : 
               "Good"} energy efficiency
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}