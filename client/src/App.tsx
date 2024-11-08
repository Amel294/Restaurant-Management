// Path: client\src\App.tsx
import { useState, useEffect, useRef } from 'react';
import { Menu } from 'lucide-react';
import { motion } from 'framer-motion';
import DashboardOverview from "./components/Dashboard Overview/DashboardOverview";
import OrdersList from "./components/Order List/OrderList";
import OrderMetrics from "./components/Order Metrics/OrderMetrics";
import Sidebar from "./components/Sidebar/Sidebar";
import TopBar from "./components/TopBar/TopBar";
import TopSection from "./components/TopSection/TopSection";
import TotalRevenue from "./components/Total Revenue/TotalRevenue";

function App() {
  const [sidebarHidden, setSidebarHidden] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const [dragConstraints, setDragConstraints] = useState({ left: 0, right: 0, top: 0, bottom: 0 });
  const [scrollY, setScrollY] = useState(0);
  const [menuPosition, setMenuPosition] = useState({ x: window.innerWidth - 100, y: window.innerHeight - 125 });

  const handleSideBarToggle = () => {
    setSidebarHidden((prevState) => !prevState);
  };

  useEffect(() => {
    const updateDragConstraints = () => {
      if (menuRef.current) {
        const menuWidth = menuRef.current.offsetWidth;
        const menuHeight = menuRef.current.offsetHeight;
        const maxDragRight = window.innerWidth - menuWidth - 20;
        const maxDragBottom = window.innerHeight - menuHeight - 20;
        setDragConstraints({
          left: 0,
          right: maxDragRight,
          top: 0,
          bottom: maxDragBottom,
        });
      }
    };

    window.addEventListener('resize', updateDragConstraints);
    updateDragConstraints();

    return () => {
      window.removeEventListener('resize', updateDragConstraints);
    };
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  useEffect(() => {
    const handleDragEnd = (event: DragEvent) => {
      const { x, y } = event;
      setMenuPosition({ x, y });
    };

    const menu = menuRef.current;
    menu?.addEventListener('dragend', handleDragEnd);

    return () => {
      menu?.removeEventListener('dragend', handleDragEnd);
    };
  }, []);

  return (
    <div className="min-h-screen max-w-screen overflow-x-hidden bg-gray-200 flex">
      <motion.div
        ref={menuRef}
        drag
        dragConstraints={dragConstraints}
        dragElastic={0.3}
        dragMomentum={true}
        initial={{ x: window.innerWidth - 100, y: window.innerHeight - 125 }}
        animate={{ x: menuPosition.x, y: menuPosition.y }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
        className="absolute z-50 bg-blue-400 text-white p-4 rounded-xl bg-opacity-50"
        onClick={handleSideBarToggle}
        style={{
          top: `${scrollY}px`,
        }}
        whileHover={{ scale: 1.1 }}
      >
        <Menu size={32} />
      </motion.div>

      {/* Sidebar animation */}
      <motion.div
        className="fixed top-0 left-0 h-full border-r border-gray-200 z-10"
        initial={{ width: 0, opacity: 0 }}
        animate={{
          width: sidebarHidden ? 0 : '15%', 
          opacity: sidebarHidden ? 0 : 1,
        }}
        transition={{
          type: "spring",
          stiffness: 300,
          damping: 30,
        }}
      >
        <Sidebar />
      </motion.div>

      {/* Main content */}
      <div className={`${!sidebarHidden ? 'md:ml-[15%]' : 'md:ml-0'} ml-0 w-full px-10 pt-6`}>
        <TopBar />
        <TopSection />
        <DashboardOverview />
        <OrderMetrics />
        <TotalRevenue />
        <OrdersList />
      </div>
    </div>
  );
}

export default App;
