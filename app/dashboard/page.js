// app/dashboard/page.js
import DashboardNav from 'Components/DashboardNav.jsx';
import DashboardSidebar from 'Components/DashboardSidebar.jsx'

export default function DashboardPage() {
  return (
    <div className="dashboard-container">
      <DashboardNav />
      <DashboardSidebar/>
      
     
    </div>
  );
}
