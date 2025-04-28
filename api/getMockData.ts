import axios from "axios";

const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const getMockData = async () => {
  try {
    const [
      hourly,
      daily,
      weekly,
      hourlyPredictions,
      dailyPredictions,
      weeklyPredictions,
      anomalies,
      overview
    ] = await Promise.all([
      axios.get(`${API_BASE}/api/data/hourly`).then(res => res.data),
      axios.get(`${API_BASE}/api/data/daily`).then(res => res.data),
      axios.get(`${API_BASE}/api/data/weekly`).then(res => res.data),
      axios.get(`${API_BASE}/api/predictions/hourly-predictions`).then(res => res.data),
      axios.get(`${API_BASE}/api/predictions/daily-predictions`).then(res => res.data),
      axios.get(`${API_BASE}/api/predictions/weekly-predictions`).then(res => res.data),
      axios.get(`${API_BASE}/api/anomalies`).then(res => res.data),
      axios.get(`${API_BASE}/api/stats/overview`).then(res => res.data)
    ]);

    return {
      hourly,
      daily,
      weekly,
      hourlyPredictions,
      dailyPredictions,
      weeklyPredictions,
      anomalies,
      overview
    };
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    throw error;
  }
};
