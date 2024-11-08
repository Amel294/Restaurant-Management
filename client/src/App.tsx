// Path: client\src\App.tsx

import DashboardOverview from "./components/Dashboard Overview/DashboardOverview";
import OrdersList from "./components/Order List/OrderList";
import OrderMetrics from "./components/Order Metrics/OrderMetrics";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar.tsx/TopBar";
import TopSection from "./components/TopSection/TopSection";
import TotalRevenue from "./components/Total Revenue/TotalRevenue";

function App() {
  return (
    <div className="min-h-screen bg-gray-200 flex">
      {}
      {/* <div className="w-1/6 fixed top-0 left-0 h-full border-r border-gray-200 z-10">
        <Sidebar />
      </div> */}

      {}
      <div className=" w-full px-10 pt-6">
        <TopBar />
        <TopSection />
        <DashboardOverview />
        <OrderMetrics />
        <TotalRevenue/>
        <OrdersList />
      </div>
    </div>
  );
}

export default App;
