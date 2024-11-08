// Path: client\src\App.tsx

import DashboardOverview from "./components/Dashboard Overview/DashboardOverview";
import OrdersList from "./components/Order List/OrderList";
import OrderMetrics from "./components/Order Metrics/OrderMetrics";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar.tsx/TopBar";
import TopSection from "./components/TopSection/TopSection";

function App() {
  return (
    <div className="min-h-screen overflow-x-hidden max-w-full bg-gray-200 grid grid-cols-7 ">
      <div className="col-span-1  border-gray-200">
        <Sidebar />
      </div>
      <div className="col-span-6 px-10 pt-6">
        <TopBar />
        <TopSection/>
        <DashboardOverview/>
        <OrderMetrics/>
        <OrdersList/>
      </div>
    </div>
  );
}

export default App;
