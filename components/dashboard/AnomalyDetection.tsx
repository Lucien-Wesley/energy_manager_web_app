"use client";

import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { AlertTriangle, Info } from "lucide-react";
import { 
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { Badge } from "@/components/ui/badge";
import { formatDate } from "@/lib/utils";

interface Anomaly {
  id: string;
  timestamp: string;
  device: string;
  room: string;
  actualValue: number;
  expectedValue: number;
  deviation: number;
  severity: "low" | "medium" | "high";
}

interface AnomalyDetectionProps {
  data: Anomaly[];
  dateRange: [Date, Date];
}

export default function AnomalyDetection({ data, dateRange }: AnomalyDetectionProps) {
  const [selectedSeverity, setSelectedSeverity] = useState<string | null>(null);
  
  // Filter anomalies based on selected severity
  const filteredAnomalies = selectedSeverity 
    ? data.filter(anomaly => anomaly.severity === selectedSeverity)
    : data;
  
  // Filter anomalies based on date range
  const dateFilteredAnomalies = filteredAnomalies.filter(anomaly => {
    const anomalyDate = new Date(anomaly.timestamp);
    return anomalyDate >= dateRange[0] && anomalyDate <= dateRange[1];
  });

  const getSeverityColor = (severity: string) => {
    switch(severity) {
      case "high": return "bg-destructive text-destructive-foreground";
      case "medium": return "bg-chart-5 text-primary-foreground";
      case "low": return "bg-chart-4 text-primary-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card>
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="flex items-center">
            <AlertTriangle className="mr-2 h-5 w-5 text-chart-5" />
            Anomaly Detection
          </CardTitle>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="icon">
                  <Info className="h-4 w-4" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="max-w-xs">
                  Anomalies are detected when actual consumption differs significantly from predicted values.
                </p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <CardDescription>
          Unusual consumption patterns detected
        </CardDescription>
        <div className="flex space-x-2 mt-2">
          <Button 
            variant={selectedSeverity === null ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedSeverity(null)}
          >
            All
          </Button>
          <Button 
            variant={selectedSeverity === "high" ? "default" : "outline"}
            size="sm"
            className="text-destructive border-destructive hover:bg-destructive/10"
            onClick={() => setSelectedSeverity("high")}
          >
            High
          </Button>
          <Button 
            variant={selectedSeverity === "medium" ? "default" : "outline"}
            size="sm"
            className="text-chart-5 border-chart-5 hover:bg-chart-5/10"
            onClick={() => setSelectedSeverity("medium")}
          >
            Medium
          </Button>
          <Button 
            variant={selectedSeverity === "low" ? "default" : "outline"}
            size="sm"
            className="text-chart-4 border-chart-4 hover:bg-chart-4/10"
            onClick={() => setSelectedSeverity("low")}
          >
            Low
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[280px] pr-4">
          {dateFilteredAnomalies.length > 0 ? (
            <div className="space-y-4">
              {dateFilteredAnomalies.map((anomaly) => (
                <div 
                  key={anomaly.id}
                  className="p-3 rounded-lg border bg-card flex flex-col space-y-2"
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h4 className="font-medium text-sm">
                        {anomaly.device} in {anomaly.room}
                      </h4>
                      <p className="text-xs text-muted-foreground">
                        {formatDate(new Date(anomaly.timestamp))}
                      </p>
                    </div>
                    <Badge className={getSeverityColor(anomaly.severity)}>
                      {anomaly.severity.charAt(0).toUpperCase() + anomaly.severity.slice(1)}
                    </Badge>
                  </div>
                  <div className="grid grid-cols-3 gap-2 text-sm">
                    <div>
                      <p className="text-xs text-muted-foreground">Actual</p>
                      <p className="font-medium">{anomaly.actualValue} kWh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Expected</p>
                      <p className="font-medium">{anomaly.expectedValue} kWh</p>
                    </div>
                    <div>
                      <p className="text-xs text-muted-foreground">Deviation</p>
                      <p className={`font-medium ${anomaly.deviation > 0 ? "text-destructive" : "text-green-500"}`}>
                        {anomaly.deviation > 0 ? "+" : ""}{anomaly.deviation}%
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <AlertTriangle className="h-8 w-8 text-muted-foreground mb-2" />
              <h3 className="text-lg font-medium">No anomalies found</h3>
              <p className="text-sm text-muted-foreground mt-1">
                No unusual consumption patterns detected in the selected period.
              </p>
            </div>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}