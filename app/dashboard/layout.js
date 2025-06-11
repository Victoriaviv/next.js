// app/dashboard/layout.js
import 'styles/dashboard.css';

export default function DashboardLayout({ children }) {
  return (
    <section>
      
      <main>{children}</main>
    </section>
  );
}
