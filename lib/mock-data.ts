// Mock data for use in development
// In production, this would be replaced with API calls

// Helper to create dates for the past X days
const getPastDates = (days: number): string[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() - (days - 1 - i));
    return date.toISOString();
  });
};



// Helper to create dates for the past X days
const getFutureDates = (days: number): string[] => {
  return Array.from({ length: days }, (_, i) => {
    const date = new Date();
    date.setDate(date.getDate() + (1 + i));
    return date.toISOString();
  });
};

// Generate hourly data for today
const generateHourlyData = () => {
  return Array.from({ length: 24 }, (_, i) => ({
    hour: i,
    value: Math.floor(Math.random() * 2 + 0.5) + Math.random()
  }));
};

// Generate hourly data with predictions and anomalies
const generateHourlyVsPredictions = () => {
  return Array.from({ length: 24 }, (_, i) => {
    let actual : number | undefined = undefined; 
    const variation = Math.random() * 0.3 - 0.15; // -15% to +15%
    let prediction : number
    let anomaly : boolean | undefined = undefined; 
    let h: number;
    h = new Date().getHours();
    const setHour = (h - 12 + i + 24) % 24;
    if (i<13){
      actual = Math.floor(Math.random() * 2 + 0.5) + Math.random();
      prediction = actual * (1 - variation);
      anomaly = Math.abs(variation) > 0.12; // Mark as anomaly if >12% difference
    } else {
      prediction = Math.floor(Math.random() * 2 + 0.5) + Math.random();
    }
     
    return {
      hour: setHour,
      actual: actual !== undefined ? parseFloat(actual.toFixed(2)):undefined,
      prediction: parseFloat(prediction.toFixed(2)),
      anomaly
    };
  });
};

// Generate hourly data with predictions and anomalies
const generateHourlyPredictions = () => {
  return Array.from({ length: 24 }, (_, i) => {
    let actual : number | undefined = undefined; 
    const variation = Math.random() * 0.3 - 0.15; // -15% to +15%
    let prediction : number
    let anomaly : boolean | undefined = undefined; 
    let h: number;
    h = new Date().getHours();
    const setHour = (h - 24 + i + 24) % 24;
    if (i<24){
      actual = Math.floor(Math.random() * 2 + 0.5) + Math.random();
      prediction = actual * (1 - variation);
      anomaly = Math.abs(variation) > 0.12; // Mark as anomaly if >12% difference
    } else {
      prediction = Math.floor(Math.random() * 2 + 0.5) + Math.random();
    }
     
    return {
      hour: setHour,
      actual: actual !== undefined ? parseFloat(actual.toFixed(2)):undefined,
      prediction: parseFloat(prediction.toFixed(2)),
      anomaly
    };
  });
};

// Generate daily consumption data
const generateDailyData = (days: number = 7) => {
  const dates = getPastDates(days);
  return dates.map(date => ({
    date,
    value: parseFloat((Math.random() * 10 + 15).toFixed(2))
  }));
};

// Generate daily data with predictions
const generateDailyPredictions = (days: number = 30) => {
  const dates = getPastDates(days);
  return dates.map(date => {
    const actual = parseFloat((Math.random() * 10 + 15).toFixed(2));
    const prediction = parseFloat((actual * (0.9 + Math.random() * 0.2)).toFixed(2));
    return {
      date,
      actual,
      prediction
    };
  });
};

// Generate daily data with predictions Vs
const generateDailyVsPredictions = (days: number = 7) => {
  const dates = [...getPastDates(days), ...getFutureDates(days)];
  return dates.map((date, i) => {
    let actual : number | undefined = undefined; 
    let prediction : number;
    if (i < 7){
      actual = parseFloat((Math.random() * 10 + 15).toFixed(2));
      prediction = parseFloat((actual * (0.9 + Math.random() * 0.2)).toFixed(2));
    } else {
      prediction = parseFloat((Math.random() * 10 + 15).toFixed(2));
    }
    return {
      date,
      actual,
      prediction
    };
  });
};

// Generate weekly consumption data
const generateWeeklyData = (weeks: number = 4) => {
  return Array.from({ length: weeks }, (_, i) => ({
    week: `Week ${i + 1}`,
    value: parseFloat((Math.random() * 50 + 75).toFixed(2))
  }));
};

// Generate weekly data with predictions
const generateWeeklyPredictions = (weeks: number = 4) => {
  return Array.from({ length: weeks }, (_, i) => {
    const actual = parseFloat((Math.random() * 50 + 75).toFixed(2));
    const prediction = parseFloat((actual * (0.9 + Math.random() * 0.2)).toFixed(2));
    return {
      week: `Week ${i + 1}`,
      actual,
      prediction
    };
  });
};

// Generate anomaly data
const generateAnomalies = (count: number = 6) => {
  const rooms = ["Living Room", "Kitchen", "Bedroom", "Bathroom", "Home Office"];
  const devices = [
    "TV", "Refrigerator", "Air Conditioner", "Lights", "Computer", 
    "Microwave", "Dishwasher", "Water Heater", "Washing Machine"
  ];
  const severityLevels = ["low", "medium", "high"];
  
  return Array.from({ length: count }, (_, i) => {
    const date = new Date();
    date.setHours(date.getHours() - Math.floor(Math.random() * 72)); // Random time in last 3 days
    
    const expectedValue = parseFloat((Math.random() * 2 + 0.5).toFixed(2));
    const deviation = parseFloat((Math.random() * 40 + 10).toFixed(1)); // 10-50% deviation
    const actualValue = parseFloat((expectedValue * (1 + deviation / 100)).toFixed(2));
    const room = rooms[Math.floor(Math.random() * rooms.length)];
    const device = devices[Math.floor(Math.random() * devices.length)];
    const severity = 
      deviation > 35 ? "high" : 
      deviation > 20 ? "medium" : 
      "low";
    
    return {
      id: `anomaly-${i}`,
      timestamp: date.toISOString(),
      room,
      device,
      expectedValue,
      actualValue,
      deviation,
      severity
    };
  });
};

// Generate overview statistics
const generateOverviewStats = () => {
  return {
    currentUsage: parseFloat((Math.random() * 5 + 10).toFixed(2)),
    previousUsage: parseFloat((Math.random() * 5 + 12).toFixed(2)),
    percentChange: parseFloat((Math.random() * 20 - 10).toFixed(1)),
    predictedUsage: parseFloat((Math.random() * 5 + 9).toFixed(2)),
    anomaliesCount: Math.floor(Math.random() * 5),
    efficiency: Math.floor(Math.random() * 40 + 60), // 60-100%
    unit: "kWh"
  };
};

export const mockData = {
  hourly: generateHourlyData(),
  daily: generateDailyData(),
  weekly: generateWeeklyData(),
  hourlyPredictions: generateHourlyPredictions(),
  hourlyVsPredictions : generateHourlyVsPredictions(),
  dailyPredictions: generateDailyPredictions(),
  dailyVsPredictions: generateDailyVsPredictions(),
  weeklyPredictions: generateWeeklyPredictions(),
  anomalies: generateAnomalies(),
  overview: generateOverviewStats()
};