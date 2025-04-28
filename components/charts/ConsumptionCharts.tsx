"use client";

import { useState } from "react";
import { 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  BarChart,
  Bar,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend,
  Area,
  ComposedChart,
  ReferenceLine,
  TooltipProps
} from "recharts";
import { 
  ArrowDownToLine,
  Info
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Tooltip as UITooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { formatDate, formatHour } from "@/lib/utils";

// Define common chart props
interface ConsumptionChartProps {
  data: any[];
  dateRange: [Date, Date];
  showPredictions?: boolean;
}

// Define custom tooltip component for charts
const CustomTooltip = ({ active, payload, label }: TooltipProps<number, string>) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-background border rounded-lg p-3 shadow-md">
        <p className="font-medium mb-1">{label}</p>
        {payload.map((entry, index) => (
          <div key={`tooltip-${index}`} className="flex items-center text-sm">
            <span
              className="inline-block w-3 h-3 mr-2 rounded-full"
              style={{ backgroundColor: entry.color }}
            />
            <span className="mr-2">{entry.name}:</span>
            <span className="font-medium">{entry.value} kWh</span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

// Charts components
export function HourlyConsumptionChart({ 
  data, 
  dateRange, 
  showPredictions = false 
}: ConsumptionChartProps) {
  const [downloadFormat, setDownloadFormat] = useState<string>("png");

  // Download chart as image function (mocked, would need canvas conversion in real app)
  const handleDownload = () => {
    // In a real app, this would convert the chart to an image
    console.log(`Downloading chart in ${downloadFormat} format`);
  };

  return (
    <div className="w-full h-[350px]">
      <div className="flex justify-end mb-2">
        {showPredictions && (
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-auto">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">
                  This chart shows your actual consumption compared to predicted values.
                  <br />
                  Significant differences may indicate unusual activity.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={handleDownload}
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Download {downloadFormat.toUpperCase()}
        </Button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {showPredictions ? (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="hour" 
              tickFormatter={formatHour}
              stroke="var(--muted-foreground)"
            />
            <YAxis 
              unit=" kWh" 
              stroke="var(--muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Area 
              type="monotone" 
              dataKey="prediction" 
              fill="hsl(var(--chart-4)/0.2)" 
              stroke="hsl(var(--chart-4))" 
              name="Predicted"
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Actual"
            />
            {data.map((item, index) => (
              item.anomaly && (
                <ReferenceLine 
                  key={`anomaly-${index}`}
                  x={item.hour} 
                  stroke="hsl(var(--destructive))" 
                  strokeWidth={2}
                  strokeDasharray="3 3"
                />
              )
            ))}
          </ComposedChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="hour" 
              tickFormatter={formatHour}
              stroke="var(--muted-foreground)"
            />
            <YAxis 
              unit=" kWh" 
              stroke="var(--muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Consumption"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function DailyConsumptionChart({ 
  data, 
  dateRange, 
  showPredictions = false 
}: ConsumptionChartProps) {
  const handleDownload = () => {
    // In a real app, this would convert the chart to an image
    console.log(`Downloading chart as PNG`);
  };

  return (
    <div className="w-full h-[350px]">
      <div className="flex justify-end mb-2">
        {showPredictions && (
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-auto">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">
                  This chart compares your daily consumption with predictions based on your usage patterns.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={handleDownload}
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Download PNG
        </Button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {showPredictions ? (
          <ComposedChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => formatDate(new Date(date), true)}
              stroke="var(--muted-foreground)"
            />
            <YAxis 
              unit=" kWh" 
              stroke="var(--muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="prediction" 
              fill="hsl(var(--chart-2)/0.7)" 
              name="Predicted"
              radius={[4, 4, 0, 0]} 
            />
            <Bar 
              dataKey="actual" 
              fill="hsl(var(--chart-1))" 
              name="Actual"
              radius={[4, 4, 0, 0]} 
            />
          </ComposedChart>
        ) : (
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="date" 
              tickFormatter={(date) => formatDate(new Date(date), true)}
              stroke="var(--muted-foreground)"
            />
            <YAxis 
              unit=" kWh" 
              stroke="var(--muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Bar 
              dataKey="value" 
              fill="hsl(var(--chart-1))" 
              name="Consumption"
              radius={[4, 4, 0, 0]} 
            />
          </BarChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}

export function WeeklyConsumptionChart({ 
  data, 
  dateRange, 
  showPredictions = false 
}: ConsumptionChartProps) {
  const handleDownload = () => {
    // In a real app, this would convert the chart to an image
    console.log(`Downloading chart as PNG`);
  };

  return (
    <div className="w-full h-[350px]">
      <div className="flex justify-end mb-2">
        {showPredictions && (
          <TooltipProvider>
            <UITooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon" className="mr-auto">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent side="top">
                <p className="max-w-xs">
                  This chart shows your weekly consumption trends and projected usage patterns.
                </p>
              </TooltipContent>
            </UITooltip>
          </TooltipProvider>
        )}
        <Button 
          variant="outline" 
          size="sm" 
          className="flex items-center"
          onClick={handleDownload}
        >
          <ArrowDownToLine className="mr-2 h-4 w-4" />
          Download PNG
        </Button>
      </div>
      <ResponsiveContainer width="100%" height="100%">
        {showPredictions ? (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="week" 
              stroke="var(--muted-foreground)"
            />
            <YAxis 
              unit=" kWh" 
              stroke="var(--muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="prediction" 
              stroke="hsl(var(--chart-2))" 
              strokeDasharray="5 5"
              strokeWidth={2}
              name="Predicted"
            />
            <Line 
              type="monotone" 
              dataKey="actual" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Actual"
            />
          </LineChart>
        ) : (
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--border)" />
            <XAxis 
              dataKey="week" 
              stroke="var(--muted-foreground)"
            />
            <YAxis 
              unit=" kWh" 
              stroke="var(--muted-foreground)"
            />
            <Tooltip content={<CustomTooltip />} />
            <Legend />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-1))" 
              strokeWidth={2}
              name="Consumption"
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );
}