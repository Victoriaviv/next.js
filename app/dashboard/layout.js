// app/dashboard/layout.jsx
import DashboardSidebar from "Components/DashboardSidebar";
import DashboardNav from "Components/DashboardNav";
import "styles/dashboard.css";

export const metadata = {
  title: "Dashboard",
};

export default function DashboardLayout({ children }) {
  return (
    <div className="dashboard-layout">
      <DashboardSidebar />
      <div className="main-content">
        <DashboardNav />
        <main>{children}</main>
      </div>
    </div>
  );
}
