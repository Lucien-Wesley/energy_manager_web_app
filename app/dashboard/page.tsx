import DashboardLayout from "@/components/layouts/DashboardLayout";
import ConsumptionDashboard from "@/components/dashboard/ConsumptionDashboard";

export default function DashboardPage() {
  return (
    <DashboardLayout>
      <ConsumptionDashboard />
    </DashboardLayout>
  );
}